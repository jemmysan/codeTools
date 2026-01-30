export const CURRENT_YEAR = 2026;
export const MISSIONS_LIST = [
  { id: "site_01", name: "MANSA" },
  { id: "site_02", name: "SITE ALPHA" },
  { id: "site_03", name: "SITE BETA" },
  { id: "site_04", name: "ENTREPOT GAMMA" }
];
export const MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
export const DAYS = ["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI", "DIMANCHE"];

export const STATIC_SCHEDULE_STORE = [
  {
    id: "plan_101", missionId: "site_01", month: "Janvier", label: "Semaine du 26 au 01 Février",
    days: [
      { day: "LUNDI", date: "2026-01-26", agents: [{ Nom: "Jean D.", role: "SSIAP 1", start: "08:00", end: "20:00", color: "#E3F2FD", textColor: "#1E88E5" }] },
      { day: "MERCREDI", date: "2026-01-28", agents: [{ Nom: "Jean D.", role: "SSIAP 1", start: "08:00", end: "20:00", color: "#E3F2FD", textColor: "#1E88E5" }] }
    ]
  },
  {
    id: "plan_102", missionId: "site_02", month: "Janvier", label: "Semaine du 26 au 01 Février",
    days: [{ day: "MARDI", date: "2026-01-27", agents: [{ Nom: "Jean D.", role: "SSIAP 1", start: "20:00", end: "08:00", color: "#E3F2FD", textColor: "#1E88E5" }] }]
  },
  {
    id: "plan_103", missionId: "site_03", month: "Janvier", label: "Semaine du 26 au 01 Février",
    days: [{ day: "LUNDI", date: "2026-01-26", agents: [{ Nom: "Marc L.", role: "ADS", start: "07:00", end: "19:00", color: "#F0F4C3", textColor: "#827717" }] }]
  },
  {
    id: "plan_104", missionId: "site_04", month: "Janvier", label: "Semaine du 26 au 01 Février",
    days: [{ day: "VENDREDI", date: "2026-01-30", agents: [{ Nom: "Marc L.", role: "ADS", start: "19:00", end: "07:00", color: "#F0F4C3", textColor: "#827717" }] }]
  },
  {
    id: "plan_105", missionId: "site_04", month: "Janvier", label: "Semaine du 26 au 01 Février",
    days: [{ day: "JEUDI", date: "2026-01-29", agents: [{ Nom: "Jean D.", role: "SSIAP 1", start: "20:00", end: "08:00", color: "#E3F2FD", textColor: "#364a5c" }] }]
  },
];