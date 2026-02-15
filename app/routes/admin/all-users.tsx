import React from 'react'
import Header from 'components/Header';
import { ColumnsDirective, GridComponent, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { users } from '~/constants';
import { cn, formatDate } from '~/lib/utils';
import { getAllUsers } from '~/appwrite/auth';
import type { Route } from './+types/all-users';

export const loader = async () => {
 const result = await getAllUsers(10, 0) || { users: [], total: 0 };
 return result;
}

const AllUsers = ({loaderData}: Route.ComponentProps) => {

  const {users} = loaderData;

  return (
    <main className='all-users wrapper'>
       <Header
     title="Manage Users"
     description="Filter, sort and access detailed user profiles"

     />

     <GridComponent dataSource={users} gridLines='None'>
     <ColumnsDirective>
      <ColumnDirective
     field = "name"
     headerText='Name'
      width='200'
      textAlign='Left'
      template={(props: UserData)=>(
        <div className='flex items-center gap-1.5 px-4'>
        
        <img src= {props.imageUrl} alt="user" className="rounded-full size-8 aspect-square"/>

        <span>{props.name}</span>

        </div>

      )}
     />

     <ColumnDirective
      field = "email"
      headerText='Email'
      width='220'
      textAlign='Left'
      />

      <ColumnDirective
      field = "joinedAt"
      headerText='Date Joined'
      width='180'
      textAlign='Left'
      template={({joinedAt}: {joinedAt: string}) => formatDate(joinedAt)}
      />

      

      <ColumnDirective
      field = "status"
      headerText='Type'
      width='100'
      textAlign='Left'
      template={({status}: UserData) => (
           <article className={cn('status-column',status === 'user' ? 'bg-success-50':
            'bg-light-300' )}>
             <div className={cn('size-1.5 rounded-full',
              status === 'user' ? 'bg-success-500': 'bg-gray-500'
             )} />

              <h3 className={cn('font-enter text-xs font-medium',
                status === 'user' ? 'text-success-700': 'text-gray-500'
              )}>
                {status}
              </h3>
             

           </article>

      )}
      />

     
     
     </ColumnsDirective>

     
       
     </GridComponent>
    </main>
  )
}

export default AllUsers