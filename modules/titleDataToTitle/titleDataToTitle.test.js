import titleDataToTitle from "./titleDataToTitle.js";

test("builds title text from plain text", () => {
  const input = "Some thing";

  const output = "Some thing";

  expect(titleDataToTitle(input)).toBe(output);
});

test("builds title text from CDATA strings", () => {
  const input = "<![CDATA[r/programming - Programmers generate every possible melody in MIDI]]>";

  const output = "r/programming - Programmers generate every possible melody in MIDI";

  expect(titleDataToTitle(input)).toBe(output);
});
