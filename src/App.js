import React from 'react';
import './App.css';
import hooksActions from './actions/hooksActions';
import languageContext from './contexts/languageContext';
import Input from './Input';
import LanguagePicker from './LanguagePicker';

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
    case "setLanguage":
        return {...state, language: action.payload };
    default: 
      throw new Error(`Invalid action type: ${action.payload}`);
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, { secretWord: null, language: 'en' });

  const setSecretWord = (secretWord) => {
    dispatch({ type: "setSecretWord", payload: secretWord });
  }

  const setLanguage = (language) => {
    dispatch({ type: "setLanguage", payload: language });
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
      <h1>Jotto !</h1>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <Input secretWord={state.secretWord} />
      </languageContext.Provider>
        
    </div>
  );
}

export default App;
