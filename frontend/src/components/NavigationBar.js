// src/NavigationBar.js
import React, { useState } from 'react';
import '../../src/NavigationBar.css';

const NavigationBar = () => {
  const [showVehicleDropdown, setShowVehicleDropdown] = useState(false);
  const [showAlertDropdown, setShowAlertDropdown] = useState(false);
  const [showTaskDropdown, setShowTaskDropdown] = useState(false);

  return (
    <div className="navbar">
      <div className="search-bar">
        {/* Your search bar code goes here */}
        <input type="text" placeholder="Search..." />
      </div>
      <div className="background-dropdown">
        {/* Vehicles Dropdown */}
        <div
          className="dropdown"
          onMouseEnter={() => setShowVehicleDropdown(true)}
          onMouseLeave={() => setShowVehicleDropdown(false)}
        >
          <span>Vehicles</span>
          {showVehicleDropdown && (
            <div className="dropdown-content">
              {/* Your vehicles dropdown items go here */}
              <p>Car</p>
              <p>Truck</p>
              <p>Motorcycle</p>
            </div>
          )}
        </div>
      </div>
      <div className="date-range">
        <label>Date Range:</label>
        <input type="date" />
        <span>to</span>
        <input type="date" />
      </div>
    </div>
  );
};

export default NavigationBar;
