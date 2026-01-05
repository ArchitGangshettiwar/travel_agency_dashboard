import React from 'react';
import { Link, NavLink } from 'react-router';
import { sidebarItems } from '~/constants';
import { cn } from '~/lib/utils';

const NavItems = () => {
  const user = {
    name: "John Doe",
    email: 'placeholder@mail.test',
    imageUrl: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
  }
  return (
    <section className="nav-items">
      <Link to="/" className="link-logo">
        <img
          src="/assets/icons/logo.svg"
          alt="logo"
          className="size-[30px]"
        />
        <h1>Tourvisto</h1>
      </Link>

      <div className="container">
        <nav>
          {sidebarItems.map(({ id, href, icon, label }) => (
            <NavLink to={href} key={id}>
              {({ isActive }) => (
                <div
                  className={cn(
                    'group nav-item flex items-center gap-3 px-4 py-2 rounded-md transition-colors',
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                  )}
                >
                  <img
                    src={icon}
                    alt={label}
                    className="size-5"
                  />
                  <span className="font-medium">{label}</span>
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        <footer className='nav-footer'>
          <img src={user?.imageUrl || '/assets/images/david-goggins.jpg'} alt={user?.name || 'David'}  />

          <article>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </article>

          <button
          onClick={() => {
            console.log('Logout')
          } }

          className ="cursor-pointer"
          >
            <img src="/assets/icons/logout.svg" 
            alt="Logout" 
            className="size-6" 
            />

          </button>

        </footer>
      </div>
    </section>
  );
};

export default NavItems;
