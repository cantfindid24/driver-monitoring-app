import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Navbar } from 'react-bootstrap';
import data from './data';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
// import { DateRangePicker } from 'react-date-range';

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
  useEffect(() => {}, []);
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  };
  const handleSelect = (date) => {
    console.log(date);
  };
  return (
    <div>
      <Container>
        <Navbar>
          <Form inline>
            <InputGroup className="my-3">
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
              />
            </InputGroup>
          </Form>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Vehicle
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {data.alerts.map((alert) => (
                <Dropdown.Item key={alert.id} href="#/action-1">
                  {alert.vehicle_friendly_name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form>
            <Form.Label>Date Range:</Form.Label>
            {/* <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
            /> */}
            <DateRangePicker
              localeText={{ start: 'Check-in', end: 'Check-out' }}
            />
          </Form>
        </Navbar>

        <Table striped bordered hover>
          <thead>
            <th>
              <h5>Alerts</h5>
            </th>
          </thead>
          <tbody>
            {data.alerts
              .filter((alert) => {
                const searchLowerCase = search.toLowerCase();
                return (
                  searchLowerCase === '' ||
                  alert.driver_friendly_name
                    .toLowerCase()
                    .includes(searchLowerCase) ||
                  alert.alert_type.toLowerCase().includes(searchLowerCase) ||
                  alert.vehicle_friendly_name
                    .toLowerCase()
                    .includes(searchLowerCase)
                );
              })
              .map((alert) => (
                <tr key={alert.id}>
                  <td>
                    <h6>
                      {alert.alert_type} {formatLocalTimestamp(alert.timestamp)}
                    </h6>
                    <p>
                      Driver:{alert.driver_friendly_name} /{' '}
                      {alert.vehicle_friendly_name}
                    </p>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default App;
