import stringsModule from './strings';
const { getStringByLanguage } = stringsModule;

// fake strings object to test the getStringByLanguage function
const strings = {
  en: { submit: 'submit' },
  emoji: { submit: '🚀' },
  mermish: {},
}

describe("language string testing", () => {

  test("returns correct submit string for english", () => {
    const string = getStringByLanguage('en', 'submit', strings);
    expect(string).toBe('submit');
  });

  test("returns correct string (rocket) for emoji", () => {
    const string = getStringByLanguage('emoji', 'submit', strings);
    expect(string).toBe('🚀');
  });

  test("returns english submit when no language exists", () => {
    const string = getStringByLanguage('notALanguage', 'submit', strings);
    expect(string).toBe('submit');
  });

  test("returns english submit when no submit key exists for language", () => {
    const string = getStringByLanguage('mermish', 'submit', strings);
    expect(string).toBe('submit');
  });

});