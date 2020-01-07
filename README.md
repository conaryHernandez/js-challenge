# Calendar

A cross-browser, time-management and scheduling calendar service.

## ✅ Required features 6/6.

## ✅ Bonus Features 3/3

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

- Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Yarn - [Download & Install Yarn](https://yarnpkg.com/en/docs/install#windows-stable) and the npm package manager.

### Installing

A step by step series of examples that tell you how to get a development env running

```
yarn install
yarn start
```

App starts running

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Running the tests

```
yarn test
```

## Deployment

Run **yarn build** in order to create a build folder with the compiled assets ready to deploy to your server.

```
yarn build
```

### Layout

Once your app is running you will see the Home page of the app.

<img src="/images/home.png" alt="Home Page">

You can add reminders for a specific date and also you can see your reminders per day by clicking in a specific day in the calendar.

When you click the "Add Reminder" button the following modal will appear. You can add a title to your reminder (max. 30 chars) and also pick a color, date, time and city.
The city can be selected from a Select Component which display a list of cities. A city can be searched by introducing the text in the input or selecting it from the given options.

All fields are required in order to create a reminder.

<img src="/images/reminder-modal.png" alt="Reminder Modal">

Once you create a reminder it will be displayed in the calendar as a miniature.

<img src="/images/reminder-card.png" alt="Reminder Card">

If you want to see your reminders per day you just need to click an specific day in the calendar and it will render the Reminders page of the app.

<img src="/images/reminders.png" alt="Reminders">

And you will see the forecast per city if is avaible for the selected date.

You can edit an existing reminder by clicking the "Edit" button. You can edit any field of the reminder any times you want.

<img src="/images/reminder-edit.png" alt="Edit Reminder">

If you there is no reminders in a specific date you will se the following message

<img src="/images/reminders-empty.png" alt="Empty Reminders">

## Built With

- [React](https://reactjs.org/) - The Web Framework.
- [Redux](https://react-redux.js.org/) - The Sate Management library.
- [Yarn](https://yarnpkg.com) - Dependency Management
- [Antd](https://rometools.github.io/rome/) - Used to create UI Elements
- [Formik](https://jaredpalmer.com/formik) - Used to create Form Elements

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Kyle Simpson
- Dan Abramov
