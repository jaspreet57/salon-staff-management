# salon-staff-management
Demo react application for learning and assignment purpose

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Instructions on how to run the application

1. Clone project : `git clone https://github.com/jaspreet57/salon-staff-management.git` OR using SSH `git clone git@github.com:jaspreet57/salon-staff-management.git`
2. Move to the project: `cd salon-staff-management`
3. Install packages: `npm install`
4. Install json-server: `npm install -g json-server` 
5. Start json-server: `json-server -p 3001 -w db.json`
6. Open another terminal in same project
7. And run `npm start`
8. Go to browser with link `http://localhost:3000` (note port number in your local running app)
9. Login with any randon name (Authentication is not in scope of project)
10. And that is it !


## App Desgin - UI/UX

1. I used material design for fast development. It provides well tested and accessible components for all our requirements.
2. For displaying list of appointments, I used calendar view instead of list view. This will help user to identify working hours and availability of the staff. Package used is : `@aldabil/react-scheduler`. This page can also be used to create and edit appointments. Clicking on any available area, you can create appointment.
3. I used json-server for backend development. Use of APIs in application is configured in such a way, that it is very easy to switch from json-server to another real server. You just need to change Base path URL in .env file.
4. **IMPORTANT** - I have put all the validation logic in API call - inside `/src/api/appointments.ts` file. As this is backend job to validate if appointment can be booked or not, this logic should not be written withing react component. Component should capture details and post them and display error if any.


## Tools and packages used :

1. `@aldabil/react-scheduler` for calendar view.
2. `react-router-dom` for routing between pages.
3. `@reduxjs/toolkit` for managing data store. It helps in create Actions and Reducers easily.
4. `@mui/material` for UI design
5. `@mui/x-date-pickers` for date inputs. - this make it easy to select date and time fields.
6. `axios` for calling REST APIs.
7. `uuid` for creating unique IDs.
8. `VS Code` for development and running application.
9. `git` and `github` for managing code versions and hosting code as a public repository.
