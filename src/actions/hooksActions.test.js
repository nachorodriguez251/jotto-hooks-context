import moxios from 'moxios';

import { getSecretWord } from './hooksActions';

describe('moxios tests', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test("calls the getSecretWord callback on axios response", async() => {
    const secretWord = 'party';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        stats: 200,
        response: secretWord,
      });
    });

    // create mock for callback arg
    const mockGetSecretWord = jest.fn();
    await getSecretWord(mockGetSecretWord);

    // see whether mock has run with the correct argument
    expect(mockGetSecretWord).toHaveBeenCalledWith(secretWord);
  })
})