import React, { useContext } from 'react';

//Context
import AppContext from '../context/App.context';

const TextSuccess = () => {

  const {
    errorMessage,
  } = useContext(AppContext);

  return (
    <span>{errorMessage}</span>
  );
}

export default TextSuccess;