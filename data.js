// CampusPulse News content lives here.
// Edit the main story first, then replace the 6 supporting stories below.
// Paste each source URL into sourceUrl and replace image paths when your images are ready.

const mainStory = {
  id: "main-campus-story",
  title: "Coming soon",
  category: "Campus",
  date: "July 2, 2026",
  image: "assets/images/main-story.jpg",
  videoPath: "assets/videos/main-news.mp4",
  summary: "The main story is reserved for your manually written campus report and local video file. Replace this sample text when your final story is ready.",
  sourceName: "CampusPulse News Desk",
  sourceUrl: "https://example.com/main-campus-story",
  author: "Danielle Wightman-Stone",
  content: [
    "The university media team is preparing a feature package that will highlight student projects, campus activities, and voices from across the community.",
    "This sample article is written as a simple placeholder. Replace the headline, summary, author, source, and paragraphs with your own reporting when the story is complete.",
    "The video area uses a local file path so the main news video can be added later without changing the page layout or JavaScript."
  ],
  isMainStory: true
};

// Edit these 6 supporting stories. Keep the id values if you want the current links to stay working.
const supportingStories = [
  {
    id: "story-1",
    title: "NYMD announces designer lineup for SS27 edition",
    category: "Events",
    date: "July 1, 2026",
    image: "assets/images/story-1.jpg",
    summary: "New York Men's Day has announced its Spring/Summer 2027 designer lineup, featuring a mix of returning and debut brands, as it continues to support emerging menswear talent through its partnership with Project and Coterie during New York Fashion Week.",
    sourceName: "Fashion United UK",
    sourceUrl: "https://fashionunited.com/news/fashion/nymd-announces-designer-lineup-for-s-s27-edition/2026070273299",
    author: "Danielle Wightman-Stone",
    content: [
      "New York Men's Day (NYMD), the biannual menswear showcase presented by Project and Coterie by Informa, has announced the designer lineup for its Spring/Summer 2027 (SS27) event.",
      "The 26th edition will take place on September 10 at Mercedes-Benz of Manhattan, marking its third time at the venue and opening New York Fashion Week with two showcase sessions. Returning designers include Avon Anglers, Christopher Lowman, Clara Son, and Science Project Company, while first-time participants are Alienant, Big Ocean x Andy Yu, Ethan Lewy, and Ouila.",
      "NYMD founder Erin Hawker said the platform continues to support both returning and emerging designers by giving them the opportunity to showcase bold menswear and innovative design to the industry.",
      "Project and Coterie will return as sponsors for a third consecutive season. Coterie will also run from September 9–11 at New York’s Javits Center, with both brands hosting the afternoon-session bar to provide buyers, editors, stylists, and industry professionals with a space to connect and discover new talent.",
      "Brian Bartiss, Vice President of Sales at Fashion by Informa, said the partnership reflects Project and Coterie’s commitment to discovering and supporting emerging designers. Hawker added that continued partner support enables NYMD to invest in new talent and strengthen the New York menswear community."
    ],
    isMainStory: false
  },
  {
    id: "story-2",
    title: "Nic+Zoe launches new sub-brand targeting younger customers",
    category: "Fashion Business",
    date: "June 30, 2026",
    image: "assets/images/story-2.jpg",
    summary: "Nic+Zoe has launched NZ by Nic+Zoe, a new, more affordable sub-brand targeting younger consumers, alongside the Hotel Nic+Zoe marketing campaign to attract new customers and expand its brand appeal.",
    sourceName: "Fashion Business",
    sourceUrl: "https://fashionunited.uk/news/fashion/nic-zoe-launches-new-sub-brand-targeting-younger-customers/2026070188939",
    author: "Danielle Wightman-Stone",
    content: [
      "Boston-based womenswear brand Nic+Zoe has expanded its portfolio with the launch of NZ by Nic+Zoe, a new sub-brand targeting younger consumers",
      "The collection offers a more youthful take on capsule wardrobes, featuring mix-and-match essentials at a more affordable price point while maintaining Nic+Zoe’s signature colours, prints, and style. The launch supports the brand’s strategy to attract new customers, encourage more frequent purchases of everyday essentials, and complement its main collection with a more casual aesthetic.",
      "The debut collection includes lightweight crinkle cotton shirts, pointelle tanks and tees, dresses, and linen tops and pants",
      "The launch coincides with Hotel Nic+Zoe, a cross-platform marketing campaign featuring an immersive in-store experience inspired by travel and the French Riviera. Customers can enjoy personalised styling sessions, a themed “check-in” experience, branded gifts, and refreshments.",
      "Chief executive Avra Myers said NZ by Nic+Zoe marks a new chapter for the brand by introducing a younger perspective while remaining true to its focus on effortless style, comfort, and versatility. She added that integrating the launch with Hotel Nic+Zoe creates a cohesive shopping experience that reflects customers’ modern lifestyles."
    ],
    isMainStory: false
  },
  {
    id: "story-3",
    title: "Filmar's revenue rises to 60 million euros as company expands its product line",
    category: "Fashion Business",
    date: "June 29, 2026",
    image: "assets/images/story-3.jpg",
    summary: "Italian yarn manufacturer Filmar is strengthening its position in the luxury textile market through innovation, sustainability initiatives, digital expansion, and higher-end yarn offerings while celebrating its heritage with an artistic photography book.",
    sourceName: "Fashion Network",
    sourceUrl: "https://ww.fashionnetwork.com/news/Filmar-s-revenue-rises-to-60-million-euros-as-company-expands-its-product-line,1849263.html ",
    author: "Gianluca Bolelli",
    content: [
      "Italian yarn manufacturer Filmar continues to expand its business through innovation, sustainability, and a stronger focus on the luxury market. Founded in 1958 and based in Zocco d’Erbusco, Italy, the company produces premium cotton based yarns for knitwear, hosiery, and weaving, while its Egyptian subsidiary, Filmar Nile Textile, manages spinning operations.",
      "Filmar offers dyed, fashion focused yarns in up to 300 colours and oversees every stage of production. The company has also introduced B2B and B2C ecommerce platforms, allowing both businesses and individual customers to purchase yarn online, an uncommon approach in the textile industry. Its automated warehouse also provides real time inventory tracking.",
      "The company reported 60 million euros in revenue in 2025, with 40% generated in Italy, and is shifting towards higher end, specialised yarns such as blends and mélange products to differentiate itself from lower cost competitors. Filmar now serves more than 2,500 customers worldwide.",
      "Sustainability remains central to Filmar's strategy. The company has offered certified organic cotton since 2004 and launched the Cotton for Life initiative with the United Nations in 2015 to promote sustainable cotton farming and community development in Egypt. It has also expanded its focus to regenerative cotton and continues to publish independently verified ESG reports despite no longer being legally required to do so.",
      "To commemorate its Egyptian spinning mill, Filmar has published On Cotton About Cotton Regarding Cotton, a photography book by artist Jacopo Valentini. Rather than documenting the factory traditionally, the book presents an artistic interpretation of the production environment and will be distributed to customers and sold to the public."
    ],
    isMainStory: false
  },
  {
    id: "story-4",
    title: "Thomas Estrany takes the helm at H&M France",
    category: "Fashion Business",
    date: "June 28, 2026",
    image: "assets/images/story-4.jpg",
    summary: "H&M has appointed Thomas Estrany as Managing Director of H&M France to lead the brand's continued growth, profitability, and market adaptation in France following a leadership reshuffle within the company.",
    sourceName: "Fashion Network",
    sourceUrl: "http://ww.fashionnetwork.com/news/Thomas-estrany-takes-the-helm-at-h-m-france,1849204.html",
    author: "Thomas Estrany",
    content: [
      "The executive will take over from Pär Lindback. Lindback, for his part, has been promoted to managing director of the business unit covering Denmark, Norway, and Iceland, having previously also overseen Belgium and Luxembourg.",
      "Thomas Estrany has been with the Scandinavian group for more than two decades. His career began in 2002 in Paris as a sales representative, before he rose through the ranks to hold various managerial positions. His responsibilities then took him abroad with successive assignments in Japan, Spain, and Greece.",
      "Since 2022, he has served as sales director for the Greek market, an operational role involving the oversight of ten regional markets, where his primary mission was to support the strengthening and adaptation of the business model.",
      "“France is a key market for the brand- one that is both demanding and full of opportunities,” says Thomas Estrany. “I'm approaching this new chapter with great enthusiasm and a commitment to working closely with the teams, drawing on their dedication and the strength of our collective effort to evolve our model and deliver the best experience for our customers. I'm convinced that we have everything we need to continue our growth in France.”",
      "The new CEO's primary mission is to continue H&M's expansion in France, where the brand has nearly 190 stores, and to strengthen the brand's profitability in the country. The group states that he will, in particular, need to support local teams in continuously adapting the brand's offerings to meet consumers' changing expectations.",
      "This appointment comes just days after H&M poached Diego Teijeiro Ruiz from Inditex to serve as its new chief technology officer.",
      "In 2025, the H&M Group saw its revenue decline to 20.2 billion euros (228 billion kronor), with a net profit of 10.7 billion euros. As of the end of February, the company's various brands comprised a network of 4,050 stores, with 80 new store openings planned for 2026."
    ],
    isMainStory: false
  },
  {
    id: "story-5",
    title: "Rokit Vintage opens in new Soho destination Coven",
    category: "Retail Fashion",
    date: "July 2, 2026",
    image: "assets/images/story-5.jpg",
    summary: "Rokit Vintage has expanded its retail presence by opening a new concession at Coven in Soho, London, combining sustainable vintage fashion with queer culture as part of its ongoing growth strategy.",
    sourceName: "Fashion Network",
    sourceUrl: "https://ww.fashionnetwork.com/news/Rokit-vintage-opens-in-new-soho-destination-coven,1849366.html",
    author: "Fashion Network",
    content: [
      "Rokit Vintage has just opened a concession within Coven, the “highly anticipated queer venue” on London Soho's Old Compton Street - the former location of G-A-Y.",
      "The concession features a curated edit of vintage and Rokit Originals, “designed to reflect Coven's distinctive aesthetic and celebrate individuality, creativity and self-expression.” ",
      "It combines “sustainable fashion, nightlife and queer culture in one of Soho's most exciting new destinations,” with the curated selection of pieces aligned with Coven's “aesthetic… witchy, club-ready, and unapologetically expressive.”",
      "Handpicked pieces are chosen to complement the venue's “unique atmosphere, creating an environment where fashion, nightlife, and queer culture converge.”",
      "Alongside varied evening programming, Coven is set to be open during the day, hence the debut of the Rokit Vintage concession alongside a space to “meet, work, socialise, and discover something new in the heart of London's West End.”",
      "The partnership marks an “exciting new chapter” for Rokit Vintage, “advancing the brand's approach to sustainable fashion,” it noted.",
      "Meanwhile, Rokit says it has also played a key role in “preserving vintage fashion culture in the UK,” via its London Covent Garden, Camden and Brick Lane stores in particular, becoming “cultural landmarks for locals and tourists” while expansion to cities such as Cardiff “reflects the growing demand for sustainable and unique clothing options outside London.” It also noted its international website “has sustained 30% growth year on year.”"
    ],
    isMainStory: false
  },
  {
    id: "story-6",
    title: "Why Distressed Luxury Fashion Is Defining the Biggest Trend of 2026",
    category: "Fashion Trends",
    date: "June 26, 2026",
    image: "assets/images/story-6.jpg",
    summary: "Fashion is increasingly embracing worn-in, imperfect aesthetics as luxury shifts toward authenticity, individuality, and emotional value.",
    sourceName: "Vogue Arabia",
    sourceUrl: "https://www.voguearabia.com/article/distressed-luxury-fashion-trend-of-2026",
    author: "Ruman Baig",
    content: [
      "By Ruman Baig",
      "Many people experience a sense of nostalgia when finding vintage items in old wardrobes or thrift stores, and this appreciation for “lived-in” fashion has now moved into the mainstream. Instead of perfectly new-looking garments, fashion is increasingly celebrating pieces with character, such as softened leather, faded denim, or slightly distressed finishes that suggest age and history.",
      "This trend was especially visible in the SS26 runway shows, where designers like Acne Studios, Dior, Prada, and Balenciaga featured intentionally worn, faded, or textured pieces. Industry voices note that what used to be seen as flaws is now being reframed as desirable, partly influenced by the growing resale market and shifting consumer attitudes.",
      "Cultural figures such as Mary-Kate and Ashley Olsen have also reinforced this aesthetic through their well-known use of vintage and worn luxury bags. Overall, the movement reflects a broader shift in fashion toward authenticity and emotional value, where imperfection is increasingly seen as a form of modern luxury."
    ],
    isMainStory: false
  }
];

window.CampusPulseData = {
  mainStory,
  supportingStories
};
