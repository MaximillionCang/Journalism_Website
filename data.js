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
    summary: "Student bands, dance teams, and creative clubs can register for showcase slots before the final program is announced.",
    sourceName: "Campus Activities Office",
    sourceUrl: "https://example.com/campus-fest-registration",
    author: "Danielle Wightman-Stone",
    content: [
      "The Campus Fest committee has opened registration for student performers who want to join this year's main showcase program.",
      "Organizers said the schedule will include music, food stalls, games, and short exhibitions from student organizations.",
      "Students who want to participate should prepare a short description of their performance and submit it before the posted deadline."
    ],
    isMainStory: false
  },
  {
    id: "story-2",
    title: "Nic+Zoe launches new sub-brand targeting younger customers",
    category: "Student Life",
    date: "June 30, 2026",
    image: "assets/images/story-2.jpg",
    summary: "Mentor teams are planning help desks, campus tours, and quick orientation talks for new students arriving this semester.",
    sourceName: "Student Affairs Bulletin",
    sourceUrl: "https://example.com/freshers-week-mentors",
    author: "Danielle Wightman-Stone",
    content: [
      "Freshers Week mentors are preparing welcome booths to help new students find classrooms, offices, libraries, and student service counters.",
      "The program will include short campus tours and small group discussions about academic expectations and student life.",
      "Student Affairs reminded mentors to keep information simple, friendly, and accurate so new students can settle in quickly."
    ],
    isMainStory: false
  },
  {
    id: "story-3",
    title: "Filmar's revenue rises to 60 million euros as company expands its product line",
    category: "Academics",
    date: "June 29, 2026",
    image: "assets/images/story-3.jpg",
    summary: "The new schedule includes revision sessions, consultation hours, and reminders about academic integrity rules.",
    sourceName: "Academic Services",
    sourceUrl: "https://example.com/exam-preparation-schedule",
    author: "Gianluca Bolelli",
    content: [
      "The Academic Services office has published an updated preparation schedule ahead of the next exam period.",
      "Several departments will run revision sessions and consultation hours to help students review course material before final assessments.",
      "The office also reminded students to read exam instructions carefully and follow all academic integrity rules."
    ],
    isMainStory: false
  },
  {
    id: "story-4",
    title: "Thomas Estrany takes the helm at H&M France",
    category: "Clubs",
    date: "June 28, 2026",
    image: "assets/images/story-4.jpg",
    summary: "The workshop will cover argument structure, stage confidence, and practical feedback for beginner speakers.",
    sourceName: "Campus Clubs Board",
    sourceUrl: "https://example.com/debate-workshop",
    author: "Thomas Estrany",
    content: [
      "The university debate club is inviting students from all majors to attend a public speaking workshop this month.",
      "Club members will introduce basic argument structure, speaking rhythm, and ways to answer questions during discussions.",
      "The session is designed for beginners, and participants do not need previous debate experience to join."
    ],
    isMainStory: false
  },
  {
    id: "story-5",
    title: "Rokit Vintage opens in new Soho destination Coven",
    category: "Sports",
    date: "June 27, 2026",
    image: "assets/images/story-5.jpg",
    summary: "Teams are preparing for football, basketball, badminton, and relay events as student supporters plan match-day activities.",
    sourceName: "University Sports Unit",
    sourceUrl: "https://example.com/intercampus-sports-day",
    author: "Nadia Pratama",
    content: [
      "Faculty teams have begun training for the annual intercampus sports day, with several practice sessions scheduled after classes.",
      "The Sports Unit said the event will include football, basketball, badminton, and relay competitions.",
      "Student groups are also planning supporter activities to keep the event organized and welcoming for spectators."
    ],
    isMainStory: false
  },
  {
    id: "story-6",
    title: "The Understated Summer Top Fashion People Are Wearing With Silk Pants and Maxi Skirts",
    category: "Announcements",
    date: "June 26, 2026",
    image: "assets/images/story-6.jpg",
    summary: "Applicants are encouraged to review transcript, recommendation letter, and financial document requirements before submission.",
    sourceName: "Scholarship Office",
    sourceUrl: "https://example.com/scholarship-deadlines",
    author: "Anna LaPlaca",
    content: [
      "The Scholarship Office is reminding students to check document requirements before submitting applications for the next funding cycle.",
      "Applicants may need transcripts, recommendation letters, activity records, and financial documents depending on the scholarship type.",
      "The office encouraged students to prepare early so missing files do not delay the review process."
    ],
    isMainStory: false
  }
];

window.CampusPulseData = {
  mainStory,
  supportingStories
};
