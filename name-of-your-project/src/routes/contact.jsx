// Import necessary components and functions from the React Router library and other modules.
import { 
    Form, 
    useLoaderData,
    useFetcher,
  } from "react-router-dom";
  import { getContact, updateContact } from "../contacts";
  
  // Define an asynchronous loader function to fetch contact details based on the contactId.
  export async function loader({ params }) {
    // Fetch the contact using the provided contactId.
    const contact = await getContact(params.contactId);
  
    // If the contact is not found, throw a 404 Not Found response.
    if (!contact) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
  
    // Return the contact data.
    return { contact };
  }
  
  // Define the Contact component for displaying contact details.
  export default function Contact() {
    // Retrieve contact data from the loader data using useLoaderData.
    const { contact } = useLoaderData();
  
    // Render the Contact component with contact details and actions.
    return (
      <div id="contact">
        <div>
          {/* Display the contact's avatar image. */}
          <img key={contact.avatar} src={contact.avatar || null} />
        </div>
  
        <div>
          <h1>
            {/* Display the contact's name and favorite status. */}
            {contact.first || contact.last ? (
              <>
                {contact.first} {contact.last}
              </>
            ) : (
              <i>No Name</i>
            )}{" "}
            <Favorite contact={contact} />
          </h1>
  
          {/* Display the contact's Twitter handle if available. */}
          {contact.twitter && (
            <p>
              <a
                target="_blank"
                href={`https://twitter.com/${contact.twitter}`}
              >
                {contact.twitter}
              </a>
            </p>
          )}
  
          {/* Display the contact's notes if available. */}
          {contact.notes && <p>{contact.notes}</p>}
  
          <div>
            {/* Form buttons for editing and deleting the contact. */}
            <Form action="edit">
              <button type="submit">Edit</button>
            </Form>
            <Form
              method="post"
              action="destroy"
              onSubmit={(event) => {
                // Confirm deletion with a user prompt.
                if (!confirm("Please confirm you want to delete this record.")) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit">Delete</button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
  
  // Define the Favorite component for handling contact favorite status.
  function Favorite({ contact }) {
    // Use the useFetcher hook to manage form submission.
    const fetcher = useFetcher();
  
    // Determine the current favorite status based on the fetcher's formData.
    let favorite = contact.favorite;
    if (fetcher.formData) {
      favorite = fetcher.formData.get("favorite") === "true";
    }
  
    // Render a form button to toggle the favorite status.
    return (
      <fetcher.Form method="post">
        <button
          name="favorite"
          value={favorite ? "false" : "true"}
          aria-label={
            favorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          {favorite ? "★" : "☆"}
        </button>
      </fetcher.Form>
    );
  }
  