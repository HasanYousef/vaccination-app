import React, { useState, useEffect } from "react";
import axios from "axios";

const SummaryPage = () => {
  const [registrationData, setRegistrationData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchDateOfBirth, setSearchDateOfBirth] = useState("");
  const [searchCity, setSearchCity] = useState("");

  useEffect(() => {
    // Fetch registration data from the backend API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/registrations");
        setRegistrationData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Apply search filters based on Date of Birth and City
    const filteredResults = registrationData.filter((data) => {
      const matchesDateOfBirth =
        !searchDateOfBirth || data.dateOfBirth.includes(searchDateOfBirth);
      const matchesCity = !searchCity || data.city === searchCity;

      return matchesDateOfBirth && matchesCity;
    });

    setFilteredData(filteredResults);
  }, [searchDateOfBirth, searchCity, registrationData]);

  return (
    <div>
      <h2>Registration Summary</h2>
      <div>
        <label>
          Search by Date of Birth:
          <input
            type="text"
            value={searchDateOfBirth}
            onChange={(event) => setSearchDateOfBirth(event.target.value)}
          />
        </label>
        <label>
          Search by City:
          <input
            type="text"
            value={searchCity}
            onChange={(event) => setSearchCity(event.target.value)}
          />
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>City</th>
            <th>Zip Code</th>
            <th>Landline</th>
            <th>Cellular Phone</th>
            <th>COVID-19 History</th>
            <th>Previous Conditions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data) => (
            <tr key={data.id}>
              <td>{data.firstName}</td>
              <td>{data.lastName}</td>
              <td>{data.dateOfBirth}</td>
              <td>{data.address}</td>
              <td>{data.city}</td>
              <td>{data.zipCode}</td>
              <td>{data.landline}</td>
              <td>{data.cellphone}</td>
              <td>{data.hasCovidHistory ? "Yes" : "No"}</td>
              <td>{data.conditions.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryPage;
