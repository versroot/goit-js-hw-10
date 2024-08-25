import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const fullfilled = document.getElementById('fulfilled');
const rejected = document.getElementById('rejected');
const decision = document.getElementById('decision');
const createButton = document.getElementById('createButton');

fullfilled.addEventListener('change', event => {
  if (event.target.checked) {
    decision.style.borderColor = '#000000';
  }
});
rejected.addEventListener('change', event => {
  if (event.target.checked) {
    decision.style.borderColor = '#000000';
  }
});

createButton.addEventListener('click', event => {
  event.preventDefault();

  const delay = document.getElementById('delay').value;
  const option = document.querySelector('input[name="state"]:checked').value;
  const isSuccess = option === 'fulfilled';
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve();
      } else {
        reject();
      }
    }, delay);
  });

  promise
    .then(() => {
      iziToast.success({
        title: 'OK',
        titleColor: '#FFFFFF',
        message: `fullfilled promise in ${delay} ms`,
        iconUrl: '../img/bi_check2-circle.svg',
        backgroundColor: '#59A10D',
        messageColor: '#FFFFFF',
        close: true,
        onOpening: closeX,
      });
    })
    .catch(() => {
      iziToast.error({
        title: 'Error',
        titleColor: '#FFFFFF',
        message: `rejected promise in ${delay} ms`,
        iconUrl: '../img/bi_check2-circle.svg',
        backgroundColor: '#EF4040',
        messageColor: '#FFFFFF',
        close: true,

        onOpening: closeX,
      });
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
