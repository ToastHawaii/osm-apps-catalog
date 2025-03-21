import { equalsIgnoreCase } from "../../utilities/string";

const frameworks: {
  name: string;
  synonym: string[];
}[] = [
  { name: "Meteor", synonym: ["meteor", "meteor application"] },
  {
    name: "leaflet",
    synonym: [
      "leaflet",
      "leafletjs",
      "leaflets",
      "leaflet java",
      "leaflet4j",
      "leaflet reactjs",
      "leaflet markercluster",
      "react leaflet",
      "react leaflet markercluster",
    ],
  },
  {
    name: "React",
    synonym: ["react", "reactjs", "reactnative", "react native"],
  },
  { name: "Vite", synonym: ["vite", "vitejs"] },
  { name: "Reatom", synonym: ["reatom"] },
  { name: "Tailwind CSS", synonym: ["tailwind css"] },
  { name: "Nextjs", synonym: ["nextjs"] },
  { name: "Bootstrap", synonym: ["bootstrap"] },
  { name: "Cesiumjs", synonym: ["cesiumjs"] },
  { name: "Flutter", synonym: ["flutter"] },
  {
    name: "Angular",
    synonym: ["angular", "angular2", "angularjs", "angular ssr"],
  },
  { name: "ASP.NET", synonym: ["asp net core"] },
  { name: "JQuery", synonym: ["jquery"] },
  { name: "Material UI", synonym: ["material ui"] },
  {
    name: "Windows form",
    synonym: ["windowsform", "windowsforms", "winforms"],
  },
  { name: "LovyanGFX", synonym: ["lovyangfx"] },
  { name: "shadcn/ui", synonym: ["shadcn ui"] },
  { name: "SQLite", synonym: ["sqlite"] },
  { name: "Turso", synonym: ["turso db"] },
  { name: "Supabase", synonym: ["supabase"] },
  { name: "TanStack Table", synonym: ["tanstack table"] },
  { name: "Recharts", synonym: ["recharts"] },
  { name: "Flask", synonym: ["flask", "flask api"] },
  { name: "Django", synonym: ["django"] },
  { name: "nginx", synonym: ["nginx"] },
  { name: "Vue.js", synonym: ["vuejs", "vue", "vue3", "vuetify"] },
];

export function getFrameworkDisplay(value: string) {
  for (const language of frameworks) {
    if (language.synonym.find((s) => equalsIgnoreCase(s, value)))
      return language.name;
  }
  return "";
}
