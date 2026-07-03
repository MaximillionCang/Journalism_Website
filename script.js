(function () {
  const data = window.CampusPulseData;
  const placeholderPath = "assets/images/placeholder.jpg";
  const videoFallbackText = "Main news video will appear here after assets/videos/main-news.mp4 is added.";

  function allArticles() {
    return [data.mainStory].concat(data.supportingStories);
  }

  function storyUrl(article) {
    return `article.html?id=${encodeURIComponent(article.id)}`;
  }

  function goToArticle(article) {
    window.location.href = storyUrl(article);
  }

  function escapeHtml(value) {
    return String(value)
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
        image.replaceWith(fallbackBox("Campus advertisement will appear here.", "ad-fallback"));
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
    root.querySelectorAll("img").forEach(setImageFallback);
  }

  function activateVideoFallbacks(root) {
    root.querySelectorAll("video").forEach((video) => {
      if (video.dataset.fallbackListener === "true") {
        return;
      }

      video.dataset.fallbackListener = "true";
      let replaced = false;
      const showFallback = () => {
        if (replaced) {
          return;
        }
        replaced = true;
        video.replaceWith(fallbackBox(videoFallbackText, "video-fallback"));
      };

      video.addEventListener("error", showFallback);
      video.querySelectorAll("source").forEach((source) => {
        source.addEventListener("error", showFallback);
      });
      video.preload = "metadata";
      video.load();
      window.setTimeout(() => {
        if (video.error || video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
          showFallback();
        }
      }, 600);
    });
  }

  function makeClickable(element, article) {
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

  function renderHero() {
    const hero = document.getElementById("heroStory");
    const story = data.mainStory;

    hero.innerHTML = `
      <span class="badge">${escapeHtml(story.category)}</span>
      <h1>${escapeHtml(story.title)}</h1>
      <video class="hero-video" controls poster="${escapeHtml(story.image)}">
        <source src="${escapeHtml(story.videoPath)}" type="video/mp4">
        ${videoFallbackText}
      </video>
      <p class="summary">${escapeHtml(story.summary)}</p>
      <div class="story-meta">
        <span>${escapeHtml(story.date)}</span>
        <span>${escapeHtml(story.sourceName)}</span>
      </div>
      <a class="read-more" href="${storyUrl(story)}">Read full story</a>
    `;

    hero.addEventListener("click", (event) => {
      if (!event.target.closest("video") && !event.target.closest("a")) {
        goToArticle(story);
      }
    });

    activateImageFallbacks(hero);
    activateVideoFallbacks(hero);
  }

  function renderLeftColumn() {
    const left = document.getElementById("leftColumn");
    const firstStory = data.supportingStories[0];
    const secondStory = data.supportingStories[1];
    left.innerHTML = "";

    const leadCard = document.createElement("article");
    leadCard.className = "side-story large-side-story";
    leadCard.innerHTML = `
      <img src="${escapeHtml(firstStory.image)}" alt="${escapeHtml(firstStory.title)}">
      <span class="label">${escapeHtml(firstStory.category)}</span>
      <h2>${escapeHtml(firstStory.title)}</h2>
      <p>${escapeHtml(firstStory.summary)}</p>
    `;
    makeClickable(leadCard, firstStory);
    left.appendChild(leadCard);

    const smallCard = document.createElement("article");
    smallCard.className = "side-story small-side-story";
    smallCard.innerHTML = `
      <img src="${escapeHtml(secondStory.image)}" alt="${escapeHtml(secondStory.title)}">
      <div>
        <span class="label">${escapeHtml(secondStory.category)}</span>
        <h3>${escapeHtml(secondStory.title)}</h3>
        <div class="meta">${escapeHtml(secondStory.date)}</div>
      </div>
    `;
    makeClickable(smallCard, secondStory);
    left.appendChild(smallCard);

    activateImageFallbacks(left);
  }

  function renderRightColumn() {
    const popularList = document.getElementById("popularList");
    const editorsList = document.getElementById("editorsList");
    const compactStory = document.getElementById("rightCompactStory");
    const popular = [data.mainStory, data.supportingStories[2], data.supportingStories[4], data.supportingStories[5]];
    const editors = [data.supportingStories[0], data.supportingStories[3], data.supportingStories[1]];
    const featured = data.supportingStories[5];

    popularList.innerHTML = popular.map((article) => `
      <li><a href="${storyUrl(article)}">${escapeHtml(article.title)}</a></li>
    `).join("");

    editorsList.innerHTML = editors.map((article) => `
      <li><a href="${storyUrl(article)}">${escapeHtml(article.title)}</a></li>
    `).join("");

    compactStory.className = "sidebar-block compact-feature";
    compactStory.innerHTML = `
      <span class="section-label">Notice Board</span>
      <img src="${escapeHtml(featured.image)}" alt="${escapeHtml(featured.title)}">
      <span class="label">${escapeHtml(featured.category)}</span>
      <h3>${escapeHtml(featured.title)}</h3>
      <p>${escapeHtml(featured.summary)}</p>
    `;
    makeClickable(compactStory, featured);
    activateImageFallbacks(document.querySelector(".right-column"));
  }

  function renderSupportingStories() {
    const grid = document.getElementById("supportingStoriesGrid");
    grid.innerHTML = "";
    data.supportingStories.forEach((article) => {
      grid.appendChild(createCard(article));
    });
  }

  function renderSearchResults(query) {
    const resultsSection = document.getElementById("searchResults");
    const resultsGrid = document.getElementById("searchResultsGrid");
    const normalized = query.trim().toLowerCase();

    resultsGrid.innerHTML = "";

    if (!normalized) {
      resultsSection.hidden = true;
      return;
    }

    const matches = allArticles().filter((article) => {
      const haystack = `${article.title} ${article.category} ${article.summary} ${article.sourceName}`.toLowerCase();
      return haystack.includes(normalized);
    });

    resultsSection.hidden = false;

    if (!matches.length) {
      resultsGrid.innerHTML = '<div class="empty-message">No matching campus stories found.</div>';
      return;
    }

    matches.forEach((article) => {
      resultsGrid.appendChild(createCard(article));
    });
  }

  function setupSearch() {
    const searchToggle = document.getElementById("searchToggle");
    const searchPanel = document.getElementById("searchPanel");
    const searchInput = document.getElementById("searchInput");

    searchToggle.addEventListener("click", () => {
      searchPanel.hidden = !searchPanel.hidden;
      if (!searchPanel.hidden) {
        searchInput.focus();
      }
    });

    searchInput.addEventListener("input", () => renderSearchResults(searchInput.value));

    if (window.location.hash === "#searchPanel") {
      searchPanel.hidden = false;
      searchInput.focus();
    }
  }

  function setupMoreMenu() {
    const button = document.getElementById("moreButton");
    const menu = document.getElementById("moreDropdown");

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

  function init() {
    renderHero();
    renderLeftColumn();
    renderRightColumn();
    renderSupportingStories();
    setupSearch();
    setupMoreMenu();
    activateImageFallbacks(document);
    activateVideoFallbacks(document);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
