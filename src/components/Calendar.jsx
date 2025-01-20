import { useState } from "react"

const Calendar = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] // keep days of week
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] // keep months
    const currentDate = new Date()

    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())
    const [selectedDate, setSelectedDate] = useState(currentDate)
    const [showEventPopUp, setShowEventPopUp] = useState(false)
    const [events, setEvents] = useState([])
    const [eventTime, setEventTime] = useState({ hours: '00', minutes: '00' })
    const [eventText, setEventText] = useState('')
    const [editingEvent, setEditingEvent] = useState(null)

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstyDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    const prevMonth = () => {
        setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))
        setCurrentYear((prev) => currentMonth === 0 ? prev - 1 : prev)
    }

    const nextMonth = () => {
        setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))
        setCurrentYear((prev) => currentMonth === 11 ? prev + 1 : prev)
    }

    const handleDayClick = (day) => {
        const clickedDate = new Date(currentYear, currentMonth, day)
        const today = new Date()

        if (clickedDate >= today || isSameDay(clickedDate, today)) {
            setSelectedDate(clickedDate)
            setShowEventPopUp(true)
            setEventTime({ hours: '00', minutes: '00' })
            setEventText('')
            setEditingEvent(null)
        }
    }

    const isSameDay = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        )
    }

    const handleEventSubmit = () => {
        const newEvent = {
            id: editingEvent ? editingEvent.id : Date.now(),
            date: selectedDate,
            time: `${eventTime.hours.padStart(2, '0')}:${eventTime.minutes.padStart(2, '0')}`,
            text: eventText
        }

        let updatedEvents = [...events]

        if (editingEvent) {
            updatedEvents = updatedEvents.map((event) => event.id === editingEvent.id ? newEvent : event)
        } else {
            updatedEvents.push(newEvent)
        }

        updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date))

        setEvents([...events, newEvent])
        setEventTime({ hours: '00', minutes: '00' })
        setShowEventPopUp(false)
        setEditingEvent(null)
    }

    const handleEditEvent = (event) => {
        setSelectedDate(new Date(event.date))
        setEventTime({
            hours: event.time.split(':')[0],
            minutes: event.time.split(':')[1]
        })
        setEventText(event.text)
        setEditingEvent(event)
        setShowEventPopUp(true)
    }

    const handleDeleteEvent = (eventId) => {
        const updatedEvents = events.filter((event) => event.id !== eventId)
        setEvents(updatedEvents)
    }

    const handleTimeChange = (e) => {
        const { name, value } = e.target

        setEventTime((prev) => ({ ...prev, [name]: value.padStart(2, '0') }))
    }

    const handleFocus = (e) => {
        if (e.target.value === '00') {
            e.target.value = '';
        }
    }

    const handleBlur = (e) => {
        if (e.target.value === '') {
            e.target.value = '00';
        }
    }

    return (
        <div className="calendar-container">
            <div className="calendar">
                <h1 className="heading">
                    Calendar
                </h1>
                <div className="navigate-date">
                    <h2 className="month">{monthsOfYear[currentMonth]},</h2>
                    <h2 className="year">{currentYear}</h2>
                    <div className="buttons">
                        <i className="bx bx-chevron-left" onClick={prevMonth}></i>
                        <i className="bx bx-chevron-right" onClick={nextMonth}></i>
                    </div>
                </div>
                <div className="weekdays">
                    {daysOfWeek.map((day) => <span key={day}>{day}</span>)}
                </div>
                <div className="days">
                    {[...Array(firstyDayOfMonth).keys()].map((_, index) => <span key={`empty-${index}`} />)}
                    {[...Array(daysInMonth).keys()].map((day) => <span onClick={() => handleDayClick(day + 1)} key={day + 1} className={day + 1 === currentDate.getDate()
                        && currentMonth === currentDate.getMonth()
                        && currentYear === currentDate.getFullYear() ? 'current-day' : ''}>{day + 1}</span>)}
                </div>
            </div>
            <div className="events">
                {showEventPopUp && <div className="event-popup">
                    <div className="time-input">
                        <div className="event-popup-time">Time</div>
                        <input type="number" name="hours" min={0} max={24} className="hours" value={eventTime.hours} onFocus={handleFocus} onBlur={handleBlur} onChange={handleTimeChange} />
                        <input type="number" name="minutes" min={0} max={60} className="minutes" value={eventTime.minutes} onFocus={handleFocus} onBlur={handleBlur} onChange={handleTimeChange} />
                    </div>
                    <textarea placeholder="Enter Event (Maximum 60 Characters)" value={eventText} onChange={(e) => { if (e.target.value.length <= 60) { setEventText(e.target.value) } }}></textarea>
                    <button className="event-popup-btn" onClick={handleEventSubmit} >
                        {editingEvent ? 'Update Event' : 'Add Event'}
                    </button>
                    <button onClick={() => setShowEventPopUp(false)} className="close-event-popup">
                        <i className="bx bx-x"></i>
                    </button>
                </div>}
                {events.map((event, index) => (
                    <div className="event" key={index}>
                        <div className="event-date-wrapper">
                            <div className="event-date">{`${monthsOfYear[event.date.getMonth()]} ${event.date.getDate()}, ${event.date.getFullYear()}`}</div>
                            <div className="event-time">{event.time}</div>
                        </div>
                        <div className="event-text">
                            {event.text}
                        </div>
                        <div className="event-buttons">
                            <i className="bx bxs-edit-alt" onClick={() => handleEditEvent(event)}></i>
                            <i className="bx bxs-message-alt-x" onClick={() => handleDeleteEvent(event.id)}></i>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Calendar
