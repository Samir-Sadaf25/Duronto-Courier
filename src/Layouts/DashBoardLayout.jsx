import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import {
  FiMenu,
  FiHome,
  FiPackage,
  FiUsers,
  FiLogOut,
} from 'react-icons/fi';

export default function DashBoardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', to: '/', icon: <FiHome /> },
    { name: 'Bookings', to: '/dashboard/bookings', icon: <FiPackage /> },
    { name: 'Parcels', to: '/dashboard/parcels', icon: <FiPackage /> },
    { name: 'Users', to: '/dashboard/users', icon: <FiUsers /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-20 w-64 bg-white shadow-lg transform
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-300 md:translate-x-0 md:static
        `}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map(({ name, to, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded
                 ${isActive ? 'bg-green-200 text-green-800' : 'hover:bg-gray-200'}`
              }
              onClick={() => setIsOpen(false)}
            >
              {icon}
              <span>{name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:pl-64">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow px-4 h-16">
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(true)}
          >
            <FiMenu />
          </button>
          <h1 className="text-xl font-medium">Welcome, User</h1>
          <button className="flex items-center gap-1 text-gray-600 hover:text-red-500">
            <FiLogOut />
            <span>Log Out</span>
          </button>
        </header>

        {/* Optional Static Summary */}
        <section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm text-gray-500">Total Bookings</h3>
            <p className="mt-1 text-2xl font-bold">0</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm text-gray-500">Pending Parcels</h3>
            <p className="mt-1 text-2xl font-bold">0</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm text-gray-500">Delivered</h3>
            <p className="mt-1 text-2xl font-bold">0</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm text-gray-500">Users</h3>
            <p className="mt-1 text-2xl font-bold">0</p>
          </div>
        </section>

        {/* Nested Routes */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
