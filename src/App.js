import React from 'react';
import './App.css';
import hooksActions from './actions/hooksActions';

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
    },[]
  )

  return (
    <div data-test="component-app">
    </div>
  );
}

export default App;
