import { createBrowserRouter } from 'react-router-dom';
import { paths } from './paths';
import MainPage from '../pages/MainPage/MainPage';
import ForcastPage from '../pages/ForcastPage/ForcastPage';
import Auth from '../components/Auth/Auth';
export const router = createBrowserRouter([
  {
    path: paths.main,
    element: <MainPage />,
  },
  {
    path: paths.forcast,
    element: <ForcastPage />,
  },
  {
    path: paths.auth,
    element: <Auth />,
  },
 
]);
