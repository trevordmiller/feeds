const buildHtml = parsedFeeds => {
  const itemsHtml = parsedFeeds
    .map(
      parsedFeed => `
      <section>
        <h2>${parsedFeed.title}</h2>
        ${parsedFeed.items
          .map(
            item => `
        <article>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
          <a href="${item.link}">Link</a>
          </article>
        `
          )
          .join("")}
      </section>
    `
    )
    .join("");

  return `
    <main>
      ${itemsHtml}
    </main>
  `;
};

export default buildHtml;
