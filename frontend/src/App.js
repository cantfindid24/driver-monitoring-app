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
  // const [dateRange, setDateRange] = useState('');
  const [falseAlarms, setFalseAlarms] = useState([]);

  useEffect(() => {
    const searchLowerCase = search.toLowerCase();

    // Filter alerts based on search term and selected vehicle
    const filteredData = data.alerts.filter(
      (alert) =>
        alert.driver_friendly_name.toLowerCase().includes(searchLowerCase) ||
        alert.alert_type.toLowerCase().includes(searchLowerCase) ||
        alert.vehicle_friendly_name.toLowerCase().includes(searchLowerCase)
    );

    if (selectedVehicle) {
      // If a vehicle is selected, further filter by vehicle friendly name
      setFilteredAlerts(
        filteredData.filter(
          (alert) => alert.vehicle_friendly_name === selectedVehicle
        )
      );
    } else {
      // If no vehicle is selected, use the entire filtered data
      setFilteredAlerts(filteredData);
    }
  }, [search, selectedVehicle]);

  // Get unique vehicle friendly names for dropdown options
  const vehicleFriendlyNames = [
    ...new Set(data.alerts.map((alert) => alert.vehicle_friendly_name)),
  ];
  const handleRemoveSelectedVehicle = () => {
    setFilteredAlerts(data.alerts);
    setSelectedVehicle(null);
    setFalseAlarms([]);
    setSearch('');
  };
  const handleMarkAsFalseAlarm = (alert) => {
    setFalseAlarms((prevFalseAlarms) => [...prevFalseAlarms, alert]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <Container>
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
                          <i class="fa-solid fa-circle"></i>{' '}
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
                      <Button variant="none" size="sm" className="oulineBorder">
                        <i className="fa-solid fa-bell-slash"></i>
                        {'    '}Mark As False Alarm
                      </Button>
                    </Col>
                  </Row>
                </td>
              </tr>
            ))}

            {/* {filteredAlerts.map(
              (alert) =>
                // Check if the alert is not in the falseAlarms state
                !falseAlarms.includes(alert) && (
                  <tr key={alert.id}>
                    <td className="alertCard">
                      <Row>
                        <Col md={8}>
                          <p>
                            <span className="alert-type">
                              <b>{alert.alert_type}</b>
                            </span>{' '}
                            <span className="alert-date time">
                              <i class="fa-solid fa-circle"></i>{' '}
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
                            variant="none"
                            size="sm"
                            className="oulineBorder"
                            onClick={() => handleMarkAsFalseAlarm(alert)}
                          >
                            <i className="fa-solid fa-bell-slash"></i>
                            {'    '}Mark As False Alarm
                          </Button>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                )
            )} */}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default App;
