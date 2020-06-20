import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import App from './App';

import hooksActions from './actions/hooksActions';

const mockGetSecretWord = jest.fn();

/**
 * Setup function for App component
 * @returns {ReactWrapper}
 */
const setup = () => {
  mockGetSecretWord.mockClear();
  hooksActions.getSecretWord = mockGetSecretWord;

  // use mount because useEffect not called on 'shallow'
  // https://github.com/enzymejs/enzyme/issues/2086
  return mount(<App />);
}

test('renders app without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');
  expect(component.length).toBe(1);
});

describe('getSecretWord calls', () => {
  test('getSecretWord gets called on App mount', () => {
    setup();

    // check to see if secret word was updated
    expect(mockGetSecretWord).toHaveBeenCalled();
  });

  test('secretWord does not update on App update', () =>{
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    // wrapper.update() does not trigger update
    // issue forked from https://github.com/enzymejs/enzyme/issues/2091
    wrapper.setProps();
    expect(mockGetSecretWord).not.toHaveBeenCalled();

  })
})
