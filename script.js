(function () {
  const data = window.ThreadLineData || {};
  const placeholderPath = "assets/images/placeholder.jpg";
  const videoFallbackText = "Video unavailable. Check that the local video file exists at the path listed in data.js.";
  const allCategoryLabel = "All";
  let activeCategory = allCategoryLabel;

  function allArticles() {
    return [data.mainStory].concat(data.supportingStories || []).filter(Boolean);
  }

  function uniqueArticlesById(articles) {
    const seen = new Set();

    return (articles || []).filter((article) => {
      if (!article || !article.id || seen.has(article.id)) {
        return false;
      }

      seen.add(article.id);
      return true;
    });
  }

  function getCategories() {
    const seen = new Set();
    const categories = [];

    allArticles().forEach((article) => {
      const category = String(article.category || "").trim();
      const key = category.toLowerCase();

      if (category && !seen.has(key)) {
        seen.add(key);
        categories.push(category);
      }
    });

    return categories;
  }

  function slugifyCategory(category) {
    return String(category || "")
      .trim()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "all";
  }

  function storyUrl(article) {
    return `article.html?id=${encodeURIComponent(article.id)}`;
  }

  function categoryUrl(category) {
    if (category === allCategoryLabel) {
      return "index.html";
    }

    const value = category === allCategoryLabel ? allCategoryLabel : category;
    return `index.html?category=${encodeURIComponent(value)}#categoryResults`;
  }

  function goToArticle(article) {
    window.location.href = storyUrl(article);
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function fallbackBox(message, className) {
    const box = document.createElement("div");
    box.className = className ? `fallback-box ${className}` : "fallback-box";
    box.textContent = message;
    return box;
  }

  function setImageFallback(image) {
    if (image.dataset.fallbackListener === "true") {
      return;
    }

    image.dataset.fallbackListener = "true";
    image.addEventListener("error", function () {
      if (image.dataset.fallback === "ad") {
        image.replaceWith(fallbackBox("ThreadLine News advertisement will appear here.", "ad-fallback"));
        return;
      }

      if (!image.dataset.usedPlaceholder) {
        image.dataset.usedPlaceholder = "true";
        image.src = placeholderPath;
        return;
      }

      image.replaceWith(fallbackBox("Image unavailable", "image-fallback"));
    });
  }

  function activateImageFallbacks(root) {
    if (!root) {
      return;
    }
    root.querySelectorAll("img").forEach(setImageFallback);
  }

  function activateVideoFallbacks(root) {
    if (!root) {
      return;
    }

    root.querySelectorAll("video").forEach((video) => {
      if (video.dataset.fallbackListener === "true") {
        return;
      }

      video.dataset.fallbackListener = "true";
      let replaced = false;
      const sources = Array.from(video.querySelectorAll("source"));
      const hasSource = sources.some((source) => source.getAttribute("src"));

      const showFallback = () => {
        if (replaced || video.readyState > 0) {
          return;
        }
        replaced = true;
        video.replaceWith(fallbackBox(videoFallbackText, "video-fallback"));
      };

      if (!hasSource) {
        showFallback();
        return;
      }

      video.preload = "metadata";
      video.addEventListener("error", showFallback);
      sources.forEach((source) => {
        source.addEventListener("error", showFallback);
      });
    });
  }

  function makeClickable(element, article) {
    if (!element || !article) {
      return;
    }

    element.tabIndex = 0;
    element.addEventListener("click", () => goToArticle(article));
    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        goToArticle(article);
      }
    });
  }

  function createCard(article, className) {
    const card = document.createElement("article");
    card.className = className ? `news-card ${className}` : "news-card";
    card.innerHTML = `
      <img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}">
      <span class="label">${escapeHtml(article.category)}</span>
      <h3>${escapeHtml(article.title)}</h3>
      <p>${escapeHtml(article.summary)}</p>
      <div class="meta">${escapeHtml(article.date)} | ${escapeHtml(article.sourceName)}</div>
    `;
    makeClickable(card, article);
    activateImageFallbacks(card);
    return card;
  }

  function normalizeCategory(category) {
    const requested = String(category || "").trim();

    if (!requested || requested.toLowerCase() === allCategoryLabel.toLowerCase()) {
      return allCategoryLabel;
    }

    return getCategories().find((item) => item.toLowerCase() === requested.toLowerCase()) || allCategoryLabel;
  }

  function updateActiveCategoryButtons() {
    document.querySelectorAll("[data-category]").forEach((element) => {
      const isActive = element.dataset.category === activeCategory;
      element.classList.toggle("is-active", isActive);
      if (element.classList.contains("category-button")) {
        element.setAttribute("aria-pressed", String(isActive));
      }
    });
  }

  function renderCategoryResults(category) {
    const section = document.getElementById("categoryResults");
    const title = document.getElementById("categoryResultsTitle");
    const grid = document.getElementById("categoryResultsGrid");
    activeCategory = normalizeCategory(category);

    if (!section || !title || !grid) {
      updateActiveCategoryButtons();
      return;
    }

    grid.innerHTML = "";

    if (activeCategory === allCategoryLabel) {
      section.hidden = true;
      updateActiveCategoryButtons();
      return;
    }

    const matchingStories = uniqueArticlesById(
      (data.supportingStories || []).filter((article) => article.category === activeCategory)
    );

    title.textContent = `${activeCategory} Stories`;
    section.hidden = false;

    if (!matchingStories.length) {
      grid.innerHTML = '<div class="empty-message">No supporting stories are available in this category yet.</div>';
    } else {
      matchingStories.forEach((article) => {
        grid.appendChild(createCard(article));
      });
    }

    updateActiveCategoryButtons();
  }

  function handleCategoryClick(event) {
    const trigger = event.currentTarget;
    const category = trigger.dataset.category || allCategoryLabel;
    const menu = trigger.closest(".more-dropdown");

    event.preventDefault();
    renderCategoryResults(category);
    window.history.pushState({}, "", categoryUrl(activeCategory));

    if (menu) {
      menu.hidden = true;
      const button = document.getElementById("moreButton");
      if (button) {
        button.setAttribute("aria-expanded", "false");
      }
    }

    const results = document.getElementById("categoryResults");
    const normalHomepageTarget = document.getElementById("heroStory");
    if (activeCategory === allCategoryLabel && normalHomepageTarget) {
      normalHomepageTarget.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (results) {
      results.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function renderCategoryNav() {
    const categoryNav = document.getElementById("categoryNav");
    const dropdown = document.getElementById("moreDropdown");
    const categories = [allCategoryLabel].concat(getCategories());

    if (categoryNav) {
      categoryNav.innerHTML = "";
      categories.forEach((category) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "category-button";
        button.dataset.category = category;
        button.dataset.categorySlug = slugifyCategory(category);
        button.setAttribute("aria-pressed", "false");
        button.textContent = category;
        button.addEventListener("click", handleCategoryClick);
        categoryNav.appendChild(button);
      });
    }

    if (dropdown) {
      dropdown.innerHTML = "";
      categories.forEach((category) => {
        const link = document.createElement("a");
        link.href = categoryUrl(category);
        link.dataset.category = category;
        link.dataset.categorySlug = slugifyCategory(category);
        link.textContent = category;
        link.addEventListener("click", handleCategoryClick);
        dropdown.appendChild(link);
      });
    }

    updateActiveCategoryButtons();
  }

  function renderHero() {
    const hero = document.getElementById("heroStory");
    const story = data.mainStory;

    if (!hero || !story) {
      return;
    }

    const paragraphs = Array.isArray(story.content) ? story.content : [];
    const videoMarkup = story.videoPath ? `
      <video class="hero-video" controls preload="metadata" poster="${escapeHtml(story.image)}">
        <source src="${escapeHtml(story.videoPath)}" type="video/mp4">
        ${videoFallbackText}
      </video>
    ` : `<div class="fallback-box video-fallback">${escapeHtml(videoFallbackText)}</div>`;

    const summaryMarkup = story.summary ? `<p class="summary">${escapeHtml(story.summary)}</p>` : "";

    hero.innerHTML = `
      <span class="badge">${escapeHtml(story.category || "Top Story")}</span>
      <h1>${escapeHtml(story.title)}</h1>
      ${summaryMarkup}
      <div class="story-meta">
        <span>${escapeHtml(story.date)}</span>
        <span>${escapeHtml(story.sourceName)}</span>
      </div>
      ${videoMarkup}
      <div class="homepage-article-body">
        <h2>Full Report</h2>
        ${paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      </div>
      <a class="read-more" href="${storyUrl(story)}">Open article page</a>
    `;

    activateImageFallbacks(hero);
    activateVideoFallbacks(hero);
  }

  function renderLeftColumn() {
    const left = document.getElementById("leftColumn");
    const stories = data.supportingStories || [];

    if (!left) {
      return;
    }

    left.innerHTML = "";

    if (!stories.length) {
      left.appendChild(fallbackBox("Supporting stories will appear here.", "image-fallback"));
      return;
    }

    const leadStory = stories[0];
    const leadCard = document.createElement("article");
    leadCard.className = "side-story large-side-story";
    leadCard.innerHTML = `
      <img src="${escapeHtml(leadStory.image)}" alt="${escapeHtml(leadStory.title)}">
      <span class="label">${escapeHtml(leadStory.category)}</span>
      <h2>${escapeHtml(leadStory.title)}</h2>
      <p>${escapeHtml(leadStory.summary)}</p>
    `;
    makeClickable(leadCard, leadStory);
    left.appendChild(leadCard);

    stories.slice(1, 4).forEach((story) => {
      const smallCard = document.createElement("article");
      smallCard.className = "side-story small-side-story";
      smallCard.innerHTML = `
        <img src="${escapeHtml(story.image)}" alt="${escapeHtml(story.title)}">
        <div>
          <span class="label">${escapeHtml(story.category)}</span>
          <h3>${escapeHtml(story.title)}</h3>
          <div class="meta">${escapeHtml(story.date)}</div>
        </div>
      `;
      makeClickable(smallCard, story);
      left.appendChild(smallCard);
    });

    activateImageFallbacks(left);
  }

  function renderRightColumn() {
    const popularList = document.getElementById("popularList");
    const editorsList = document.getElementById("editorsList");
    const compactStory = document.getElementById("rightCompactStory");
    const stories = data.supportingStories || [];
    const popular = [data.mainStory, stories[2], stories[4], stories[5]].filter(Boolean);
    const editors = [stories[0], stories[3], stories[1]].filter(Boolean);
    const featured = stories[5] || stories[0];

    if (popularList) {
      popularList.innerHTML = popular.map((article) => `
        <li><a href="${storyUrl(article)}">${escapeHtml(article.title)}</a></li>
      `).join("");
    }

    if (editorsList) {
      editorsList.innerHTML = editors.map((article) => `
        <li><a href="${storyUrl(article)}">${escapeHtml(article.title)}</a></li>
      `).join("");
    }

    if (compactStory && featured) {
      compactStory.className = "sidebar-block compact-feature";
      compactStory.innerHTML = `
        <span class="section-label">Featured Story</span>
        <img src="${escapeHtml(featured.image)}" alt="${escapeHtml(featured.title)}">
        <span class="label">${escapeHtml(featured.category)}</span>
        <h3>${escapeHtml(featured.title)}</h3>
        <p>${escapeHtml(featured.summary)}</p>
      `;
      makeClickable(compactStory, featured);
    }

    activateImageFallbacks(document.querySelector(".right-column"));
  }

  function renderSupportingStories() {
    const grid = document.getElementById("supportingStoriesGrid");
    const stories = data.supportingStories || [];

    if (!grid) {
      return;
    }

    grid.innerHTML = "";

    if (!stories.length) {
      grid.innerHTML = '<div class="empty-message">More ThreadLine News stories will appear here.</div>';
      return;
    }

    stories.forEach((article) => {
      grid.appendChild(createCard(article));
    });
  }

  function renderSearchResults(query) {
    const resultsSection = document.getElementById("searchResults");
    const resultsGrid = document.getElementById("searchResultsGrid");
    const normalized = query.trim().toLowerCase();

    if (!resultsSection || !resultsGrid) {
      return;
    }

    resultsGrid.innerHTML = "";

    if (!normalized) {
      resultsSection.hidden = true;
      return;
    }

    const matches = allArticles().filter((article) => {
      const haystack = `${article.title || ""} ${article.category || ""} ${article.summary || ""} ${article.sourceName || ""}`.toLowerCase();
      return haystack.includes(normalized);
    });

    resultsSection.hidden = false;

    if (!matches.length) {
      resultsGrid.innerHTML = '<div class="empty-message">No matching ThreadLine News stories found.</div>';
      return;
    }

    matches.forEach((article) => {
      resultsGrid.appendChild(createCard(article));
    });
  }

  function openSearchPanel() {
    const searchPanel = document.getElementById("searchPanel");
    const searchInput = document.getElementById("searchInput");

    if (!searchPanel || !searchInput) {
      return;
    }

    searchPanel.hidden = false;
    searchInput.focus();
  }

  function setupSearch() {
    const searchToggle = document.getElementById("searchToggle");
    const searchPanel = document.getElementById("searchPanel");
    const searchInput = document.getElementById("searchInput");

    if (!searchPanel || !searchInput) {
      return;
    }

    if (searchToggle) {
      searchToggle.addEventListener("click", () => {
        searchPanel.hidden = !searchPanel.hidden;
        if (!searchPanel.hidden) {
          searchInput.focus();
        }
      });
    }

    document.querySelectorAll('a[href="#searchPanel"]').forEach((link) => {
      link.addEventListener("click", () => {
        window.setTimeout(openSearchPanel, 0);
      });
    });

    searchInput.addEventListener("input", () => renderSearchResults(searchInput.value));

    if (window.location.hash === "#searchPanel") {
      openSearchPanel();
    }
  }

  function setupMoreMenu() {
    const button = document.getElementById("moreButton");
    const menu = document.getElementById("moreDropdown");

    if (!button || !menu) {
      return;
    }

    button.addEventListener("click", () => {
      menu.hidden = !menu.hidden;
      button.setAttribute("aria-expanded", String(!menu.hidden));
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".more-menu")) {
        menu.hidden = true;
        button.setAttribute("aria-expanded", "false");
      }
    });
  }

  function setupMobileMenu() {
    const button = document.getElementById("mobileMenuButton");
    const menu = document.getElementById("mobileMenu");

    if (!button || !menu) {
      return;
    }

    button.addEventListener("click", () => {
      menu.hidden = !menu.hidden;
      button.setAttribute("aria-expanded", String(!menu.hidden));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.hidden = true;
        button.setAttribute("aria-expanded", "false");
        if (link.getAttribute("href") === "#searchPanel") {
          window.setTimeout(openSearchPanel, 0);
        }
      });
    });
  }

  function pollVoteKey(poll) {
    return `threadline_poll_votes_${poll.id}`;
  }

  function pollChoiceKey(poll) {
    return `threadline_poll_choice_${poll.id}`;
  }

  function readPollVotes(poll) {
    const saved = localStorage.getItem(pollVoteKey(poll));

    if (!saved) {
      return poll.options.map(() => 0);
    }

    try {
      const parsed = JSON.parse(saved);
      return poll.options.map((option, index) => Number(parsed[index]) || 0);
    } catch (error) {
      return poll.options.map(() => 0);
    }
  }

  function savePollVotes(poll, votes) {
    localStorage.setItem(pollVoteKey(poll), JSON.stringify(votes));
  }

  function clearPollData(poll) {
    localStorage.removeItem(pollVoteKey(poll));
    localStorage.removeItem(pollChoiceKey(poll));
  }

  function renderPoll() {
    const container = document.getElementById("pollSection");
    const poll = data.homepagePoll;

    if (!container || !poll || !Array.isArray(poll.options) || !poll.options.length) {
      return;
    }

    const choiceKey = pollChoiceKey(poll);
    const savedChoice = localStorage.getItem(choiceKey);
    const votes = readPollVotes(poll);
    const totalVotes = votes.reduce((sum, count) => sum + count, 0);

    container.innerHTML = `
      <h2>Reader Poll</h2>
      <p class="poll-question">${escapeHtml(poll.question)}</p>
      <form id="pollForm" class="poll-form"></form>
      <div id="pollResults" class="poll-results"></div>
    `;

    const form = document.getElementById("pollForm");
    const results = document.getElementById("pollResults");

    poll.options.forEach((option, index) => {
      const label = document.createElement("label");
      label.className = "poll-option";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "homepagePoll";
      input.value = String(index);
      input.disabled = Boolean(savedChoice);
      if (savedChoice === String(index)) {
        input.checked = true;
      }

      const span = document.createElement("span");
      span.textContent = option;

      label.append(input, span);
      form.appendChild(label);
    });

    const voteButton = document.createElement("button");
    voteButton.className = "read-more poll-vote";
    voteButton.type = "submit";
    voteButton.textContent = savedChoice ? "Vote recorded" : "Vote";
    voteButton.disabled = Boolean(savedChoice);

    const clearVoteButton = document.createElement("button");
    clearVoteButton.className = "secondary-button poll-clear-vote";
    clearVoteButton.type = "button";
    clearVoteButton.textContent = "Clear local vote";

    const actions = document.createElement("div");
    actions.className = "poll-actions";
    actions.append(voteButton, clearVoteButton);
    form.appendChild(actions);

    // Poll results are stored locally in this browser only; there is no backend or shared vote count.
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const selected = form.querySelector("input[name='homepagePoll']:checked");

      if (!selected) {
        results.textContent = "Choose an option before voting.";
        return;
      }

      const selectedIndex = Number(selected.value);
      votes[selectedIndex] += 1;
      savePollVotes(poll, votes);
      localStorage.setItem(choiceKey, String(selectedIndex));
      renderPoll();
    });

    clearVoteButton.addEventListener("click", () => {
      clearPollData(poll);
      renderPoll();
    });

    if (savedChoice) {
      results.innerHTML = "";
      poll.options.forEach((option, index) => {
        const percent = totalVotes ? Math.round((votes[index] / totalVotes) * 100) : 0;
        const row = document.createElement("div");
        row.className = "poll-result-row";
        row.innerHTML = `
          <div class="poll-result-label">
            <span>${escapeHtml(option)}</span>
            <strong>${percent}%</strong>
          </div>
          <div class="poll-result-bar"><span style="width: ${percent}%"></span></div>
          <div class="poll-count">${votes[index]} vote${votes[index] === 1 ? "" : "s"}</div>
        `;
        results.appendChild(row);
      });
    }
  }

  function getSavedComments() {
    const saved = localStorage.getItem("threadline_homepage_comments");

    if (!saved) {
      return [];
    }

    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function saveComments(comments) {
    localStorage.setItem("threadline_homepage_comments", JSON.stringify(comments));
  }

  function renderComments() {
    const list = document.getElementById("commentList");
    const settings = data.commentSettings || {};
    const comments = getSavedComments();

    if (!list) {
      return;
    }

    list.innerHTML = "";

    if (!comments.length) {
      const empty = document.createElement("div");
      empty.className = "empty-message";
      empty.textContent = settings.emptyMessage || "No comments yet. Be the first to comment.";
      list.appendChild(empty);
      return;
    }

    comments.forEach((comment) => {
      const article = document.createElement("article");
      article.className = "comment-card";

      const name = document.createElement("strong");
      name.textContent = comment.name;

      const date = document.createElement("span");
      date.className = "comment-date";
      date.textContent = new Date(comment.createdAt).toLocaleString();

      const text = document.createElement("p");
      text.textContent = comment.text;

      article.append(name, date, text);
      list.appendChild(article);
    });
  }

  function setupComments() {
    const settings = data.commentSettings || {};
    const title = document.getElementById("commentsTitle");
    const description = document.getElementById("commentsDescription");
    const form = document.getElementById("commentForm");
    const nameInput = document.getElementById("commentName");
    const textInput = document.getElementById("commentText");
    const submit = document.getElementById("commentSubmit");
    const clear = document.getElementById("clearComments");
    const message = document.getElementById("commentMessage");

    if (!form || !nameInput || !textInput) {
      return;
    }

    if (title) {
      title.textContent = settings.title || "Comments";
    }
    if (description) {
      description.textContent = settings.description || "Comments are saved only in this browser.";
    }
    nameInput.placeholder = settings.namePlaceholder || "Your name";
    nameInput.setAttribute("aria-label", settings.namePlaceholder || "Your name");
    textInput.placeholder = settings.commentPlaceholder || "Write a comment...";
    textInput.setAttribute("aria-label", settings.commentPlaceholder || "Write a comment");
    if (submit) {
      submit.textContent = settings.submitLabel || "Post Comment";
    }
    if (clear) {
      clear.textContent = settings.clearLabel || "Clear local comments";
    }

    // Comments are local-only and saved in this browser with localStorage.
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = nameInput.value.trim().slice(0, 40);
      const text = textInput.value.trim().slice(0, 300);

      if (!name || !text) {
        if (message) {
          message.textContent = "Please enter your name and comment.";
        }
        return;
      }

      const comments = getSavedComments();
      comments.unshift({
        name,
        text,
        createdAt: new Date().toISOString()
      });
      saveComments(comments);
      form.reset();
      if (message) {
        message.textContent = "Comment saved locally in this browser.";
      }
      renderComments();
    });

    if (clear) {
      clear.addEventListener("click", () => {
        localStorage.removeItem("threadline_homepage_comments");
        if (message) {
          message.textContent = "Local comments cleared.";
        }
        renderComments();
      });
    }

    renderComments();
  }

  function renderInitialCategoryFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    if (category) {
      renderCategoryResults(category);
      return;
    }

    activeCategory = allCategoryLabel;
    const section = document.getElementById("categoryResults");
    const grid = document.getElementById("categoryResultsGrid");
    if (section) {
      section.hidden = true;
    }
    if (grid) {
      grid.innerHTML = "";
    }
    updateActiveCategoryButtons();
  }

  function init() {
    document.title = "ThreadLine News";
    renderCategoryNav();
    renderHero();
    renderLeftColumn();
    renderRightColumn();
    renderSupportingStories();
    renderInitialCategoryFromUrl();
    renderPoll();
    setupComments();
    setupSearch();
    setupMoreMenu();
    setupMobileMenu();
    activateImageFallbacks(document);
    activateVideoFallbacks(document);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
