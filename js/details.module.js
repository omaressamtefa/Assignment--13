import { Ui } from "./ui.module.js";

export class Details {
  constructor(id) {
    this.ui = new Ui(); // Initialize the UI class
    this.initializeCloseButton();
    this.fetchDetails(id);
  }

  initializeCloseButton() {
    const btnClose = document.getElementById("btnClose");
    if (btnClose) {
      btnClose.addEventListener("click", () => {
        this.hideDetailsView();
      });
    } else {
      console.error("Close button (btnClose) not found!");
    }
  }

  // Fetch game details by ID
  async fetchDetails(idGame) {
    this.showLoading();

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "757350a43emshde6189eb288174bp1e8c4bjsne7278fe05095",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idGame}`,
        options
      );

      if (!response.ok) {
        throw new Error(`Error fetching details: ${response.statusText}`);
      }

      const gameDetails = await response.json();
      this.ui.displayDetails(gameDetails);
    } catch (error) {
      console.error("Failed to fetch game details:", error);
    } finally {
      this.hideLoading();
    }
  }

  showLoading() {
    const loading = document.querySelector(".loading");
    if (loading) loading.classList.remove("d-none");
  }

  hideLoading() {
    const loading = document.querySelector(".loading");
    if (loading) loading.classList.add("d-none");
  }

  hideDetailsView() {
    const gamesSection = document.querySelector(".games");
    const detailsSection = document.querySelector(".details");

    if (gamesSection) gamesSection.classList.remove("d-none");
    if (detailsSection) detailsSection.classList.add("d-none");
  }
}
