import express from 'express';
import { CategoryRoutes } from '../modules/activity/activity.routes';
import { AuthRoutes } from '../modules/auth/auth.router';
import { OrderRoutes } from '../modules/booking/booking.routes';
import { BookRoutes } from '../modules/destination/destination.routes';
import { UserRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/',
    route: UserRoutes,
  },

  {
    path: '/',
    route: CategoryRoutes,
  },
  {
    path: '/',
    route: BookRoutes,
  },
  {
    path: '/',
    route: AuthRoutes,
  },
  {
    path: '/',
    route: OrderRoutes,
  },
];
router.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS'
  );
});
moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
