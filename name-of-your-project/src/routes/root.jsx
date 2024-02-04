// Import necessary components and functions from the React Router library and other modules.
import { 
    Outlet,
    NavLink,
    Link,
    useLoaderData,
    Form,
    redirect,
    useNavigation,
    useSubmit,
  } from "react-router-dom";
  import { getContacts, createContact } from "../contacts";
  import { useEffect } from "react";
  
  // Define an asynchronous action function.
  export async function action() {
    // Create a new contact and redirect to its edit page.
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
  }
  
  // Define an asynchronous loader function to fetch contacts based on the search query.
  export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
    return { contacts, q };
  }
  
  // Define the Root component.
  export default function Root() {
    // Use the loader data and navigation utilities from React Router.
    const { contacts, q } = useLoaderData();
    const navigation = useNavigation();
    const submit = useSubmit();
  
    // Check if the user is currently performing a search.
    const searching =
      navigation.location &&
      new URLSearchParams(navigation.location.search).has("q");
  
    // Set the initial value of the search input based on the loader data.
    useEffect(() => {
      document.getElementById("q").value = q;
    }, [q]);
  
    // Render the Root component with a sidebar for navigation and a detail section for content.
    return (
      <>
        <div id="sidebar">
          {/* Sidebar header and search form */}
          <h1>React Router Contacts</h1>
          <div>
            <Form id="search-form" role="search">
              {/* Search input */}
              <input
                id="q"
                className={searching ? "loading" : ""}
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
                defaultValue={q}
                onChange={(event) => {
                  const isFirstSearch = q == null;
                  submit(event.currentTarget.form, {
                    replace: !isFirstSearch,
                  });
                }}
              />
              {/* Search spinner for loading indication */}
              <div id="search-spinner" aria-hidden hidden={!searching} />
              <div className="sr-only" aria-live="polite" />
            </Form>
            {/* New contact button */}
            <form method="post">
              <button type="submit">New</button>
            </form>
          </div>
          {/* Navigation menu for contacts */}
          <nav>
            {contacts.length ? (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    {/* Navigation link for each contact */}
                    <NavLink
                      to={`contacts/${contact.id}`}
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "active"
                          : isPending
                          ? "pending"
                          : ""
                      }
                    >
                      {/* Other code for contact link */}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              // Display a message if there are no contacts
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </div>
        <div id="detail">
          {/* Apply loading class based on navigation state and render the nested Outlet for content */}
          className={navigation.state === "loading" ? "loading" : ""}
          <Outlet />
        </div>
      </>
    );
  }
  