import express from 'express';
const apiRoute = express();

import authRoutes from '@/src/routes/auth.route';
import adminRoutes from '@/src/routes/admin.route';
import motorcycleBrandsRoute from '@/src/routes/motorcycle.brands.route';
import servicesRoute from '@/src/routes/services.route';
import motorcyclesRoute from '@/src/routes/motorcycles.route';
import usersRoutes from '@/src/routes/users.route';
import staffsRoutes from '@/src/routes/staffs.route';
import stationsRoutes from '@/src/routes/stations.route';
import addressesRoute from '@/src/routes/addresses.route';
import itemsRoute from '@/src/routes/items.route';
import bookingsRoute from '@/src/routes/bookings.route';
import profileRoute from '@/src/routes/profile.route';
import invoicesRoute from '@/src/routes/invoices.route';
import paymentsRoute from '@/src/routes/payments.route';

import {
    verifyToken,
    verifyAdminRole,
    verifyStaffRole,
} from '@/src/middlewares/verify.middleware';
import { testSendNoti } from '@/src/controllers/notification.controller';

apiRoute.use('/auth', authRoutes);
apiRoute.use('/admin', verifyToken, verifyAdminRole, adminRoutes);

apiRoute.use('/users', verifyToken, usersRoutes);

apiRoute.use('/staffs', verifyToken, verifyStaffRole, staffsRoutes);

apiRoute.use('/motorcycle-brands', motorcycleBrandsRoute);

apiRoute.use('/services', servicesRoute);

apiRoute.use('/motorcycles', motorcyclesRoute);

apiRoute.use('/address', addressesRoute);

apiRoute.use('/stations', stationsRoutes);

apiRoute.use('/items', itemsRoute);

apiRoute.use('/bookings', verifyToken, bookingsRoute);

apiRoute.use('/profile', profileRoute);

apiRoute.use('/invoices', invoicesRoute);

apiRoute.use('/payments', paymentsRoute);

apiRoute.get('/test-noti', testSendNoti);

export default apiRoute;
