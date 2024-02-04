// Import necessary dependencies from React, ReactDOM, and the React Router library.
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Import styles from an external CSS file and components for different routes.
import './index.css'
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import ErrorPage from "./error-page";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";
import EditContact, {
  action as editAction,
} from './routes/edit';
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";

// Define the routes using createBrowserRouter from React Router.
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader : rootLoader,
    action: rootAction,
    children: [
      {
        // Sub-route for handling errors
        errorElement: <ErrorPage />,
        children: [
          // Sub-routes for different views
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
          },
        ],
      },
    ],
  },
]);

// Use ReactDOM.createRoot to create a root-level React rendering container and render the application inside it.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provide the router to the application using RouterProvider. */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
