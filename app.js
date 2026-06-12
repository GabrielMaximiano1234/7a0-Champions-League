/* ==========================================================================
   CHAMPIONS 7-0 - GAME LOGIC ENGINE
   ========================================================================== */

// 1. SQUADS DATABASE
const SQUADS_DATABASE = {
  "Real Madrid 2017/18": [
    { name: "Keylor Navas", pos: "GOL", rating: 85 },
    { name: "Dani Carvajal", pos: "DEF", rating: 88 },
    { name: "Raphaël Varane", pos: "DEF", rating: 87 },
    { name: "Sergio Ramos", pos: "DEF", rating: 90 },
    { name: "Marcelo", pos: "DEF", rating: 88 },
    { name: "Casemiro", pos: "MEI", rating: 89 },
    { name: "Toni Kroos", pos: "MEI", rating: 89 },
    { name: "Luka Modric", pos: "MEI", rating: 91 },
    { name: "Isco Alarcón", pos: "MEI", rating: 86 },
    { name: "Karim Benzema", pos: "ATA", rating: 89 },
    { name: "C. Ronaldo", pos: "ATA", rating: 95 }
  ],
  "Barcelona 2010/11": [
    { name: "Víctor Valdés", pos: "GOL", rating: 84 },
    { name: "Dani Alves", pos: "DEF", rating: 88 },
    { name: "Gerard Piqué", pos: "DEF", rating: 88 },
    { name: "Carles Puyol", pos: "DEF", rating: 89 },
    { name: "Éric Abidal", pos: "DEF", rating: 84 },
    { name: "Sergio Busquets", pos: "MEI", rating: 87 },
    { name: "Xavi Hernández", pos: "MEI", rating: 92 },
    { name: "Andrés Iniesta", pos: "MEI", rating: 93 },
    { name: "Pedro Rodríguez", pos: "ATA", rating: 85 },
    { name: "David Villa", pos: "ATA", rating: 88 },
    { name: "Lionel Messi", pos: "ATA", rating: 96 }
  ],
  "Milan 2006/07": [
    { name: "Dida", pos: "GOL", rating: 85 },
    { name: "Massimo Oddo", pos: "DEF", rating: 83 },
    { name: "Alessandro Nesta", pos: "DEF", rating: 90 },
    { name: "Paolo Maldini", pos: "DEF", rating: 91 },
    { name: "M. Jankulovski", pos: "DEF", rating: 84 },
    { name: "Gennaro Gattuso", pos: "MEI", rating: 86 },
    { name: "Andrea Pirlo", pos: "MEI", rating: 90 },
    { name: "Massimo Ambrosini", pos: "MEI", rating: 84 },
    { name: "Clarence Seedorf", pos: "MEI", rating: 88 },
    { name: "Kaká", pos: "ATA", rating: 94 },
    { name: "Filippo Inzaghi", pos: "ATA", rating: 87 }
  ],
  "Bayern Munique 2019/20": [
    { name: "Manuel Neuer", pos: "GOL", rating: 91 },
    { name: "Benjamin Pavard", pos: "DEF", rating: 84 },
    { name: "Jérôme Boateng", pos: "DEF", rating: 85 },
    { name: "David Alaba", pos: "DEF", rating: 87 },
    { name: "Alphonso Davies", pos: "DEF", rating: 86 },
    { name: "Joshua Kimmich", pos: "MEI", rating: 89 },
    { name: "Leon Goretzka", pos: "MEI", rating: 86 },
    { name: "Serge Gnabry", pos: "ATA", rating: 87 },
    { name: "Thomas Müller", pos: "MEI", rating: 88 },
    { name: "Kingsley Coman", pos: "ATA", rating: 86 },
    { name: "R. Lewandowski", pos: "ATA", rating: 93 }
  ],
  "Inter de Milão 2009/10": [
    { name: "Júlio César", pos: "GOL", rating: 89 },
    { name: "Maicon Sisenando", pos: "DEF", rating: 89 },
    { name: "Lúcio", pos: "DEF", rating: 88 },
    { name: "Walter Samuel", pos: "DEF", rating: 87 },
    { name: "Cristian Chivu", pos: "DEF", rating: 84 },
    { name: "Javier Zanetti", pos: "MEI", rating: 87 },
    { name: "Esteban Cambiasso", pos: "MEI", rating: 86 },
    { name: "Wesley Sneijder", pos: "MEI", rating: 91 },
    { name: "Samuel Eto'o", pos: "ATA", rating: 90 },
    { name: "Goran Pandev", pos: "ATA", rating: 84 },
    { name: "Diego Milito", pos: "ATA", rating: 90 }
  ],
  "Chelsea 2011/12": [
    { name: "Petr Cech", pos: "GOL", rating: 90 },
    { name: "José Bosingwa", pos: "DEF", rating: 81 },
    { name: "David Luiz", pos: "DEF", rating: 85 },
    { name: "Gary Cahill", pos: "DEF", rating: 84 },
    { name: "Ashley Cole", pos: "DEF", rating: 86 },
    { name: "John Obi Mikel", pos: "MEI", rating: 82 },
    { name: "Frank Lampard", pos: "MEI", rating: 89 },
    { name: "Juan Mata", pos: "MEI", rating: 85 },
    { name: "Salomon Kalou", pos: "ATA", rating: 82 },
    { name: "Ryan Bertrand", pos: "DEF", rating: 80 },
    { name: "Didier Drogba", pos: "ATA", rating: 91 }
  ],
  "Manchester United 2007/08": [
    { name: "E. Van der Sar", pos: "GOL", rating: 88 },
    { name: "Wes Brown", pos: "DEF", rating: 82 },
    { name: "Rio Ferdinand", pos: "DEF", rating: 89 },
    { name: "Nemanja Vidic", pos: "DEF", rating: 89 },
    { name: "Patrice Evra", pos: "DEF", rating: 86 },
    { name: "Owen Hargreaves", pos: "MEI", rating: 83 },
    { name: "Michael Carrick", pos: "MEI", rating: 85 },
    { name: "Paul Scholes", pos: "MEI", rating: 88 },
    { name: "C. Ronaldo", pos: "ATA", rating: 93 },
    { name: "Wayne Rooney", pos: "ATA", rating: 91 },
    { name: "Carlos Tévez", pos: "ATA", rating: 88 }
  ],
  "Liverpool 2018/19": [
    { name: "Alisson Becker", pos: "GOL", rating: 89 },
    { name: "Trent A.-Arnold", pos: "DEF", rating: 87 },
    { name: "Joel Matip", pos: "DEF", rating: 85 },
    { name: "Virgil van Dijk", pos: "DEF", rating: 91 },
    { name: "Andrew Robertson", pos: "DEF", rating: 86 },
    { name: "Fabinho Tavares", pos: "MEI", rating: 87 },
    { name: "Jordan Henderson", pos: "MEI", rating: 85 },
    { name: "G. Wijnaldum", pos: "MEI", rating: 84 },
    { name: "Mohamed Salah", pos: "ATA", rating: 90 },
    { name: "Roberto Firmino", pos: "ATA", rating: 86 },
    { name: "Sadio Mané", pos: "ATA", rating: 89 }
  ],
  "Porto 2003/04": [
    { name: "Vítor Baía", pos: "GOL", rating: 84 },
    { name: "Paulo Ferreira", pos: "DEF", rating: 84 },
    { name: "Jorge Costa", pos: "DEF", rating: 83 },
    { name: "Ricardo Carvalho", pos: "DEF", rating: 88 },
    { name: "Nuno Valente", pos: "DEF", rating: 83 },
    { name: "Costinha", pos: "MEI", rating: 84 },
    { name: "Maniche", pos: "MEI", rating: 85 },
    { name: "Pedro Mendes", pos: "MEI", rating: 82 },
    { name: "Deco", pos: "MEI", rating: 90 },
    { name: "Derlei", pos: "ATA", rating: 86 },
    { name: "Carlos Alberto", pos: "ATA", rating: 83 }
  ],
  "Ajax 1994/95": [
    { name: "E. Van der Sar", pos: "GOL", rating: 85 },
    { name: "Michael Reiziger", pos: "DEF", rating: 84 },
    { name: "Danny Blind", pos: "DEF", rating: 86 },
    { name: "Frank Rijkaard", pos: "DEF", rating: 89 },
    { name: "Frank de Boer", pos: "DEF", rating: 87 },
    { name: "Clarence Seedorf", pos: "MEI", rating: 86 },
    { name: "Edgar Davids", pos: "MEI", rating: 87 },
    { name: "Jari Litmanen", pos: "MEI", rating: 89 },
    { name: "Finidi George", pos: "ATA", rating: 84 },
    { name: "Marc Overmars", pos: "ATA", rating: 86 },
    { name: "Ronald de Boer", pos: "ATA", rating: 85 }
  ]
};

// Tactical slots definition per formation
const FORMATIONS = {
  "4-3-3": [
    { id: "gol", pos: "GOL", label: "GOL", row: "goalkeeper" },
    { id: "le", pos: "DEF", label: "LE", row: "defense" },
    { id: "zag1", pos: "DEF", label: "ZAG", row: "defense" },
    { id: "zag2", pos: "DEF", label: "ZAG", row: "defense" },
    { id: "ld", pos: "DEF", label: "LD", row: "defense" },
    { id: "mc1", pos: "MEI", label: "MC", row: "midfield" },
    { id: "mc2", pos: "MEI", label: "MC", row: "midfield" },
    { id: "mc3", pos: "MEI", label: "MC", row: "midfield" },
    { id: "pe", pos: "ATA", label: "PE", row: "attack" },
    { id: "ca", pos: "ATA", label: "CA", row: "attack" },
    { id: "pd", pos: "ATA", label: "PD", row: "attack" }
  ],
  "4-4-2": [
    { id: "gol", pos: "GOL", label: "GOL", row: "goalkeeper" },
    { id: "le", pos: "DEF", label: "LE", row: "defense" },
    { id: "zag1", pos: "DEF", label: "ZAG", row: "defense" },
    { id: "zag2", pos: "DEF", label: "ZAG", row: "defense" },
    { id: "ld", pos: "DEF", label: "LD", row: "defense" },
    { id: "me", pos: "MEI", label: "ME", row: "midfield" },
    { id: "mc1", pos: "MEI", label: "MC", row: "midfield" },
    { id: "mc2", pos: "MEI", label: "MC", row: "midfield" },
    { id: "md", pos: "MEI", label: "MD", row: "midfield" },
    { id: "ata1", pos: "ATA", label: "ATA", row: "attack" },
    { id: "ata2", pos: "ATA", label: "ATA", row: "attack" }
  ],
  "3-5-2": [
    { id: "gol", pos: "GOL", label: "GOL", row: "goalkeeper" },
    { id: "zag1", pos: "DEF", label: "ZAG", row: "defense" },
    { id: "zag2", pos: "DEF", label: "ZAG", row: "defense" },
    { id: "zag3", pos: "DEF", label: "ZAG", row: "defense" },
    { id: "lle", pos: "MEI", label: "LLE", row: "midfield" },
    { id: "mc1", pos: "MEI", label: "MC", row: "midfield" },
    { id: "mc2", pos: "MEI", label: "MC", row: "midfield" },
    { id: "mc3", pos: "MEI", label: "MC", row: "midfield" },
    { id: "lld", pos: "MEI", label: "LLD", row: "midfield" },
    { id: "ata1", pos: "ATA", label: "ATA", row: "attack" },
    { id: "ata2", pos: "ATA", label: "ATA", row: "attack" }
  ]
};

// 2. GAME STATE
const state = {
  managerName: "",
  activeScreen: "tela-login",
  
  // Roster Configuration
  formation: "4-3-3",
  playstyle: "equilibrado",
  gameMode: "classic", // 'classic' or 'almanac'
  
  // Draft State
  draftRound: 1, // 1 to 11
  draftRoster: {}, // slotId -> playerObject
  selectedPlayerNames: new Set(),
  currentDrawnTeam: "",
  currentCandidates: [],
  selectedCandidate: null,
  skipsRemaining: 3, // Pulos de time (Rule 2)
  chemistryBonusFactor: 1.0, // Multiplicador de força por conexões (Rule 1)
  
  // Tournament State
  tournamentRound: 0, // 0 to 7
  tournamentWins: 0,
  tournamentPoints: 0, // Group Stage (Matches 1, 2, 3)
  goalsScored: 0,
  goalsConceded: 0,
  perfectCleanSheetRun: true,
  groupStandings: [], // User and 3 opponents
  currentMatchOpponentName: "",
  currentMatchOpponentRating: 85,
  currentMatchMinute: 0, // Minuto atual da partida em tempo real (Rule 3)
  simIntervalId: null,
  opponentsList: [], // Pre-generated opponents for the knockout stages
};

// 3. INITIALIZE STARS BACKGROUND
function initStars() {
  const container = document.getElementById("stars-container");
  container.innerHTML = "";
  const starCount = 80;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.className = "star";
    
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    
    star.style.setProperty("--duration", `${Math.random() * 4 + 3}s`);
    star.style.setProperty("--delay", `${Math.random() * 5}s`);
    star.style.setProperty("--max-opacity", `${Math.random() * 0.6 + 0.3}`);
    
    container.appendChild(star);
  }
}

// 4. NAVIGATION SYSTEM
function showScreen(screenId) {
  // Hide active screen
  const current = document.getElementById(state.activeScreen);
  if (current) current.classList.remove("active");
  
  // Show new screen
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add("active");
    state.activeScreen = screenId;
  }
}

// Save credentials & high scores
function saveManagerCredentials(name) {
  localStorage.setItem("champions70_lastManager", name);
}

function loadManagerCredentials() {
  const name = localStorage.getItem("champions70_lastManager");
  if (name) {
    document.getElementById("username").value = name;
  }
}

function saveHighscore(scoreObj) {
  const scores = JSON.parse(localStorage.getItem("champions70_leaderboard") || "[]");
  scores.push(scoreObj);
  // Sort: perfect run first, then wins, then goals diff
  scores.sort((a, b) => {
    if (a.perfect !== b.perfect) return a.perfect ? -1 : 1;
    if (a.wins !== b.wins) return b.wins - a.wins;
    return (b.goalsScored - b.goalsConceded) - (a.goalsScored - a.goalsConceded);
  });
  // Keep top 5
  localStorage.setItem("champions70_leaderboard", JSON.stringify(scores.slice(0, 5)));
  renderLeaderboard();
}

function renderLeaderboard() {
  const container = document.getElementById("leaderboard-list");
  const scores = JSON.parse(localStorage.getItem("champions70_leaderboard") || "[]");
  
  if (scores.length === 0) {
    container.innerHTML = `<li class="leaderboard-item" style="justify-content: center; color: var(--color-text-muted);">Nenhum recorde registrado ainda. Seja o primeiro!</li>`;
    return;
  }
  
  container.innerHTML = scores.map((s, index) => {
    let trophy = "🏅";
    if (index === 0) trophy = "🥇";
    else if (index === 1) trophy = "🥈";
    else if (index === 2) trophy = "🥉";
    
    const perfectBadge = s.perfect ? `<span style="color: var(--color-secondary); font-weight: bold;">[7-0 Perfeito!]</span>` : "";
    return `
      <li class="leaderboard-item">
        <span><span class="rank">${trophy} #${index + 1}</span> ${s.name} ${perfectBadge}</span>
        <span class="score">${s.wins} Vitórias | GP: ${s.goalsScored} - GC: ${s.goalsConceded}</span>
      </li>
    `;
  }).join("");
}

// 5. CONFIGURATION HANDLERS
function initConfigSelection() {
  // Helper to attach listeners to config buttons
  const setupToggle = (containerId, stateKey, callback) => {
    const container = document.getElementById(containerId);
    container.querySelectorAll(".config-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".config-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        state[stateKey] = btn.getAttribute("data-value");
        if (callback) callback(state[stateKey]);
      });
    });
  };

  setupToggle("formation-options", "formation");
  setupToggle("playstyle-options", "playstyle");
  setupToggle("mode-options", "gameMode", (val) => {
    const desc = document.getElementById("mode-desc");
    if (val === "classic") {
      desc.innerHTML = `<strong>Modo Clássico:</strong> Os ratings reais e qualidades dos jogadores são mostrados nas cartas para guiar suas decisões.`;
    } else {
      desc.innerHTML = `<strong>Modo Almanaque:</strong> Esconde os ratings e qualidades de cada jogador. Você deve escalar seu elenco com base na sua memória histórica!`;
    }
  });
}

// 6. DRAFT ENGINE
function startDraft() {
  state.draftRound = 1;
  state.draftRoster = {};
  state.selectedPlayerNames.clear();
  state.selectedCandidate = null;
  state.skipsRemaining = 3;
  
  // Set up manager info in right panel
  document.getElementById("roster-manager-name").innerText = state.managerName;
  document.getElementById("roster-tactics-display").innerText = `${state.formation} | ${state.playstyle.toUpperCase()}`;
  
  // Render football pitch slots
  renderPitchSlots();
  
  // Update skip button to initial state
  updateSkipButtonState();
  
  // Trigger first round
  nextDraftRound();
  showScreen("tela-draft");
}

function renderPitchSlots() {
  const container = document.getElementById("pitch-slots-container");
  container.innerHTML = "";
  
  const slots = FORMATIONS[state.formation];
  
  // Group slots by row
  const rows = { attack: [], midfield: [], defense: [], goalkeeper: [] };
  slots.forEach(slot => {
    rows[slot.row].push(slot);
  });
  
  // Create rows in layout
  const rowNames = ["attack", "midfield", "defense", "goalkeeper"];
  rowNames.forEach(rowName => {
    const rowDiv = document.createElement("div");
    rowDiv.className = `pitch-row ${rowName}`;
    
    rows[rowName].forEach(slot => {
      const slotDiv = document.createElement("div");
      slotDiv.className = "pitch-slot";
      slotDiv.id = `slot-${slot.id}`;
      slotDiv.setAttribute("data-pos", slot.pos);
      slotDiv.setAttribute("data-id", slot.id);
      
      slotDiv.innerHTML = `
        <span class="plus-icon">+</span>
        <span class="slot-label">${slot.label}</span>
      `;
      
      // Slot Click listener
      slotDiv.addEventListener("click", () => handleSlotClick(slot));
      
      rowDiv.appendChild(slotDiv);
    });
    
    container.appendChild(rowDiv);
  });
}

function nextDraftRound(skippedTeamName = null) {
  if (state.draftRound > 11) {
    // Roster is fully drafted!
    initTournament();
    return;
  }
  
  document.getElementById("current-round-title").innerText = `Rodada ${state.draftRound} / 11`;
  document.getElementById("roster-count").innerText = `${state.draftRound - 1} / 11`;
  
  // Reset candidate selection
  state.selectedCandidate = null;
  
  // Draw random squad
  const teamNames = Object.keys(SQUADS_DATABASE);
  let drawnTeam = "";
  let availableCandidates = [];
  
  // Loop to find a team with unused players (preventing skippedTeamName if provided - Rule 3)
  let attempts = 0;
  while (attempts < 100) {
    const randTeam = teamNames[Math.floor(Math.random() * teamNames.length)];
    if (skippedTeamName && randTeam === skippedTeamName) {
      attempts++;
      continue;
    }
    const teamPlayers = SQUADS_DATABASE[randTeam].filter(p => !state.selectedPlayerNames.has(p.name));
    
    if (teamPlayers.length > 0) {
      drawnTeam = randTeam;
      availableCandidates = teamPlayers;
      break;
    }
    attempts++;
  }
  
  // Fallback if we couldn't find unique players (extreme edge case)
  if (!drawnTeam) {
    alert("Erro ao sortear elenco histórico. Reiniciando...");
    showScreen("tela-config");
    return;
  }
  
  state.currentDrawnTeam = drawnTeam;
  state.currentCandidates = availableCandidates;
  
  document.getElementById("current-team-drawn").innerText = `Elenco sorteado: ${drawnTeam}`;
  
  // Render player cards
  renderCandidates();
  
  // Remove glows
  clearSlotHighlights();
}

function skipTeam() {
  if (state.skipsRemaining <= 0) return;
  
  state.skipsRemaining--;
  
  // Rotation transition effect on the skip button (UI/UX Pro Max)
  const skipBtn = document.getElementById("btn-skip-team");
  if (skipBtn) {
    skipBtn.classList.add("spinning");
    setTimeout(() => {
      skipBtn.classList.remove("spinning");
    }, 600);
  }
  
  updateSkipButtonState();
  
  // Immediately draw another team (Rule 2 & 3)
  nextDraftRound(state.currentDrawnTeam);
}

function updateSkipButtonState() {
  const skipBtn = document.getElementById("btn-skip-team");
  if (!skipBtn) return;
  
  // Set text
  skipBtn.innerText = `🔄 Pular Time (${state.skipsRemaining} Restantes)`;
  
  // Remove all previous skips classes
  skipBtn.className = "btn-skip";
  
  // Add glow based on remaining skips
  if (state.skipsRemaining > 0) {
    skipBtn.classList.add(`skips-${state.skipsRemaining}`);
    skipBtn.disabled = false;
  } else {
    skipBtn.disabled = true;
  }
}

function renderCandidates() {
  const container = document.getElementById("draft-candidates");
  container.innerHTML = "";
  
  state.currentCandidates.forEach((player, idx) => {
    const cardContainer = document.createElement("div");
    cardContainer.className = "selection-card-container";
    cardContainer.setAttribute("data-index", idx);
    
    const isGold = player.rating >= 90;
    const ratingDisplay = state.gameMode === "classic" ? player.rating : "??";
    
    cardContainer.innerHTML = `
      <div class="player-card ${isGold ? 'gold-tier' : ''}">
        <div class="card-header-info">
          <span class="rating">${ratingDisplay}</span>
          <span class="position">${player.pos}</span>
        </div>
        <div class="card-photo">👤</div>
        <div class="card-footer">
          <div class="name">${player.name}</div>
          <div class="team-name">${state.currentDrawnTeam.split(" ")[0]}</div>
        </div>
      </div>
    `;
    
    cardContainer.addEventListener("click", () => selectCandidate(idx, cardContainer));
    container.appendChild(cardContainer);
  });
}

function selectCandidate(index, element) {
  // Clear previous selection highlight
  document.querySelectorAll(".selection-card-container").forEach(c => c.classList.remove("selected-for-draft"));
  
  // Set selected
  element.classList.add("selected-for-draft");
  state.selectedCandidate = state.currentCandidates[index];
  
  // Highlight empty slots matching player position
  highlightMatchingSlots(state.selectedCandidate.pos);
}

function highlightMatchingSlots(pos) {
  clearSlotHighlights();
  
  const slots = FORMATIONS[state.formation];
  slots.forEach(slot => {
    // If slot matches player position and is vacant, glow it!
    if (slot.pos === pos && !state.draftRoster[slot.id]) {
      const slotEl = document.getElementById(`slot-${slot.id}`);
      if (slotEl) {
        slotEl.classList.add("active-select");
      }
    }
  });
}

function clearSlotHighlights() {
  document.querySelectorAll(".pitch-slot").forEach(s => s.classList.remove("active-select"));
}

function handleSlotClick(slot) {
  if (!state.selectedCandidate) {
    alert("Selecione um jogador das cartas da direita primeiro!");
    return;
  }
  
  if (slot.pos !== state.selectedCandidate.pos) {
    alert(`Posição incorreta! ${state.selectedCandidate.name} joga como ${state.selectedCandidate.pos}, não ${slot.pos}.`);
    return;
  }
  
  if (state.draftRoster[slot.id]) {
    alert("Esta vaga no campo já está preenchida!");
    return;
  }
  
  // Assign player to roster slot
  const finalPlayer = {
    ...state.selectedCandidate,
    originTeam: state.currentDrawnTeam
  };
  state.draftRoster[slot.id] = finalPlayer;
  state.selectedPlayerNames.add(finalPlayer.name);
  
  // Render player card inside pitch slot
  const slotEl = document.getElementById(`slot-${slot.id}`);
  slotEl.classList.remove("active-select");
  slotEl.classList.add("filled");
  
  const isGold = finalPlayer.rating >= 90;
  const ratingDisplay = state.gameMode === "classic" ? finalPlayer.rating : "??";
  
  slotEl.innerHTML = `
    <div class="player-card ${isGold ? 'gold-tier' : ''}" style="border-radius: 8px;">
      <div class="card-header-info" style="font-size: 0.55rem; padding: 0 1px;">
        <span class="rating" style="font-size: 0.75rem;">${ratingDisplay}</span>
        <span class="position" style="font-size: 0.5rem; padding: 0px 2px;">${finalPlayer.pos}</span>
      </div>
      <div class="name" style="font-size: 0.6rem; transform: scale(0.95); margin-top: 5px;">${finalPlayer.name.split(" ").pop()}</div>
      <div class="team-name" style="font-size: 0.45rem; opacity: 0.7; margin-bottom: 2px;">${finalPlayer.originTeam.split(" ")[0]}</div>
    </div>
  `;
  
  // Update stats
  updateRosterStats();
  drawChemistryLines();
  
  // Move to next round
  state.draftRound++;
  nextDraftRound();
}

function updateRosterStats() {
  const players = Object.values(state.draftRoster);
  if (players.length === 0) return;
  
  // Average Rating
  const sumRating = players.reduce((sum, p) => sum + p.rating, 0);
  const avg = Math.round(sumRating / players.length);
  document.getElementById("roster-avg-rating").innerText = avg;
  
  // Chemistry Calculation
  let chem = 50; // base chemistry
  
  players.forEach(p => {
    // Add natural position bonus (+4% per player)
    chem += 4;
    
    // Playstyle bonus (Strategic)
    if (state.playstyle === "defensivo") {
      if ((p.pos === "DEF" || p.pos === "GOL") && p.rating >= 88) chem += 1;
    } else if (state.playstyle === "ofensivo") {
      if ((p.pos === "ATA" || p.pos === "MEI") && p.rating >= 90) chem += 1;
    } else {
      // Equilibrado gives subtle flat bonus
      chem += 0.5;
    }
  });
  
  chem = Math.min(100, Math.round(chem));
  document.getElementById("roster-chemistry").innerText = `${chem}%`;
  
  // Chemistry connection count / synergy (Rule 1)
  let connectionCount = 0;
  const teamGroups = {};
  const slots = FORMATIONS[state.formation];
  
  slots.forEach(slot => {
    const player = state.draftRoster[slot.id];
    if (player && player.originTeam) {
      if (!teamGroups[player.originTeam]) {
        teamGroups[player.originTeam] = 0;
      }
      teamGroups[player.originTeam]++;
    }
  });
  
  Object.keys(teamGroups).forEach(teamName => {
    const count = teamGroups[teamName];
    if (count >= 2) {
      // Combination of count choose 2
      const connections = (count * (count - 1)) / 2;
      connectionCount += connections;
    }
  });
  
  // +5% bonus factor per connection
  state.chemistryBonusFactor = 1 + (connectionCount * 0.05);
}

// 7. TOURNAMENT SIMULATION ENGINE
function initTournament() {
  state.tournamentRound = 1;
  state.tournamentWins = 0;
  state.tournamentPoints = 0;
  state.goalsScored = 0;
  state.goalsConceded = 0;
  state.perfectCleanSheetRun = true;
  
  // Pre-generate opponents list from squads database (excluding duplicate names)
  const teams = Object.keys(SQUADS_DATABASE);
  // Shuffle teams for opponents
  state.opponentsList = [...teams].sort(() => Math.random() - 0.5);
  
  // Set up standings/bracket
  setupStandingsData();
  
  // Render group table initial
  renderGroupTable();
  
  // Update UI stats
  updateTournamentUI();
  
  // Setup first match details
  setupMatch(1);
  
  showScreen("tela-torneio");
}

function setupStandingsData() {
  // For group stage, we simulate 4 teams: User and 3 random opponents
  state.groupStandings = [
    { name: "Meu Time", pts: 0, pj: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0, isUser: true },
    { name: state.opponentsList[0], pts: 0, pj: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
    { name: state.opponentsList[1], pts: 0, pj: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 },
    { name: state.opponentsList[2], pts: 0, pj: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 }
  ];
}

function updateTournamentUI() {
  document.getElementById("tourney-status-points").innerText = state.tournamentPoints;
  document.getElementById("tourney-status-wins").innerText = `${state.tournamentWins} / 7`;
  document.getElementById("tourney-status-goals-scored").innerText = state.goalsScored;
  document.getElementById("tourney-status-goals-conceded").innerText = state.goalsConceded;
  
  const csEl = document.getElementById("tourney-status-cleansheets");
  if (state.perfectCleanSheetRun) {
    csEl.innerText = "Sim";
    csEl.className = "tracker-val clean-sheet-active";
  } else {
    csEl.innerText = "Não";
    csEl.className = "tracker-val clean-sheet-broken";
  }
}

function getTeamAverageRating(teamName) {
  const players = SQUADS_DATABASE[teamName];
  if (!players) return 85;
  const sum = players.reduce((s, p) => s + p.rating, 0);
  return Math.round(sum / players.length);
}

function setupMatch(round) {
  state.tournamentRound = round;
  
  // Set stage title
  let stageTitle = "";
  if (round <= 3) {
    stageTitle = `Fase de Grupos - Jogo ${round}`;
    state.currentMatchOpponentName = state.opponentsList[round - 1]; // Game 1 -> Opp 0, Game 2 -> Opp 1...
    state.currentMatchOpponentRating = getTeamAverageRating(state.currentMatchOpponentName);
  } else if (round === 4) {
    stageTitle = "Mata-Mata: Oitavas de Final";
    state.currentMatchOpponentName = state.opponentsList[3];
    state.currentMatchOpponentRating = getTeamAverageRating(state.currentMatchOpponentName);
  } else if (round === 5) {
    stageTitle = "Mata-Mata: Quartas de Final";
    state.currentMatchOpponentName = state.opponentsList[4];
    state.currentMatchOpponentRating = getTeamAverageRating(state.currentMatchOpponentName) + 1; // get slightly harder
  } else if (round === 6) {
    stageTitle = "Mata-Mata: Semifinal";
    state.currentMatchOpponentName = state.opponentsList[5];
    state.currentMatchOpponentRating = getTeamAverageRating(state.currentMatchOpponentName) + 2;
  } else if (round === 7) {
    stageTitle = "A Grande Final!";
    state.currentMatchOpponentName = state.opponentsList[6];
    state.currentMatchOpponentRating = getTeamAverageRating(state.currentMatchOpponentName) + 3;
  }
  
  // Update scoreboard header
  document.getElementById("sim-match-stage").innerText = stageTitle;
  document.getElementById("sim-time-ticker").innerText = "00'";
  document.getElementById("sim-scoreboard").innerText = "0 - 0";
  
  document.getElementById("sim-user-name").innerText = state.managerName || "Meu Time";
  const userAvg = parseInt(document.getElementById("roster-avg-rating").innerText) || 85;
  const userChem = parseInt(document.getElementById("roster-chemistry").innerText) || 50;
  document.getElementById("sim-user-rating").innerText = `Rating: ${userAvg} | Chem: ${userChem}%`;
  
  document.getElementById("sim-opp-name").innerText = state.currentMatchOpponentName;
  document.getElementById("sim-opp-rating").innerText = `Rating: ${state.currentMatchOpponentRating}`;
  
  // Reset logs
  const logBox = document.getElementById("sim-log-box");
  logBox.innerHTML = `<div class="log-entry system-info">Aguardando o pontapé inicial...</div>`;
  
  // Action button
  const actionBtn = document.getElementById("btn-action-match");
  actionBtn.innerHTML = `<span>Iniciar Partida</span>`;
  actionBtn.className = "btn-primary btn-gold";
  actionBtn.onclick = startMatchSimulation;
  
  // Update bracket or stand panel visual
  if (round <= 3) {
    document.getElementById("bracket-panel-title").innerText = "Tabela do Grupo";
    renderGroupTable();
  } else {
    document.getElementById("bracket-panel-title").innerText = "Chaveamento Mata-Mata";
    renderBracket();
  }
}

// Render dynamic Group Table
function renderGroupTable() {
  const container = document.getElementById("bracket-content");
  
  // Sort standings: pts desc, then sg, then gp
  const sorted = [...state.groupStandings].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.sg !== a.sg) return b.sg - a.sg;
    return b.gp - a.gp;
  });
  
  let html = `
    <table style="width:100%; font-size:0.8rem; border-collapse:collapse; text-align:left;">
      <thead>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.1); color:var(--color-text-muted);">
          <th style="padding:6px 0;">Clube</th>
          <th>PJ</th>
          <th>Pts</th>
          <th>SG</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  sorted.forEach((team, idx) => {
    const isHighlight = team.isUser ? 'style="color: var(--color-primary); font-weight:bold; background: rgba(0, 240, 255, 0.05);"' : '';
    html += `
      <tr ${isHighlight} style="border-bottom:1px dashed rgba(255,255,255,0.03);">
        <td style="padding:8px 0; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${idx + 1}. ${team.name.split(" ")[0]}</td>
        <td>${team.pj}</td>
        <td style="font-weight:bold; color:var(--color-secondary);">${team.pts}</td>
        <td>${team.sg > 0 ? '+' + team.sg : team.sg}</td>
      </tr>
    `;
  });
  
  html += `</tbody></table>`;
  container.innerHTML = html;
}

// Render bracket visual (Matches 4 to 7)
function renderBracket() {
  const container = document.getElementById("bracket-content");
  
  const getStatusClass = (r) => {
    if (state.tournamentRound > r) return "passed-win";
    if (state.tournamentRound === r) return "active-match";
    return "";
  };
  
  container.innerHTML = `
    <div class="bracket-tree">
      <div class="bracket-match ${getStatusClass(4)}">
        <div class="stage">Oitavas de Final</div>
        <div class="vs-line ${state.tournamentRound > 4 ? 'winner' : ''}">
          <span>Meu Time</span>
          <span>VS</span>
          <span>${state.opponentsList[3].split(" ")[0]}</span>
        </div>
      </div>
      <div class="bracket-match ${getStatusClass(5)}">
        <div class="stage">Quartas de Final</div>
        <div class="vs-line ${state.tournamentRound > 5 ? 'winner' : ''}">
          <span>Meu Time</span>
          <span>VS</span>
          <span>${state.opponentsList[4].split(" ")[0]}</span>
        </div>
      </div>
      <div class="bracket-match ${getStatusClass(6)}">
        <div class="stage">Semifinal</div>
        <div class="vs-line ${state.tournamentRound > 6 ? 'winner' : ''}">
          <span>Meu Time</span>
          <span>VS</span>
          <span>${state.opponentsList[5].split(" ")[0]}</span>
        </div>
      </div>
      <div class="bracket-match ${getStatusClass(7)}">
        <div class="stage">Grande Final</div>
        <div class="vs-line ${state.tournamentWins === 7 ? 'winner' : ''}">
          <span>Meu Time</span>
          <span>VS</span>
          <span>${state.opponentsList[6].split(" ")[0]}</span>
        </div>
      </div>
    </div>
  `;
}

// Start simulation ticker
function startMatchSimulation() {
  const actionBtn = document.getElementById("btn-action-match");
  actionBtn.disabled = true;
  actionBtn.innerText = "Simulando...";
  
  // Show live tactical adjustment panel (Rule 3)
  const tacticsPanel = document.getElementById("live-tactics-panel");
  if (tacticsPanel) {
    tacticsPanel.style.display = "flex";
    // Highlight pre-selected style
    tacticsPanel.querySelectorAll(".tactic-btn").forEach(btn => {
      btn.classList.remove("selected");
      if (btn.getAttribute("data-style") === state.playstyle) {
        btn.classList.add("selected");
      }
    });
  }
  
  const logBox = document.getElementById("sim-log-box");
  logBox.innerHTML = "";
  
  addLog(0, "A partida começou! O árbitro apita o início do jogo.", "system-info");
  
  let currentMinute = 0;
  state.currentMatchMinute = 0;
  let userGoals = 0;
  let oppGoals = 0;
  
  // Calculate simulation attributes
  const userAvgRating = parseInt(document.getElementById("roster-avg-rating").innerText) || 85;
  const userChemistry = parseInt(document.getElementById("roster-chemistry").innerText) || 50;
  
  // User attack and defense ratings with chemistry connection bonus factor (Rule 1)
  let userPower = (userAvgRating + (userChemistry / 10)) * (state.chemistryBonusFactor || 1.0);
  let oppPower = state.currentMatchOpponentRating;
  
  // Drafted rosters lists for dynamic narratives
  const myRoster = Object.values(state.draftRoster);
  const oppRoster = SQUADS_DATABASE[state.currentMatchOpponentName] || [];
  
  const getRandPlayer = (roster, pos) => {
    const subset = roster.filter(p => p.pos === pos);
    if (subset.length > 0) return subset[Math.floor(Math.random() * subset.length)].name;
    return roster.length > 0 ? roster[Math.floor(Math.random() * roster.length)].name : "Jogador";
  };
  
  // Simulation ticks (200ms tick = ~6 seconds total simulation - Rule 2)
  state.simIntervalId = setInterval(() => {
    currentMinute += Math.floor(Math.random() * 3) + 2; // ticks 2-4 mins
    state.currentMatchMinute = currentMinute;
    
    if (currentMinute >= 90) {
      currentMinute = 90;
      state.currentMatchMinute = 90;
      clearInterval(state.simIntervalId);
      state.simIntervalId = null;
      
      // Hide live tactics panel at the end of the simulation
      if (tacticsPanel) tacticsPanel.style.display = "none";
      
      endMatchSimulation(userGoals, oppGoals);
      return;
    }
    
    // Update timer UI
    document.getElementById("sim-time-ticker").innerText = `${currentMinute}'`;
    
    // Strategy bonuses/penalties - Evaluated in real-time at each tick! (Rule 3)
    let userOffenseFactor = 1.0;
    let userDefenseFactor = 1.0;
    let oppOffenseFactor = 1.0;
    
    if (state.playstyle === "defensivo") {
      userDefenseFactor = 0.5; // Opponent has 50% less chance to score (clean sheets help!)
      userOffenseFactor = 0.7; // User has 30% less chance to score
    } else if (state.playstyle === "ofensivo") {
      userOffenseFactor = 1.4; // User scores 40% more easily
      oppOffenseFactor = 1.3;  // Opponent scores 30% more easily (vulnerable defense)
    }
    
    // Roll for event occurrence (typical Champions league has 2-5 major attacks per match)
    const rollEvent = Math.random();
    
    // User Attack
    if (rollEvent < 0.15) {
      const userRoll = Math.random() * userPower * userOffenseFactor;
      const oppGK = getTeamAverageRating(state.currentMatchOpponentName) - 2; // base GK strength
      
      const attacker = getRandPlayer(myRoster, "ATA");
      const midfielder = getRandPlayer(myRoster, "MEI");
      
      if (userRoll > oppGK) {
        userGoals++;
        document.getElementById("sim-scoreboard").innerText = `${userGoals} - ${oppGoals}`;
        addLog(currentMinute, `⚽ GOOOL! Passe de ${midfielder.split(" ").pop()} para finalização certeira de ${attacker}!`, "goal-event");
        
        // Neon green goal flash (Super Poderes)
        triggerGoalFlash();
      } else {
        addLog(currentMinute, `⚠️ Quase! ${attacker} chuta forte da entrada da área, mas a bola sai tirando tinta da trave!`, "system-info");
      }
    } 
    // Opponent Attack
    else if (rollEvent < 0.30) {
      const oppRoll = Math.random() * oppPower * oppOffenseFactor;
      const userDef = userPower * userDefenseFactor;
      
      const oppAttacker = getRandPlayer(oppRoster, "ATA");
      const userGK = getRandPlayer(myRoster, "GOL");
      const userDF = getRandPlayer(myRoster, "DEF");
      
      if (oppRoll > userDef) {
        oppGoals++;
        document.getElementById("sim-scoreboard").innerText = `${userGoals} - ${oppGoals}`;
        addLog(currentMinute, `❌ GOL do ${state.currentMatchOpponentName.split(" ")[0]}! ${oppAttacker} se livra da marcação e fuzila sem chances de defesa.`, "goal-conceded");
      } else {
        addLog(currentMinute, `🧤 Espetacular! ${oppAttacker} bate colocado no ângulo, mas ${userGK} voa para espalmar! Defesa incrível com ajuda de ${userDF.split(" ").pop()}.`, "save-event");
      }
    } 
    // Midfield tussle (No direct score)
    else if (rollEvent < 0.40) {
      const p1 = getRandPlayer(myRoster, "MEI");
      const p2 = getRandPlayer(oppRoster, "MEI");
      addLog(currentMinute, `⚡ Disputa dura no meio-campo! ${p1.split(" ").pop()} desarma ${p2.split(" ").pop()} com classe e organiza a saída de bola.`, "system-info");
    }
  }, 200);
}

function addLog(minute, text, className) {
  const logBox = document.getElementById("sim-log-box");
  const entry = document.createElement("div");
  entry.className = `log-entry ${className}`;
  entry.innerHTML = `<span class="minute">${minute}'</span> ${text}`;
  logBox.appendChild(entry);
  
  // auto-scroll
  logBox.scrollTop = logBox.scrollHeight;
}

function endMatchSimulation(userGoals, oppGoals) {
  document.getElementById("sim-time-ticker").innerText = "90'";
  
  // Log end of match
  addLog(90, `O árbitro encerra a partida! Placar Final: Meu Time ${userGoals} - ${oppGoals} ${state.currentMatchOpponentName}`, "system-info");
  
  // Track stats
  state.goalsScored += userGoals;
  state.goalsConceded += oppGoals;
  
  if (oppGoals > 0) {
    state.perfectCleanSheetRun = false;
  }
  
  // Update tournament stats UI
  updateTournamentUI();
  
  // Evaluate match result
  const isGroupStage = state.tournamentRound <= 3;
  
  if (isGroupStage) {
    // Group stage logic
    let ptsGained = 0;
    let v = 0, e = 0, d = 0;
    
    if (userGoals > oppGoals) {
      ptsGained = 3;
      v = 1;
      state.tournamentWins++;
    } else if (userGoals === oppGoals) {
      ptsGained = 1;
      e = 1;
    } else {
      d = 1;
    }
    
    state.tournamentPoints += ptsGained;
    
    // Update group standings row
    const userRow = state.groupStandings.find(t => t.isUser);
    userRow.pj++;
    userRow.pts += ptsGained;
    userRow.v += v;
    userRow.e += e;
    userRow.d += d;
    userRow.gp += userGoals;
    userRow.gc += oppGoals;
    userRow.sg = userRow.gp - userRow.gc;
    
    // Simulate other group games (simplified random scores)
    simulateOtherGroupMatches();
    
    // Update group table UI
    renderGroupTable();
    updateTournamentUI();
    
    const actionBtn = document.getElementById("btn-action-match");
    actionBtn.disabled = false;
    
    if (state.tournamentRound === 3) {
      // Check if user advances (points >= 4)
      const userRank = getGroupRank();
      if (state.tournamentPoints >= 4 && userRank <= 2) {
        actionBtn.innerHTML = `<span>Avançar para as Oitavas</span>`;
        actionBtn.onclick = () => {
          setupMatch(4);
        };
      } else {
        // Failed to advance in groups
        actionBtn.innerHTML = `<span>Ver Resultados</span>`;
        actionBtn.onclick = () => triggerGameOver(false, "group_elimination");
      }
    } else {
      actionBtn.innerHTML = `<span>Próxima Rodada</span>`;
      actionBtn.onclick = () => {
        setupMatch(state.tournamentRound + 1);
      };
    }
    
  } else {
    // Knockout logic: Must win!
    const actionBtn = document.getElementById("btn-action-match");
    actionBtn.disabled = false;
    
    if (userGoals > oppGoals) {
      state.tournamentWins++;
      updateTournamentUI();
      
      if (state.tournamentRound === 7) {
        // Champions!
        actionBtn.innerHTML = `<span>Ver Cerimônia de Título</span>`;
        actionBtn.onclick = () => triggerGameOver(true, "champion");
      } else {
        const nextStages = ["", "", "", "", "Quartas de Final", "Semifinal", "Grande Final"];
        actionBtn.innerHTML = `<span>Avançar para as ${nextStages[state.tournamentRound + 1]}</span>`;
        actionBtn.onclick = () => {
          setupMatch(state.tournamentRound + 1);
        };
      }
    } else if (userGoals === oppGoals) {
      // Penalty shootout! (Exciting live event)
      addLog(90, `⚠️ EMPATE no tempo regulamentar! A decisão vai para os pênaltis.`, "system-info");
      actionBtn.innerHTML = `<span>Disputar Pênaltis</span>`;
      actionBtn.onclick = () => simulatePenalties(userGoals, oppGoals);
    } else {
      // Lost
      actionBtn.innerHTML = `<span>Fim do Jogo</span>`;
      actionBtn.onclick = () => triggerGameOver(false, "knockout_elimination");
    }
  }
}

function simulateOtherGroupMatches() {
  // Simulate opponents matches against each other
  const opponents = state.groupStandings.filter(t => !t.isUser);
  
  // Simple simulator: Team with higher average rating has higher probability of winning
  const simulateGame = (teamA, teamB) => {
    const rateA = getTeamAverageRating(teamA.name);
    const rateB = getTeamAverageRating(teamB.name);
    
    const diff = rateA - rateB;
    const baseChance = 0.38 + (diff * 0.03); // base 38% win probability for home
    
    const roll = Math.random();
    let scoreA = 0;
    let scoreB = 0;
    
    if (roll < baseChance) {
      // A wins
      scoreA = Math.floor(Math.random() * 3) + 1;
      scoreB = Math.floor(Math.random() * scoreA);
    } else if (roll < baseChance + 0.28) {
      // Draw
      scoreA = Math.floor(Math.random() * 3);
      scoreB = scoreA;
    } else {
      // B wins
      scoreB = Math.floor(Math.random() * 3) + 1;
      scoreA = Math.floor(Math.random() * scoreB);
    }
    
    // Update team A stats
    teamA.pj++;
    teamA.gp += scoreA;
    teamA.gc += scoreB;
    teamA.sg = teamA.gp - teamA.gc;
    
    // Update team B stats
    teamB.pj++;
    teamB.gp += scoreB;
    teamB.gc += scoreA;
    teamB.sg = teamB.gp - teamB.gc;
    
    if (scoreA > scoreB) {
      teamA.pts += 3;
    } else if (scoreA === scoreB) {
      teamA.pts += 1;
      teamB.pts += 1;
    } else {
      teamB.pts += 3;
    }
  };
  
  // Game 1: user plays opp 0. So simulate opp 1 vs opp 2
  if (state.tournamentRound === 1) {
    simulateGame(opponents[1], opponents[2]);
  }
  // Game 2: user plays opp 1. So simulate opp 0 vs opp 2
  else if (state.tournamentRound === 2) {
    simulateGame(opponents[0], opponents[2]);
  }
  // Game 3: user plays opp 2. So simulate opp 0 vs opp 1
  else if (state.tournamentRound === 3) {
    simulateGame(opponents[0], opponents[1]);
  }
}

function getGroupRank() {
  const sorted = [...state.groupStandings].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.sg !== a.sg) return b.sg - a.sg;
    return b.gp - a.gp;
  });
  return sorted.findIndex(t => t.isUser) + 1; // 1 to 4
}

function simulatePenalties(baseUserGoals, baseOppGoals) {
  const logBox = document.getElementById("sim-log-box");
  logBox.innerHTML = `<div class="log-entry system-info">⚔️ INÍCIO DA DECISÃO POR PÊNALTIS! Haja coração!</div>`;
  
  let uScore = 0;
  let oScore = 0;
  let round = 1;
  
  const myRoster = Object.values(state.draftRoster);
  const oppRoster = SQUADS_DATABASE[state.currentMatchOpponentName] || [];
  
  const simulatePenaltyRound = () => {
    // User Kicks
    const userKicker = myRoster[Math.floor(Math.random() * myRoster.length)].name;
    const oppGK = SQUADS_DATABASE[state.currentMatchOpponentName][0].name; // Opp Goleiro
    
    const userScored = Math.random() < 0.78; // 78% average penalty score
    if (userScored) {
      uScore++;
      addLog(`P${round}`, `⚽ GOL! ${userKicker} cobra com categoria deslocando ${oppGK}!`, "goal-event");
    } else {
      addLog(`P${round}`, `❌ DEFENDEU! ${oppGK} voa no canto direito e espalma a cobrança de ${userKicker}!`, "save-event");
    }
    
    // Opponent Kicks
    const oppKicker = oppRoster[Math.floor(Math.random() * oppRoster.length)].name;
    const userGK = myRoster.find(p => p.pos === "GOL")?.name || "Goleiro";
    
    const oppScored = Math.random() < 0.72; // user defense strength slightly affects opp penalty
    if (oppScored) {
      oScore++;
      addLog(`P${round}`, `⚽ GOL do ${state.currentMatchOpponentName.split(" ")[0]}! ${oppKicker} bate firme no meio do gol.`, "goal-conceded");
    } else {
      addLog(`P${round}`, `🧤 PEGOOOOU! ${userGK} defende a cobrança de ${oppKicker}! Muralha!`, "save-event");
    }
    
    round++;
    
    // Check win condition in penalties (best of 5, then sudden death)
    const canEnd = (round > 5 && uScore !== oScore) || (round <= 5 && (Math.abs(uScore - oScore) > (6 - round)));
    
    if (canEnd && uScore !== oScore) {
      clearInterval(penInterval);
      resolvePenaltiesOutcome(uScore, oScore);
    }
  };
  
  const penInterval = setInterval(simulatePenaltyRound, 800);
}

function resolvePenaltiesOutcome(uScore, oScore) {
  const actionBtn = document.getElementById("btn-action-match");
  actionBtn.disabled = false;
  
  if (uScore > oScore) {
    state.tournamentWins++;
    updateTournamentUI();
    
    addLog("PEN", `🏆 FIM DE PAPO! Ganhamos a disputa por ${uScore} a ${oScore}!`, "goal-event");
    
    if (state.tournamentRound === 7) {
      actionBtn.innerHTML = `<span>Ver Cerimônia de Título</span>`;
      actionBtn.onclick = () => triggerGameOver(true, "champion");
    } else {
      const nextStages = ["", "", "", "", "Quartas de Final", "Semifinal", "Grande Final"];
      actionBtn.innerHTML = `<span>Avançar para as ${nextStages[state.tournamentRound + 1]}</span>`;
      actionBtn.onclick = () => {
        setupMatch(state.tournamentRound + 1);
      };
    }
  } else {
    addLog("PEN", `❌ Eliminados! Perdemos por ${oScore} a ${uScore} nos pênaltis.`, "goal-conceded");
    actionBtn.innerHTML = `<span>Fim do Jogo</span>`;
    actionBtn.onclick = () => triggerGameOver(false, "knockout_elimination");
  }
}

// 8. GAME OVER / CHAMPION TRIGGERS
function triggerGameOver(isWinner, reason) {
  const modal = document.getElementById("tela-game-over");
  const titleEl = document.getElementById("game-over-title");
  const descEl = document.getElementById("game-over-desc");
  const box = document.getElementById("game-over-box");
  const trophy = document.getElementById("trophy-container");
  
  modal.classList.add("active");
  
  // Save run stats to highscores
  const runRecord = {
    name: state.managerName || "Treinador Anônimo",
    wins: state.tournamentWins,
    goalsScored: state.goalsScored,
    goalsConceded: state.goalsConceded,
    perfect: isWinner && state.perfectCleanSheetRun,
    timestamp: Date.now()
  };
  saveHighscore(runRecord);
  
  if (isWinner) {
    box.className = "game-over-panel";
    trophy.style.display = "inline-block";
    
    if (state.perfectCleanSheetRun) {
      box.classList.add("perfect-run");
      titleEl.innerText = "Lenda do 7-0!";
      titleEl.className = "outcome-title victory";
      descEl.innerHTML = `
        🏆 <strong>DESAFIO PERFEITO CONCLUÍDO!</strong> 🏆<br><br>
        Você alcançou a glória máxima de 7 vitórias consecutivas <strong>sem sofrer nenhum gol</strong>.<br>
        Seu time entrou para o hall dos imortais europeus!
      `;
    } else {
      titleEl.innerText = "Campeão da Champions!";
      titleEl.className = "outcome-title victory";
      descEl.innerHTML = `
        Você ergueu a cobiçada "Orelhuda" após 7 batalhas intensas!<br><br>
        No entanto, seu time sofreu gol(s) durante a jornada e não completou o desafio perfeito a zero (7-0).<br>
        Que tal tentar novamente para cravar o placar perfeito?
      `;
    }
  } else {
    box.className = "game-over-panel";
    trophy.style.display = "none";
    titleEl.innerText = "Fim da Linha!";
    titleEl.className = "outcome-title defeat";
    
    if (reason === "group_elimination") {
      descEl.innerHTML = `
        Seu time foi eliminado na <strong>Fase de Grupos</strong>.<br>
        Com apenas ${state.tournamentPoints} ponto(s) conquistados nos 3 primeiros jogos, você não conseguiu avançar para a fase eliminatória.
      `;
    } else {
      descEl.innerHTML = `
        Seu time foi eliminado no mata-mata da Champions na rodada <strong>#${state.tournamentRound}</strong>.<br>
        A derrota eliminou suas esperanças de título. O estádio se cala, mas sempre há uma próxima temporada!
      `;
    }
  }
}

// 9. RESTART GAME
function restartGame() {
  // Hide modal
  document.getElementById("tela-game-over").classList.remove("active");
  
  // Clear chemistry lines on restart
  const svg = document.getElementById("chemistry-lines");
  if (svg) svg.innerHTML = "";
  
  // Transition back to config screen instantly retaining manager details
  showScreen("tela-config");
}

// 10. EXTRA HELPERS (CHEMISTRY & TACTICS)
function drawChemistryLines() {
  const svg = document.getElementById("chemistry-lines");
  if (!svg) return;
  
  // Clear previous lines
  svg.innerHTML = "";
  
  const pitch = document.getElementById("pitch-view");
  if (!pitch) return;
  const pitchRect = pitch.getBoundingClientRect();
  
  // Group roster slotIds by originTeam
  const teamGroups = {};
  const slots = FORMATIONS[state.formation];
  
  slots.forEach(slot => {
    const player = state.draftRoster[slot.id];
    if (player && player.originTeam) {
      if (!teamGroups[player.originTeam]) {
        teamGroups[player.originTeam] = [];
      }
      teamGroups[player.originTeam].push(slot.id);
    }
  });
  
  // Draw connection lines for any group with 2 or more players
  Object.keys(teamGroups).forEach(teamName => {
    const slotIds = teamGroups[teamName];
    if (slotIds.length >= 2) {
      // Draw lines between every unique pair in this group
      for (let i = 0; i < slotIds.length; i++) {
        for (let j = i + 1; j < slotIds.length; j++) {
          const el1 = document.getElementById(`slot-${slotIds[i]}`);
          const el2 = document.getElementById(`slot-${slotIds[j]}`);
          
          if (el1 && el2) {
            const r1 = el1.getBoundingClientRect();
            const r2 = el2.getBoundingClientRect();
            
            // Center coordinates relative to the pitch container
            const x1 = r1.left - pitchRect.left + r1.width / 2;
            const y1 = r1.top - pitchRect.top + r1.height / 2;
            const x2 = r2.left - pitchRect.left + r2.width / 2;
            const y2 = r2.top - pitchRect.top + r2.height / 2;
            
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x1.toFixed(1));
            line.setAttribute("y1", y1.toFixed(1));
            line.setAttribute("x2", x2.toFixed(1));
            line.setAttribute("y2", y2.toFixed(1));
            line.setAttribute("class", "chem-line");
            
            svg.appendChild(line);
          }
        }
      }
    }
  });
}

function triggerGoalFlash() {
  document.body.classList.add("goal-flash-active");
  setTimeout(() => {
    document.body.classList.remove("goal-flash-active");
  }, 800);
}

function initLiveTacticsEvents() {
  const panel = document.getElementById("live-tactics-panel");
  if (!panel) return;
  
  panel.querySelectorAll(".tactic-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const newStyle = btn.getAttribute("data-style");
      
      // Update state
      state.playstyle = newStyle;
      
      // Highlight selected button
      panel.querySelectorAll(".tactic-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      
      // Add log inside current running match if it's active
      if (state.simIntervalId) {
        const currentMin = state.currentMatchMinute || 0;
        addLog(currentMin, `📋 Comando Tático: Postura alterada para ${newStyle.toUpperCase()}!`, "system-info");
      }
    });
  });
}

// 10. ENTRY POINT / EVENT LISTENERS
window.addEventListener("DOMContentLoaded", () => {
  // Initialize starfield
  initStars();
  
  // Load local credentials
  loadManagerCredentials();
  
  // Load leaderboard initial
  renderLeaderboard();
  
  // Setup config screen button events
  initConfigSelection();
  
  // Login transition
  document.getElementById("btn-login").addEventListener("click", () => {
    const input = document.getElementById("username").value.trim();
    if (!input) {
      alert("Por favor, digite seu nome de treinador!");
      return;
    }
    state.managerName = input;
    saveManagerCredentials(input);
    showScreen("tela-config");
  });
  
  // Start draft transition
  document.getElementById("btn-start-draft").addEventListener("click", () => {
    startDraft();
  });
  
  // Skip click
  const skipBtn = document.getElementById("btn-skip-team");
  if (skipBtn) {
    skipBtn.addEventListener("click", skipTeam);
  }
  
  // Live tactics button initialization (Rule 3)
  initLiveTacticsEvents();
  
  // Recalculate chemistry lines on resize (Rule 1)
  window.addEventListener("resize", drawChemistryLines);
  
  // Restart click
  document.getElementById("btn-restart").addEventListener("click", () => {
    restartGame();
  });
  
  // Twinkle stars periodically resizing
  window.addEventListener("resize", initStars);
});
