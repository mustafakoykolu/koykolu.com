import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: React.PropsWithChildren) {
  const isLoggedIn = false;
  const { pathname } = useLocation();

  if (!isLoggedIn && pathname) {
    return <Navigate to={`/`} />;
  }

  return children;
}