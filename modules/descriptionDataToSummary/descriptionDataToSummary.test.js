import descriptionDataToSummary from "./descriptionDataToSummary.js";

test("builds summary text from plain text", () => {
  const input = "Some thing";

  const output = "Some thing";

  expect(descriptionDataToSummary(input)).toBe(output);
});

test("builds summary text from html strings", () => {
  const input = "<h1>Some thing</h1><p><img src='somewhere.png'></p>";

  const output = "Some thing";

  expect(descriptionDataToSummary(input)).toBe(output);
});

test("returns null when the text content is too long to be a summary", () => {
  const input =
    "This is an example of some text content that is long enough that it is likely not useful as a summary...";

  const output = null;

  expect(descriptionDataToSummary(input)).toBe(output);
});

test("returns null when the description data is undefined", () => {
  const input = undefined;

  const output = null;

  expect(descriptionDataToSummary(input)).toBe(output);
});
