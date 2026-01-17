import React from 'react'
import { Outlet } from 'react-router'
import {SidebarComponent} from "@syncfusion/ej2-react-navigations"
import NavItems from 'components/NavItems'
import { MobileSidebar } from 'components/Index'
import { account } from '~/appwrite/client';
import { redirect } from 'react-router';
import { getExistingUser, storeUserData } from '~/appwrite/auth';

export async function clientLoader() {
    try {
        const user = await account.get();
        if (!user.$id) return redirect('/sign-in');

        const existingUser = await getExistingUser(user.$id);
        if (existingUser?.status === 'user'){
          return redirect('/');
        }

        return existingUser?.$id ? existingUser :await storeUserData();


    } catch (error) {
        console.log('error in clientLoader', error);
        return redirect('/sign-in');
    }
    
}

const AdminLayout = () => {
  return (
    <div className='admin-layout'>
        <MobileSidebar />
        <aside className="w-full max-w-[270px] hidden
        lg:block">
          <SidebarComponent width="270px" enableGestures={false} >
            <NavItems />
          </SidebarComponent>
        </aside>

        <aside className='children'>
           <Outlet />
        </aside>
        </div>
  )
}

export default AdminLayout