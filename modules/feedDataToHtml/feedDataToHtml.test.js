import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import feedDataToHtml from "./feedDataToHtml.js";

Deno.test({
  name: "feedDataToHtml",
  fn() {
    const input = [
      {
        title: "Some feed title 1",
        items: [
          {
            title: "Some item title 1",
            link: "https://somelink1.com",
            summary: "Some item summary 1"
          },
          {
            title: "Some item title 2",
            link: "https://somelink2.com",
            summary: "Some item summary 2"
          }
        ]
      },
      {
        title: "Some feed title 2",
        items: [
          {
            title: "Some item title 1",
            link: "https://somelink1.com"
          }
        ]
      }
    ];
    const output = `<main>
<section>
<h2>Some feed title 1</h2>
<article>
<h3>Some item title 1</h3>
<a href="https://somelink1.com">Link</a>
<p>Some item summary 1</p>
</article>
<article>
<h3>Some item title 2</h3>
<a href="https://somelink2.com">Link</a>
<p>Some item summary 2</p>
</article>
</section>
<section>
<h2>Some feed title 2</h2>
<article>
<h3>Some item title 1</h3>
<a href="https://somelink1.com">Link</a>
</article>
</section>
</main>`;
    assertEquals(feedDataToHtml(input), output);
  }
});

await Deno.runTests();
