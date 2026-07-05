(function () {
  const data = window.ThreadLineData || {};
  const placeholderPath = "assets/images/placeholder.jpg";
  const videoFallbackText = "Video unavailable. Check that the local video file exists at the path listed in data.js.";
  const allCategoryLabel = "All";

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

  function findArticle(id) {
    return allArticles().find((article) => article.id === id);
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

  function renderCategoryNav(activeCategory) {
    const categoryNav = document.getElementById("categoryNav");
    const dropdown = document.getElementById("moreDropdown");
    const categories = [allCategoryLabel].concat(getCategories());

    [categoryNav, dropdown].forEach((container) => {
      if (!container) {
        return;
      }

      container.innerHTML = "";
      categories.forEach((category) => {
        const link = document.createElement("a");
        link.href = categoryUrl(category);
        link.dataset.category = category;
        link.dataset.categorySlug = slugifyCategory(category);
        link.textContent = category;

        if (category === activeCategory || (!activeCategory && category === allCategoryLabel)) {
          link.classList.add("is-active");
          link.setAttribute("aria-current", "page");
        }

        if (container === categoryNav) {
          link.classList.add("category-button");
        }

        container.appendChild(link);
      });
    });
  }

  function relatedArticles(currentArticle) {
    const articles = uniqueArticlesById(allArticles()).filter((article) => article.id !== currentArticle.id);
    const categoryMatches = articles.filter((article) => article.category === currentArticle.category);
    const otherStories = articles.filter((article) => article.category !== currentArticle.category);

    return categoryMatches.concat(otherStories).slice(0, 3);
  }

  function cardMarkup(article) {
    return `
      <article class="news-card related-card" tabindex="0" data-id="${escapeHtml(article.id)}">
        <img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}">
        <span class="label">${escapeHtml(article.category)}</span>
        <h3>${escapeHtml(article.title)}</h3>
        <p>${escapeHtml(article.summary)}</p>
        <div class="meta">${escapeHtml(article.date)} | ${escapeHtml(article.sourceName)}</div>
      </article>
    `;
  }

  function renderNotFound(container) {
    document.title = "Article not found | ThreadLine News";
    container.innerHTML = `
      <div class="not-found">
        <h1>Article not found</h1>
        <p>The article link may be missing or the story ID may have changed.</p>
        <a class="home-button" href="index.html">Back to homepage</a>
      </div>
    `;
  }

  function renderArticle(container, article) {
    const paragraphs = Array.isArray(article.content) ? article.content : [];
    const videoMarkup = article.videoPath ? `
      <video class="article-video" controls preload="metadata" poster="${escapeHtml(article.image)}">
        <source src="${escapeHtml(article.videoPath)}" type="video/mp4">
        ${videoFallbackText}
      </video>
    ` : "";
    const heroImageMarkup = article.videoPath ? "" : `
      <img class="article-hero-image" src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}">
    `;

    const sourceMarkup = article.sourceUrl ? `
      <a class="source-button" href="${escapeHtml(article.sourceUrl)}" target="_blank" rel="noopener">Read original source</a>
    ` : "";

    const related = relatedArticles(article);
    const relatedMarkup = related.length ? `
      <section class="related-section">
        <h2>Related Stories</h2>
        <div class="related-grid">
          ${related.map(cardMarkup).join("")}
        </div>
      </section>
    ` : "";

    document.title = `${article.title} | ThreadLine News`;
    container.innerHTML = `
      <span class="article-kicker">${escapeHtml(article.category)}</span>
      <h1>${escapeHtml(article.title)}</h1>
      <div class="article-meta">
        <span>By ${escapeHtml(article.author || "ThreadLine News")}</span>
        <span>${escapeHtml(article.date)}</span>
        <span>Source: ${escapeHtml(article.sourceName)}</span>
      </div>
      ${heroImageMarkup}
      ${videoMarkup}
      <div class="article-body">
        ${paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      </div>
      ${sourceMarkup}
      ${relatedMarkup}
    `;

    container.querySelectorAll(".related-card").forEach((card) => {
      const openCard = () => {
        window.location.href = `article.html?id=${encodeURIComponent(card.dataset.id)}`;
      };

      card.addEventListener("click", openCard);
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openCard();
        }
      });
    });
  }

  function renderSidebar() {
    const popularList = document.getElementById("popularList");
    const editorsList = document.getElementById("editorsList");
    const stories = data.supportingStories || [];
    const popular = [data.mainStory, stories[0], stories[2], stories[4]].filter(Boolean);
    const editors = [stories[1], stories[3], stories[5]].filter(Boolean);

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
      });
    });
  }

  function init() {
    const params = new URLSearchParams(window.location.search);
    const article = findArticle(params.get("id"));
    const container = document.getElementById("articleContent");

    renderCategoryNav(article ? article.category : allCategoryLabel);

    if (!container) {
      return;
    }

    if (!article) {
      renderNotFound(container);
    } else {
      renderArticle(container, article);
    }

    renderSidebar();
    setupMoreMenu();
    setupMobileMenu();
    activateImageFallbacks(document);
    activateVideoFallbacks(document);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
