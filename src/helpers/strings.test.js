import stringsModule from './strings';
const { getStringByLanguage } = stringsModule;

// fake strings object to test the getStringByLanguage function
const strings = {
  en: { submit: 'submit' },
  emoji: { submit: '🚀' },
  mermish: {},
}

describe("language string testing", () => {
  const mockWarn = jest.fn();
  let originalWarn;

  beforeEach(() => {
    originalWarn = console.warn;
    console.warn = mockWarn;
  });

  afterEach(() => {
    console.warn = originalWarn;
  })


  test("returns correct submit string for english", () => {
    const string = getStringByLanguage('en', 'submit', strings);
    expect(string).toBe('submit');
    expect(mockWarn).not.toHaveBeenCalled();
  });

  test("returns correct string (rocket) for emoji", () => {
    const string = getStringByLanguage('emoji', 'submit', strings);
    expect(string).toBe('🚀');
    expect(mockWarn).not.toHaveBeenCalled();
  });

  test("returns english submit when no language exists", () => {
    const string = getStringByLanguage('notALanguage', 'submit', strings);
    expect(string).toBe('submit');
    expect(mockWarn).toHaveBeenCalledWith("Could not get string from [submit] for [notALanguage]");
  });

  test("returns english submit when no submit key exists for language", () => {
    const string = getStringByLanguage('mermish', 'submit', strings);
    expect(string).toBe('submit');
    expect(mockWarn).toHaveBeenCalled();
    expect(mockWarn).toHaveBeenCalledWith("Could not get string from [submit] for [mermish]");
  });

});