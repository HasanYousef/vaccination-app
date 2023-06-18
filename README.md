# Vaccination App

This web application is developed as part of an assignment to help countries collect data from citizens for COVID-19 vaccination prioritization. The application utilizes AI tools like Chat GPT and consists of two main pages: Registration Page and Summary Page.

## Acknowledgments

This README file was generated using ChatGPT

## Registration Page

The Registration Page allows citizens to enter their information in a form. The following fields are included:

- First Name
- Last Name
- Date of Birth
- Address
- City (dropdown selection)
- Zip Code (optional)
- Landline
- Cellular Phone
- Checkbox for previous COVID-19 infection history
- Multi-check options for previous conditions (e.g., Diabetes, Cardio-Vascular problems, Allergies) with an "Other" field for additional conditions

## Summary Page

The Summary Page provides a tabular view of the existing registration information available in the system. Users can search for registrations based on the following criteria:

- Date of Birth (date range)
- City
  Additionally, the Summary Page includes the ability to export the table data into an Excel format.

## Technologies Used

The project utilizes the following technologies:

- Spring Boot API server
- PostgreSQL database
- React.js for the client-side development
- Bootstrap for styling the user interface

## Installation

To set up and run the project locally, follow these steps:

- Clone the repository: git clone [the repository](https://github.com/HasanYousef/vaccination-app.git)
- Set up the Spring Boot API server and ensure it is connected to the PostgreSQL database.
- Install the required dependencies for the React.js client-side by running npm install in the project root directory.
- Start the React.js development server by running npm start.
- Access the application in your web browser at [](http://localhost:3000).

Folder Structure
The project follows the following folder structure:

vaccination-app/
├── spring-api/ # Spring Boot API server
│ └── ... # Server-related files and folders
├── react-client/ # React.js client-side
└── README.md
