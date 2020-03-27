import descriptionDataToSummary from "./descriptionDataToSummary/descriptionDataToSummary.js";
import feedDataToHtml from "./feedDataToHtml/feedDataToHtml.js";

const main = async () => {
  window.document.body.innerHTML = "<main><p>Loading...</p></main>";

  const feeds = [
    {
      title: "IEEE",
      url: "https://csdl-api.computer.org/api/rss/periodicals/mags/so/rss.xml"
    },
    {
      title: "GitHub Trends",
      url: "https://mshibanami.github.io/GitHubTrendingRSS/monthly/all.xml"
    }
  ];

  const max = 5;

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
          items: xmlItems.slice(0, max).map(xmlItem => {
            const title = xmlItem.querySelector("title").innerHTML;
            const link = xmlItem.querySelector("link").innerHTML;
            const descriptionData = xmlItem.querySelector("description")
              .innerHTML;
            const summary = descriptionDataToSummary(descriptionData);

            console.log(descriptionData);

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
};

main();
