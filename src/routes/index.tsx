import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
// components
import LoadingScreen from '../components/LoadingScreen';
// ----------------------------------------------------------------------

const Loadable = (Component: any) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // Dashboard Routes
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/fund/list" replace /> },
        {
          path: 'fund',
          children: [
            { path: '/list', element: <FundList /> },
            { path: '/:id/show', element: <FundCreate /> },
            { path: '/new', element: <FundCreate /> }
          ]
        }
      ]
    }
  ]);
}

// Dashboard
const FundList = Loadable(lazy(() => import('../pages/FundList')));
const FundCreate = Loadable(lazy(() => import('../pages/FundCreate')));
