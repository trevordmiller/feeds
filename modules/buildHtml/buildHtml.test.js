import prettier from "prettier";
import buildHtml from "./buildHtml.js";

test("builds html from parsed feeds", () => {
  const input = [
    {
      title: "Some feed title 1",
      items: [
        {
          title: "Some item title 1",
          summary: "Some item summary 1",
          link: "https://somelink1.com"
        },
        {
          title: "Some item title 2",
          summary: "Some item summary 2",
          link: "https://somelink2.com"
        }
      ]
    },
    {
      title: "Some feed title 2",
      items: [
        {
          title: "Some item title 1",
          summary: "Some item summary 1",
          link: "https://somelink1.com"
        }
      ]
    }
  ];

  const output = `
    <main>
      <section>
        <h2>Some feed title 1</h2>

        <article>
          <h3>Some item title 1</h3>
          <p>Some item summary 1</p>
          <a href="https://somelink1.com">Link</a>
        </article>

        <article>
          <h3>Some item title 2</h3>
          <p>Some item summary 2</p>
          <a href="https://somelink2.com">Link</a>
        </article>
      </section>

      <section>
        <h2>Some feed title 2</h2>

        <article>
          <h3>Some item title 1</h3>
          <p>Some item summary 1</p>
          <a href="https://somelink1.com">Link</a>
        </article>
      </section>
    </main>
  `;

  const removeFormattingDiffs = htmlString =>
    prettier.format(htmlString, {
      parser: "html"
    });

  expect(removeFormattingDiffs(buildHtml(input))).toBe(
    removeFormattingDiffs(output)
  );
});
