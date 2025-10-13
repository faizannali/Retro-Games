const games_database = [
  {
    title: "DINOS",
    photo: "img/dinos.png",
    rom: "roms/dino.zip",
    core: "fbalpha2012_cps1",
    favicon: "favicons/dinos-favicon.png",
  },
  {
    title: "SUPER MARIO",
    photo: "img/mario.png",
    rom: "roms/super_mario_bros.7z",
    core: "nes",
    favicon: "favicons/mario-favicon.png",
  },
  {
    title: "TEKKEN 3",
    photo: "img/tekken.png",
    rom: "roms/Tekken3.PBP",
    core: "psx",
    favicon: "favicons/tekken-favicon.png",
  },
  {
    title: "SONIC THE HEDGEHOG",
    photo: "img/sonic.png",
    rom: "roms/sonic_the_hedgehog.zip",
    core: "sega",
    favicon: "favicons/sonic-favicon.png",
  },
  {
    title: "DRAGON BALL Z",
    photo: "img/dragon_ball_z_supersonic.png",
    rom: "roms/dragon_ball_z_supersonic.zip",
    core: "gba",
    favicon: "favicons/dragonball-z-supersonic-favicon.png",
  },
  {
    title: "CONTRA (USA)",
    photo: "img/contra_usa.png",
    rom: "roms/contra_usa.zip",
    core: "nes",
    favicon: "favicons/contra-usa-favicon.png",
  },
  {
    title: "SUPER SMASH BROS",
    photo: "img/super_smash_bros_usa.png",
    rom: "roms/super_smash_bros_usa.zip",
    core: "n64",
    favicon: "favicons/super_smash_bros_usa.png",
  },
  {
    title: "TOP GEAR (USA)",
    photo: "img/top_gear_usa.png",
    rom: "roms/top_gear_usa.zip",
    core: "snes",
    favicon: "favicons/top_gear_usa.png",
  },
  {
    title: "TETRIS (USA)",
    photo: "img/tetris_usa.png",
    rom: "roms/tetris_usa.zip",
    core: "nes",
    favicon: "favicons/tetris_usa.png",
  },
  {
    title: "A WEEK OF GARFIELD",
    photo: "img/a_week_of_garfield.png",
    rom: "roms/a_week_of_garfield.zip",
    core: "nes",
    favicon: "favicons/a_week_of_garfield.png",
  },
  {
    title: "ABADOX (USA)",
    photo: "img/abadox_usa.png",
    rom: "roms/abadox_usa.zip",
    core: "nes",
    favicon: "favicons/abadox_usa.png",
  },
  {
    title: "TEKKEN 2",
    photo: "img/tekken_two.png",
    rom: "roms/tekken_two.zip",
    core: "snes",
    favicon: "favicons/abadox_usa.png",
  },
  {
    title: "7 Grand Dad",
    photo: "img/seven_grand_dad.png",
    rom: "roms/7_grand_dad.7z",
    core: "nes",
    favicon: "favicons/seven_grand_dad.png",
  },
  {
    title: "DORA THE EXPLORER",
    photo: "img/dora.png",
    rom: "roms/dora_the_explorer.zip",
    core: "gba",
    favicon: "favicons/dora.png",
  },
  {
    title: "SCOOBY DOO",
    photo: "img/scooby_doo.png",
    rom: "roms/scooby_doo.zip",
    core: "gba",
    favicon: "favicons/scooby_doo.png",
  },
  {
    title: "SPIDER-MAN 3",
    photo: "img/spiderman_three.png",
    rom: "roms/spiderman_three.zip",
    core: "gba",
    favicon: "favicons/spiderman_three.png",
  },
  {
    title: "4 NIN SHOUJI",
    photo: "img/four_nin_shouji.png",
    rom: "roms/four_nin_shouji.zip",
    core: "snes",
    favicon: "favicons/four_nin_shouji.png",
  },
  {
    title: "ACE COMBAT",
    photo: "img/ace_combat.png",
    rom: "roms/ace_combat.7z",
    core: "psx",
    favicon: "favicons/ace_combat.png",
  },
  {
    title: "MARVEL SUPER HEROES",
    photo: "img/marvel_superheroes.png",
    rom: "roms/marvel_superheroes.7z",
    core: "psx",
    favicon: "favicons/marvel_superheroes.png",
  },
  {
    title: "CAT IN THE HAT",
    photo: "img/cat_in_the_hat.png",
    rom: "roms/cat_in_the_hat.7z",
    core: "psx",
    favicon: "favicons/cat_in_the_hat.png",
  },
];

const container = document.querySelector(".games-wrapper");
const PAGE_SIZE = 4; // number of games per load/page
let currentPage = 1;
let filteredGames = games_database;

// Modified renderGames to render up to current page
function renderGames(list, page = 1) {
  container.innerHTML = "";

  const endIndex = page * PAGE_SIZE;
  const gamesToRender = list.slice(0, endIndex);

  container.innerHTML = gamesToRender
    .map(
      (game) => `
        <div class="game" data-idx="${games_database.indexOf(game)}">
          <img src="${game.photo}" alt="${game.title}" />
          <div class="game-title">
            <p>${game.title}</p>
          </div>
        </div>`
    )
    .join("");

  container.querySelectorAll(".game").forEach((gameDiv) => {
    gameDiv.addEventListener("click", () => {
      const idx = gameDiv.getAttribute("data-idx");
      const game = games_database[idx];
      const params = new URLSearchParams({
        title: game.title,
        core: game.core,
        rom: game.rom,
        favicon: game.favicon,
      }).toString();
      window.open(`game.html?${params}`, "_blank");
    });
  });
}

// Load more games when near bottom of page
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
    if (currentPage * PAGE_SIZE < filteredGames.length) {
      currentPage++;
      renderGames(filteredGames, currentPage);
    }
  }
});

const search_btn = document.querySelector(".nav-search-button");
const search = document.querySelector(".search-container");
let user_input = document.querySelector(".search");
let mobile_user_input = document.querySelector(".mobile-search");

search_btn.addEventListener("click", (e) => {
  e.stopPropagation();
  search.style.display = "block";
});

document.addEventListener("click", (e) => {
  if (e.target !== search_btn && !search.contains(e.target)) {
    search.style.display = "none";
    user_input.value = ""; // Clear the search input field
    filteredGames = games_database; // Reset games list
    currentPage = 1; // Reset pagination
    renderGames(filteredGames, currentPage); // Show all games again
  }
});

user_input.addEventListener("input", (e) => {
  const query = e.target.value.trim().toLowerCase();
  filteredGames = games_database.filter((game) =>
    game.title.toLowerCase().includes(query)
  );
  currentPage = 1; // reset page count on new search
  renderGames(filteredGames, currentPage);
});

mobile_user_input.addEventListener("input", (e) => {
  const query = e.target.value.trim().toLowerCase();
  filteredGames = games_database.filter((game) =>
    game.title.toLowerCase().includes(query)
  );
  currentPage = 1; // reset page count on new search
  renderGames(filteredGames, currentPage);
});

// Reset the input field for pc
user_input.addEventListener("blur", () => {
  user_input.value = ""; 
  filteredGames = games_database; 
  currentPage = 1; 
  renderGames(filteredGames, currentPage); 
});

// Reset the input field for mobile
mobile_user_input.addEventListener("blur", () => {
  mobile_user_input.value = "";
  filteredGames = games_database;
  currentPage = 1;
  renderGames(filteredGames, currentPage);
});

// Initial render
renderGames(games_database, currentPage);

const toggle_mobile_nav = document.querySelector(".openbtn");
const mobile_nav_links_container = document.querySelector(".mobile-options-links-container");

toggle_mobile_nav.addEventListener("click", () => {
  toggle_mobile_nav.classList.toggle("active");
  mobile_nav_links_container.classList.toggle("mobile-active");
});

// Close menu on clicking outside
document.addEventListener("click", (event) => {
  const isClickInsideMenu = mobile_nav_links_container.contains(event.target);
  const isClickToggleBtn = toggle_mobile_nav.contains(event.target);

  if (!isClickInsideMenu && !isClickToggleBtn) {
    toggle_mobile_nav.classList.remove("active");
    mobile_nav_links_container.classList.remove("mobile-active");
  }
});
