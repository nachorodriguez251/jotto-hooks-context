import React from 'react';
import { shallow, mount } from 'enzyme';
import { findByTestAttr, checkProps } from '../test/testUtils';
import Input from './Input'

import languageContext from './contexts/languageContext';
import { findByDisplayValue } from '@testing-library/react';

/**
 * Setup function for Input component
 * @returns { shallowWrapper }
 */
const setup = ({ secretWord, language }) => {
  secretWord = secretWord || 'party';
  language = language || 'en';

  return mount(
    <languageContext.Provider value={language}>
      <Input secretWord={secretWord} />
    </languageContext.Provider>
  );
}

describe("laguage Picker", () => {
  test('renders correctly submit button language for english', () => {
    const wrapper = setup({secretWord: 'party'});
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.text()).toBe("Submit")
  });

  test("renders correctly submit button language for emoji", () => {
    const wrapper = setup({ secretWord: 'party', language: 'emoji' });
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.text()).toBe('🚀');
  });

  test('renders correctly input placeholder language for english', () => {
    const wrapper = setup({ secretWord: 'party' });
    const inputBox = findByTestAttr(wrapper, 'input-box');
    expect(inputBox.props().placeholder).toBe('enter guess');
  });

  test('renders correctly input placeholder language for emoji', () => {
    const wrapper = setup({ secretWord: 'party', language: 'emoji' });
    const inputBox = findByTestAttr(wrapper, 'input-box');
    expect(inputBox.props().placeholder).toBe('⌨️🤔');
  });
});

test('renders Input without errors', () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, 'component-input');
  expect(component.length).toBe(1);
});

test('does not throw warning with expected props', () => {
  checkProps(Input, { secretWord: 'party' })
});

describe('state controlled input field', () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup({});
  });

  test('state updates with value of input box upon change', () => {    
    const inputBox = findByTestAttr(wrapper, 'input-box');

    // simulate the inputbox has a value of train
    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });

  test('field is cleared upon submit button click', () => {
    const submitButton = findByTestAttr(wrapper, "submit-button");

    submitButton.simulate("click", { preventDefault() {}});
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  })
})