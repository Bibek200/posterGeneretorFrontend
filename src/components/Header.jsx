import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  ArrowLeftOnRectangleIcon,
  PhotoIcon,
  UsersIcon,
  CalendarIcon,
  CloudArrowUpIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold flex items-center gap-2 text-green-700 hover:scale-105 transform transition"
            >
              <PhotoIcon className="w-7 h-7 text-green-700" />
              Post Generator
            </Link>
          </div>

          {/* Toggle Button (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-green-700 hover:text-green-900 focus:outline-none transition"
            >
              {menuOpen ? (
                <XMarkIcon className="w-8 h-8" />
              ) : (
                <Bars3Icon className="w-8 h-8" />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`${
              menuOpen ? 'block' : 'hidden'
            } md:flex items-center space-x-0 md:space-x-8 mt-4 md:mt-0 absolute md:static top-16 left-0 w-full md:w-auto bg-white shadow-md md:shadow-none p-4 md:p-0 rounded-b-lg`}
          >
            <ul className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              {isAuthenticated && (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      className="flex items-center text-gray-700 hover:text-green-700 transition font-medium"
                    >
                      <Squares2X2Icon className="w-5 h-5 mr-1" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/posterList"
                      className="flex items-center text-gray-700 hover:text-green-700 transition font-medium"
                    >
                      <PhotoIcon className="w-5 h-5 mr-1" />
                      Posters
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/customersList"
                      className="flex items-center text-gray-700 hover:text-green-700 transition font-medium"
                    >
                      <UsersIcon className="w-5 h-5 mr-1" />
                      Customers List
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/customers"
                      className="flex items-center text-gray-700 hover:text-green-700 transition font-medium"
                    >
                      <UserPlusIcon className="w-5 h-5 mr-1" />
                      Add Customer
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/upload"
                      className="flex items-center text-gray-700 hover:text-green-700 transition font-medium"
                    >
                      <CloudArrowUpIcon className="w-5 h-5 mr-1" />
                      Upload Poster
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/schedule"
                      className="flex items-center text-gray-700 hover:text-green-700 transition font-medium"
                    >
                      <CalendarIcon className="w-5 h-5 mr-1" />
                      Schedule
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/scheduleList"
                      className="flex items-center text-gray-700 hover:text-green-700 transition font-medium"
                    >
                      <CalendarIcon className="w-5 h-5 mr-1" />
                      ScheduleList
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {/* Auth Buttons */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0 w-full md:w-auto">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="w-full md:w-auto px-4 py-2 text-sm bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition text-center flex items-center justify-center gap-1"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="w-full md:w-auto px-4 py-2 text-sm bg-green-100 text-green-700 border border-green-500 rounded-lg shadow hover:bg-green-200 transition mt-2 md:mt-0 text-center flex items-center justify-center gap-1"
                  >
                    <UserPlusIcon className="w-5 h-5" />
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full md:w-auto px-4 py-2 text-sm bg-red-100 text-red-700 border border-red-400 rounded-lg shadow hover:bg-red-200 transition mt-2 md:mt-0 text-center flex items-center justify-center gap-1"
                >
                  <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
