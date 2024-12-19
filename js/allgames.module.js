import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

export class Games {
  constructor() {
    this.ui = new Ui(); // Initialize UI class
    this.initializeEvents(); // Set up menu and category events
    this.loadInitialGames(); // Load default category
  }

  // Load the default category
  async loadInitialGames() {
    await this.fetchGames("mmorpg");
  }

  // Set up menu navigation events
  initializeEvents() {
    document.querySelectorAll(".menu a").forEach((link) => {
      link.addEventListener("click", (e) => this.handleCategoryClick(e));
    });
  }

  // Handle menu category click
  async handleCategoryClick(e) {
    // Update active link styles
    const activeLink = document.querySelector(".menu .active");
    if (activeLink) activeLink.classList.remove("active");
    e.target.classList.add("active");

    const category = e.target.dataset.category;
    await this.fetchGames(category);
  }

  // Fetch games by category
  async fetchGames(category) {
    this.showLoading();

    try {
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "757350a43emshde6189eb288174bp1e8c4bjsne7278fe05095",
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const api = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
        options
      );
      const games = await api.json();

      this.ui.displayDataGame(games); // Pass games to UI for rendering
      this.initializeCardEvents(); // Set up event listeners for game cards
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      this.hideLoading();
    }
  }

  // Initialize event listeners for game cards
  initializeCardEvents() {
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => this.handleCardClick(card));
    });
  }
  handleCardClick(card) {
    const id = card.dataset.id;
    this.displayGameDetails(id);
  }
  displayGameDetails(idGame) {
    const details = new Details(idGame); // Initialize Details class
    document.querySelector(".games").classList.add("d-none");
    document.querySelector(".details").classList.remove("d-none");
  }
  showLoading() {
    const loading = document.querySelector(".loading");
    if (loading) loading.classList.remove("d-none");
  }
  hideLoading() {
    const loading = document.querySelector(".loading");
    if (loading) loading.classList.add("d-none");
  }
}
