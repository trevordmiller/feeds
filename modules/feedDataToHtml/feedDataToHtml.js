const feedDataToHtml = parsedFeeds => {
  const itemsHtml = parsedFeeds
    .map(parsedFeed =>
      `
      <section>
        <h2>${parsedFeed.title}</h2>
        ${parsedFeed.items
        .map(item =>
          `
              <article>
                <h3>${item.title}</h3>
                <a href="${item.link}">Link</a>
                ${item.summary ? `<p>${item.summary}</p>` : ""}
              </article>
        `
        )
        .join("")}
      </section>
    `
    )
    .join("");

  const mainHtml = `
    <main>
      ${itemsHtml}
    </main>
  `;

  const formattedHtml = mainHtml
    .split("\n")
    .map(line => line.trim())
    .filter(x => !!x)
    .join("\n");

  return formattedHtml;
};

export default feedDataToHtml;
