const games_database = [
  {
    title: "DINOS",
    photo: "img/dinos.png",
    rom: "roms/dino.zip",
    core: "fbalpha2012_cps1",
    favicon: "favicons/dinos-favicon.png"
  },
  {
    title: "SUPER MARIO",
    photo: "img/mario.png",
    rom: "roms/super_mario_bros.7z",
    core: "nes",
    favicon: "favicons/mario-favicon.png"
  },
  {
    title: "TEKKEN 3",
    photo: "img/tekken.png",
    rom: "roms/Tekken3.PBP",
    core: "psx",
  },
];

const container = document.querySelector(".games-wrapper");

// Render function handles both initial and filtered display
function renderGames(list) {
  container.innerHTML = list
    .map(
      (game, idx) => `
        <div class="game" data-idx="${games_database.indexOf(game)}">
          <div class="game-img">
            <img src="${game.photo}" alt="${game.title}" />
          </div>
          <div class="game-title">
            <p>${game.title}</p>
          </div>
        </div>
      `
    )
    .join("");

  // Attach click listeners to current game nodes
  container.querySelectorAll(".game").forEach((gameDiv) => {
    gameDiv.addEventListener("click", () => {
      const idx = gameDiv.getAttribute("data-idx");
      const game = games_database[idx];
      const params = new URLSearchParams({
        title: game.title,
        core: game.core,
        rom: game.rom,
        favicon: game.favicon
      }).toString();
      window.open(`game.html?${params}`, "_blank");
    });
  });
}

// Initial render
renderGames(games_database);

// SEARCH FUNCTIONALITY
const search_btn = document.querySelector(".nav-search-button");
const search = document.querySelector(".search-container");
let user_input = document.querySelector(".search");

search_btn.addEventListener("click", (e) => {
  e.stopPropagation();
  search.style.display = "block";
});

document.addEventListener("click", (e) => {
  if (e.target !== search_btn && !search.contains(e.target)) {
    search.style.display = "none";
  }
});

user_input.addEventListener("input", (e) => {
  const query = e.target.value.trim().toLowerCase();
  const filteredGames = games_database.filter((game) =>
    game.title.toLowerCase().includes(query)
  );
  renderGames(filteredGames); // Use renderGames for search results
});
