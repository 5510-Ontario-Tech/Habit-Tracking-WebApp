const calendarDays = document.getElementById('calendar-days');
const monthYear = document.getElementById('month-year');
const prevMonth = document.getElementById('prev-month');
const nextMonth = document.getElementById('next-month');

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function renderCalendar(month, year) {
    calendarDays.innerHTML = '';
    monthYear.textContent = `${months[month]} ${year}`;

    // first day of the month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    for (let i = firstDay - 1; i >= 0; i--) {
        const day = document.createElement('div');
        day.textContent = prevMonthDays - i;
        day.classList.add('inactive');
        calendarDays.appendChild(day);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.textContent = i;
    
        if (i === currentDate.getDate() && 
            month === currentDate.getMonth() && 
            year === currentDate.getFullYear()) {
            day.classList.add('today');
        }
        calendarDays.appendChild(day);
    }

    const totalSlots = firstDay + daysInMonth;
    const remainingSlots = (7 - (totalSlots % 7)) % 7;
    for (let i = 1; i <= remainingSlots; i++) {
        const day = document.createElement('div');
        day.textContent = i;
        day.classList.add('inactive');
        calendarDays.appendChild(day);
    }
}

// Navigation
prevMonth.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

nextMonth.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

renderCalendar(currentMonth, currentYear);