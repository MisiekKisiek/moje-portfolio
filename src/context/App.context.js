import {createContext} from 'react';

const defaultValue = {
  scrollDirection: true,
  oldScroll: 0,
  newScroll: 0,
  contactFormSending: false,
  errorMessage: "",
}

const AppContext = createContext(defaultValue);

export default AppContext;

export {defaultValue};