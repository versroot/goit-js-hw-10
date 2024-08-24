import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let delay;
let option;
let isSuccess = true;
const createButton = document.getElementById('createButton');

createButton.addEventListener('click', event => {
  event.preventDefault();

  delay = document.getElementById('delay').value;
  option = document.querySelector('input[name="state"]:checked').value;
  if (option === 'rejected') {
    isSuccess = false;
  }
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve(
          iziToast.success({
            title: 'OK',
            titleColor: '#FFFFFF',
            message: `fullfilled promise in ${delay} ms`,
            iconUrl: '../img/bi_check2-circle.svg',
            backgroundColor: '#59A10D',
            messageColor: '#FFFFFF',
            close: true,
            onOpening: closeX,
          })
        );
      } else {
        reject(
          iziToast.error({
            title: 'Error',
            titleColor: '#FFFFFF',
            message: `rejected promise in ${delay} ms`,
            iconUrl: '../img/bi_check2-circle.svg',
            backgroundColor: '#EF4040',
            messageColor: '#FFFFFF',
            close: true,

            onOpening: closeX,
          })
        );
      }
    }, delay);
  });

  promise
    .then(value => {
      value;
    })
    .catch(error => {
      error;
    });
});

function closeX(instance, toast) {
  var closeButton = toast.querySelector('.iziToast-close');
  closeButton.style.backgroundColor = 'transparent'; //
  closeButton.style.backgroundImage = "url('../img/bi_x-lg.svg')";
  closeButton.style.backgroundSize = 'contain';
  closeButton.style.width = '16px';
  closeButton.style.height = '16px';

  closeButton.style.color = 'transparent';
  closeButton.style.margin = '18px';
}
