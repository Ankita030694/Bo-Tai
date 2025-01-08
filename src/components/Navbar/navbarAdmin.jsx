import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.svg'
import { Link, useNavigate } from 'react-router-dom';
const AdminNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navi = useNavigate();

  const navItems = [
    { name: "CONTACT", path: "/admin/contact" },
    { name: "RESERVATION", path: "/admin/reservation" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const logOut = () => {
    // Implement logout logic here
    navi('/login');
    console.log('Logged out');
  };
  return (
    <div className="relative">
      {/* Main AdminNavbar */}
      <nav className={`fixed h-28 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-brown shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
          

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isScrolled ? 'text-orange-100 hover:text-gray-600' : 'text-brown-100 font-medium hover:text-orange-100'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
  {/* Logo */}
  <div className="flex">
              <img
                src={logo}
                alt="Logo"
                className="w-28 h-28"
              />
            </div>
            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
            <Link to={'/admin/add/outlet'} className="px-4 py-2 bg-orange-200 text-brown-200 font-medium rounded-lg hover:bg-blue-700">
                Outlets
              </Link>
              <button onClick={logOut} className="px-4 py-2 bg-orange-200 text-brown-200 font-medium rounded-lg hover:bg-blue-700">
                Logout
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isSidebarOpen ? (
                <span className="text-xl">✖</span>
              ) : (
                <span className="text-xl">☰</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleSidebar}></div>
        <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl flex flex-col">
          <div className="flex-1 pt-20 px-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="block py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={toggleSidebar}
              >
                {item.name}
              </a>
            ))}
            <div className="mt-6 space-y-4">
              <button onClick={logOut} className="w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-lg">
                Logout
              </button>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;