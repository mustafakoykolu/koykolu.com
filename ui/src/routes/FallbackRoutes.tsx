import NotFoundPage from "../pages/NotFoundPage";

export const fallbackRoute = [
  {
    path: '*',
    element: <NotFoundPage />,
  },
];