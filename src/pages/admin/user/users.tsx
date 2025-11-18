import DashboardLayout from '@/layouts/dashboardLayout';
import { Helmet } from 'react-helmet-async'
import UserTable from './usersTable';
import { SectionCards } from './sectionCards';

const APP_NAME = import.meta.env.VITE_APP_NAME;

export default function Users() {
  return (
    <>
      <Helmet>
        <title>{`Users - ${APP_NAME}`}</title>
      </Helmet>

      <DashboardLayout>
        <SectionCards/>
        <UserTable/>
      </DashboardLayout>
    </>
  )
}
