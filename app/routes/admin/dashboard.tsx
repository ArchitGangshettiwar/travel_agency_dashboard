import Header from 'components/Header';
import TripCard from 'components/TripCard';
import StatsCard from 'components/StatsCard';
import React from 'react';


const Dashboard = () => {
  const user = {name: 'Archit'};
  const dashboardStats={
    totalUsers: 1200,
    usersJoined: {currentMonth:218, lastMonth: 176},
    totalTrips: 3050,
    tripsCreated: {currentMonth: 320, lastMonth: 290},
    userRole: {total: 62,currentMonth: 12, lastMonth: 8}
  }

const{ totalUsers, usersJoined, totalTrips,tripsCreated, userRole} = dashboardStats;

  return (
    <main className='dashboard wrapper'>
     <Header
     title={`Welcome ${user?.name ?? 'Guest'}👋`}
     description="Track activity, trends and popular destinations in rela time"

     />
     <section className='flex flex-col gap-6'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6
      w-full'>
        
        <StatsCard 
           headerTitle="Total Users"
           total ={totalUsers}
           currentMonthCount={usersJoined.currentMonth}
           lastMonthCount={usersJoined.lastMonth}
        />

        <StatsCard 
           headerTitle="Total Trips"
           total ={totalTrips}
           currentMonthCount={tripsCreated.currentMonth}
           lastMonthCount={tripsCreated.lastMonth}
        />

        <StatsCard 
           headerTitle="Active Users Today"
           total ={userRole.total}
           currentMonthCount={userRole.currentMonth}
           lastMonthCount={userRole.lastMonth}
        />

      </div>

     </section>
     
     
     <TripCard />
    </main>
  )
}
export default Dashboard;