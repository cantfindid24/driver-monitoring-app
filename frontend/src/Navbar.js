import React from 'react';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { DateRangePicker } from 'react-date-range';

const CustomNavbar = ({
  onSearch,
  onVehicleNumberSearch,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Alert Viewer</Navbar.Brand>
      <Nav className="mr-auto">
        <Form inline>
          <FormControl
            type="text"
            placeholder="Free Text Search"
            className="mr-sm-2"
            onChange={(e) => onSearch(e.target.value)}
          />
        </Form>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search by Vehicle Number"
            className="mr-sm-2"
            onChange={(e) => onVehicleNumberSearch(e.target.value)}
          />
        </Form>
        <Form inline>
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={this.handleSelect}
          />
        </Form>
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;
