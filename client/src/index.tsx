import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import About from './pages/About';
import AllCafes from './pages/AllCafes';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import client from './apolloClient';
import { ApolloProvider } from '@apollo/client';

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/allCafes",
    element: <AllCafes />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/profile",
    element: <Profile />
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ApolloProvider>
);
