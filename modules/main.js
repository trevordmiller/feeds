import titleDataToTitle from "./titleDataToTitle/titleDataToTitle.js";
import descriptionDataToSummary from "./descriptionDataToSummary/descriptionDataToSummary.js";
import feedDataToHtml from "./feedDataToHtml/feedDataToHtml.js";

const main = async () => {
  try {
    window.document.body.innerHTML = "<main><p>Loading...</p></main>";

    // Direct or via https://rss.app
    const feeds = [
      {
        title: "IEEE",
        url: "https://csdl-api.computer.org/api/rss/periodicals/mags/so/rss.xml",
        max: 3
      },
      {
        title: "GitHub Trends",
        url: "https://mshibanami.github.io/GitHubTrendingRSS/monthly/all.xml",
        max: 10
      },
      {
        title: "Reddit programming",
        url: "https://rss.app/feeds/qtY5lEd1YADUScA0.xml",
        max: 10
      },
    ];

    const parseFeeds = async feeds =>
      await Promise.all(
        feeds.map(async feed => {
          const response = await window.fetch(feed.url);
          const text = await response.text();
          const parsedXml = new window.DOMParser().parseFromString(
            text,
            "text/xml"
          );
          const xmlItems = Array.from(parsedXml.querySelectorAll("item"));

          return {
            title: feed.title,
            items: xmlItems.slice(0, feed.max).map(xmlItem => {
              const title = titleDataToTitle(xmlItem.querySelector("title").innerHTML);
              const link = xmlItem.querySelector("link").innerHTML;
              const descriptionData = xmlItem.querySelector("description")
                .innerHTML;
              const summary = descriptionDataToSummary(descriptionData);

              return {
                title: title,
                link: link,
                summary: summary
              };
            })
          };
        })
      );

    const parsedFeeds = await parseFeeds(feeds);

    window.document.body.innerHTML = feedDataToHtml(parsedFeeds);
  } catch (error) {
    window.document.body.innerHTML = "<main><p>There was an error.</p></main>";
  }
};

main();
