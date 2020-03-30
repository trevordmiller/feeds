import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import titleDataToTitle from "./titleDataToTitle.js";

Deno.test({
  name: "builds title text from plain text",
  fn() {
    const input = "Some thing";
    const output = "Some thing";
    assertEquals(titleDataToTitle(input), output);
  }
});

Deno.test({
  name: "builds title text from CDATA strings",
  fn() {
    const input =
      "<![CDATA[r/programming - Programmers generate every possible melody in MIDI]]>";
    const output =
      "r/programming - Programmers generate every possible melody in MIDI";
    assertEquals(titleDataToTitle(input), output);
  }
});

await Deno.runTests();
