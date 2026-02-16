document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".js-repo-card[data-repo]"));
  if (!cards.length) return;

  const nf = new Intl.NumberFormat("en-US");

  const fillCard = (card, data) => {
    const description = card.querySelector(".github-repo-card__description");
    const pills = card.querySelectorAll(".github-repo-card__pill");
    const [stars, forks, language] = pills;

    if (description) {
      description.textContent = data.description || "No description provided.";
    }
    if (stars) {
      stars.textContent = `Stars: ${nf.format(data.stargazers_count || 0)}`;
    }
    if (forks) {
      forks.textContent = `Forks: ${nf.format(data.forks_count || 0)}`;
    }
    if (language) {
      language.textContent = `Language: ${data.language || "N/A"}`;
    }
  };

  const setErrorState = (card) => {
    const description = card.querySelector(".github-repo-card__description");
    if (description) {
      description.textContent = "Live metadata unavailable right now. Open the repository for the latest details.";
    }
  };

  cards.forEach(async (card) => {
    const repo = card.dataset.repo;
    if (!repo) return;

    try {
      const response = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: { Accept: "application/vnd.github+json" },
      });

      if (!response.ok) {
        throw new Error(`GitHub API request failed (${response.status})`);
      }

      const data = await response.json();
      fillCard(card, data);
    } catch (error) {
      setErrorState(card);
      console.warn(`Failed to load ${repo}:`, error);
    }
  });
});
