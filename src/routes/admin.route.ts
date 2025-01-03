import express from 'express';
const adminRoutes = express();

import adminUsersRoute from '@/src/routes/admin.users.route';
import adminServicesRoute from '@/src/routes/admin.services.route';
import adminStaffsRoute from '@/src/routes/admin.staffs.route';
import adminBookingRoute from '@/src/routes/admin.bookings.route';
import statisticsRoute from '@/src/routes/statistics.route';
import inventoriesRoute from '@/src/routes/inventories.route';

adminRoutes.use('/users', adminUsersRoute);

adminRoutes.use('/services', adminServicesRoute);

adminRoutes.use('/staffs', adminStaffsRoute);

adminRoutes.use('/bookings', adminBookingRoute);

adminRoutes.use('/statistics', statisticsRoute);

adminRoutes.use('/inventories', inventoriesRoute);

export default adminRoutes;
