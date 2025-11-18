import DashboardLayout from '@/layouts/dashboardLayout';
import { Helmet } from 'react-helmet-async'
import { SectionCards } from './sectionCards';
import { VisitorChart } from './visitorChart';

const APP_NAME = import.meta.env.VITE_APP_NAME;

export default function DashboardMetrics() {
  return (
    <>
      <Helmet>
        <title>{`Dashboard - ${APP_NAME}`}</title>
      </Helmet>

      <DashboardLayout>
        <SectionCards /> 
        <VisitorChart/>
      </DashboardLayout>
    </>
  )
}
