// ============================================================
// SCBT Website - Mock Data & Constants
// ============================================================

export const CLUB_INFO = {
  name: "Sporting Club Bron Terraillon",
  shortName: "SCBT",
  founded: 1964,
  address: "8 rue Marcel Cerdan, 69500 Bron",
  stadium: "Stade Léo Lagrange",
  socials: {
    instagram: "https://instagram.com/scbt_officiel",
    facebook: "https://facebook.com/scbtbron",
    tiktok: "https://tiktok.com/@scbt_officiel",
  },
} as const;

export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Le Club", href: "/le-club" },
  { label: "Équipes", href: "#equipes" },
  { label: "Actualités", href: "#actualites" },
  { label: "Contact", href: "#contact" },
] as const;

export const NEXT_MATCH = {
  homeTeam: { name: "SCBT", logo: "/images/logo-scbt.png" },
  awayTeam: { name: "FC Villeurbanne", logo: "/images/placeholder/team-away.svg" },
  date: "2026-03-07T15:00:00",
  venue: "Stade Léo Lagrange",
  category: "Seniors",
  competition: "District - Poule A",
};

export const CALENDAR_CATEGORIES = [
  "Toutes",
  "Seniors",
  "U20",
  "U17",
  "U15",
  "U13",
  "Féminines",
] as const;

export type CalendarCategory = (typeof CALENDAR_CATEGORIES)[number];

export const CALENDAR_MATCHES = [
  // === SENIORS ===
  {
    id: 1,
    homeTeam: "SCBT",
    awayTeam: "AS Saint-Priest",
    date: "2026-03-07",
    time: "15:00",
    category: "Seniors",
    competition: "District - Poule A",
    venue: "Stade Léo Lagrange",
    journee: "J18",
  },
  {
    id: 2,
    homeTeam: "SCBT",
    awayTeam: "FC Vénissieux",
    date: "2026-03-14",
    time: "15:00",
    category: "Seniors",
    competition: "District - Poule A",
    venue: "Stade Léo Lagrange",
    journee: "J19",
  },
  {
    id: 3,
    homeTeam: "Lyon Duchère AS",
    awayTeam: "SCBT",
    date: "2026-03-21",
    time: "18:00",
    category: "Seniors",
    competition: "District - Poule A",
    venue: "Stade Duchère",
    journee: "J20",
  },
  {
    id: 4,
    homeTeam: "SCBT",
    awayTeam: "ES Genas Azieu",
    date: "2026-03-28",
    time: "15:00",
    category: "Seniors",
    competition: "District - Poule A",
    venue: "Stade Léo Lagrange",
    journee: "J21",
  },
  {
    id: 5,
    homeTeam: "FC Décines",
    awayTeam: "SCBT",
    date: "2026-04-04",
    time: "15:30",
    category: "Seniors",
    competition: "District - Poule A",
    venue: "Stade de Décines",
    journee: "J22",
  },
  // === U20 ===
  {
    id: 6,
    homeTeam: "SCBT U20",
    awayTeam: "FC Villeurbanne U20",
    date: "2026-03-08",
    time: "14:00",
    category: "U20",
    competition: "U20 District",
    venue: "Stade Léo Lagrange",
    journee: "J14",
  },
  {
    id: 7,
    homeTeam: "AS Rillieux U20",
    awayTeam: "SCBT U20",
    date: "2026-03-15",
    time: "14:00",
    category: "U20",
    competition: "U20 District",
    venue: "Stade de Rillieux",
    journee: "J15",
  },
  {
    id: 8,
    homeTeam: "SCBT U20",
    awayTeam: "Caluire SC U20",
    date: "2026-03-22",
    time: "14:00",
    category: "U20",
    competition: "U20 District",
    venue: "Stade Léo Lagrange",
    journee: "J16",
  },
  // === U17 ===
  {
    id: 9,
    homeTeam: "SCBT U17",
    awayTeam: "OL U17",
    date: "2026-03-08",
    time: "14:00",
    category: "U17",
    competition: "U17 Régional 1",
    venue: "Stade Léo Lagrange",
    journee: "J16",
  },
  {
    id: 10,
    homeTeam: "ASSE U17",
    awayTeam: "SCBT U17",
    date: "2026-03-15",
    time: "15:00",
    category: "U17",
    competition: "U17 Régional 1",
    venue: "Centre Sportif Geoffroy-Guichard",
    journee: "J17",
  },
  {
    id: 11,
    homeTeam: "SCBT U17",
    awayTeam: "Clermont Foot U17",
    date: "2026-03-22",
    time: "14:30",
    category: "U17",
    competition: "U17 Régional 1",
    venue: "Stade Léo Lagrange",
    journee: "J18",
  },
  // === U15 ===
  {
    id: 12,
    homeTeam: "SCBT U15",
    awayTeam: "AS Minguettes U15",
    date: "2026-03-09",
    time: "10:00",
    category: "U15",
    competition: "U15 District",
    venue: "Stade Léo Lagrange",
    journee: "J14",
  },
  {
    id: 13,
    homeTeam: "FC Vénissieux U15",
    awayTeam: "SCBT U15",
    date: "2026-03-16",
    time: "10:00",
    category: "U15",
    competition: "U15 District",
    venue: "Stade Laurent Gérin",
    journee: "J15",
  },
  {
    id: 14,
    homeTeam: "SCBT U15",
    awayTeam: "MDA Chassieu U15",
    date: "2026-03-23",
    time: "10:30",
    category: "U15",
    competition: "U15 District",
    venue: "Stade Léo Lagrange",
    journee: "J16",
  },
  // === U13 ===
  {
    id: 15,
    homeTeam: "SCBT U13",
    awayTeam: "Meyzieu FC U13",
    date: "2026-03-09",
    time: "10:00",
    category: "U13",
    competition: "U13 District",
    venue: "Stade Léo Lagrange",
    journee: "J12",
  },
  {
    id: 16,
    homeTeam: "ES Genas Azieu U13",
    awayTeam: "SCBT U13",
    date: "2026-03-16",
    time: "10:00",
    category: "U13",
    competition: "U13 District",
    venue: "Stade de Genas",
    journee: "J13",
  },
  // === FÉMININES ===
  {
    id: 17,
    homeTeam: "SCBT Féminines",
    awayTeam: "FC Lyon Féminines",
    date: "2026-03-08",
    time: "15:00",
    category: "Féminines",
    competition: "Féminine District",
    venue: "Stade Léo Lagrange",
    journee: "J10",
  },
  {
    id: 18,
    homeTeam: "Décines Charpieu Féminines",
    awayTeam: "SCBT Féminines",
    date: "2026-03-15",
    time: "15:00",
    category: "Féminines",
    competition: "Féminine District",
    venue: "Stade de Décines",
    journee: "J11",
  },
  {
    id: 19,
    homeTeam: "SCBT Féminines",
    awayTeam: "Caluire SC Féminines",
    date: "2026-03-22",
    time: "14:30",
    category: "Féminines",
    competition: "Féminine District",
    venue: "Stade Léo Lagrange",
    journee: "J12",
  },
];

export const NEWS_ARTICLES = [
  {
    id: 1,
    title: "Victoire éclatante des Seniors face à l'AS Rillieux",
    category: "Match",
    image: "/images/news/match-victoire.jpg",
    date: "2026-02-20",
    featured: true,
  },
  {
    id: 2,
    title: "Label Jeunes FFF : le SCBT récompensé",
    category: "Club",
    image: "/images/news/label-jeunes.jpg",
    date: "2026-02-15",
  },
  {
    id: 3,
    title: "Les U17 qualifiés pour la phase régionale",
    category: "Formation",
    image: "/images/news/u17-qualifies.jpg",
    date: "2026-02-12",
  },
  {
    id: 4,
    title: "Nouveau partenariat avec Kappa",
    category: "Partenaire",
    image: "/images/news/partenariat-kappa.jpg",
    date: "2026-02-08",
  },
  {
    id: 5,
    title: "Stage de détection : inscriptions ouvertes",
    category: "Formation",
    image: "/images/news/stage-detection.jpg",
    date: "2026-02-01",
  },
];

export const PHOTO_SERIES = [
  {
    id: 1,
    image: "/images/gallery/fondateurs-1964.jpg",
    caption: "Les fondateurs du club, 1964",
    date: "1964",
  },
  {
    id: 2,
    image: "/images/gallery/benzema-1996.jpg",
    caption: "Le jeune Karim Benzema au SCBT",
    date: "1996",
  },
  {
    id: 3,
    image: "/images/gallery/promotion-2003.jpg",
    caption: "Montée en Promotion d'Honneur",
    date: "2003",
  },
  {
    id: 4,
    image: "/images/gallery/gala-2024.jpg",
    caption: "60 ans du club - Gala anniversaire",
    date: "2024",
  },
  {
    id: 5,
    image: "/images/gallery/label-fff-2025.jpg",
    caption: "Label FFF Argent - Cérémonie de remise",
    date: "2025",
  },
];

export const KEY_STATS = [
  { value: 1964, label: "Année de fondation", suffix: "" },
  { value: 450, label: "Licenciés", suffix: "+" },
  { value: 15, label: "Équipes", suffix: "" },
  { value: 12000, label: "Jeunes formés", suffix: "+" },
];

export const TEAMS_PREVIEW = [
  { name: "Seniors", image: "/images/teams/seniors.jpg" },
  { name: "U20", image: "/images/teams/u20.jpg" },
  { name: "U17", image: "/images/teams/u17.jpg" },
  { name: "U15", image: "/images/teams/u15.jpg" },
  { name: "U13", image: "/images/teams/u13.jpg" },
  { name: "Féminines", image: "/images/teams/feminines.jpg" },
];

export const PARTNERS = [
  { name: "Kappa", logo: "/images/placeholder/partner-kappa.svg" },
  { name: "Olympique Lyonnais", logo: "/images/placeholder/partner-ol.svg" },
  { name: "MySalesAcademy", logo: "/images/placeholder/partner-msa.svg" },
  { name: "Ville de Bron", logo: "/images/placeholder/partner-bron.svg" },
  { name: "District du Rhône", logo: "/images/placeholder/partner-district.svg" },
  { name: "Crédit Agricole", logo: "/images/placeholder/partner-ca.svg" },
];

// ============================================================
// Club Page Data
// ============================================================

export const TIMELINE_EVENTS = [
  {
    year: "1964",
    title: "Fondation du club",
    description:
      "Le Sporting Club Bron Terraillon est fondé dans le quartier de Terraillon à Bron, avec la mission de rendre le football accessible à tous les jeunes du quartier.",
    image: "/images/gallery/fondateurs-1964.jpg",
  },
  {
    year: "1990",
    title: "Développement de la formation",
    description:
      "Le club structure son centre de formation et commence à attirer les meilleurs jeunes talents de l'agglomération lyonnaise.",
    image: "/images/gallery/fondateurs-1964.jpg",
  },
  {
    year: "1996",
    title: "Karim Benzema rejoint le SCBT",
    description:
      "Un jeune prodige de 9 ans nommé Karim Benzema fait ses premiers pas au SCBT. Il y restera jusqu'en 2000 avant de rejoindre l'OL.",
    image: "/images/gallery/benzema-1996.jpg",
  },
  {
    year: "2004",
    title: "Label FFF obtenu",
    description:
      "Le club obtient pour la première fois un label de la Fédération Française de Football, récompensant la qualité de sa formation.",
  },
  {
    year: "2014",
    title: "50 ans du club",
    description:
      "Le SCBT célèbre son demi-siècle d'existence avec un gala réunissant anciens joueurs, bénévoles et partenaires historiques.",
    image: "/images/gallery/gala-2024.jpg",
  },
  {
    year: "2024",
    title: "Partenariat avec l'Olympique Lyonnais",
    description:
      "Le SCBT signe un partenariat historique avec l'OL, consolidant le lien entre le club formateur et le club professionnel.",
    image: "/images/gallery/label-fff-2025.jpg",
  },
  {
    year: "2025",
    title: "Label Jeunes FFF Argent",
    description:
      "Le club obtient le Label Jeunes FFF Crédit Agricole Féminines 2025-2028 niveau Argent, reconnaissant l'excellence de sa formation féminine.",
  },
];

export const CLUB_VALUES = [
  {
    title: "Sportif",
    description:
      "Former les joueurs et joueuses de demain avec exigence et passion. Développer le talent individuel au service du collectif.",
    icon: "trophy",
  },
  {
    title: "Éducatif",
    description:
      "Transmettre les valeurs du sport : respect, discipline, dépassement de soi. Le football comme école de la vie.",
    icon: "graduation-cap",
  },
  {
    title: "Social",
    description:
      "Être un acteur du lien social dans le quartier de Terraillon. Le club comme lieu de rencontre, d'échange et d'intégration.",
    icon: "heart-handshake",
  },
];

export const STAFF_MEMBERS = [
  {
    name: "Mohamed Berkane",
    role: "Président",
    category: "Direction",
    image: "/images/placeholder/staff-1.jpg",
  },
  {
    name: "Rachid Azzouzi",
    role: "Vice-Président",
    category: "Direction",
    image: "/images/placeholder/staff-2.jpg",
  },
  {
    name: "Karim Boudjema",
    role: "Directeur Sportif",
    category: "Direction",
    image: "/images/placeholder/staff-3.jpg",
  },
  {
    name: "Yassine El Amrani",
    role: "Entraîneur Seniors",
    category: "Entraîneurs",
    image: "/images/placeholder/staff-4.jpg",
  },
  {
    name: "David Mora",
    role: "Entraîneur U17",
    category: "Entraîneurs",
    image: "/images/placeholder/staff-5.jpg",
  },
  {
    name: "Sophie Martin",
    role: "Responsable Féminines",
    category: "Entraîneurs",
    image: "/images/placeholder/staff-6.jpg",
  },
  {
    name: "Ahmed Saïdi",
    role: "Responsable Bénévoles",
    category: "Bénévoles",
    image: "/images/placeholder/staff-7.jpg",
  },
  {
    name: "Nadia Benamara",
    role: "Secrétaire Générale",
    category: "Direction",
    image: "/images/placeholder/staff-8.jpg",
  },
];

export const INFRASTRUCTURE = {
  name: "Stade Léo Lagrange",
  address: "8 rue Marcel Cerdan, 69500 Bron",
  features: [
    "2 terrains en gazon synthétique",
    "1 terrain en gazon naturel",
    "6 vestiaires équipés",
    "Tribune de 500 places",
    "Buvette / Club House",
    "Local de rangement matériel",
  ],
  images: [
    "/images/placeholder/infra-1.jpg",
    "/images/placeholder/infra-2.jpg",
    "/images/placeholder/infra-3.jpg",
  ],
};

export const LABELS = [
  {
    title: "Label Jeunes FFF Crédit Agricole",
    level: "Argent",
    period: "2025-2028",
    category: "Féminines",
    description:
      "Reconnaissance de la qualité de la formation féminine du club par la FFF.",
    image: "/images/placeholder/label-fff.png",
  },
  {
    title: "Partenariat Olympique Lyonnais",
    level: "",
    period: "2024-présent",
    category: "Club",
    description:
      "Partenariat officiel avec l'OL pour le développement de la formation et la détection de talents.",
    image: "/images/placeholder/label-ol.png",
  },
  {
    title: "Club Formateur Reconnu",
    level: "",
    period: "",
    category: "Formation",
    description:
      "Plus de 12 000 jeunes formés depuis 1964, dont de nombreux joueurs professionnels.",
    image: "/images/placeholder/label-formation.png",
  },
];

// ============================================================
// Club Events
// ============================================================

export type ClubEvent = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  category: "tournoi" | "portes-ouvertes" | "soiree" | "stage" | "gala";
  featured?: boolean;
};

export const EVENT_CATEGORY_LABELS: Record<ClubEvent["category"], string> = {
  "tournoi": "Tournoi",
  "portes-ouvertes": "Portes Ouvertes",
  "soiree": "Soirée du Club",
  "stage": "Stage Vacances",
  "gala": "Gala",
};

export const CLUB_EVENTS: ClubEvent[] = [
  {
    id: 1,
    title: "Tournoi de Printemps U9-U13",
    description: "Le grand tournoi annuel du SCBT. 32 équipes attendues, buvette et animations toute la journée.",
    date: "2026-04-12",
    time: "09:00",
    endTime: "18:00",
    location: "Stade Léo Lagrange",
    category: "tournoi",
    featured: true,
  },
  {
    id: 2,
    title: "Portes Ouvertes Saison 2026-2027",
    description: "Venez découvrir le club, rencontrer les éducateurs et inscrire vos enfants pour la prochaine saison.",
    date: "2026-06-14",
    time: "10:00",
    endTime: "16:00",
    location: "Stade Léo Lagrange",
    category: "portes-ouvertes",
  },
  {
    id: 3,
    title: "Soirée de Fin de Saison",
    description: "Remise des trophées, diaporama de la saison et buffet convivial pour célébrer ensemble.",
    date: "2026-06-21",
    time: "19:00",
    location: "Salle des Fêtes de Bron",
    category: "soiree",
  },
  {
    id: 4,
    title: "Stage Vacances de Pâques",
    description: "5 jours d'entraînement intensif pour les U7 à U15. Encadrement professionnel et goûter offert.",
    date: "2026-04-21",
    time: "09:00",
    endTime: "16:30",
    location: "Stade Léo Lagrange",
    category: "stage",
  },
  {
    id: 5,
    title: "Gala des 62 Ans du Club",
    description: "Soirée de gala pour célébrer l'anniversaire du SCBT. Dîner, spectacle et tombola.",
    date: "2026-10-15",
    time: "19:30",
    location: "Espace Albert Camus, Bron",
    category: "gala",
  },
];

export const CATEGORY_COLORS: Record<string, string> = {
  Match: "bg-blue-accent",
  Club: "bg-gold",
  Formation: "bg-emerald-500",
  Partenaire: "bg-purple-500",
  Seniors: "bg-blue-accent",
  U20: "bg-blue-light",
  U17: "bg-emerald-500",
  U15: "bg-amber-500",
  U13: "bg-purple-500",
  Féminines: "bg-pink-500",
};
