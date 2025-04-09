import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold">Course Management</div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/courses" 
                  className={({ isActive }) => 
                    isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
                  }
                >
                  Courses
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/categories" 
                  className={({ isActive }) => 
                    isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
                  }
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/tags" 
                  className={({ isActive }) => 
                    isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
                  }
                >
                  Tags
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/stats" 
                  className={({ isActive }) => 
                    isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
                  }
                >
                  Stats
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;