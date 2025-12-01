import DashboardLayout from '@/layouts/dashboardLayout'
import { OverviewSection } from '../metrics/sectionCards'
import Ingredientstable from './ingredientsTable'

export default function Ingredients() {
  return (
    <DashboardLayout pageTitle="Ingredients">
      <OverviewSection/>
      <Ingredientstable/>
    </DashboardLayout>
  )
}
