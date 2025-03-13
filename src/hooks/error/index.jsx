import { useState } from "react";

export function useErrorsHooks() {
  const [errorMessage, setErrorMessage] = useState(null);

  function updateErrorMessage({ title, message }) {
    if (!message || message.length <= 0) {
      return console.error('Props null or empty!');
    }
    setErrorMessage({ title, message });
  }

  function disableErrorMessage(){
    setErrorMessage(null)
  }

  return { errorMessage, updateErrorMessage, disableErrorMessage};
}
