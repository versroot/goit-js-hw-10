import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let chosenDate;
let difference;
const startButton = document.querySelector('#startButton');
const picker = document.querySelector('#datetime-picker');
startButton.disabled = true;
picker.disabled = false;
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
          closeButton.style.backgroundColor = 'transparent'; //
          closeButton.style.backgroundImage = "url('../img/bi_x-lg.svg')";
          closeButton.style.backgroundSize = 'contain';
          closeButton.style.width = '16px';
          closeButton.style.height = '16px';

          closeButton.style.color = 'transparent';
          closeButton.style.margin = '18px';
        },
      });

      startButton.disabled = true;
    } else {
      difference = chosenDate - dateNow;

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
  picker.disabled = true;
  if (difference > 999) {
    let convertedDate = convertMs(difference);

    daysElement.textContent = addLeadingZero(convertedDate.days);
    hoursElement.textContent = addLeadingZero(convertedDate.hours);
    minutesElement.textContent = addLeadingZero(convertedDate.minutes);
    secondsElement.textContent = addLeadingZero(convertedDate.seconds);
    difference -= 1000;
  } else {
    secondsElement.textContent = '00';
    clearInterval(intervalId);
    picker.disabled = false;
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
