import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const SummaryPage = () => {
  const [registrationData, setRegistrationData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchDates, setSearchDates] = useState({
    startDate: "",
    endDate: "",
  });
  const [searchCity, setSearchCity] = useState("");

  useEffect(() => {
    // Fetch registration data from the backend API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/registrations"
        );
        console.log(response);
        setRegistrationData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Apply search filter based on City
    let filteredResults = registrationData.filter((data) => {
      const matchesCity =
        !searchCity ||
        data.city.toLowerCase().includes(searchCity.toLowerCase());

      return matchesCity;
    });
    if (searchDates.startDate || searchDates.endDate) {
      filteredResults = performSearch();
    }

    setFilteredData(filteredResults);
  }, [searchCity, searchDates, registrationData]);

  const handleDateChange = (event) => {
    const { name, value } = event.target;

    setSearchDates((prevDates) => ({
      ...prevDates,
      [name]: value,
    }));
  };

  const performSearch = () => {
    const filteredRegistrations = registrationData.filter((registration) => {
      const { startDate, endDate } = searchDates;
      const registrationDate = new Date(registration.dateOfBirth);

      // Check if the registration date falls within the selected date range
      if (startDate && endDate) {
        return (
          registrationDate >= new Date(startDate) &&
          registrationDate <= new Date(endDate)
        );
      } else if (startDate) {
        return registrationDate >= new Date(startDate);
      } else if (endDate) {
        return registrationDate <= new Date(endDate);
      }

      return true; // No date range selected, return all registrations
    });

    console.log(filteredRegistrations); // Filtered registrations based on date range
    return filteredRegistrations;
  };

  function exportToExcel(registrations) {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Create a new worksheet
    const worksheet = XLSX.utils.json_to_sheet(registrations);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

    // Generate a unique filename
    const fileName = "registrations_" + new Date().getTime() + ".xlsx";

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, fileName);
  }

  const handleExport = () => {
    exportToExcel(registrationData);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Registration Summary</h2>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="row">
            <div className="col-md-6">
              <label>
                Start Date:
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={searchDates.startDate}
                  onChange={handleDateChange}
                />
              </label>
            </div>

            <div className="col-md-6">
              <label>
                End Date:
                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  value={searchDates.endDate}
                  onChange={handleDateChange}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="searchCity" className="form-label">
            Search by City:
          </label>
          <input
            type="text"
            className="form-control"
            id="searchCity"
            value={searchCity}
            onChange={(event) => setSearchCity(event.target.value)}
          />
        </div>
      </div>
      <button className="btn btn-primary mb-3" onClick={handleExport}>
        Export to Excel
      </button>
      <table className="table">
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
