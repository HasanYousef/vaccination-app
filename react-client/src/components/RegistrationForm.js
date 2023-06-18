import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    city: "",
    zipCode: "",
    landline: "",
    cellphone: "",
    hasCovidHistory: false,
    conditions: [],
    otherConditions: "",
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleConditionsChange = (event) => {
    const { value, checked } = event.target;

    setFormData((prevData) => {
      let conditions = [...prevData.conditions];

      if (checked) {
        conditions.push(value);
      } else {
        conditions = conditions.filter((condition) => condition !== value);
      }

      return {
        ...prevData,
        conditions,
      };
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send the form data to the server endpoint using Axios
      const response = await axios.post(
        "http://localhost:8080/api/registrations",
        formData
      );
      navigate("/summary");
      console.log(response.data); // Optional: Handle the server response
    } catch (error) {
      console.error(error); // Optional: Handle the error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2>Registration Form</h2>
      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">City:</label>
        <select
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          required
          className="form-control"
        >
          <option value="">Select a city</option>
          <option value="City 1">City 1</option>
          <option value="City 2">City 2</option>
          <option value="City 3">City 3</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="zipCode">Zip Code:</label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="landline">Landline:</label>
        <input
          type="tel"
          id="landline"
          name="landline"
          value={formData.landline}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="cellphone">Cellular Phone:</label>
        <input
          type="tel"
          id="cellphone"
          name="cellphone"
          value={formData.cellphone}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>

      <div className="form-group form-check">
        <input
          type="checkbox"
          id="hasCovidHistory"
          name="hasCovidHistory"
          checked={formData.hasCovidHistory}
          onChange={handleInputChange}
          className="form-check-input"
        />
        <label htmlFor="hasCovidHistory" className="form-check-label">
          Have you been infected by COVID-19 before?
        </label>
      </div>

      <fieldset className="form-group">
        <legend>Previous Conditions:</legend>
        <div className="form-check">
          <input
            type="checkbox"
            id="diabetes"
            name="conditions"
            value="Diabetes"
            checked={formData.conditions.includes("Diabetes")}
            onChange={handleConditionsChange}
            className="form-check-input"
          />
          <label htmlFor="diabetes" className="form-check-label">
            Diabetes
          </label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            id="cardiovascular"
            name="conditions"
            value="Cardio-Vascular problems"
            checked={formData.conditions.includes("Cardio-Vascular problems")}
            onChange={handleConditionsChange}
            className="form-check-input"
          />
          <label htmlFor="cardiovascular" className="form-check-label">
            Cardio-Vascular problems
          </label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            id="allergies"
            name="conditions"
            value="Allergies"
            checked={formData.conditions.includes("Allergies")}
            onChange={handleConditionsChange}
            className="form-check-input"
          />
          <label htmlFor="allergies" className="form-check-label">
            Allergies
          </label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            id="otherConditions"
            name="conditions"
            value="Other"
            checked={formData.conditions.includes("Other")}
            onChange={handleConditionsChange}
            className="form-check-input"
          />
          <label htmlFor="otherConditions" className="form-check-label">
            Other
          </label>
        </div>

        {formData.conditions.includes("Other") && (
          <div className="form-group">
            <label htmlFor="otherConditions">Other Conditions:</label>
            <input
              type="text"
              id="otherConditions"
              name="otherConditions"
              value={formData.otherConditions}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
        )}
      </fieldset>

      <button type="submit" className="btn btn-primary mt-3">
        Submit
      </button>
    </form>
  );
};

export default RegistrationForm;
