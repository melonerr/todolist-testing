import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// pages
import TodoList from '../pages/todolist';
import Page404 from '../pages/Page404';


const Router = createBrowserRouter([
    {
        path: '',
        element: <TodoList />,

    },
    {
        path: '*',
        element: <Page404 />,
    }
]);
export default Router;
