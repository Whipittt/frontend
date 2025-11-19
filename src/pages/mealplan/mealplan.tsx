import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import UserAvatar from '@/components/userAvatar'
import MainLayout from '@/layouts/mainLayout'
import EditButton from '../profile/editButton';
import { MealplanTable } from './malplanTable';

export default function CreateMealPaln() {
  return (
    <MainLayout className="px-2 md:px-8 gap-12">
      <section>
        <div className="flex gap-4  justify-between items-center">
          <h1 className="font-serif text-2xl md:text-5xl">
            Your Weekly Meal Schedule
          </h1>
          <UserAvatar />
        </div>
      </section>
      <section>
        <Card className="rounded-3xl">
          <CardHeader className='flex flex-row justify-between items-start h-fit'>
            <span className='font-semibold'>Meal Schedule</span>
            <EditButton className='!mt-0 rounded-full'/>
          </CardHeader>
          <CardDescription className='mt-4'>
            <MealplanTable />
          </CardDescription>
        </Card>
      </section>
    </MainLayout>
  );
}
