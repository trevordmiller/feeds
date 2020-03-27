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
        url:
          "https://csdl-api.computer.org/api/rss/periodicals/mags/so/rss.xml",
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
      {
        title: "Reddit coding",
        url: "https://rss.app/feeds/rSBtOoUKZzZLp2C2.xml",
        max: 10
      },
      {
        title: "Reddit compsci",
        url: "https://rss.app/feeds/BqegyvjAy3vdvC7j.xml",
        max: 10
      },
      {
        title: "Reddit unix",
        url: "https://rss.app/feeds/qqTmcUPI2lpLwj7f.xml",
        max: 10
      },
      {
        title: "Reddit vim",
        url: "https://rss.app/feeds/I5n8lIFHsWHIS6qM.xml",
        max: 10
      },
      {
        title: "Reddit git",
        url: "https://rss.app/feeds/Cbf3VryLJL7H4Sbz.xml",
        max: 10
      },
      {
        title: "W3C recommendations",
        url: "https://www.w3.org/TR/?status=rec",
        max: 3
      },
      {
        title: "Reddit webdev",
        url: "https://rss.app/feeds/4iC7UIwfHOpXpl8S.xml",
        max: 10
      },
      {
        title: "TC39 proposals",
        url: "https://tc39.es/#proposals",
        max: 3
      },
      {
        title: "Reddit javascript",
        url: "https://rss.app/feeds/2LYlwYdC3LgjBWPj.xml",
        max: 10
      }
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

          if (xmlItems.length === 0) {
            return {
              title: feed.title,
              items: [
                {
                  title: "Index",
                  link: feed.url
                }
              ]
            };
          }

          return {
            title: feed.title,
            items: xmlItems.slice(0, feed.max).map(xmlItem => {
              const title = titleDataToTitle(
                xmlItem.querySelector("title").innerHTML
              );
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
