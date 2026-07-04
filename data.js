// ThreadLine News content lives here.
// Edit the main story first, then replace the supporting stories below.
// Paste each source URL into sourceUrl and replace image paths when your images are ready.

const mainStory = {
  id: "main-campus-story",
  title: "Second-Hand, First Choice: FYNEDRIP Brings Thrifting Culture to Xiamen University",
  category: "Event",
  date: "July 3, 2026",
  image: "assets/images/main-story.png",
  videoPath: "assets/videos/Main-Text-Video.mp4",
  summary: "The main story is reserved for your manually written campus report and local video file. Replace this sample text when your final story is ready.",
  sourceName: "ThreadLine News Desk",
  sourceUrl: "https://example.com/main-campus-story",
  author: "YOVELA KARUNIA",
  content: [
    "SEPANG: Students and fashion enthusiasts gathered at Xiamen University Malaysia during a thrifting event for a cheaper and more sustainable choice of fashion last Thursday.",
    "The vice-organising chairperson of FyneDrip, Then Nelsen said that purchasing second-hand clothing would reduce textile-waste of the fashion industry, especially among a generation that has such an interest in shopping. ",
    "“Students are satisfied with this event and they look interested because this is the first thrifting event in Xiamen,” he said.",
    "Living in a university in the outskirts of the city, students get a chance to purchase good quality clothes without having to travel far.",
    "“I hope visitors can know that if you want to buy a good style or good shirt, you can go thrifting with a low price,” Nelsen added.",
    "As a sports enthusiast, a customer at FyneDrip, Ricwan Victoriano agrees that thrifting provides a much cheaper alternative than buying the original piece, especially when looking for sports jerseys.",
    "He also added that thrifting does not only benefit himself as a customer, but also towards the environment that everybody lives in.",
    "\"I think thrifting is very important because these days, mostly everything is environmentally friendly so I think fashion can also catch up with the times,\" Victoriano said.",
    "Not only from the perspective of the customers, vendor owners are also being more aware of what is happening in the fashion industry.",
    "“More people are aware that it's (the fashion industry) ruining our environment,” Cherlyn, a thrifting vendor said about the textile waste from fast fashion.",
    "“Child labour has been a really bad thing, especially when it comes to the clothes business,” she added.",
    "Cherlyn also said that thrifting has been increasingly trending since a lot of people are interested in nostalgic trends such as clothes from the 2000s.",
    "“It's more vibrant, it's more colourful, it's more playful,” she said.",
    "Cherlyn added that thrifting requires more effort in the curation of collections that are appropriate to sell.",
    "“I select based on what I think my personal style is and what I do like.”",
    "“Some of the clothes are clothes I've never worn, but they're clothes I would like to wear,” she said.",
    "Throughout the event, many people came in and purchased various types of clothing including accessories like bracelets or belts.",
    "Nelsen said that feedback from customers and students are mostly positive feedback, as a lot of them are interested in the personally curated collections available."
  ],
  isMainStory: true
};

// Edit these supporting stories. Keep the id values if you want the current links to stay working.
const supportingStories = [
  {
    id: "story-1",
    title: "NYMD announces designer lineup for SS27 edition",
    category: "Event",
    date: "July 1, 2026",
    image: "assets/images/story-1.jpg",
    summary: "New York Men's Day has announced its Spring/Summer 2027 designer lineup, featuring a mix of returning and debut brands.",
    sourceName: "Fashion United UK",
    sourceUrl: "https://fashionunited.com/news/fashion/nymd-announces-designer-lineup-for-s-s27-edition/2026070273299",
    author: "Danielle Wightman-Stone",
    content: [
      "New York Men's Day, the biannual menswear showcase presented by Project and Coterie by Informa, has announced the designer lineup for its Spring/Summer 2027 event.",
      "The edition will take place on September 10 at Mercedes-Benz of Manhattan, opening New York Fashion Week with returning and first-time participants.",
      "Organizers said the platform continues to support both returning and emerging designers by giving them an industry-facing stage."
    ],
    isMainStory: false
  },
  {
    id: "story-2",
    title: "Nic+Zoe launches new sub-brand targeting younger customers",
    category: "Fashion Business",
    date: "June 30, 2026",
    image: "assets/images/story-2.jpg",
    summary: "Nic+Zoe has launched NZ by Nic+Zoe, a new and more affordable sub-brand targeting younger consumers.",
    sourceName: "Fashion Business",
    sourceUrl: "https://fashionunited.uk/news/fashion/nic-zoe-launches-new-sub-brand-targeting-younger-customers/2026070188939",
    author: "Danielle Wightman-Stone",
    content: [
      "Boston-based womenswear brand Nic+Zoe has expanded its portfolio with the launch of NZ by Nic+Zoe, a new sub-brand targeting younger consumers.",
      "The collection offers a more youthful take on capsule wardrobes, featuring mix-and-match essentials at a more affordable price point.",
      "The launch supports the brand's strategy to attract new customers and complement its main collection with a more casual aesthetic."
    ],
    isMainStory: false
  },
  {
    id: "story-3",
    title: "Filmar's revenue rises to 60 million euros as company expands its product line",
    category: "Fashion Business",
    date: "June 29, 2026",
    image: "assets/images/story-3.jpg",
    summary: "Italian yarn manufacturer Filmar is strengthening its luxury textile position through innovation, sustainability work, and higher-end yarn offerings.",
    sourceName: "Fashion Network",
    sourceUrl: "https://ww.fashionnetwork.com/news/Filmar-s-revenue-rises-to-60-million-euros-as-company-expands-its-product-line,1849263.html",
    author: "Gianluca Bolelli",
    content: [
      "Italian yarn manufacturer Filmar continues to expand its business through innovation, sustainability, and a stronger focus on the luxury market.",
      "The company offers dyed, fashion-focused yarns and has introduced ecommerce tools that allow business and individual customers to purchase yarn online.",
      "Filmar reported 60 million euros in revenue in 2025 and is moving toward more specialized yarns to differentiate itself from lower-cost competitors."
    ],
    isMainStory: false
  },
  {
    id: "story-4",
    title: "Thomas Estrany takes the helm at H&M France",
    category: "Fashion Business",
    date: "June 28, 2026",
    image: "assets/images/story-4.jpg",
    summary: "H&M has appointed Thomas Estrany as Managing Director of H&M France following a leadership reshuffle within the company.",
    sourceName: "Fashion Network",
    sourceUrl: "http://ww.fashionnetwork.com/news/Thomas-estrany-takes-the-helm-at-h-m-france,1849204.html",
    author: "Fashion Network",
    content: [
      "Thomas Estrany has been with the Scandinavian group for more than two decades, beginning his career in Paris before rising through several managerial positions.",
      "Since 2022, he has served as sales director for the Greek market, where he supported business model strengthening across several regional markets.",
      "His main mission in France will be to support local teams, continue growth, and adapt the brand's offer to changing customer expectations."
    ],
    isMainStory: false
  },
  {
    id: "story-5",
    title: "Rokit Vintage opens in new Soho destination Coven",
    category: "Retail Fashion",
    date: "July 2, 2026",
    image: "assets/images/story-5.jpg",
    summary: "Rokit Vintage has expanded its retail presence by opening a new concession at Coven in Soho, London.",
    sourceName: "Fashion Network",
    sourceUrl: "https://ww.fashionnetwork.com/news/Rokit-vintage-opens-in-new-soho-destination-coven,1849366.html",
    author: "Fashion Network",
    content: [
      "Rokit Vintage has opened a concession within Coven on London's Old Compton Street, bringing vintage fashion into a new Soho venue.",
      "The concession features a curated edit of vintage and Rokit Originals designed to reflect the venue's expressive aesthetic.",
      "The partnership marks a new chapter for Rokit Vintage and supports the brand's wider approach to sustainable fashion."
    ],
    isMainStory: false
  },
  {
    id: "story-6",
    title: "Why distressed luxury fashion is defining a major 2026 trend",
    category: "Fashion Trends",
    date: "June 26, 2026",
    image: "assets/images/story-6.jpg",
    summary: "Fashion is increasingly embracing worn-in aesthetics as luxury shifts toward authenticity, individuality, and emotional value.",
    sourceName: "Vogue Arabia",
    sourceUrl: "https://www.voguearabia.com/article/distressed-luxury-fashion-trend-of-2026",
    author: "Ruman Baig",
    content: [
      "Many people feel nostalgia when finding vintage items in old wardrobes or thrift stores, and this appreciation for lived-in fashion has moved into the mainstream.",
      "Recent runway collections have featured intentionally worn, faded, and textured pieces, reframing imperfections as desirable design details.",
      "The movement reflects a broader shift toward authenticity and emotional value, where imperfection is increasingly seen as a form of modern luxury."
    ],
    isMainStory: false
  }
];

// Edit this homepage poll text and options as needed.
const homepagePoll = {
  id: "homepage-poll-1",
  question: "Which topic should ThreadLine News cover next?",
  options: [
    "fashion business",
    "trends",
    "fashion events",
    "brand strategy"
  ]
};

// Edit this local comment section text as needed.
const commentSettings = {
  title: "Comments",
  description: "Share your thoughts about the latest ThreadLine News stories. Comments are saved only in this browser.",
  namePlaceholder: "Your name",
  commentPlaceholder: "Write a comment...",
  submitLabel: "Post Comment",
  emptyMessage: "No comments yet. Be the first to comment.",
  clearLabel: "Clear local comments"
};

window.ThreadLineData = {
  mainStory,
  supportingStories,
  homepagePoll,
  commentSettings
};
