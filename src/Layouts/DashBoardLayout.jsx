import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import {
  FiMenu,
  FiHome,
  FiPackage,
  FiUsers,
  FiLogOut,
} from 'react-icons/fi';
import { FaHistory } from 'react-icons/fa';
import { GrStatusGood } from 'react-icons/gr';
import { MdPendingActions } from 'react-icons/md';
import useUserInfo from '../Hooks/useUserInfo';

export default function DashBoardLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo, loading } = useUserInfo();

  if (loading) {
    return <div className="p-4 text-center">Loading…</div>;
  }

  // full nav config with allowed roles
  const navConfig = [
    { name: "Home", to: "/", icon: <FiHome />, roles: ["user","rider","admin"] },
    { name: "Bookings", to: "/dashboard", icon: <FiPackage />, roles: ["user","rider","admin"] },
    { name: "Payments", to: "/dashboard/payments", icon: <FaHistory />, roles: ["user","rider","admin"] },
    { name: "Be A Rider", to: "/dashboard/become-rider", icon: <MdPendingActions />, roles: ["user"] },
    { name: "Assigned Parcels", to: "/dashboard/assigned-parcels", icon: <GrStatusGood />, roles: ["rider"] },
    { name: "Pending Riders", to: "/dashboard/pendingRiders", icon: <MdPendingActions />, roles: ["admin"] },
    { name: "Active Riders", to: "/dashboard/activeRiders", icon: <GrStatusGood />, roles: ["admin"] },
    { name: "Admin Home", to: "/dashboard/admin", icon: <FiHome />, roles: ["admin"] },
  ];

  // filter by the current user’s role
  const navItems = navConfig.filter(item => item.roles.includes(userInfo.role));

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
          <button className="md:hidden text-2xl" onClick={() => setIsOpen(false)}>
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
          <button className="md:hidden text-2xl" onClick={() => setIsOpen(true)}>
            <FiMenu />
          </button>
          <h1 className="text-xl font-medium">Welcome, {userInfo.name}</h1>
          <button className="flex items-center gap-1 text-gray-600 hover:text-red-500">
            <FiLogOut />
            <span>Log Out</span>
          </button>
        </header>

        {/* Nested Routes */}
        <main className="flex-1 bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}