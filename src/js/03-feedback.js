import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = "feedback-form-state";
const feedbackForm = document.querySelector('.feedback-form');

feedbackForm.addEventListener('input', throttle(onFormInput, 250));
feedbackForm.addEventListener('submit', onFormSubmit);

onFormInit();

function onFormSubmit(evt) {
  evt.preventDefault();
  const formData = new FormData(feedbackForm);
  formData.forEach((value, name) => console.log(value, name));

  localStorage.removeItem(LOCALSTORAGE_KEY);
  evt.currentTarget.reset();
}

function onFormInput(evt) {
  let storageData =  localStorage.getItem(LOCALSTORAGE_KEY);

  if (storageData) {
    storageData = JSON.parse(storageData);
  } else {
    storageData = {};
  }

  storageData[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(storageData));
}

function onFormInit() {
  let storageData = localStorage.getItem(LOCALSTORAGE_KEY);
  if (storageData) {
    storageData = JSON.parse(storageData);  
    Object.entries(storageData).forEach(([name, value]) => feedbackForm.elements[name].value = value);
  }
}

