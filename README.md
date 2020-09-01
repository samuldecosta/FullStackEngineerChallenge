# Feedo

Feedo is a Feedback portal to other employees where we have two different user journey.

# Live Demo : https://arcane-sierra-17516.herokuapp.com/

# 1. Admin Journey:

1. User Login
2. Dashboard: Admin can view and manage all employees here.
   a. Update Employee information.
   b. Remove Employee.
3. Feedback Page
   a. Give feedback to employee
   b. Request other employee to submit feedbsack for selected employee
4. Update profile

# 2. Non Admin Employee Journey

1. Dashboard: View all open feedback requests
   a. Reject review
   b. Go to review page
2. Feedback Submit page

# Major tech stack

- Mongo Db
- React JS
- Redux
- Redux-Thunk
- Express JS
- Node JS
- styled-component

# Feedo have following key features:

- Session management (JWT TOKEN)
- Single page application
- Server-side Validations
- Global alert system throughout the app
- Private routing
- Mobile friendly
- Theme object availabel throughout all component

### Installation

Feedo requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.

```sh
$ npm run add:dependencies
$ node dev
```

### Todos

- Write Tests
- Theme selector
- moving static data to some CMS

## License

MIT
