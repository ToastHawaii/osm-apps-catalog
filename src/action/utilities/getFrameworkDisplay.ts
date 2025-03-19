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
  { name: "Angular", synonym: ["angular", "angular2", "angularjs", "angular ssr"] },
  { name: "ASP.NET", synonym: ["asp net core"] },
  { name: "JQuery", synonym: ["jquery"] },
  { name: "Material UI", synonym: ["material ui"] },
  { name: "Windows form", synonym: ["windowsform","windowsforms", "winforms" ] },
];

export function getFrameworkDisplay(value: string) {
  for (const language of frameworks) {
    if (language.synonym.find((s) => equalsIgnoreCase(s, value)))
      return language.name;
  }
  return "";
}
