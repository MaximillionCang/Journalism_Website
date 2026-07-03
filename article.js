(function () {
  const data = window.ThreadLineData || {};
  const placeholderPath = "assets/images/placeholder.jpg";
  const videoFallbackText = "ThreadLine News video will appear here after the local video file is added.";

  function allArticles() {
    return [data.mainStory].concat(data.supportingStories || []).filter(Boolean);
  }

  function findArticle(id) {
    return allArticles().find((article) => article.id === id);
  }

  function storyUrl(article) {
    return `article.html?id=${encodeURIComponent(article.id)}`;
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

  function relatedArticles(currentArticle) {
    const stories = data.supportingStories || [];
    const categoryMatches = stories.filter((article) => {
      return article.id !== currentArticle.id && article.category === currentArticle.category;
    });

    const otherStories = stories.filter((article) => {
      return article.id !== currentArticle.id && article.category !== currentArticle.category;
    });

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
      <video class="article-video" controls poster="${escapeHtml(article.image)}">
        <source src="${escapeHtml(article.videoPath)}" type="video/mp4">
        ${videoFallbackText}
      </video>
    ` : "";

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
      <img class="article-hero-image" src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}">
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
