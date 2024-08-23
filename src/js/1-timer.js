import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let chosenDate;
let difference;
const startButton = document.querySelector('#startButton');
const picker = document.querySelector('#datetime-picker');
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
      iziToast.error({
        title: '',
        message: 'Please choose a date in the future',
        position: 'topRight',
        timeout: 0,
        iconUrl: '../img/bi_x-octagon.svg',
        backgroundColor: '#EF4040',
        messageColor: '#FFFFFF',
        close: true,
        onOpening: function (instance, toast) {
          var closeButton = toast.querySelector('.iziToast-close');
          closeButton.style.backgroundColor = 'transparent'; // Make the background transparent
          closeButton.style.backgroundImage = "url('../img/bi_x-lg.svg')"; // Use your custom image
          closeButton.style.backgroundSize = 'contain'; // Make sure the image scales properly
          //closeButton.style.backgroundRepeat = 'no-repeat'; // Prevent the image from repeating
          //closeButton.style.backgroundPosition = 'center'; // Center the image
          closeButton.style.width = '16px'; // Adjust the size as needed
          closeButton.style.height = '16px'; // Adjust the size as needed

          closeButton.style.color = 'transparent'; // Hide the default "X"
          closeButton.style.margin = '18px';
        },
      });

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
