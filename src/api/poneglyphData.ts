export interface PoneQuestion {
  id: string;
  question: string;
  validAnswers: string[];
}

export interface PoneLocation {
  id: string;
  hint: string;
}

// 1. POOL OF QUESTIONS (Expanded & Harder)
export const QUESTION_POOL: PoneQuestion[] = [
  // --- EXISTING & REFINED ---
  {
    id: 'q1',
    question: "Who is the Princess of Alabasta?",
    validAnswers: ["VIVI", "NEFERTARIVIVI", "PRINCESSVIVI", "MISSWEDNESDAY", "BIBI"]
  },
  {
    id: 'q2',
    question: "Who was the 'God' defeated by rubber?",
    validAnswers: ["ENEL", "ENERU", "GODENEL", "GODENERU"]
  },
  {
    id: 'q3',
    question: "Who burned the blueprints to Pluton?",
    validAnswers: ["FRANKY", "CUTTYFLAM", "ICEBURG", "BAKULAFRANKY"]
  },
  {
    id: 'q4',
    question: "Who was the Warlord stealing shadows?",
    validAnswers: ["MORIA", "GECKOMORIA", "GEKKOMORIA", "KISHIBUKAIMORIA"]
  },
  {
    id: 'q5',
    question: "What is the name of Zoro's childhood friend?",
    validAnswers: ["KUINA", "KUIN", "KUIINA"]
  },
  {
    id: 'q6',
    question: "Who is the Sniper King?",
    validAnswers: ["USOPP", "SOGEKING", "GODUSOPP", "CAPTAINUSOPP"]
  },
  {
    id: 'q7',
    question: "What is the name of the whale at the entrance of the Grand Line?",
    validAnswers: ["LABOON", "RABOON"]
  },
  {
    id: 'q8',
    question: "Who gave Luffy his straw hat?",
    validAnswers: ["SHANKS", "REDHAIRSHANKS", "AKAGAMISHANKS", "AKAGAMINOSHANKS"]
  },

  // --- NEW ADDITIONS ---
  {
    id: 'q9',
    question: "What is the name of Roger's ship?",
    validAnswers: ["OROJACKSON", "ORO", "THEOROJACKSON"]
  },
  {
    id: 'q10',
    question: "Which sword did Zoro receive from Ryuma?",
    validAnswers: ["SHUSUI", "BLACKBLADE", "SHUUSUI"]
  },
  {
    id: 'q11',
    question: "What is the name of the island where Ace died?",
    validAnswers: ["MARINEFORD", "MARINEHQ", "PARAMOUNTWAR"]
  },
  {
    id: 'q12',
    question: "Who is the shipwright of the Roger Pirates?",
    validAnswers: ["TOM", "TOMSAN", "MRTOM"]
  },
  {
    id: 'q13',
    question: "What is Sanji's dream?",
    validAnswers: ["ALLBLUE", "THEALLBLUE", "FINDALLBLUE"]
  },
  {
    id: 'q14',
    question: "What is the highest rank in the Marines?",
    validAnswers: ["FLEETADMIRAL", "ADMIRAL"] // Fleet Admiral is technically higher, but usually Admiral is accepted in quizzes
  },
  {
    id: 'q15',
    question: "What is the name of the ancient kingdom's Void Century joy?",
    validAnswers: ["JOYBOY", "JOY", "NIKA", "SUNGOD"]
  },
  {
    id: 'q16',
    question: "Who ate the Human-Human Fruit (Hito Hito no Mi)?",
    validAnswers: ["CHOPPER", "TONYTONYCHOPPER", "DOCTORCHOPPER"]
  },
  {
    id: 'q17',
    question: "Which sea is Sanji from?",
    validAnswers: ["NORTHBLUE", "NORTH"]
  },
  {
    id: 'q18',
    question: "What is the name of Law's submarine?",
    validAnswers: ["POLARTANG", "POLAR", "THESUBMARINE"]
  }
];

// 2. POOL OF LOCATIONS (Cryptic Riddles)
export const LOCATION_POOL: PoneLocation[] = [
  { 
    id: 'HEADER_LOGO', 
    hint: "At the ship's highest point, the Jolly Roger emblem flies eternal, hiding an ancient red stone within its defiant skull." 
  },
  { 
    id: 'OLD_PORTFOLIO_SCREEN', 
    hint: "Through the window to the past, viewing the Captain's former life. The stone is etched onto the screen of the Old World." 
  },
  { 
    id: 'ABOUT_POSTER_1.5B', 
    hint: "Seek the visage of the Fifth Emperor. Upon the parchment that declares a bounty of 1.5 Billion, the stone lies hidden in plain sight." 
  },
  { 
    id: 'IN_CERTIFICATE_1', 
    hint: "Open the chest of golden accolades. Inside the paper that proves mastery, the red glint of history shines." 
  },
  { 
    id: 'TRANSPONDER_SHAIL', 
    hint: "Listen closely for the 'Puru Puru'. The stone rests near the creature that carries voices across the seas." 
  },
  { 
    id: 'FOOTER', 
    hint: "Descend to the ocean floor of this page. Where the journey ends and the copyright is etched, the ancient text awaits." 
  },
  { 
    id: 'SKILL_PARAMECIA', 
    hint: "Within the library of Devil Fruits, find the category of the 'Paramecia'. The stone is hidden among the strange powers of rubber and chops." 
  },
  { 
    id: 'IN_CERTIFICATE_2', 
    hint: "Open the chest of golden accolades. Inside the paper that proves mastery, the red glint of history shines." 
  },
  { 
    id: 'OLD_PORTFOLIO_BUTTON', 
    hint: "In a forgotten library corner, a faded button promises return to Previous voyages, guarding the Poneglyph in yesterday's glory." 
  },
  { 
    id: 'STRAWHAT_MODAL_SCREEN', 
    hint: "Suspended in the void where golden straw forms a shape. The stone floats among the particles, invisible until you look closely at the artifact." 
  },
  { 
    id: 'WANTED_POSTER_HEADER', 
    hint: "Above the criminal's face, where the word 'WANTED' screams in bold ink. The stone hides in the typography of justice." 
  },
  { 
    id: 'ON_PROJECT_CARD_1', 
    hint: "Inspect the Captain's great construction. The stone is nailed to the hull of this digital ship." 
  },
  { 
    id: 'STRAWHAT_MODAL_BUTTON', 
    hint: "Seek the mechanism that grants 'Observation Haki'. The stone guards the switch that shows straw hat more cosly in digital world." 
  },
  { 
    id: 'EXPERIENCE_IN_ACHIEVEMENTS', 
    hint: "Walk the timeline of the Captain's life. Where the 'Achievements' are carved into the logbook, the stone waits to be found." 
  },
  { 
    id: 'HINT_SECTION', 
    hint: "The irony of fate: The stone hides within the very place you go to seek answers." 
  },
  { 
    id: 'ON_PROJECT_CARD_2', 
    hint: "Inspect the Captain's great construction. The stone is nailed to the hull of this digital ship." 
  }
];