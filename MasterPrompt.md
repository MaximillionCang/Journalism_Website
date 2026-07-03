You are an expert frontend developer. Build a desktop-only CNN-inspired news website called “GlobalPulse News” using only simple HTML, CSS, and vanilla JavaScript.

Do not use React, Vue, Next.js, Bootstrap, Tailwind, npm, backend, database, API, or external frameworks.

Important:
Do not copy CNN branding, CNN logo, CNN text, or copyrighted layout exactly. The website should only be inspired by the structure of a professional global news homepage. Use original branding: GlobalPulse News.

Project concept:
This is a frontend-only news website. All news content will be manually added inside a JavaScript data file. The main news will be written manually by me and will use a local video file. Other news articles will also be manually added, using the same article page template. For those other news articles, I may paste or rewrite text from other sources, so the website must include source name and original source link fields.

Main goal:
Create a professional desktop news portal with:

* top advertisement banner
* navigation bar
* trending topic row
* main hero news with local video
* left and right side columns so the page does not feel empty
* multiple news sections after scrolling
* reusable article detail page template for all articles

Tech requirements:
Use only these files:

* index.html
* article.html
* styles.css
* data.js
* script.js
* article.js

Folder structure:

* index.html
* article.html
* styles.css
* data.js
* script.js
* article.js
* assets/

  * ads/

    * top-ad.png
    * sidebar-ad.png
  * videos/

    * main-news.mp4
  * images/

    * news-1.jpg
    * news-2.jpg
    * news-3.jpg
    * news-4.jpg
    * news-5.jpg
    * news-6.jpg
    * placeholder.jpg

General style:

* CNN-inspired structure, but original branding.
* White background.
* Black text.
* Red accent color.
* Thin gray borders.
* Serious professional news look.
* Strong bold headlines.
* Clean newspaper-style spacing.
* Use Arial, Helvetica, or system sans-serif fonts.
* Desktop only.
* Target width around 1200px to 1320px.
* No mobile responsive requirement for now.
* No dark mode.
* No overly rounded cards.
* No playful design.

Homepage layout:

1. Top Advertisement Area
   Create a black or very dark full-width area at the very top.
   Inside it, place a centered static advertisement image:
   assets/ads/top-ad.png

Below the image, add small text:
Advertisement

The ad must be static. No animation.

2. Header / Navigation Bar
   Create a white navigation bar with thin bottom border.

Left side:

* hamburger icon
* GlobalPulse News logo text
* logo should use red and black styling

Center navigation:

* US
* World
* Politics
* Business
* Health
* Entertainment
* Style
* Travel
* Sports
* Science
* More

Right side:

* Watch
* Listen
* search icon
* Sign In button

3. Trending Topic Row
   Below the navbar, create a horizontal trending topic row.
   Use topics such as:

* Breaking News
* Global Economy
* Technology
* Sports
* Climate
* Entertainment
* Travel
* World Politics

Separate each topic with vertical dividers.

4. Main News Grid
   Create a three-column desktop grid:

* left column
* center column
* right column

Left column:

* Show one large secondary story with image and bold headline.
* Show three smaller stacked stories with thumbnail image, category label, and headline.
* Add thin gray borders between the stories.

Center column:

* Show the main hero story.
* The main hero story must come from the mainStory object in data.js.
* Display:

  * large headline
  * local HTML5 video player
  * red “LIVE UPDATES” or “TOP STORY” badge
  * short summary
  * source name
  * date
* Use video path:
  assets/videos/main-news.mp4
* The video must use HTML5 video tag with controls.
* Add fallback text if the video cannot load.

Right column:

* Top black video-style placeholder box with text:
  Catch up on today’s global news
* Add a “Popular” list.
* Add one image news card.
* Add small sidebar advertisement using:
  assets/ads/sidebar-ad.png
* Add “Editor’s Picks” small list.
* Make sure the right column looks visually filled and balanced.

5. Sections After Scrolling
   Below the main grid, create these sections:

* Latest News
* World News
* Business
* Technology
* Sports
* Entertainment
* Opinion
* Video News

Each section should render news cards dynamically from data.js.
Each card should show:

* image
* category
* title
* short summary
* date
* source name

When a card is clicked, it should open:
article.html?id=ARTICLE_ID

Data structure:
In data.js, create one global object or arrays that are easy to edit.

Create mainStory object with:

* id
* title
* category
* date
* image
* videoPath
* summary
* sourceName
* sourceUrl
* author
* content: array of paragraph strings
* isMainStory: true

Create article arrays:

* latestNews
* worldNews
* businessNews
* technologyNews
* sportsNews
* entertainmentNews
* opinionNews
* videoNews

Each article item must have:

* id
* title
* category
* date
* image
* summary
* sourceName
* sourceUrl
* author
* content: array of paragraph strings
* isMainStory: false

Important:
All normal news articles must use the same article.html template.
The article page must be able to display both the main story and normal articles.
For normal articles, display article text from the content array.
For the main story, display article text and also display the local video if available.

Article page requirements:
Create article.html and article.js.

article.js must:

* read the id from URL query parameter
* find the matching article from mainStory and all article arrays
* display article title
* display category
* display date
* display author
* display source name
* display image
* display video only if the article has videoPath
* display all content paragraphs
* display “Read original source” button linking to sourceUrl
* display related articles from the same category if possible
* if article id is invalid, show a clean “Article not found” message and a button back to homepage

Article page layout:

* same top ad, navbar, and trending row as homepage
* main article content on the left/center
* right sidebar with:

  * Popular News
  * Advertisement
  * Editor’s Picks
* professional news article typography
* readable paragraph width
* strong title hierarchy

JavaScript behavior:
script.js:

* dynamically render homepage stories and sections from data.js
* make all news cards clickable
* add search feature:

  * clicking search icon shows a search input
  * user can search article title/category/summary
  * matching results appear in a “Search Results” section
* add More dropdown with extra categories
* add simple static breaking news ticker text

article.js:

* dynamically render selected article by id
* render related articles

Content:
Add sample placeholder articles inside data.js.
Make the sample articles realistic but not too long.
Use original sample text, not copied news articles.
Make it very easy for me to replace:

* title
* image
* summary
* source
* content paragraphs
* source URL

Add clear comments inside data.js showing where I should edit content.

Fallback behavior:
If an image does not load, use assets/images/placeholder.jpg.
If a video does not load, show fallback text.
Do not allow the website to crash because of missing files.

Design details:

* Use CSS Grid for main layout.
* Use Flexbox for navbar, cards, and rows.
* Add hover effects on news cards.
* Add pointer cursor for clickable cards.
* Add subtle border changes on hover.
* Use red badges for category labels or breaking news.
* Use thin dividers between items.
* Keep spacing balanced so left and right sides do not feel empty.

Deliverables:
Give me complete code for:

* index.html
* article.html
* styles.css
* data.js
* script.js
* article.js

The website must run by opening index.html directly in a browser.
The code must be clean, readable, and easy to edit.
Do not add unnecessary complexity.
Do not use any build tools.
Do not use external dependencies.
