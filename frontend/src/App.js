import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Dropdown, Navbar, Row } from 'react-bootstrap';
import data from './data';

function formatLocalTimestamp(utcTimestamp) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const localTime = new Date(utcTimestamp).toLocaleString(undefined, options);
  return localTime;
}

function App() {
  const [search, setSearch] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [filteredAlerts, setFilteredAlerts] = useState(data.alerts);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [markedAsFalseAlarms, setMarkedAsFalseAlarms] = useState([]);

  useEffect(() => {
    const searchLowerCase = search.toLowerCase();

    // Filter alerts based on search term and selected vehicle
    const filteredData = data.alerts.filter(
      (alert) =>
        alert.driver_friendly_name.toLowerCase().includes(searchLowerCase) ||
        alert.alert_type.toLowerCase().includes(searchLowerCase) ||
        alert.vehicle_friendly_name.toLowerCase().includes(searchLowerCase)
    );
    // Apply date range filter
    const filteredByDateRange = filteredData.filter((alert) => {
      if (startDate && endDate) {
        const alertDate = new Date(alert.timestamp);
        return (
          alertDate >= new Date(startDate) && alertDate <= new Date(endDate)
        );
      }
      return true;
    });
    if (selectedVehicle) {
      // If a vehicle is selected, further filter by vehicle friendly name
      setFilteredAlerts(
        filteredByDateRange.filter(
          (alert) => alert.vehicle_friendly_name === selectedVehicle
        )
      );
    } else {
      // If no vehicle is selected, use the entire filtered data
      setFilteredAlerts(filteredByDateRange);
    }
  }, [search, selectedVehicle, startDate, endDate]);

  // Get unique vehicle friendly names for dropdown options
  const vehicleFriendlyNames = [
    ...new Set(data.alerts.map((alert) => alert.vehicle_friendly_name)),
  ];

  const handleRemoveSelectedVehicle = () => {
    setFilteredAlerts(data.alerts);
    setSelectedVehicle(null);
    setMarkedAsFalseAlarms([]);
    setSearch('');
    setStartDate('');
    setEndDate('');
  };

  const handleMarkAsFalseAlarm = (alert) => {
    setMarkedAsFalseAlarms((prevMarkedAsFalseAlarms) => [
      ...prevMarkedAsFalseAlarms,
      alert,
    ]);
  };

  const isMarkedAsFalseAlarm = (alert) => {
    return markedAsFalseAlarms.includes(alert);
  };

  const isButtonDisabled = (alert) => {
    return isMarkedAsFalseAlarm(alert);
  };

  const getButtonVariant = (alert) => {
    return isMarkedAsFalseAlarm(alert) ? 'secondary' : 'none outline-secondary';
  };

  const getButtonText = (alert) => {
    return isMarkedAsFalseAlarm(alert)
      ? 'Marked as False Alarm'
      : 'Mark As False Alarm';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Container className="mt-3">
        <Navbar bg="light" expand="md">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form onSubmit={handleSubmit}>
              <InputGroup className="my-3">
                <Form.Control
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                />
              </InputGroup>
            </Form>
            <Dropdown
              className="mx-4 dropdown"
              onSelect={(eventKey) => setSelectedVehicle(eventKey)}
            >
              <Dropdown.Toggle
                as="div"
                variant="none"
                className="ml-2 oulineBorder"
              >
                Vehicle #{' '}
                <Button variant="none" onClick={handleRemoveSelectedVehicle}>
                  {'  '}X{'  '}
                </Button>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {vehicleFriendlyNames.map((friendlyName) => (
                  <Dropdown.Item key={friendlyName} eventKey={friendlyName}>
                    {friendlyName}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
              <span></span>
            </Dropdown>

            <Form onSubmit={handleSubmit}>
              <Form.Label>Date Range:</Form.Label>

              <InputGroup className="mb-3">
                <Form.Control
                  type="date"
                  placeholder="Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <InputGroup.Text>-</InputGroup.Text>
                <Form.Control
                  type="date"
                  placeholder="End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </InputGroup>
            </Form>
          </Navbar.Collapse>
        </Navbar>

        <Table>
          <thead>
            <tr>
              <th>
                <h5>Alerts</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.map((alert) => (
              <tr key={alert.id}>
                <td className="alertCard">
                  <Row>
                    <Col md={8}>
                      <p>
                        <span className="alert-type">
                          <b>{alert.alert_type}</b>
                        </span>{' '}
                        <span className="alert-date time">
                          <i className="fa-solid fa-circle"></i>{' '}
                          {formatLocalTimestamp(alert.timestamp)}
                        </span>
                      </p>
                      <p>
                        <span style={{ fontSize: 'small' }}>
                          {'  '}
                          {alert.driver_friendly_name} /{' '}
                          {alert.vehicle_friendly_name}
                        </span>
                      </p>
                    </Col>
                    <Col md={4} className="alarm">
                      <Button
                        variant={getButtonVariant(alert)}
                        size="sm"
                        className="oulineBorder"
                        onClick={() => handleMarkAsFalseAlarm(alert)}
                        disabled={isButtonDisabled(alert)}
                      >
                        <i className="fa-solid fa-bell-slash"></i>
                        {'    '}
                        {getButtonText(alert)}
                      </Button>
                    </Col>
                  </Row>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <footer className="footer">
        Copyright ©️ <u>enview.ai</u> 2023
      </footer>
    </div>
  );
}

export default App;
