import React from 'react';
import './App.css';
import hooksActions from './actions/hooksActions';
import Input from './Input';

/**
 * 
 * @param {object} state - existing state
 * @param {object} action - contains 'type' and 'payload' properties for the state update
 *                        for example { type: "setSecretWord", payload: "party" }
 * @return {object} - new state
 */
function reducer(state, action) {
  switch(action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    default: 
      throw new Error(`Invalid action type: ${action.payload}`);
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, { secretWord: null });

  const setSecretWord = (secretWord) => {
    dispatch({ type: "setSecretWord", payload: secretWord });
  }

  React.useEffect(() => { 
     hooksActions.getSecretWord(setSecretWord) 
  }, []);

  if (!state.secretWord) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <p>Loading secret word...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" data-test="component-app">
      <Input secretWord={state.secretWord} />
    </div>
  );
}

export default App;
