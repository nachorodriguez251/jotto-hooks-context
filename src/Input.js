import React from 'react'
import PropTypes from 'prop-types'

function Input({ secretWord }) {
  // in order to mock the Hook, we need to do React.useState instead of destructuring
  // the hook in the import and just use useState
  const [currentGuess, setCurrentGuess] = React.useState("");
  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input 
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder="Enter guess"
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
           Submit    
        </button>
      </form>
    </div>
  )
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
}

export default Input
