import React from 'react'
import PropTypes, { string } from 'prop-types'

import languageConext from './contexts/languageContext';
import successContext from './contexts/successContext';
import stringsModule from './helpers/strings';

function Input({ secretWord }) {
  // in order to mock the Hook, we need to do React.useState instead of destructuring
  // the hook in the import and just use useState
  const [currentGuess, setCurrentGuess] = React.useState("");
  const [success, setSuccess] = successContext.useSuccess();
  const language = React.useContext(languageConext);
  
  if (success) return null;
  
  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input 
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={(evt) => { 
            evt.preventDefault();
            // TODO: update guessedWord
            // TODO: check against secretWord and update success if needed
            setCurrentGuess(currentGuess)}}>
           { stringsModule.getStringByLanguage(language, 'submit') }    
        </button>
      </form>
    </div>
  )
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
}

export default Input
