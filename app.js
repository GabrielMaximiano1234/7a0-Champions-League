/* ==========================================================================
   26 A 0 - GAME LOGIC ENGINE
   ========================================================================== */

// 1. SQUADS DATABASE (Loaded from champions-7-0-db-v2.js)


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

// Helpers for Cross-Era Chemistry & Position Filtering
function getBaseClubName(teamName) {
  if (!teamName) return "";
  return teamName.replace(/\s+\d{4}.*$/, "").trim();
}

// CLUB COLOR MAPPING (Rule 1 & 3)
const teamColors = {
  "Real Madrid": { primaria: "#ffffff", secundaria: "#532e91", primaryRGB: "255, 255, 255", secondaryRGB: "83, 46, 145" },
  "Barcelona": { primaria: "#004d98", secundaria: "#a50044", primaryRGB: "0, 77, 152", secondaryRGB: "165, 0, 68" },
  "Milan": { primaria: "#ff0000", secundaria: "#000000", primaryRGB: "255, 0, 0", secondaryRGB: "0, 0, 0" },
  "Bayern Munique": { primaria: "#dc052d", secundaria: "#ffffff", primaryRGB: "220, 5, 45", secondaryRGB: "255, 255, 255" },
  "Inter de Milão": { primaria: "#0066b2", secundaria: "#000000", primaryRGB: "0, 102, 178", secondaryRGB: "0, 0, 0" },
  "Chelsea": { primaria: "#034694", secundaria: "#ffffff", primaryRGB: "3, 70, 148", secondaryRGB: "255, 255, 255" },
  "Manchester United": { primaria: "#da291c", secundaria: "#000000", primaryRGB: "218, 41, 28", secondaryRGB: "0, 0, 0" },
  "Liverpool": { primaria: "#c8102e", secundaria: "#f6eb61", primaryRGB: "200, 16, 46", secondaryRGB: "246, 235, 97" },
  "Porto": { primaria: "#005ca9", secundaria: "#ffffff", primaryRGB: "0, 92, 169", secondaryRGB: "255, 255, 255" },
  "Ajax": { primaria: "#d01c22", secundaria: "#ffffff", primaryRGB: "208, 28, 34", secondaryRGB: "255, 255, 255" },
  "Arsenal": { primaria: "#ef0107", secundaria: "#ffffff", primaryRGB: "239, 1, 7", secondaryRGB: "255, 255, 255" },
  "Manchester City": { primaria: "#6cabdd", secundaria: "#1c2c5b", primaryRGB: "108, 171, 221", secondaryRGB: "28, 44, 91" },
  "Atletico de Madrid": { primaria: "#cb3524", secundaria: "#192e62", primaryRGB: "203, 53, 36", secondaryRGB: "25, 46, 98" },
  "Borussia Dortmund": { primaria: "#fde100", secundaria: "#000000", primaryRGB: "253, 225, 0", secondaryRGB: "0, 0, 0" },
  "Paris Saint-Germain": { primaria: "#0052b4", secundaria: "#e30613", primaryRGB: "0, 82, 180", secondaryRGB: "227, 6, 19" },
  "Monaco": { primaria: "#e2001a", secundaria: "#ffffff", primaryRGB: "226, 0, 26", secondaryRGB: "255, 255, 255" },
  "Valencia": { primaria: "#ffffff", secundaria: "#ff7f00", primaryRGB: "255, 255, 255", secondaryRGB: "255, 127, 0" },
  "Bayer Leverkusen": { primaria: "#e32221", secundaria: "#000000", primaryRGB: "227, 34, 33", secondaryRGB: "0, 0, 0" },
  "Roma": { primaria: "#861f41", secundaria: "#fbe122", primaryRGB: "134, 31, 65", secondaryRGB: "251, 225, 34" },
  "Napoli": { primaria: "#12a0fc", secundaria: "#ffffff", primaryRGB: "18, 160, 252", secondaryRGB: "255, 255, 255" },
  "Marseille": { primaria: "#00a2e8", secundaria: "#ffffff", primaryRGB: "0, 162, 232", secondaryRGB: "255, 255, 255" },
  "Sevilla": { primaria: "#d41910", secundaria: "#ffffff", primaryRGB: "212, 25, 16", secondaryRGB: "255, 255, 255" },
  "Benfica": { primaria: "#e30613", secundaria: "#ffffff", primaryRGB: "227, 6, 19", secondaryRGB: "255, 255, 255" },
  "Juventus": { primaria: "#ffffff", secundaria: "#000000", primaryRGB: "255, 255, 255", secondaryRGB: "0, 0, 0" },
  "Lama FC": { primaria: "#8d6e63", secundaria: "#3e2723", primaryRGB: "141, 110, 99", secondaryRGB: "62, 39, 35" }
};
const CLUB_COLORS = teamColors;
const DEFAULT_COLORS = { primaria: "#00e5ff", secundaria: "#ffd700", primaryRGB: "0, 229, 255", secondaryRGB: "255, 215, 0" };

function getClubColors(teamName) {
  if (!teamName) return DEFAULT_COLORS;
  
  // Clean drawn squad name
  const clean = getBaseClubName(teamName).toLowerCase();
  
  // Substring checks both directions (Rule 1)
  for (const key of Object.keys(teamColors)) {
    if (clean.includes(key.toLowerCase()) || key.toLowerCase().includes(clean)) {
      return teamColors[key];
    }
  }
  
  return DEFAULT_COLORS;
}

// Click Ripple effect (Rule 4)
function createRippleEffect(element, color) {
  const circle = document.createElement("span");
  const diameter = Math.max(element.clientWidth, element.clientHeight);
  
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `50%`;
  circle.style.top = `50%`;
  circle.style.transform = `translate(-50%, -50%) scale(0)`;
  circle.className = "ripple";
  circle.style.backgroundColor = color;
  circle.style.position = "absolute";
  circle.style.borderRadius = "50%";
  circle.style.pointerEvents = "none";
  circle.style.opacity = "0.7";
  circle.style.animation = "ripple-animation 0.6s linear";
  
  const originalPosition = element.style.position;
  if (!originalPosition || originalPosition === "static") {
    element.style.position = "relative";
  }
  element.style.overflow = "hidden";
  
  element.appendChild(circle);
  
  setTimeout(() => {
    circle.remove();
  }, 600);
}

// Web Audio Synthesizer (cheers and wind draw whoosh)
let audioCtx = null;

function playDrawSound() {
  try {
    const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtxClass) return;
    if (!audioCtx) {
      audioCtx = new AudioCtxClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    const now = audioCtx.currentTime;
    
    // 1. Whoosh / Wind Sweep (Lottery draw sensation)
    const noiseLength = audioCtx.sampleRate * 1.5;
    const buffer = audioCtx.createBuffer(1, noiseLength, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < noiseLength; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = buffer;
    
    const filterNode = audioCtx.createBiquadFilter();
    filterNode.type = "bandpass";
    filterNode.Q.setValueAtTime(8, now);
    filterNode.frequency.setValueAtTime(300, now);
    filterNode.frequency.exponentialRampToValueAtTime(1500, now + 0.6);
    filterNode.frequency.exponentialRampToValueAtTime(100, now + 1.5);
    
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.12, now + 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
    
    noiseNode.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    noiseNode.start(now);
    noiseNode.stop(now + 1.5);
    
    // 2. Crowd Cheer Sound (Layered pink noise approximation)
    const cheerLength = audioCtx.sampleRate * 2.5;
    const cheerBuffer = audioCtx.createBuffer(1, cheerLength, audioCtx.sampleRate);
    const cheerData = cheerBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < cheerLength; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      cheerData[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      cheerData[i] *= 0.1;
      b6 = white * 0.115926;
    }
    
    const cheerNode = audioCtx.createBufferSource();
    cheerNode.buffer = cheerBuffer;
    
    const cheerFilter = audioCtx.createBiquadFilter();
    cheerFilter.type = "lowpass";
    cheerFilter.frequency.setValueAtTime(400, now);
    cheerFilter.frequency.exponentialRampToValueAtTime(1000, now + 0.4);
    cheerFilter.frequency.exponentialRampToValueAtTime(300, now + 2.5);
    
    const cheerGain = audioCtx.createGain();
    cheerGain.gain.setValueAtTime(0, now);
    cheerGain.gain.linearRampToValueAtTime(0.06, now + 0.4);
    cheerGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
    
    cheerNode.connect(cheerFilter);
    cheerFilter.connect(cheerGain);
    cheerGain.connect(audioCtx.destination);
    
    cheerNode.start(now + 0.1);
    cheerNode.stop(now + 2.5);
  } catch (e) {
    console.warn("Web Audio API failed or blocked", e);
  }
}

// Convert Hex color to RGB comma-separated string (Rule 2)
function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : "0, 0, 0";
}

// Check if team is historically striped (Rule 1)
function isStripedTeam(teamName) {
  const baseName = getBaseClubName(teamName);
  const stripedClubs = ["Barcelona", "Milan", "Inter de Milão", "Porto", "Juventus", "Atletico de Madrid"];
  return stripedClubs.includes(baseName);
}

// Compile custom soccer shirt SVG model (Rule 1)
function getJerseySVG(teamName, colors, uniqueId) {
  const isStriped = isStripedTeam(teamName);
  const color1 = colors.primaria;
  const color2 = colors.secundaria;
  
  let fillValue = color1;
  let patternDef = "";
  
  if (isStriped) {
    const patternId = `stripes-${uniqueId}`;
    patternDef = `
      <defs>
        <pattern id="${patternId}" width="20" height="100" patternUnits="userSpaceOnUse">
          <rect width="10" height="100" fill="${color1}"/>
          <rect x="10" width="10" height="100" fill="${color2}"/>
        </pattern>
      </defs>
    `;
    fillValue = `url(#${patternId})`;
  }
  
  return `
    <svg class="jersey-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width: 36px; height: 36px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.45));">
      ${patternDef}
      <!-- Main Shirt Body -->
      <path d="M 40,20 L 30,22 L 15,35 L 22,48 L 32,40 L 32,85 L 68,85 L 68,40 L 78,48 L 85,35 L 70,22 L 60,20 C 60,26 40,26 40,20 Z" fill="${fillValue}" stroke="${isStriped ? 'none' : color2}" stroke-width="1.5" />
      
      <!-- Collar & Details (Secondary color for solid, black/white/gold accents for striped) -->
      <path d="M 40,20 C 42,25 58,25 60,20" fill="none" stroke="${color2}" stroke-width="3" stroke-linecap="round" />
      
      <!-- Left Sleeve Cuff -->
      <line x1="15" y1="35" x2="22" y2="48" stroke="${color2}" stroke-width="3.5" />
      
      <!-- Right Sleeve Cuff -->
      <line x1="85" y1="35" x2="78" y2="48" stroke="${color2}" stroke-width="3.5" />
    </svg>
  `;
}

function getVacantPositions() {
  const formationSlots = FORMATIONS[state.formation];
  const vacant = new Set();
  formationSlots.forEach(slot => {
    if (!state.draftRoster[slot.id]) {
      vacant.add(slot.pos);
    }
  });
  return Array.from(vacant);
}

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
  yearSkipsRemaining: 3, // Pulos de era/ano (Rule 1)
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
  localStorage.setItem("draft26a0_lastManager", name);
}

function loadManagerCredentials() {
  const name = localStorage.getItem("draft26a0_lastManager");
  if (name) {
    const input = document.getElementById("coach-name-input");
    if (input) input.value = name;
  }
}

function saveHighscore(scoreObj) {
  const scores = JSON.parse(localStorage.getItem("draft26a0_leaderboard") || "[]");
  scores.push(scoreObj);
  // Sort: perfect run first, then wins, then goals diff
  scores.sort((a, b) => {
    if (a.perfect !== b.perfect) return a.perfect ? -1 : 1;
    if (a.wins !== b.wins) return b.wins - a.wins;
    return (b.goalsScored - b.goalsConceded) - (a.goalsScored - a.goalsConceded);
  });
  // Keep top 5
  localStorage.setItem("draft26a0_leaderboard", JSON.stringify(scores.slice(0, 5)));
  renderLeaderboard();
}

function renderLeaderboard() {
  const container = document.getElementById("leaderboard-list");
  const scores = JSON.parse(localStorage.getItem("draft26a0_leaderboard") || "[]");
  
  if (scores.length === 0) {
    container.innerHTML = `<li class="leaderboard-item" style="justify-content: center; color: var(--color-text-muted);">Nenhum recorde registrado ainda. Seja o primeiro!</li>`;
    return;
  }
  
  container.innerHTML = scores.map((s, index) => {
    let trophy = "🏅";
    if (index === 0) trophy = "🥇";
    else if (index === 1) trophy = "🥈";
    else if (index === 2) trophy = "🥉";
    
    const perfectBadge = s.perfect ? `<span style="color: var(--color-secondary); font-weight: bold;">[26a0 Perfeito!]</span>` : "";
    return `
      <li class="leaderboard-item">
        <span><span class="rank">${trophy} #${index + 1}</span> ${s.name} ${perfectBadge}</span>
        <span class="score">${s.wins} Vitórias | GP: ${s.goalsScored} - GC: ${s.goalsConceded}</span>
      </li>
    `;
  }).join("");
}

// 5. CONFIGURATION HANDLERS
var currentMode = "classic"; // Global variable for current mode (Rule 2)

function initConfigSelection() {
  // Config selection is now handled directly by unified lobby page listeners
}

// 6. DRAFT ENGINE
function startDraft() {
  state.draftRound = 1;
  state.draftRoster = {};
  state.selectedPlayerNames.clear();
  state.selectedCandidate = null;
  state.skipsRemaining = 3;
  state.yearSkipsRemaining = 3; // Reset skips (Rule 1)
  
  // Set up manager info in right panel
  document.getElementById("roster-manager-name").innerText = state.managerName;
  document.getElementById("roster-tactics-display").innerText = `${state.formation} | ${state.playstyle.toUpperCase()}`;
  
  // Render football pitch slots
  renderPitchSlots();
  
  // Update skip button to initial state
  updateSkipButtonState();
  updateSkipYearButtonState(); // Update skip year button state
  
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
    // Check achievements
    checkDraftAchievements();
    // Roster is fully drafted!
    initTournament();
    return;
  }
  
  document.getElementById("current-round-title").innerText = `Rodada ${state.draftRound} / 11`;
  document.getElementById("roster-count").innerText = `${state.draftRound - 1} / 11`;
  
  // Reset candidate selection
  state.selectedCandidate = null;
  
  // Draw random squad (Rule 3)
  let teamNames = Object.keys(SQUADS_DATABASE);
  if (state.gameMode === "atual") {
    const championsDatabase = Object.keys(SQUADS_DATABASE).map(name => ({ name, players: SQUADS_DATABASE[name] }));
    const draftPool = championsDatabase.filter(team => team.name.includes("2025/26"));
    teamNames = draftPool.map(t => t.name);
  }
  
  let drawnTeam = "";
  let availableCandidates = [];
  
  // Find vacant positions (Rule 2)
  const vacantPositions = getVacantPositions();
  
  // Loop to find a team with unused players matching vacant positions (preventing skippedTeamName if provided - Rule 3)
  let attempts = 0;
  while (attempts < 200) {
    const randTeam = teamNames[Math.floor(Math.random() * teamNames.length)];
    if (skippedTeamName && randTeam === skippedTeamName) {
      attempts++;
      continue;
    }
    const teamPlayers = SQUADS_DATABASE[randTeam].filter(p => !state.selectedPlayerNames.has(p.name));
    
    // Filter candidate players to only those who can fill our vacant positions
    const usefulPlayers = teamPlayers.filter(p => vacantPositions.includes(p.pos));
    
    if (usefulPlayers.length > 0) {
      drawnTeam = randTeam;
      availableCandidates = usefulPlayers;
      break;
    }
    attempts++;
  }
  
  // Fallback: if we couldn't find a team with matching vacant positions, try any team with unused players
  if (!drawnTeam) {
    attempts = 0;
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
  
  // Dynamic color and animation injection (Rule 4 & 2)
  const colors = getClubColors(drawnTeam);
  const rgb1 = hexToRgb(colors.primaria);
  const rgb2 = hexToRgb(colors.secundaria);
  
  document.documentElement.style.setProperty("--cor-clube-1", colors.primaria);
  document.documentElement.style.setProperty("--cor-clube-2", colors.secundaria);
  document.documentElement.style.setProperty("--cor-clube-1-rgb", rgb1);
  document.documentElement.style.setProperty("--cor-clube-2-rgb", rgb2);
  
  const selectionPanel = document.getElementById("selection-panel");
  if (selectionPanel) {
    selectionPanel.style.setProperty("--cor-clube-1", colors.primaria);
    selectionPanel.style.setProperty("--cor-clube-2", colors.secundaria);
    selectionPanel.style.setProperty("--cor-clube-1-rgb", rgb1);
    selectionPanel.style.setProperty("--cor-clube-2-rgb", rgb2);
    
    selectionPanel.classList.remove("flash-sorteio-active");
    void selectionPanel.offsetWidth; // trigger reflow
    selectionPanel.classList.add("flash-sorteio-active");
    setTimeout(() => {
      selectionPanel.classList.remove("flash-sorteio-active");
    }, 1000);
  }
  
  // Web Audio lottery sound
  playDrawSound();
  
  // Render player cards
  renderCandidates();
  
  // Update skip year button state
  updateSkipYearButtonState();
  
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

function skipYear() {
  if (state.yearSkipsRemaining <= 0) return;
  if (!state.currentDrawnTeam) return;
  
  const currentClub = getBaseClubName(state.currentDrawnTeam);
  const currentTeamName = state.currentDrawnTeam;
  
  let alternativePool = Object.keys(SQUADS_DATABASE).filter(name => {
    return getBaseClubName(name).toLowerCase() === currentClub.toLowerCase() && name !== currentTeamName;
  });
  
  if (state.gameMode === "atual") {
    alternativePool = alternativePool.filter(name => name.includes("2025/26"));
  }
  
  if (alternativePool.length === 0) {
    return;
  }
  
  // Deduct skip and spin button (UI/UX Pro Max)
  state.yearSkipsRemaining--;
  const skipYearBtn = document.getElementById("btn-skip-year");
  if (skipYearBtn) {
    skipYearBtn.classList.add("spinning");
    setTimeout(() => {
      skipYearBtn.classList.remove("spinning");
    }, 600);
  }
  
  // Draw random alternative era
  const newTeam = alternativePool[Math.floor(Math.random() * alternativePool.length)];
  state.currentDrawnTeam = newTeam;
  
  // Find vacant positions matching slot
  const vacantPositions = getVacantPositions();
  const teamPlayers = SQUADS_DATABASE[newTeam].filter(p => !state.selectedPlayerNames.has(p.name));
  let usefulPlayers = teamPlayers.filter(p => vacantPositions.includes(p.pos));
  if (usefulPlayers.length === 0) {
    usefulPlayers = teamPlayers; // fallback
  }
  state.currentCandidates = usefulPlayers;
  
  document.getElementById("current-team-drawn").innerText = `Elenco sorteado: ${newTeam}`;
  
  // Re-apply colors and trigger slime reveal (Rule 3)
  const colors = getClubColors(newTeam);
  const rgb1 = hexToRgb(colors.primaria);
  const rgb2 = hexToRgb(colors.secundaria);
  
  document.documentElement.style.setProperty("--cor-clube-1", colors.primaria);
  document.documentElement.style.setProperty("--cor-clube-2", colors.secundaria);
  document.documentElement.style.setProperty("--cor-clube-1-rgb", rgb1);
  document.documentElement.style.setProperty("--cor-clube-2-rgb", rgb2);
  
  const selectionPanel = document.getElementById("selection-panel");
  if (selectionPanel) {
    selectionPanel.style.setProperty("--cor-clube-1", colors.primaria);
    selectionPanel.style.setProperty("--cor-clube-2", colors.secundaria);
    selectionPanel.style.setProperty("--cor-clube-1-rgb", rgb1);
    selectionPanel.style.setProperty("--cor-clube-2-rgb", rgb2);
    
    selectionPanel.classList.remove("flash-sorteio-active");
    void selectionPanel.offsetWidth; // trigger reflow
    selectionPanel.classList.add("flash-sorteio-active");
    setTimeout(() => {
      selectionPanel.classList.remove("flash-sorteio-active");
    }, 1000);
  }
  
  // Play draw sound
  playDrawSound();
  
  // Render candidates
  renderCandidates();
  
  // Update button state
  updateSkipYearButtonState();
}

function updateSkipYearButtonState() {
  const skipBtn = document.getElementById("btn-skip-year");
  if (!skipBtn) return;
  
  skipBtn.innerText = `🔄 Pular Ano (${state.yearSkipsRemaining} Restantes)`;
  skipBtn.className = "btn-skip"; // Reset class
  
  if (state.yearSkipsRemaining <= 0) {
    skipBtn.disabled = true;
    return;
  }
  
  if (!state.currentDrawnTeam) {
    skipBtn.disabled = true;
    return;
  }
  
  const currentClub = getBaseClubName(state.currentDrawnTeam);
  const currentTeamName = state.currentDrawnTeam;
  
  let alternativePool = Object.keys(SQUADS_DATABASE).filter(name => {
    return getBaseClubName(name).toLowerCase() === currentClub.toLowerCase() && name !== currentTeamName;
  });
  
  if (state.gameMode === "atual") {
    alternativePool = alternativePool.filter(name => name.includes("2025/26"));
  }
  
  if (alternativePool.length > 0) {
    skipBtn.disabled = false;
    skipBtn.classList.add(`skips-${state.yearSkipsRemaining}`);
  } else {
    skipBtn.disabled = true;
  }
}

function renderCandidates() {
  const container = document.getElementById("draft-candidates");
  container.innerHTML = "";
  
  const colors = getClubColors(state.currentDrawnTeam);
  const rgb1 = hexToRgb(colors.primaria);
  const rgb2 = hexToRgb(colors.secundaria);
  
  state.currentCandidates.forEach((player, idx) => {
    const cardContainer = document.createElement("div");
    cardContainer.className = "selection-card-container card-3d-flip";
    cardContainer.style.animationDelay = `${idx * 0.12}s`;
    cardContainer.setAttribute("data-index", idx);
    
    // Inject club colors as CSS variables for card gradients (Rule 2)
    cardContainer.style.setProperty("--cor-clube-1", colors.primaria);
    cardContainer.style.setProperty("--cor-clube-2", colors.secundaria);
    cardContainer.style.setProperty("--cor-clube-1-rgb", rgb1);
    cardContainer.style.setProperty("--cor-clube-2-rgb", rgb2);
    cardContainer.style.setProperty("--club-primary-rgb", colors.primaryRGB || rgb1);
    cardContainer.style.setProperty("--club-secondary-rgb", colors.secondaryRGB || rgb2);
    
    const isGold = player.rating >= 90;
    let cardClass = "";
    let ratingDisplay = "";
    let ratingClass = "rating";
    
    if (state.gameMode === "classic" || state.gameMode === "atual") {
      cardClass = isGold ? "card-ouro gold-tier" : "card-comum";
      ratingDisplay = player.rating;
    } else {
      // Almanac: Anti-Spoiler (always common card visual, rating hidden)
      cardClass = "card-comum";
      ratingDisplay = "";
      ratingClass = "rating hidden";
    }
    
    // Compile retro jersey SVG icon (Rule 1)
    const jerseySVG = getJerseySVG(state.currentDrawnTeam, colors, `candidate-${idx}`);
    
    cardContainer.innerHTML = `
      <div class="player-card ${cardClass}">
        <div class="slime-overlay"></div>
        <div class="card-header-info">
          <span class="${ratingClass}">${ratingDisplay}</span>
          <span class="position">${player.pos}</span>
        </div>
        <div class="card-photo">${jerseySVG}</div>
        <div class="card-footer">
          <div class="name">${player.name}</div>
          <div class="team-name">${state.currentDrawnTeam.split(" ")[0]}</div>
        </div>
      </div>
    `;

    const card = cardContainer.querySelector(".player-card");
    if (card) {
      card.style.setProperty('--club-primary-rgb', colors.primaryRGB || rgb1);
      card.style.setProperty('--club-secondary-rgb', colors.secondaryRGB || rgb2);
    }
    
    cardContainer.addEventListener("click", () => {
      createRippleEffect(cardContainer, colors.primaria);
      selectCandidate(idx, cardContainer);
    });
    container.appendChild(cardContainer);
  });

  // Cleanup slime overlay after animation completes (1.5s)
  setTimeout(() => {
    container.querySelectorAll(".slime-overlay").forEach(el => el.remove());
  }, 1500);
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
  
  let cardClass = "";
  let ratingDisplay = "";
  let ratingClass = "rating";
  
  if (state.gameMode === "classic" || state.gameMode === "atual") {
    cardClass = isGold ? "card-ouro gold-tier" : "card-comum";
    ratingDisplay = finalPlayer.rating;
  } else {
    // Almanac: Reveal gold card visual on tactical field, but keep rating number hidden (Rule 2)
    cardClass = isGold ? "card-ouro gold-tier" : "card-comum";
    ratingDisplay = "";
    ratingClass = "rating hidden";
  }
  
  // Set slot color properties for card gradients (Rule 2)
  const colors = getClubColors(finalPlayer.originTeam);
  const rgb1 = hexToRgb(colors.primaria);
  const rgb2 = hexToRgb(colors.secundaria);
  slotEl.style.setProperty("--cor-clube-1", colors.primaria);
  slotEl.style.setProperty("--cor-clube-2", colors.secundaria);
  slotEl.style.setProperty("--cor-clube-1-rgb", rgb1);
  slotEl.style.setProperty("--cor-clube-2-rgb", rgb2);
  slotEl.style.setProperty("--club-primary-rgb", colors.primaryRGB || rgb1);
  slotEl.style.setProperty("--club-secondary-rgb", colors.secondaryRGB || rgb2);
  
  // Compile retro jersey SVG icon (Rule 1)
  const jerseySVG = getJerseySVG(finalPlayer.originTeam, colors, `slot-${slot.id}`);
  
  slotEl.innerHTML = `
    <div class="player-card ${cardClass}" style="border-radius: 8px;">
      <div class="slime-overlay"></div>
      <div class="card-header-info" style="font-size: 0.55rem; padding: 0 1px;">
        <span class="${ratingClass}" style="font-size: 0.75rem;">${ratingDisplay}</span>
        <span class="position" style="font-size: 0.5rem; padding: 0px 2px;">${finalPlayer.pos}</span>
      </div>
      <div style="transform: scale(0.65); margin: -4px 0;">${jerseySVG}</div>
      <div class="name" style="font-size: 0.6rem; transform: scale(0.95); margin-top: 1px;">${finalPlayer.name.split(" ").pop()}</div>
      <div class="team-name" style="font-size: 0.45rem; opacity: 0.7; margin-bottom: 2px;">${finalPlayer.originTeam.split(" ")[0]}</div>
    </div>
  `;

  const card = slotEl.querySelector(".player-card");
  if (card) {
    card.style.setProperty('--club-primary-rgb', colors.primaryRGB || rgb1);
    card.style.setProperty('--club-secondary-rgb', colors.secondaryRGB || rgb2);
  }
  
  // Set blink variables on the slot element (Rule 4)
  let blinkColor = colors.primaria;
  let blinkColorAlpha = "rgba(0, 240, 255, 0.3)";
  
  if (isGold) {
    // Gold celebratory blink for rating >= 90 (Rule 2)
    blinkColor = "#ffd700";
    blinkColorAlpha = "rgba(255, 215, 0, 0.35)";
  } else {
    const hex = colors.primaria;
    const rVal = parseInt(hex.slice(1, 3), 16);
    const gVal = parseInt(hex.slice(3, 5), 16);
    const bVal = parseInt(hex.slice(5, 7), 16);
    blinkColorAlpha = `rgba(${rVal}, ${gVal}, ${bVal}, 0.3)`;
  }
  
  slotEl.style.setProperty("--blink-color", blinkColor);
  slotEl.style.setProperty("--blink-color-alpha", blinkColorAlpha);
  
  // Trigger blink animation
  slotEl.classList.remove("slot-blink-active");
  void slotEl.offsetWidth; // trigger reflow
  slotEl.classList.add("slot-blink-active");
  
  setTimeout(() => {
    slotEl.classList.remove("slot-blink-active");
  }, 1200);

  // Cleanup slime overlay after animation completes (1.5s)
  setTimeout(() => {
    const slime = slotEl.querySelector(".slime-overlay");
    if (slime) slime.remove();
  }, 1500);
  
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
  
  // Chemistry connection count / synergy (Rule 1 & 3)
  let connectionCount = 0;
  const teamGroups = {};
  const slots = FORMATIONS[state.formation];
  
  slots.forEach(slot => {
    const player = state.draftRoster[slot.id];
    if (player && player.originTeam) {
      const baseClub = getBaseClubName(player.originTeam);
      if (!teamGroups[baseClub]) {
        teamGroups[baseClub] = 0;
      }
      teamGroups[baseClub]++;
    }
  });
  
  Object.keys(teamGroups).forEach(baseClub => {
    const count = teamGroups[baseClub];
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
  let teams = Object.keys(SQUADS_DATABASE);
  if (state.gameMode === "atual") {
    const championsDatabase = Object.keys(SQUADS_DATABASE).map(name => ({ name, players: SQUADS_DATABASE[name] }));
    const draftPool = championsDatabase.filter(team => team.name.includes("2025/26"));
    teams = draftPool.map(t => t.name);
  }
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
  const userName = state.gameMode === "career" ? "Lama FC" : "Meu Time";
  state.groupStandings = [
    { name: userName, pts: 0, pj: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0, isUser: true },
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
  
  document.getElementById("sim-user-name").innerText = state.gameMode === "career" ? "Lama FC" : (state.managerName || "Meu Time");
  const userAvg = parseInt(document.getElementById("roster-avg-rating").innerText) || 85;
  const userChem = parseInt(document.getElementById("roster-chemistry").innerText) || 50;
  document.getElementById("sim-user-rating").innerText = `Rating: ${userAvg} | Chem: ${userChem}%`;
  
  document.getElementById("sim-opp-name").innerText = state.currentMatchOpponentName;
  document.getElementById("sim-opp-rating").innerText = `Rating: ${state.currentMatchOpponentRating}`;
  
  // Reset logs
  const logBox = document.getElementById("sim-log-box");
  logBox.innerHTML = `<div class="log-entry system-info">Aguardando o pontapé inicial...</div>`;
  
  // Reset goals timeline and penalties container (Rule 2 & 3)
  document.getElementById("sim-goals-left").innerHTML = "";
  document.getElementById("sim-goals-right").innerHTML = "";
  document.getElementById("sim-penalty-container").style.display = "none";
  document.getElementById("sim-penalty-score").innerText = "0 - 0";
  document.getElementById("sim-penalty-result").innerText = "";
  document.getElementById("sim-penalty-user-series").innerHTML = "";
  document.getElementById("sim-penalty-opp-series").innerHTML = "";
  
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
    <table style="width:100%; font-size:0.8rem; border-collapse:collapse; text-align:left; color:#111111;">
      <thead>
        <tr style="border-bottom:2px solid #111111; color:#555555; font-family:'Anton', sans-serif; text-transform:uppercase; letter-spacing:0.5px;">
          <th style="padding:6px 0;">Clube</th>
          <th>PJ</th>
          <th>Pts</th>
          <th>SG</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  sorted.forEach((team, idx) => {
    const rowStyle = team.isUser 
      ? 'style="border-bottom:1px dashed rgba(17,17,17,0.15); font-weight:bold; background:#fffae6; color:#111111;"' 
      : 'style="border-bottom:1px dashed rgba(17,17,17,0.15); color:#111111;"';
    
    html += `
      <tr ${rowStyle}>
        <td style="padding:8px 0; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${idx + 1}. ${team.name.split(" ")[0]}</td>
        <td>${team.pj}</td>
        <td style="font-weight:bold; color:${team.isUser ? '#c29b38' : '#111111'};">${team.pts}</td>
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
  state.currentMatchGoals = [];
  const userGoalList = [];
  const oppGoalList = [];
  
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
        
        // Store and display goal details (Rule 2)
        const shortAttacker = attacker.split(" ").pop();
        state.currentMatchGoals.push({ team: "user", author: attacker, minute: currentMinute });
        userGoalList.push(`${shortAttacker} ${currentMinute}'`);
        document.getElementById("sim-goals-left").innerHTML = "⚽ " + userGoalList.join(", ");
        
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
        
        // Store and display goal details (Rule 2)
        const shortOppAttacker = oppAttacker.split(" ").pop();
        state.currentMatchGoals.push({ team: "opp", author: oppAttacker, minute: currentMinute });
        oppGoalList.push(`${shortOppAttacker} ${currentMinute}'`);
        document.getElementById("sim-goals-right").innerHTML = "⚽ " + oppGoalList.join(", ");
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
    
    if (state.gameMode === "career") {
      actionBtn.innerHTML = `<span>Finalizar Rodada</span>`;
      actionBtn.onclick = () => {
        handleCareerMatchCompletion(userGoals, oppGoals);
      };
      return;
    }
    
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
    
    if (state.gameMode === "career") {
      if (userGoals === oppGoals) {
        addLog(90, `⚠️ EMPATE no tempo regulamentar! A decisão vai para os pênaltis.`, "system-info");
        actionBtn.innerHTML = `<span>Disputar Pênaltis</span>`;
        actionBtn.onclick = () => simulatePenalties(userGoals, oppGoals);
      } else {
        actionBtn.innerHTML = `<span>Finalizar Rodada</span>`;
        actionBtn.onclick = () => {
          handleCareerMatchCompletion(userGoals, oppGoals);
        };
      }
      return;
    }
    
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
  const container = document.getElementById("sim-penalty-container");
  if (container) {
    container.style.display = "block";
  }
  
  const scoreEl = document.getElementById("sim-penalty-score");
  if (scoreEl) scoreEl.innerText = "0 - 0";
  
  const resultEl = document.getElementById("sim-penalty-result");
  if (resultEl) {
    resultEl.innerText = "Preparando cobranças...";
    resultEl.style.color = "#fff";
  }
  
  const userSeriesEl = document.getElementById("sim-penalty-user-series");
  const oppSeriesEl = document.getElementById("sim-penalty-opp-series");
  
  // Render initial 5 empty slots (gray/opacity circles)
  if (userSeriesEl) {
    userSeriesEl.innerHTML = Array(5).fill('<span class="penalty-dot" style="display:inline-block; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); margin: 0 3px; font-size: 1.1rem; opacity: 0.3;">⚪</span>').join("");
  }
  if (oppSeriesEl) {
    oppSeriesEl.innerHTML = Array(5).fill('<span class="penalty-dot" style="display:inline-block; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); margin: 0 3px; font-size: 1.1rem; opacity: 0.3;">⚪</span>').join("");
  }
  
  const logBox = document.getElementById("sim-log-box");
  logBox.innerHTML = `<div class="log-entry system-info">⚔️ INÍCIO DA DECISÃO POR PÊNALTIS! Haja coração!</div>`;
  
  const actionBtn = document.getElementById("btn-action-match");
  actionBtn.disabled = true;
  actionBtn.innerText = "Disputando Pênaltis...";

  let uScore = 0;
  let oScore = 0;
  let currentRound = 0; // 0, 1, 2, 3, 4 (first 5 rounds) then sudden death
  let turn = "user"; // 'user' or 'opp'
  
  const myRoster = Object.values(state.draftRoster);
  const oppRoster = SQUADS_DATABASE[state.currentMatchOpponentName] || [];
  
  // Sort or shuffle kickers to make it dynamic
  const userKickers = [...myRoster].sort(() => Math.random() - 0.5);
  const oppKickers = [...oppRoster].sort(() => Math.random() - 0.5);
  
  const userGK = myRoster.find(p => p.pos === "GOL")?.name || "Goleiro";
  const oppGK = SQUADS_DATABASE[state.currentMatchOpponentName][0]?.name || "Goleiro"; // Opp GK is first in squad

  const checkPenaltyEnd = () => {
    const userKicksTaken = (turn === "opp") ? (currentRound + 1) : currentRound;
    const oppKicksTaken = currentRound;
    
    const userKicksLeft = Math.max(0, 5 - userKicksTaken);
    const oppKicksLeft = Math.max(0, 5 - oppKicksTaken);
    
    let canEnd = false;
    
    if (currentRound < 5) {
      // Regular series (first 5 rounds)
      if (uScore > oScore + oppKicksLeft) {
        canEnd = true;
      } else if (oScore > uScore + userKicksLeft) {
        canEnd = true;
      }
    } else {
      // Sudden death (after both have taken equal number of kicks)
      if (userKicksTaken === oppKicksTaken && uScore !== oScore) {
        canEnd = true;
      }
    }
    
    if (canEnd) {
      if (resultEl) {
        resultEl.innerText = uScore > oScore ? "🏆 VITÓRIA NOS PÊNALTIS!" : "❌ DERROTA NOS PÊNALTIS!";
        resultEl.style.color = uScore > oScore ? "var(--color-secondary)" : "#ff4d4d";
        resultEl.style.textShadow = uScore > oScore ? "0 0 10px rgba(255,215,0,0.5)" : "0 0 10px rgba(255,77,77,0.5)";
      }
      setTimeout(() => {
        resolvePenaltiesOutcome(uScore, oScore);
      }, 2000);
      return true;
    }
    return false;
  };

  const runNextKick = () => {
    if (turn === "user") {
      if (resultEl) {
        resultEl.innerText = "Seu time vai cobrar...";
        resultEl.style.color = "var(--color-primary)";
      }
      
      setTimeout(() => {
        const kicker = userKickers[currentRound % userKickers.length].name;
        // 78% goal chance
        const userScored = Math.random() < 0.78;
        
        const userDots = userSeriesEl.querySelectorAll(".penalty-dot");
        if (currentRound >= userDots.length) {
          userSeriesEl.insertAdjacentHTML('beforeend', '<span class="penalty-dot" style="display:inline-block; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); margin: 0 3px; font-size: 1.1rem; opacity: 0.3;">⚪</span>');
        }
        
        const targetDot = userSeriesEl.querySelectorAll(".penalty-dot")[currentRound];
        
        if (userScored) {
          uScore++;
          if (targetDot) {
            targetDot.innerHTML = "🟢";
            targetDot.style.opacity = "1";
            targetDot.style.transform = "scale(1.3)";
          }
          if (scoreEl) scoreEl.innerText = `${uScore} - ${oScore}`;
          addLog(`P${currentRound + 1}`, `⚽ GOL! ${kicker} bate no canto oposto de ${oppGK} com muita calma!`, "goal-event");
          if (resultEl) {
            resultEl.innerText = "⚽ GOL DO SEU TIME!";
            resultEl.style.color = "var(--color-secondary)";
          }
        } else {
          if (targetDot) {
            targetDot.innerHTML = "❌";
            targetDot.style.opacity = "1";
            targetDot.style.transform = "scale(1.3)";
          }
          addLog(`P${currentRound + 1}`, `❌ DEFENDEU! ${oppGK} adivinha o canto e faz bela defesa no chute de ${kicker}!`, "save-event");
          if (resultEl) {
            resultEl.innerText = "❌ NA TRAVE / DEFENDEU!";
            resultEl.style.color = "#ff4d4d";
          }
        }
        
        turn = "opp";
        
        if (checkPenaltyEnd()) return;
        
        setTimeout(runNextKick, 1800);
      }, 1500);
    } else {
      if (resultEl) {
        resultEl.innerText = "Adversário vai cobrar...";
        resultEl.style.color = "#ff8800";
      }
      
      setTimeout(() => {
        const kicker = oppKickers[currentRound % oppKickers.length].name;
        // 72% goal chance for opponent (slight user GK strength help)
        const oppScored = Math.random() < 0.72;
        
        const oppDots = oppSeriesEl.querySelectorAll(".penalty-dot");
        if (currentRound >= oppDots.length) {
          oppSeriesEl.insertAdjacentHTML('beforeend', '<span class="penalty-dot" style="display:inline-block; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); margin: 0 3px; font-size: 1.1rem; opacity: 0.3;">⚪</span>');
        }
        
        const targetDot = oppSeriesEl.querySelectorAll(".penalty-dot")[currentRound];
        
        if (oppScored) {
          oScore++;
          if (targetDot) {
            targetDot.innerHTML = "🟢";
            targetDot.style.opacity = "1";
            targetDot.style.transform = "scale(1.3)";
          }
          if (scoreEl) scoreEl.innerText = `${uScore} - ${oScore}`;
          addLog(`P${currentRound + 1}`, `❌ Gol do adversário! ${kicker} desloca ${userGK} com categoria.`, "goal-conceded");
          if (resultEl) {
            resultEl.innerText = "⚽ GOL DO ADVERSÁRIO!";
            resultEl.style.color = "#ff4d4d";
          }
        } else {
          if (targetDot) {
            targetDot.innerHTML = "❌";
            targetDot.style.opacity = "1";
            targetDot.style.transform = "scale(1.3)";
          }
          addLog(`P${currentRound + 1}`, `🧤 DEFENDEU!!! ${userGK} brilha e faz uma defesa espetacular no chute de ${kicker}!`, "save-event");
          if (resultEl) {
            resultEl.innerText = "🧤 DEFESA SENSACIONAL!";
            resultEl.style.color = "var(--color-primary)";
          }
        }
        
        currentRound++;
        turn = "user";
        
        if (checkPenaltyEnd()) return;
        
        setTimeout(runNextKick, 1800);
      }, 1500);
    }
  };
  
  // Start the shootout with a small delay
  setTimeout(runNextKick, 1500);
}

function resolvePenaltiesOutcome(uScore, oScore) {
  const actionBtn = document.getElementById("btn-action-match");
  actionBtn.disabled = false;
  
  const oppNameShort = state.currentMatchOpponentName.split(" ")[0];
  const penaltyResultEl = document.getElementById("sim-penalty-result");
  
  if (state.gameMode === "career") {
    const isWin = uScore > oScore;
    const msg = isWin ? `Meu Time vence por ${uScore}x${oScore} nos pênaltis` : `${oppNameShort} vence por ${oScore}x${uScore} nos pênaltis`;
    addLog("PEN", isWin ? `🏆 FIM DE PAPO! ${msg}!` : `❌ Eliminados! ${msg}.`, isWin ? "goal-event" : "goal-conceded");
    if (penaltyResultEl) {
      penaltyResultEl.innerText = msg;
    }
    actionBtn.innerHTML = `<span>Finalizar Rodada</span>`;
    actionBtn.onclick = () => {
      handleCareerMatchCompletion(isWin ? 1 : 0, isWin ? 0 : 1);
    };
    return;
  }
  
  if (uScore > oScore) {
    state.tournamentWins++;
    updateTournamentUI();
    
    const winMsg = `Meu Time vence por ${uScore}x${oScore} nos pênaltis`;
    addLog("PEN", `🏆 FIM DE PAPO! ${winMsg}!`, "goal-event");
    if (penaltyResultEl) {
      penaltyResultEl.innerText = winMsg;
    }
    
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
    const loseMsg = `${oppNameShort} vence por ${oScore}x${uScore} nos pênaltis`;
    addLog("PEN", `❌ Eliminados! ${loseMsg}.`, "goal-conceded");
    if (penaltyResultEl) {
      penaltyResultEl.innerText = loseMsg;
    }
    
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
      titleEl.innerText = "Lenda do 26a0!";
      titleEl.className = "outcome-title victory";
      descEl.innerHTML = `
        🏆 <strong>DESAFIO PERFEITO CONCLUÍDO!</strong> 🏆<br><br>
        Você alcançou a glória máxima de 7 vitórias consecutivas <strong>sem sofrer nenhum gol</strong>.<br>
        Seu time entrou para o hall dos imortais da Liga de Elite!
      `;
    } else {
      titleEl.innerText = "Campeão da Liga de Elite!";
      titleEl.className = "outcome-title victory";
      descEl.innerHTML = `
        Você ergueu a Taça de Ouro da Liga de Elite após 7 batalhas intensas!<br><br>
        No entanto, seu time sofreu gol(s) durante a jornada e não completou o desafio perfeito a zero (26a0).<br>
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
        Seu time foi eliminado no mata-mata da Liga de Elite na rodada <strong>#${state.tournamentRound}</strong>.<br>
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
  
  // Reset configurations screen state
  const telaConfig = document.getElementById("tela-config");
  if (telaConfig) {
    telaConfig.style.display = "none";
    telaConfig.style.opacity = "0";
    telaConfig.classList.add("hidden");
    telaConfig.style.pointerEvents = "all";
  }
  
  // Restore splash screen display visibility
  const telaInicio = document.getElementById("tela-inicio");
  if (telaInicio) {
    telaInicio.style.opacity = "1";
    telaInicio.style.pointerEvents = "all";
    telaInicio.style.display = "flex";
  }
  
  showScreen("tela-inicio");
}

// 9.5. COACH CAREER MODE ENGINE
const CAREER_REWARDS = {
  group: {
    win: 150000,
    draw: 60000,
    loss: 20000
  },
  knockout: {
    4: 250000,   // Oitavas
    5: 400000,   // Quartas
    6: 600000,   // Semifinal
    7: 1200000   // Final
  }
};

const rewardsWin = Array(150000, 250000, 400000, 600000, 1200000);
const rewardsLoss = Array(20000, 30000, 30000, 30000, 30000);

function getPhaseIndex(stage) {
  if (stage <= 3) return 0;
  return stage - 3;
}

function getStageName(stage) {
  if (stage === 1) return "Fase de Grupos (Jogo 1)";
  if (stage === 2) return "Fase de Grupos (Jogo 2)";
  if (stage === 3) return "Fase de Grupos (Jogo 3)";
  if (stage === 4) return "Oitavas de Final";
  if (stage === 5) return "Quartas de Final";
  if (stage === 6) return "Semifinal";
  if (stage === 7) return "Grande Final";
  return "Desconhecido";
}

function initCareerMode() {
  const savedData = localStorage.getItem("draft26a0_career_save");
  if (savedData) {
    const data = JSON.parse(savedData);
    const confirmContinue = confirm(`Deseja continuar sua carreira salva com o técnico ${data.careerCoachName}?\nFase: ${getStageName(data.careerStage)} | Saldo: ${data.careerBalance.toLocaleString()} €`);
    if (confirmContinue) {
      loadCareerSave(data);
      return;
    }
  }
  startNewCareer();
}

function startNewCareer() {
  state.careerCoachName = state.managerName || "Mister";
  state.careerBalance = 500000;
  state.careerStage = 1;
  state.careerTactic = state.formation || "4-3-3";
  state.careerRoster = {};
  state.careerDrawnMarketCandidates = [];
  state.careerSelectedToReplaceSlot = null;
  
  showScreen("tela-carreira");
  document.getElementById("carreira-star-draft").style.display = "block";
  document.getElementById("carreira-escritorio").style.display = "none";
  document.getElementById("carreira-mercado").style.display = "none";
  
  renderStarCandidates();
}

function getStarCandidatesPool() {
  const pool = [];
  const namesSeen = new Set();
  
  for (const teamName of Object.keys(SQUADS_DATABASE)) {
    const players = SQUADS_DATABASE[teamName];
    for (const p of players) {
      if (p.rating >= 90 && !namesSeen.has(p.name)) {
        namesSeen.add(p.name);
        pool.push({
          name: p.name,
          pos: p.pos,
          rating: p.rating,
          originTeam: teamName
        });
      }
    }
  }
  return pool;
}

function renderStarCandidates() {
  const container = document.getElementById("career-star-candidates");
  container.innerHTML = "";
  
  const pool = getStarCandidatesPool();
  const shuffled = pool.sort(() => Math.random() - 0.5);
  const candidates = shuffled.slice(0, 5);
  
  candidates.forEach(player => {
    const colors = getClubColors(player.originTeam);
    const rgb1 = hexToRgb(colors.primaria);
    const rgb2 = hexToRgb(colors.secundaria);
    const jerseySVG = getJerseySVG(player.originTeam, colors, `star-${player.name.replace(/\s+/g, '-')}`);
    
    const cardDiv = document.createElement("div");
    cardDiv.className = "player-card card-ouro gold-tier franchise-star-card";
    cardDiv.style.cursor = "pointer";
    cardDiv.style.setProperty("--cor-clube-1", colors.primaria);
    cardDiv.style.setProperty("--cor-clube-2", colors.secundaria);
    cardDiv.style.setProperty("--cor-clube-1-rgb", rgb1);
    cardDiv.style.setProperty("--cor-clube-2-rgb", rgb2);
    cardDiv.style.setProperty("--club-primary-rgb", colors.primaryRGB || rgb1);
    cardDiv.style.setProperty("--club-secondary-rgb", colors.secondaryRGB || rgb2);
    
    cardDiv.innerHTML = `
      <div class="slime-overlay"></div>
      <div class="card-header-info" style="font-size: 0.55rem; padding: 0 1px;">
        <span class="rating" style="font-size: 0.75rem;">${player.rating}</span>
        <span class="position" style="font-size: 0.5rem; padding: 0px 2px;">${player.pos}</span>
      </div>
      <div style="transform: scale(0.65); margin: -4px 0;">${jerseySVG}</div>
      <div class="name" style="font-size: 0.6rem; transform: scale(0.95); margin-top: 1px;">${player.name.split(" ").pop()}</div>
      <div class="team-name" style="font-size: 0.45rem; opacity: 0.7; margin-bottom: 2px;">${player.originTeam.split(" ")[0]}</div>
    `;
    
    cardDiv.addEventListener("click", () => {
      selectFranchiseStar(player);
    });
    
    container.appendChild(cardDiv);
  });
}

function selectFranchiseStar(player) {
  const slots = FORMATIONS[state.careerTactic];
  const matchingSlot = slots.find(s => s.pos === player.pos);
  if (!matchingSlot) {
    alert("Erro: Não encontramos posição correspondente nesta formação.");
    return;
  }
  
  state.careerRoster[matchingSlot.id] = player;
  
  slots.forEach(slot => {
    if (slot.id !== matchingSlot.id) {
      state.careerRoster[slot.id] = generateGenericPlayer(slot.pos);
    }
  });
  
  playDrawSound();
  saveCareerData();
  enterCareerOffice();
}

const FIRST_NAMES = ["Gabriel", "Lucas", "Matheus", "Pedro", "Felipe", "Thiago", "Bruno", "Rodrigo", "Vitor", "Gustavo", "Vinicius", "Leonardo", "Arthur", "Daniel", "Rafael", "Enzo", "Guilherme", "João", "Fábio", "Marcos"];
const LAST_NAMES = ["Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira", "Lima", "Gomes", "Costa", "Ribeiro", "Martins", "Carvalho", "Melo", "Barbosa", "Teixeira", "Pinto", "Vieira"];

function generateGenericPlayer(pos) {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const rating = Math.floor(Math.random() * 11) + 55;
  
  return {
    name: `${firstName} ${lastName}`,
    pos: pos,
    rating: rating,
    originTeam: "Lama FC"
  };
}

function enterCareerOffice() {
  showScreen("tela-carreira");
  document.getElementById("carreira-star-draft").style.display = "none";
  document.getElementById("carreira-escritorio").style.display = "block";
  document.getElementById("carreira-mercado").style.display = "none";
  
  document.getElementById("career-coach-display").innerText = state.careerCoachName;
  document.getElementById("career-stage-display").innerText = getStageName(state.careerStage);
  document.getElementById("career-balance-display").innerText = `${state.careerBalance.toLocaleString()} €`;
  document.getElementById("career-tactics-display").innerText = `${state.careerTactic} | EQUILIBRADO`;
  
  renderCareerPitchSlots();
  updateCareerRosterStats();
}

function renderCareerPitchSlots() {
  const container = document.getElementById("career-pitch-slots-container");
  container.innerHTML = "";
  
  const slots = FORMATIONS[state.careerTactic];
  const rows = { attack: [], midfield: [], defense: [], goalkeeper: [] };
  slots.forEach(slot => {
    rows[slot.row].push(slot);
  });
  
  const rowNames = ["attack", "midfield", "defense", "goalkeeper"];
  rowNames.forEach(rowName => {
    const rowDiv = document.createElement("div");
    rowDiv.className = `pitch-row ${rowName}`;
    
    rows[rowName].forEach(slot => {
      const slotDiv = document.createElement("div");
      slotDiv.className = "pitch-slot";
      slotDiv.id = `career-slot-${slot.id}`;
      slotDiv.setAttribute("data-pos", slot.pos);
      slotDiv.setAttribute("data-id", slot.id);
      
      const player = state.careerRoster[slot.id];
      if (player) {
        slotDiv.classList.add("filled");
        const isGold = player.rating >= 90;
        const cardClass = isGold ? "player-card card-ouro gold-tier" : "player-card card-comum";
        
        const colors = getClubColors(player.originTeam);
        const rgb1 = hexToRgb(colors.primaria);
        const rgb2 = hexToRgb(colors.secundaria);
        slotDiv.style.setProperty("--cor-clube-1", colors.primaria);
        slotDiv.style.setProperty("--cor-clube-2", colors.secundaria);
        slotDiv.style.setProperty("--cor-clube-1-rgb", rgb1);
        slotDiv.style.setProperty("--cor-clube-2-rgb", rgb2);
        slotDiv.style.setProperty("--club-primary-rgb", colors.primaryRGB || rgb1);
        slotDiv.style.setProperty("--club-secondary-rgb", colors.secondaryRGB || rgb2);
        
        const jerseySVG = getJerseySVG(player.originTeam, colors, `career-slot-${slot.id}`);
        
        slotDiv.innerHTML = `
          <div class="${cardClass}" style="border-radius: 8px;">
            <div class="slime-overlay"></div>
            <div class="card-header-info" style="font-size: 0.55rem; padding: 0 1px;">
              <span class="rating" style="font-size: 0.75rem;">${player.rating}</span>
              <span class="position" style="font-size: 0.5rem; padding: 0px 2px;">${player.pos}</span>
            </div>
            <div style="transform: scale(0.65); margin: -4px 0;">${jerseySVG}</div>
            <div class="name" style="font-size: 0.6rem; transform: scale(0.95); margin-top: 1px;">${player.name.split(" ").pop()}</div>
            <div class="team-name" style="font-size: 0.45rem; opacity: 0.7; margin-bottom: 2px;">${player.originTeam.split(" ")[0]}</div>
          </div>
        `;
      } else {
        slotDiv.innerHTML = `
          <span class="plus-icon">+</span>
          <span class="slot-label">${slot.label}</span>
        `;
      }
      
      slotDiv.addEventListener("click", () => handleCareerSlotClick(slot));
      rowDiv.appendChild(slotDiv);
    });
    container.appendChild(rowDiv);
  });
  
  drawCareerChemistryLines();
}

function drawCareerChemistryLines() {
  const svg = document.getElementById("career-chemistry-lines");
  if (!svg) return;
  svg.innerHTML = "";
  
  const pitch = document.getElementById("career-pitch-view");
  if (!pitch) return;
  const pitchRect = pitch.getBoundingClientRect();
  
  const teamGroups = {};
  const slots = FORMATIONS[state.careerTactic];
  
  slots.forEach(slot => {
    const player = state.careerRoster[slot.id];
    if (player && player.originTeam) {
      const baseClub = getBaseClubName(player.originTeam);
      if (!teamGroups[baseClub]) {
        teamGroups[baseClub] = [];
      }
      teamGroups[baseClub].push(slot.id);
    }
  });
  
  Object.keys(teamGroups).forEach(baseClub => {
    const slotIds = teamGroups[baseClub];
    if (slotIds.length >= 2) {
      for (let i = 0; i < slotIds.length; i++) {
        for (let j = i + 1; j < slotIds.length; j++) {
          const el1 = document.getElementById(`career-slot-${slotIds[i]}`);
          const el2 = document.getElementById(`career-slot-${slotIds[j]}`);
          
          if (el1 && el2) {
            const r1 = el1.getBoundingClientRect();
            const r2 = el2.getBoundingClientRect();
            
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

function updateCareerRosterStats() {
  const players = Object.values(state.careerRoster || {});
  if (players.length === 0) {
    document.getElementById("career-avg-rating").innerText = "-";
    document.getElementById("career-chemistry").innerText = "0%";
    return;
  }
  
  const sumRating = players.reduce((sum, p) => sum + p.rating, 0);
  const avg = Math.round(sumRating / players.length);
  document.getElementById("career-avg-rating").innerText = avg;
  
  let chem = 50;
  players.forEach(p => {
    chem += 4;
    if (state.playstyle === "defensivo") {
      if ((p.pos === "DEF" || p.pos === "GOL") && p.rating >= 88) chem += 1;
    } else if (state.playstyle === "ofensivo") {
      if ((p.pos === "ATA" || p.pos === "MEI") && p.rating >= 90) chem += 1;
    } else {
      chem += 0.5;
    }
  });
  
  chem = Math.min(100, Math.round(chem));
  document.getElementById("career-chemistry").innerText = `${chem}%`;
  
  let connectionCount = 0;
  const teamGroups = {};
  const slots = FORMATIONS[state.careerTactic];
  
  slots.forEach(slot => {
    const player = state.careerRoster[slot.id];
    if (player && player.originTeam) {
      const baseClub = getBaseClubName(player.originTeam);
      if (!teamGroups[baseClub]) {
        teamGroups[baseClub] = 0;
      }
      teamGroups[baseClub]++;
    }
  });
  
  Object.keys(teamGroups).forEach(baseClub => {
    const count = teamGroups[baseClub];
    if (count >= 2) {
      const connections = (count * (count - 1)) / 2;
      connectionCount += connections;
    }
  });
  
  state.chemistryBonusFactor = 1 + (connectionCount * 0.05);
}

function enterCareerMarket() {
  showScreen("tela-carreira");
  document.getElementById("carreira-star-draft").style.display = "none";
  document.getElementById("carreira-escritorio").style.display = "none";
  document.getElementById("carreira-mercado").style.display = "block";
  
  document.getElementById("market-balance-display").innerText = `${state.careerBalance.toLocaleString()} €`;
  
  if (!state.careerDrawnMarketCandidates || state.careerDrawnMarketCandidates.length === 0) {
    drawMarketCandidates();
  } else {
    renderMarketCandidates();
  }
}

function getPlayerPrice(rating) {
  if (rating >= 95) return 5100000;
  if (rating >= 90) return 3200000;
  if (rating >= 85) return 1500000;
  if (rating >= 75) return 700000;
  if (rating >= 65) return 350000;
  return Math.round(Math.pow(rating / 10, 4.5) * 80);
}

function getAllPlayersPool() {
  const pool = [];
  const namesSeen = new Set();
  
  for (const teamName of Object.keys(SQUADS_DATABASE)) {
    const players = SQUADS_DATABASE[teamName];
    for (const p of players) {
      if (!namesSeen.has(p.name)) {
        namesSeen.add(p.name);
        pool.push({
          name: p.name,
          pos: p.pos,
          rating: p.rating,
          originTeam: teamName
        });
      }
    }
  }
  return pool;
}

function drawMarketCandidates() {
  const pool = getAllPlayersPool();
  const rosterNames = new Set(Object.values(state.careerRoster).map(p => p.name));
  const availablePool = pool.filter(p => !rosterNames.has(p.name));
  
  const shuffled = availablePool.sort(() => Math.random() - 0.5);
  state.careerDrawnMarketCandidates = shuffled.slice(0, 4);
  
  saveCareerData();
  renderMarketCandidates();
}

function renderMarketCandidates() {
  const container = document.getElementById("market-candidates");
  container.innerHTML = "";
  
  state.careerDrawnMarketCandidates.forEach((player, index) => {
    if (!player) return;
    const price = getPlayerPrice(player.rating);
    const colors = getClubColors(player.originTeam);
    const rgb1 = hexToRgb(colors.primaria);
    const rgb2 = hexToRgb(colors.secundaria);
    const jerseySVG = getJerseySVG(player.originTeam, colors, `market-${index}-${player.name.replace(/\s+/g, '-')}`);
    const rotation = (index % 2 === 0 ? 1 : -1) * (2 + (index % 3) * 0.5);
    const isGold = player.rating >= 90;
    const cardClass = isGold ? "player-card card-ouro gold-tier" : "player-card card-comum";
    
    const wrapper = document.createElement("div");
    wrapper.className = "market-card-wrapper";
    wrapper.style.setProperty("--rot", `${rotation}deg`);
    
    const pin = document.createElement("div");
    pin.className = "market-card-pin";
    wrapper.appendChild(pin);
    
    const cardDiv = document.createElement("div");
    cardDiv.className = cardClass;
    cardDiv.style.setProperty("--cor-clube-1", colors.primaria);
    cardDiv.style.setProperty("--cor-clube-2", colors.secundaria);
    cardDiv.style.setProperty("--cor-clube-1-rgb", rgb1);
    cardDiv.style.setProperty("--cor-clube-2-rgb", rgb2);
    cardDiv.style.setProperty("--club-primary-rgb", colors.primaryRGB || rgb1);
    cardDiv.style.setProperty("--club-secondary-rgb", colors.secondaryRGB || rgb2);
    
    cardDiv.innerHTML = `
      <div class="slime-overlay"></div>
      <div class="card-header-info" style="font-size: 0.55rem; padding: 0 1px;">
        <span class="rating" style="font-size: 0.75rem;">${player.rating}</span>
        <span class="position" style="font-size: 0.5rem; padding: 0px 2px;">${player.pos}</span>
      </div>
      <div style="transform: scale(0.65); margin: -4px 0;">${jerseySVG}</div>
      <div class="name" style="font-size: 0.6rem; transform: scale(0.95); margin-top: 1px;">${player.name.split(" ").pop()}</div>
      <div class="team-name" style="font-size: 0.45rem; opacity: 0.7; margin-bottom: 2px;">${player.originTeam.split(" ")[0]}</div>
    `;
    
    wrapper.appendChild(cardDiv);
    
    const priceTag = document.createElement("div");
    priceTag.className = "market-card-price";
    priceTag.innerText = `${price.toLocaleString()} €`;
    wrapper.appendChild(priceTag);
    
    const hireBtn = document.createElement("button");
    hireBtn.type = "button";
    hireBtn.className = "market-card-btn";
    hireBtn.innerText = "Contratar";
    hireBtn.addEventListener("click", () => {
      initiatePurchase(player, price);
    });
    
    wrapper.appendChild(hireBtn);
    container.appendChild(wrapper);
  });
}

function refreshMarketList() {
  if (state.careerBalance < 150000) {
    alert("Saldo insuficiente para atualizar a lista de mercado (Custo: 150.000 €)!");
    return;
  }
  state.careerBalance -= 150000;
  document.getElementById("market-balance-display").innerText = `${state.careerBalance.toLocaleString()} €`;
  playDrawSound();
  drawMarketCandidates();
}

function initiatePurchase(player, price) {
  if (state.careerBalance < price) {
    alert(`Saldo insuficiente! Você precisa de ${price.toLocaleString()} €, mas tem apenas ${state.careerBalance.toLocaleString()} €.`);
    return;
  }
  
  state.careerSelectedToReplaceSlot = { player, price };
  enterCareerOffice();
  
  alert(`Selecione um jogador de posição ${player.pos} no campo tático para ser dispensado e substituído por ${player.name}.`);
  highlightCareerReplaceableSlots(player.pos);
}

function highlightCareerReplaceableSlots(pos) {
  const slots = FORMATIONS[state.careerTactic];
  slots.forEach(slot => {
    const el = document.getElementById(`career-slot-${slot.id}`);
    if (el) {
      if (slot.pos === pos) {
        el.classList.add("selectable-replace");
      } else {
        el.classList.remove("selectable-replace");
      }
    }
  });
}

function clearCareerHighlights() {
  const slots = FORMATIONS[state.careerTactic];
  slots.forEach(slot => {
    const el = document.getElementById(`career-slot-${slot.id}`);
    if (el) {
      el.classList.remove("selectable-replace");
    }
  });
}

function handleCareerSlotClick(slot) {
  if (state.careerSelectedToReplaceSlot) {
    const { player, price } = state.careerSelectedToReplaceSlot;
    if (slot.pos !== player.pos) {
      alert(`Posição incorreta! ${player.name} joga como ${player.pos}, não pode substituir um jogador de posição ${slot.pos}.`);
      return;
    }
    
    const previousPlayer = state.careerRoster[slot.id];
    const confirmText = previousPlayer 
      ? `Deseja dispensar ${previousPlayer.name} (Rating ${previousPlayer.rating}) para contratar ${player.name} (Rating ${player.rating}) por ${price.toLocaleString()} €?`
      : `Deseja contratar ${player.name} (Rating ${player.rating}) por ${price.toLocaleString()} €?`;
      
    if (confirm(confirmText)) {
      state.careerBalance -= price;
      state.careerRoster[slot.id] = player;
      state.careerSelectedToReplaceSlot = null;
      clearCareerHighlights();
      
      state.careerDrawnMarketCandidates = state.careerDrawnMarketCandidates.map(c => {
        if (c && c.name === player.name) {
          const pool = getAllPlayersPool();
          const rosterNames = new Set(Object.values(state.careerRoster).map(p => p.name));
          const candNames = new Set(state.careerDrawnMarketCandidates.filter(p => p).map(p => p.name));
          const available = pool.filter(p => !rosterNames.has(p.name) && !candNames.has(p.name));
          return available.length > 0 ? available[Math.floor(Math.random() * available.length)] : null;
        }
        return c;
      });
      
      playDrawSound();
      saveCareerData();
      enterCareerOffice();
    }
  } else {
    const player = state.careerRoster[slot.id];
    if (player) {
      alert(`Jogador: ${player.name}\nPosição: ${player.pos}\nRating: ${player.rating}\nOrigem: ${player.originTeam}`);
    }
  }
}

function handleCareerMatchCompletion(userGoals, oppGoals) {
  let reward = 0;
  let title = "";
  let message = "";
  let success = false;
  
  const stage = state.careerStage;
  const isGroup = stage <= 3;
  const phaseIndex = getPhaseIndex(stage);
  
  if (isGroup) {
    if (userGoals > oppGoals) {
      reward = rewardsWin[phaseIndex];
      title = "VITÓRIA!";
      message = "Excelente resultado na Fase de Grupos! Seu time garantiu 3 pontos cruciais.";
      success = true;
    } else if (userGoals === oppGoals) {
      reward = CAREER_REWARDS.group.draw;
      title = "EMPATE!";
      message = "Um jogo tenso e disputado na Fase de Grupos. 1 ponto garantido.";
      success = true;
    } else {
      reward = rewardsLoss[phaseIndex];
      title = "DERROTA!";
      message = "A derrota dói, mas a premiação de participação ajuda a reestruturar o elenco.";
      success = false;
    }
  } else {
    if (userGoals > oppGoals) {
      success = true;
      reward = rewardsWin[phaseIndex];
      if (stage === 4) {
        title = "CLASSIFICADO!";
        message = "Parabéns! Seu time avançou para as Quartas de Final da Liga de Elite.";
      } else if (stage === 5) {
        title = "CLASSIFICADO!";
        message = "Incrível! Vaga garantida na Semifinal da Liga de Elite.";
      } else if (stage === 6) {
        title = "VAGA NA FINAL!";
        message = "Sensacional! Seu clube está a um jogo da glória máxima.";
      } else if (stage === 7) {
        title = "CAMPEÃO SUPREMO!";
        message = "GLÓRIA ETERNA! Você conquistou a Taça de Ouro da Liga de Elite!";
      }
    } else {
      reward = rewardsLoss[phaseIndex];
      title = "ELIMINADO!";
      message = "Fim do sonho! Seu time foi desclassificado no mata-mata da Liga de Elite.";
      success = false;
    }
  }
  
  state.careerBalance += reward;
  saveCareerData();
  
  showCareerRewardModal(title, reward, message, () => {
    if (isGroup) {
      if (stage === 3) {
        const userRank = getGroupRank();
        if (state.tournamentPoints >= 4 && userRank <= 2) {
          state.careerStage = 4;
          saveCareerData();
          enterCareerOffice();
        } else {
          alert("Seu time não pontuou o suficiente e foi eliminado na Fase de Grupos. A diretoria reiniciou a temporada (Rodada 1), mas manteve o elenco e saldo.");
          resetCareerSeason();
        }
      } else {
        state.careerStage++;
        saveCareerData();
        enterCareerOffice();
      }
    } else {
      if (userGoals > oppGoals) {
        if (stage === 7) {
          alert("Parabéns! Você concluiu sua carreira de técnico com o título! Uma nova temporada se inicia.");
          resetCareerSeason();
        } else {
          state.careerStage++;
          saveCareerData();
          enterCareerOffice();
        }
      } else {
        alert("Fim da linha! Com a derrota no mata-mata, a diretoria reiniciou a temporada (Rodada 1). O elenco e saldo foram preservados.");
        resetCareerSeason();
      }
    }
  });
}

function showCareerRewardModal(title, amount, description, onConfirm) {
  let modal = document.getElementById("career-reward-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "career-reward-modal";
    modal.className = "career-reward-modal";
    document.body.appendChild(modal);
  }
  
  modal.innerHTML = `
    <div class="career-reward-content">
      <div class="career-reward-badge">BÔNUS FINANCEIRO</div>
      <h2 class="career-reward-title">${title}</h2>
      <div class="career-reward-amount">+ ${amount.toLocaleString()} €</div>
      <p class="career-reward-desc">${description}</p>
      <button type="button" id="btn-career-reward-ok" class="btn-play-primary" style="margin: 0 auto; max-width: 180px; display: block;">PROSSEGUIR</button>
    </div>
  `;
  
  modal.classList.add("active");
  
  const okBtn = modal.querySelector("#btn-career-reward-ok");
  okBtn.onclick = () => {
    modal.classList.remove("active");
    if (onConfirm) onConfirm();
  };
}

function resetCareerSeason() {
  state.careerStage = 1;
  state.tournamentRound = 0;
  saveCareerData();
  enterCareerOffice();
}

function playCareerMatch() {
  state.draftRoster = { ...state.careerRoster };
  state.managerName = state.careerCoachName;
  state.formation = state.careerTactic;
  
  updateRosterStats();
  
  state.tournamentRound = state.careerStage;
  
  if (state.tournamentRound === 1 || !state.opponentsList || state.opponentsList.length === 0) {
    let teams = Object.keys(SQUADS_DATABASE);
    state.opponentsList = [...teams].sort(() => Math.random() - 0.5);
    setupStandingsData();
  }
  
  setupMatch(state.tournamentRound);
  showScreen("tela-torneio");
}

function saveCareerData() {
  const data = {
    careerCoachName: state.careerCoachName,
    careerBalance: state.careerBalance,
    careerStage: state.careerStage,
    careerTactic: state.careerTactic,
    careerRoster: state.careerRoster,
    careerDrawnMarketCandidates: state.careerDrawnMarketCandidates
  };
  localStorage.setItem("draft26a0_career_save", JSON.stringify(data));
}

function loadCareerSave(data) {
  state.careerCoachName = data.careerCoachName;
  state.careerBalance = data.careerBalance;
  state.careerStage = data.careerStage;
  state.careerTactic = data.careerTactic || "4-3-3";
  state.careerRoster = data.careerRoster || {};
  state.careerDrawnMarketCandidates = data.careerDrawnMarketCandidates || [];
  state.careerSelectedToReplaceSlot = null;
  
  state.gameMode = "career";
  currentMode = "career";
  state.playstyle = "equilibrado";
  
  enterCareerOffice();
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
  
  // Group roster slotIds by base club name
  const teamGroups = {};
  const slots = FORMATIONS[state.formation];
  
  slots.forEach(slot => {
    const player = state.draftRoster[slot.id];
    if (player && player.originTeam) {
      const baseClub = getBaseClubName(player.originTeam);
      if (!teamGroups[baseClub]) {
        teamGroups[baseClub] = [];
      }
      teamGroups[baseClub].push(slot.id);
    }
  });
  
  // Draw connection lines for any group with 2 or more players
  Object.keys(teamGroups).forEach(baseClub => {
    const slotIds = teamGroups[baseClub];
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

// 11. UPGRADES V2.2 - ACHIEVEMENTS & TACTICAL NOTEBOOK
function checkDraftAchievements() {
  const players = Object.values(state.draftRoster);
  const playerNames = new Set(players.map(p => p.name));
  
  const achievements = [
    {
      id: "msn",
      title: "Trio MSN 🇧🇷🇦🇷🇺🇾",
      check: () => playerNames.has("Lionel Messi") && playerNames.has("Luis Suárez") && playerNames.has("Neymar Jr")
    },
    {
      id: "bbc",
      title: "Trio BBC 🇵🇹🇫🇷🇬🇧",
      check: () => (playerNames.has("C. Ronaldo") || playerNames.has("Cristiano Ronaldo")) && playerNames.has("Karim Benzema") && playerNames.has("Gareth Bale")
    },
    {
      id: "tikitaka",
      title: "Mestres do Tiki-Taka 🇪🇸",
      check: () => playerNames.has("Xavi Hernández") && playerNames.has("Andrés Iniesta") && playerNames.has("Lionel Messi")
    },
    {
      id: "bayern",
      title: "A Dinastia Bávara 🇩🇪",
      check: () => playerNames.has("Manuel Neuer") && playerNames.has("Philipp Lahm") && playerNames.has("R. Lewandowski")
    },
    {
      id: "milan",
      title: "Defesa Imortal do Milan 🇮🇹",
      check: () => playerNames.has("Dida") && playerNames.has("Alessandro Nesta") && playerNames.has("Paolo Maldini")
    }
  ];
  
  const unlocked = JSON.parse(localStorage.getItem("draft26a0_achievements") || "[]");
  let newlyUnlocked = [];
  
  achievements.forEach(ach => {
    if (!unlocked.includes(ach.id) && ach.check()) {
      unlocked.push(ach.id);
      newlyUnlocked.push(ach.title);
    }
  });
  
  if (newlyUnlocked.length > 0) {
    localStorage.setItem("draft26a0_achievements", JSON.stringify(unlocked));
    alert(`🎉 NOVA CONQUISTA DESBLOQUEADA!\n\n${newlyUnlocked.join("\n")}`);
  }
}

function renderAchievements() {
  const container = document.getElementById("achievements-list");
  if (!container) return;
  const unlocked = JSON.parse(localStorage.getItem("draft26a0_achievements") || "[]");
  
  const achievements = [
    { id: "msn", title: "Trio MSN 🇧🇷🇦🇷🇺🇾", desc: "Escalar Lionel Messi, Luis Suárez e Neymar Jr no mesmo time do draft." },
    { id: "bbc", title: "Trio BBC 🇵🇹🇫🇷🇬🇧", desc: "Escalar Cristiano Ronaldo, Karim Benzema e Gareth Bale no mesmo time do draft." },
    { id: "tikitaka", title: "Mestres do Tiki-Taka 🇪🇸", desc: "Escalar Xavi Hernández, Andrés Iniesta e Lionel Messi no mesmo time do draft." },
    { id: "bayern", title: "A Dinastia Bávara 🇩🇪", desc: "Escalar Manuel Neuer, Philipp Lahm e R. Lewandowski no mesmo time do draft." },
    { id: "milan", title: "Defesa Imortal do Milan 🇮🇹", desc: "Escalar Dida, Alessandro Nesta e Paolo Maldini no mesmo time do draft." }
  ];
  
  container.innerHTML = achievements.map(ach => {
    const isUnlocked = unlocked.includes(ach.id);
    return `
      <div class="achievement-item ${isUnlocked ? 'unlocked' : 'locked'}" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 15px; border-radius: 12px; background: ${isUnlocked ? 'rgba(255, 215, 0, 0.1)' : '#ffffff'}; border: 2.5px solid #111111; box-shadow: 4px 4px 0px #111111;">
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <strong style="font-size: 0.95rem; color: ${isUnlocked ? '#c29b38' : '#111111'};">${ach.title}</strong>
          <span style="font-size: 0.8rem; color: #555555;">${ach.desc}</span>
        </div>
        <div style="font-size: 1.5rem;">${isUnlocked ? '🔓' : '🔒'}</div>
      </div>
    `;
  }).join("");
}

function copyTacticalLineup() {
  const players = FORMATIONS[state.formation].map(slot => {
    const p = state.draftRoster[slot.id];
    return p ? `${slot.label}: ${p.name} (${p.rating} | ${p.originTeam})` : `${slot.label}: Vago`;
  }).join("\n");
  
  const textToCopy = `🏆 Liga de Elite Draft 26a0 🏆\n` +
                     `⚽ Treinador: ${state.managerName}\n` +
                     `📐 Formação: ${state.formation}\n` +
                     `🔥 Química: ${document.getElementById("roster-chemistry").innerText}\n` +
                     `📋 Escalação Titular:\n${players}\n\n` +
                     `Monte o seu time em 26a0.vercel.app!`;
                     
  navigator.clipboard.writeText(textToCopy).then(() => {
    const msg = document.getElementById("copy-success-msg");
    if (msg) {
      msg.style.display = "block";
      setTimeout(() => {
        msg.style.display = "none";
      }, 2500);
    }
  }).catch(err => {
    console.error("Failed to copy lineup", err);
    alert("Erro ao copiar escalação. Aqui está:\n\n" + textToCopy);
  });
}

// 12. ENTRY POINT / EVENT LISTENERS
window.addEventListener("DOMContentLoaded", () => {
  // Initialize starfield
  initStars();
  
  // Load local credentials
  loadManagerCredentials();
  
  // Load leaderboard initial
  renderLeaderboard();
  
  // Tactic Cards selection toggle
  const tacticCards = document.querySelectorAll(".tactic-card");
  tacticCards.forEach(card => {
    card.addEventListener("click", () => {
      tacticCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
    });
  });
  
  // Lobby Modes toggle
  const lobbyModeBtns = document.querySelectorAll(".btn-lobby-mode");
  lobbyModeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      lobbyModeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const val = btn.getAttribute("data-mode");
      
      const desc = document.getElementById("lobby-mode-desc");
      if (val === "classic") {
        desc.innerHTML = `<strong>Modo Clássico:</strong> Os ratings reais e qualidades dos jogadores são mostrados nas cartas para guiar suas decisões.`;
      } else if (val === "almanac") {
        desc.innerHTML = `<strong>Modo Almanaque:</strong> Esconde os ratings e qualidades de cada jogador. Você deve escalar seu elenco com base na sua memória histórica!`;
      } else if (val === "atual") {
        desc.innerHTML = `<strong>Modo Atual (2026):</strong> Filtra o draft apenas para elencos da temporada 2025/26. Os ratings e qualidades são visíveis como no clássico.`;
      } else if (val === "career") {
        desc.innerHTML = `<strong>Modo Carreira de Técnico:</strong> Monte um time a partir de uma lenda e 10 jogadores fracos da base. Ganhe verbas vencendo partidas e contrate estrelas do futebol no Mercado da Bola!`;
      }
    });
  });

  // Splash screen transition to configuration lobby
  const iniciarFluxoBtn = document.getElementById("btn-iniciar-fluxo");
  if (iniciarFluxoBtn) {
    iniciarFluxoBtn.addEventListener("click", () => {
      playDrawSound();
      
      const telaInicio = document.getElementById("tela-inicio");
      if (telaInicio) {
        telaInicio.style.opacity = "0";
        telaInicio.style.pointerEvents = "none";
        setTimeout(() => {
          telaInicio.style.display = "none";
          
          const telaConfig = document.getElementById("tela-config");
          if (telaConfig) {
            telaConfig.style.display = "flex";
            telaConfig.classList.remove("hidden");
            telaConfig.style.opacity = "0";
            void telaConfig.offsetWidth;
            telaConfig.style.transition = "opacity 0.6s ease";
            telaConfig.style.opacity = "1";
          }
        }, 600);
      }
    });
  }

  // Start draft click transition
  const iniciarDraftBtn = document.getElementById("btn-iniciar-draft");
  if (iniciarDraftBtn) {
    iniciarDraftBtn.addEventListener("click", () => {
      const coachInput = document.getElementById("coach-name-input").value.trim();
      state.managerName = coachInput || "Mister";
      saveManagerCredentials(state.managerName);
      
      const activeTactic = document.querySelector(".tactic-card.active");
      state.formation = activeTactic ? activeTactic.getAttribute("data-tactic") : "4-3-3";
      
      const activeMode = document.querySelector(".btn-lobby-mode.active");
      const modeVal = activeMode ? activeMode.getAttribute("data-mode") : "classic";
      state.gameMode = modeVal;
      currentMode = modeVal;
      
      // Default playstyle to equilibrado
      state.playstyle = "equilibrado";
      
      // Play sound
      playDrawSound();
      
      // Fade out configurations page
      const telaConfig = document.getElementById("tela-config");
      if (telaConfig) {
        telaConfig.style.opacity = "0";
        telaConfig.style.pointerEvents = "none";
        setTimeout(() => {
          telaConfig.style.display = "none";
          telaConfig.classList.add("hidden");
          // Start draft or career mode directly
          if (modeVal === "career") {
            initCareerMode();
          } else {
            startDraft();
          }
        }, 600);
      }
    });
  }
  
  // Skip click
  const skipBtn = document.getElementById("btn-skip-team");
  if (skipBtn) {
    skipBtn.addEventListener("click", skipTeam);
  }
  
  const skipYearBtn = document.getElementById("btn-skip-year");
  if (skipYearBtn) {
    skipYearBtn.addEventListener("click", skipYear);
  }
  
  // Live tactics button initialization (Rule 3)
  initLiveTacticsEvents();
  
  // Recalculate chemistry lines on resize (Rule 1)
  window.addEventListener("resize", () => {
    drawChemistryLines();
    drawCareerChemistryLines();
  });
  
  // Restart click
  document.getElementById("btn-restart").addEventListener("click", () => {
    restartGame();
  });
  
  // Achievements Modal bindings
  const showAchBtn = document.getElementById("btn-lobby-achievements");
  if (showAchBtn) {
    showAchBtn.addEventListener("click", () => {
      renderAchievements();
      document.getElementById("modal-achievements").classList.add("active");
    });
  }
  
  const closeAchBtn = document.getElementById("btn-close-achievements");
  if (closeAchBtn) {
    closeAchBtn.addEventListener("click", () => {
      document.getElementById("modal-achievements").classList.remove("active");
    });
  }

  // Records Modal bindings
  const showRecordsBtn = document.getElementById("btn-lobby-records");
  if (showRecordsBtn) {
    showRecordsBtn.addEventListener("click", () => {
      renderLeaderboard();
      document.getElementById("modal-records").classList.add("active");
    });
  }
  
  const closeRecordsBtn = document.getElementById("btn-close-records");
  if (closeRecordsBtn) {
    closeRecordsBtn.addEventListener("click", () => {
      document.getElementById("modal-records").classList.remove("active");
    });
  }
  
  // Tactical Notebook Copy binding
  const copyBtn = document.getElementById("btn-copy-lineup");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      copyTacticalLineup();
    });
  }
  
  // Twinkle stars periodically resizing
  window.addEventListener("resize", initStars);

  // Career Mode buttons
  const pranchetaBtn = document.getElementById("btn-career-prancheta");
  if (pranchetaBtn) {
    pranchetaBtn.addEventListener("click", () => {
      state.careerSelectedToReplaceSlot = null;
      clearCareerHighlights();
      enterCareerOffice();
    });
  }
  
  const mercadoBtn = document.getElementById("btn-career-mercado");
  if (mercadoBtn) {
    mercadoBtn.addEventListener("click", () => {
      state.careerSelectedToReplaceSlot = null;
      clearCareerHighlights();
      enterCareerMarket();
    });
  }
  
  const jogarBtn = document.getElementById("btn-career-jogar");
  if (jogarBtn) {
    jogarBtn.addEventListener("click", () => {
      state.careerSelectedToReplaceSlot = null;
      clearCareerHighlights();
      playCareerMatch();
    });
  }
  
  const abandonarBtn = document.getElementById("btn-career-abandonar");
  if (abandonarBtn) {
    abandonarBtn.addEventListener("click", () => {
      if (confirm("Tem certeza que deseja abandonar sua carreira de técnico? Todo o progresso será perdido permanentemente!")) {
        localStorage.removeItem("draft26a0_career_save");
        location.reload();
      }
    });
  }
  
  const marketRefreshBtn = document.getElementById("btn-market-refresh");
  if (marketRefreshBtn) {
    marketRefreshBtn.addEventListener("click", refreshMarketList);
  }
  
  const marketVoltarBtn = document.getElementById("btn-market-voltar");
  if (marketVoltarBtn) {
    marketVoltarBtn.addEventListener("click", () => {
      state.careerSelectedToReplaceSlot = null;
      clearCareerHighlights();
      enterCareerOffice();
    });
  }
});
