// Import necessary components and functions from the React Router library and other modules.
import { 
    Form,
    useLoaderData,
    redirect,
    useNavigate,
  } from "react-router-dom";
  import { updateContact } from "../contacts";
  
  // Define an asynchronous action function to handle form submission and contact updates.
  export async function action({ request, params }) {
    // Retrieve form data from the request and convert it to an object.
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
  
    // Update the contact with the specified contactId using the updates.
    await updateContact(params.contactId, updates);
  
    // Redirect to the contact's detail page after the update.
    return redirect(`/contacts/${params.contactId}`);
  }
  
  // Define the EditContact component for editing contact details.
  export default function EditContact() {
    // Retrieve contact data from the loader data using useLoaderData.
    const { contact } = useLoaderData();
    // Get the navigate function from the React Router library.
    const navigate = useNavigate();
  
    // Render a form for editing contact details.
    return (
      <Form method="post" id="contact-form">
        <p>
          {/* Input fields for the first and last name of the contact. */}
          <span>Name</span>
          <input
            placeholder="First"
            aria-label="First name"
            type="text"
            name="first"
            defaultValue={contact.first}
          />
          <input
            placeholder="Last"
            aria-label="Last name"
            type="text"
            name="last"
            defaultValue={contact.last}
          />
        </p>
        {/* Input field for the Twitter handle of the contact. */}
        <label>
          <span>Twitter</span>
          <input
            type="text"
            name="twitter"
            placeholder="@jack"
            defaultValue={contact.twitter}
          />
        </label>
        {/* Input field for the Avatar URL of the contact. */}
        <label>
          <span>Avatar URL</span>
          <input
            placeholder="https://example.com/avatar.jpg"
            aria-label="Avatar URL"
            type="text"
            name="avatar"
            defaultValue={contact.avatar}
          />
        </label>
        {/* Textarea for entering notes about the contact. */}
        <label>
          <span>Notes</span>
          <textarea
            name="notes"
            defaultValue={contact.notes}
            rows={6}
          />
        </label>
        <p>
          {/* Save and Cancel buttons for form submission and navigation. */}
          <button type="submit">Save</button>
          <button
            type="button"
            onClick={() => {
              // Navigate back to the previous page when the Cancel button is clicked.
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </p>
      </Form>
    );
  }
  