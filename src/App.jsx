import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AddFood from "./pages/AddFoods/AddFood";
import ListFood from "./pages/ListFood/ListFood";
import Orders from "./pages/Orders/Orders";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  const[sidebarOn,setSideBar]=useState(true)
  const toggleSidebar=()=>{
    setSideBar(!sidebarOn)
  }
  return (
    <div>
      <div className="d-flex" id="wrapper">
        <Sidebar sidebarOn={sidebarOn}/>
        <div id="page-content-wrapper">
          <Navbar toggleSidebar={toggleSidebar}/>
          <div className="container-fluid">
            <Routes>
              <Route path="/add" element={<AddFood />} />
              <Route path="/list" element={<ListFood />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/" element={<ListFood />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
