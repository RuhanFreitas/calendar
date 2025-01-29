# Calendar

## Description
This project is a simple and interactive **Calendar** built with React. The component allows users to view a calendar, navigate between months, select dates, and manage events. 

Users can add, edit, and delete events while specifying event times and descriptions. The component ensures ease of use and a clean, responsive design.

---

## Features
- Display a calendar for the current month and year.
- Navigate between months.
- Highlight the current day.
- Add events with a specific time and description.
- Edit existing events.
- Delete unwanted events.
- Prevent selection of past dates.

---

## How to Use

1. **Navigate through the Calendar**
   - Use the left (`<`) and right (`>`) arrow buttons to switch between months.

2. **Add an Event**
   - Click on a day to open the event popup.
   - Enter the time and description for your event.
   - Click the "Add Event" button to save it.

3. **Edit an Event**
   - Click the edit icon (`✎`) next to an event.
   - Modify the time or description in the popup.
   - Click "Update Event" to save changes.

4. **Delete an Event**
   - Click the delete icon (`🗙`) next to an event to remove it.

---

## Technologies Used

- **React**: For building the user interface.
- **JavaScript**: For logic and state management.
- **CSS**: For styling the component.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/calendar-component.git
   ```

2. Navigate to the project directory:
   ```bash
   cd calendar-component
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the application:
   ```bash
   npm start
   ```

5. Open your browser and go to `http://localhost:3000`.

---

## Folder Structure

```
calendar-component/
├── src/
│   ├── components/
│   │   └── Calendar.js
│   ├── styles/
│   │   └── Calendar.css
│   ├── App.js
│   └── index.js
├── public/
├── package.json
└── README.md
```

---

## Key Functions

- **prevMonth() / nextMonth()**: Navigate to the previous or next month.
- **handleDayClick(day)**: Handle date selection and open the event popup.
- **handleEventSubmit()**: Add or update an event.
- **handleEditEvent(event)**: Edit an existing event.
- **handleDeleteEvent(eventId)**: Delete an event by its ID.
- **handleTimeChange(e)**: Manage input for event time.

---

## License

This project is licensed under the [MIT License](LICENSE).

---
