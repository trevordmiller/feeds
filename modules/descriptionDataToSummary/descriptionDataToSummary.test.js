import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import descriptionDataToSummary from "./descriptionDataToSummary.js";

Deno.test({
  name: "builds summary text from plain text",
  fn() {
    const input = "Some thing";
    const output = "Some thing";
    assertEquals(descriptionDataToSummary(input), output);
  }
});

Deno.test({
  name: "builds summary text from html strings",
  fn() {
    const input = "<h1>Some thing</h1><p><img src='somewhere.png'></p>";
    const output = "Some thing";
    assertEquals(descriptionDataToSummary(input), output);
  }
});

Deno.test({
  name: "returns null when the text content is too long to be a summary",
  fn() {
    const input =
      "This is an example of some text content that is long enough that it is likely not useful as a summary...";
    const output = null;
    assertEquals(descriptionDataToSummary(input), output);
  }
});

Deno.test({
  name: "returns null when the description data is undefined",
  fn() {
    const input = undefined;
    const output = null;
    assertEquals(descriptionDataToSummary(input), output);
  }
});

await Deno.runTests();
