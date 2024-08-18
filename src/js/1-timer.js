import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
let chosenDate;
let difference;
const startButton = document.querySelector('#startButton');

startButton.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = new Date();
    const dateNow = date.getTime();
    chosenDate = selectedDates[0].getTime();

    if (chosenDate < dateNow) {
      alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      difference = chosenDate - dateNow;
      console.log(difference);
      startButton.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
let intervalId;
startButton.addEventListener('click', () => {
  intervalId = setInterval(() => {
    buttonPressed();
  }, 1000);
  startButton.disabled = true;
});

function buttonPressed() {
  const daysElement = document.querySelector('[data-days]');
  const hoursElement = document.querySelector('[data-hours]');
  const minutesElement = document.querySelector('[data-minutes]');
  const secondsElement = document.querySelector('[data-seconds]');
  if (difference > 999) {
    let convertedDate = convertMs(difference);

    daysElement.textContent = convertedDate.days;
    hoursElement.textContent = convertedDate.hours;
    minutesElement.textContent = convertedDate.minutes;
    secondsElement.textContent = convertedDate.seconds;
    difference -= 1000;
  } else {
    secondsElement.textContent = '00';
    clearInterval(intervalId);
  }
}
