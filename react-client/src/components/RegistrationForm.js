import React, { useState } from "react";
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
    conditions: [
      /* array of strings */
    ],
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send the form data to the server endpoint using Axios
      const response = await axios.post(
        "http://localhost:8080/api/registrations",
        formData
      );
      console.log(response.data); // Optional: Handle the server response
    } catch (error) {
      console.error(error); // Optional: Handle the error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Date of Birth:
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        City:
        <select
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a city</option>
          <option value="City 1">City 1</option>
          <option value="City 2">City 2</option>
          <option value="City 3">City 3</option>
        </select>
      </label>

      <label>
        Zip Code:
        <input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Landline:
        <input
          type="tel"
          name="landline"
          value={formData.landline}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Cellular Phone:
        <input
          type="tel"
          name="cellphone"
          value={formData.cellphone}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Have you been infected by COVID-19 before?
        <input
          type="checkbox"
          name="hasCovidHistory"
          checked={formData.hasCovidHistory}
          onChange={handleInputChange}
        />
      </label>

      <fieldset>
        <legend>Previous Conditions:</legend>
        <label>
          <input
            type="checkbox"
            name="conditions"
            value="Diabetes"
            checked={formData.conditions.includes("Diabetes")}
            onChange={handleConditionsChange}
          />
          Diabetes
        </label>

        <label>
          <input
            type="checkbox"
            name="conditions"
            value="Cardio-Vascular problems"
            checked={formData.conditions.includes("Cardio-Vascular problems")}
            onChange={handleConditionsChange}
          />
          Cardio-Vascular problems
        </label>

        <label>
          <input
            type="checkbox"
            name="conditions"
            value="Allergies"
            checked={formData.conditions.includes("Allergies")}
            onChange={handleConditionsChange}
          />
          Allergies
        </label>

        <label>
          <input
            type="checkbox"
            name="conditions"
            value="Other"
            checked={formData.conditions.includes("Other")}
            onChange={handleConditionsChange}
          />
          Other
        </label>

        {formData.conditions.includes("Other") && (
          <label>
            Other Conditions:
            <input
              type="text"
              name="otherConditions"
              value={formData.otherConditions}
              onChange={handleInputChange}
            />
          </label>
        )}
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
};

export default RegistrationForm;
