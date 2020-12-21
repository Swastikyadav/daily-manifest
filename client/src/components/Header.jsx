import React from "react";
import { NavLink } from "react-router-dom";
import { Tooltip } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

function Header({ handleLogout }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 block sm:flex sm:justify-between">
        <div>
          <NavLink to="/manifests" activeClassName="text-blue-400" isActive={() => window.location.pathname === "/manifests"} className="pb-4 px-2 text-base leading-6 font-normal text-gray-900">
            Manifests
          </NavLink>
          <NavLink to="/manifests/new" activeClassName="text-blue-400" className="pb-4 px-2 text-base leading-6 font-normal text-gray-900">
            {"Create New Manifest"}
          </NavLink>
          <NavLink to="/dm-guide" activeClassName="text-blue-400" className="pb-4 px-2 text-base leading-6 font-normal text-gray-900">
            How to's
          </NavLink>
        </div>
        <div>
          <Tooltip title="Logout">
            <LogoutOutlined className="text-xl ml-4 cursor-pointer" onClick={handleLogout} />
          </Tooltip>
        </div>
      </div>
    </header>
  );
}

export default Header;