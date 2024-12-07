import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Homepage from './routes/Homepage.jsx';
import PostListPage from './routes/PostListPage.jsx';
import SinglePostPage from './routes/SinglePostPage.jsx';
import RegisterPage from './routes/RegisterPage.jsx';
import LoginPage from './routes/LoginPage.jsx';
import Write from './routes/Write.jsx';
import MainLayout from './layouts/MainLayout.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/posts',
        element: <PostListPage />,
      },
      {
        path: '/:slug',
        element: <SinglePostPage />,
      },
      {
        path: '/write',
        element: <Write />,
      },
    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
