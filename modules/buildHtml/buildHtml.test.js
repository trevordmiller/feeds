import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import buildHtml from "./buildHtml.js";

Deno.test({
  name:
    "builds html from parsed feeds",
  fn() {
	const input = [
		{
			title: 'Some feed title 1',
			items: [
				{
					title: 'Some item title 1',
					summary: 'Some item summary 1',
					link: 'https://somelink1.com'
				},
				{
					title: 'Some item title 2',
					summary: 'Some item summary 2',
					link: 'https://somelink2.com'
				}
			]
		},
		{
			title: 'Some feed title 2',
			items: [
				{
					title: 'Some item title 1',
					summary: 'Some item summary 1',
					link: 'https://somelink1.com'
				}
			]
		},
	];

    const output = `
      <section>
	<h2>${parsedFeed.title}</h2>
	${parsedFeed.items.map(item => `
	<article>
	  <h3>${item.title}</h3>
	  <p>${item.summary}</p>
	  <a href="${item.link}">Link</a>
	  </article>
	`).join('')}
      </section>
    `

    assertEquals(buildHtml(input), output);
  }
});

await Deno.runTests();
