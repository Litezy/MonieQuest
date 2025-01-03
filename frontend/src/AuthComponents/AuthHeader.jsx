import React, { useEffect, useState } from 'react';
import logo from '../assets/images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { IoNotificationsSharp } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";

const AuthHeader = () => {
  const links = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Exchange', url: '/exchange' },
    { label: 'Profit Tools', url: '/profit_tools' },
    // { label: 'Blogs', url: '/auth_blogs' }
  ];

  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    if (active !== location.pathname) {
      setActive(location.pathname);
    }
  }, [location.pathname, active]);

  return (
    <div className="w-full py-1 bg-primary">
      <div className="w-11/12 mx-auto flex items-center justify-between">
        <div className="">
          <img src={logo} className="h-16" alt="moniequest-logo" />
        </div>
        <div className="flex items-center gap-5 text-white">
          {links.map((link, i) => {
            return (
              <Link
                key={i}
                to={link.url}
                onClick={() => setActive(link.url)}
                className={`${link.url === active ? 'border-b border-lightgreen' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/profile"
            className="flex items-center gap-2 bg-secondary py-1 px-5 rounded-md"
          >
            <div className="p-2 rounded-full flex items-center justify-center bg-white">
              <FaUserAlt className="text-lg" />
            </div>
            <div className="text-white font-bold">Litezy</div>
          </Link>
          <div className="relative">
            <IoNotificationsSharp className="text-2xl cursor-pointer text-white" />
            <div className="absolute w-2 h-2 rounded-full bg-red-500 top-1 right-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
