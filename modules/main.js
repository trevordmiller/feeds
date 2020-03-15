import buildHtml from './buildHtml/buildHtml.js';

const main = async () => {

	window.document.body.innerHTML = '<p>Loading...</p>';

	/* Side effects TODO
	const parsedUrl = new URL(window.location.href);

	const feedUrls = parsedUrl.searchParams.get("feedUrls");
	const max = parsedUrl.searchParams.get("max");
	*/

	/*
	const fetchedFeeds = [
	`<rss>
	  <channel>
	    <title>Fetched feed title 1</title>
	    <item>
	       <link>https://codepen.io/billgil/pen/ewqWzY</link>
	       <title>A sad rain cloud</title>
	       <dc:creator>Bill Gilmore</dc:creator>
	    </item>
	    <!-- a bunch more items -->
	  </channel>
	</rss>`,
	`<rss>
	  <channel>
	    <title>Fetched feed title 2</title>
	    <item>
	       <link>https://codepen.io/billgil/pen/ewqWzY</link>
	       <title>A sad rain cloud</title>
	       <dc:creator>Bill Gilmore</dc:creator>
	    </item>
	    <!-- a bunch more items -->
	  </channel>
	</rss>`
	]
	*/

	const max = 3;

	const parseFeeds = async (feedUrls) => await Promise.all(feedUrls.map(async feedUrl => {
	  const response = await window.fetch(feedUrl);
	  const text = await response.text();
	  const parsedXml = new window.DOMParser().parseFromString(text, "text/xml");
		const xmlItems = Array.from(parsedXml.querySelectorAll("item"));

	  return ({
		  title: parsedXml.querySelector("title").innerHTML,
		  items: xmlItems.slice(0, max).map(xmlItem => ({
			  title: xmlItem.querySelector('title').innerHTML,
			  summary: 'TODO',
			  link: xmlItem.querySelector('link').innerHTML
		}))
	  })
	}));

	const feedUrls = [
		"https://mshibanami.github.io/GitHubTrendingRSS/monthly/all.xml",
		"https://mshibanami.github.io/GitHubTrendingRSS/monthly/javascript.xml"
	];

	/* Feeds TODO
	-   General
		-   [IEEE computing edge](https://www.computer.org/publications/computing-edge/current-issue)
		-   [GitHub trends](https://github.com/trending?since=monthly)
		-   [Reddit programming](https://www.reddit.com/r/programming/top/?t=month)
		-   [Reddit coding](https://www.reddit.com/r/coding/top/?t=month)
		-   [Reddit compsci](https://www.reddit.com/r/compsci/top/?t=month)
		-   [Reddit commandline](https://www.reddit.com/r/commandline/top/?t=month)
	-   Unix
		-   [Community](https://www.reddit.com/r/unix/top/?t=month)
	-   Vim
		-   [Official](https://www.vim.org/news/news.php)
		-   [Community](https://www.reddit.com/r/vim/top/?t=month)
	-   Homebrew
		-   [Official](https://brew.sh/blog)
	-   Git
		-   [Official](https://github.com/git/git/releases)
		-   [Community](https://www.reddit.com/r/git/top/?t=month)
	-   Web
		-   [Official](https://www.w3.org/TR/?status=rec)
		-   [Community](https://www.reddit.com/r/webdev/top/?t=month)
	-   JavaScript
		-   [Official](https://tc39.es/#proposals)
		-   [Community](https://www.reddit.com/r/javascript/top/?t=month)
	-   Web APIs
		-   ...
	-   WebAssembly
		-   [Community](https://www.reddit.com/r/WebAssembly/top/?t=month)
	*/

	const parsedFeeds = await parseFeeds(feedUrls);

	const builtHtml = buildHtml(parsedFeeds);

	window.document.body.innerHTML = builtHtml;
}

main();
