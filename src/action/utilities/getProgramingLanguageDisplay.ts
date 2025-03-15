import { equalsIgnoreCase, trim } from "../../utilities/string";

const programingLanguages: {
  name: string;
  synonym: string[];
}[] = [
  { name: "ActionScript", synonym: ["actionscript", "flash"] },
  { name: "ActiveScript", synonym: ["activescript"] },
  { name: "AppleScript", synonym: ["applescript"] },
  { name: "C", synonym: ["c"] },
  {
    name: "C++",
    synonym: [
      "c++",
      "cpp",
      "c++0x",
      "c++1x",
      "c++03",
      "c++11",
      "c++14",
      "c++17",
      "c++20",
    ],
  },
  { name: "C#", synonym: ["c#", "c-sharp", "c sharp"] },
  { name: "CSS", synonym: ["css"] },
  { name: "Dart", synonym: ["dart"] },
  { name: "Go", synonym: ["go", "golang"] },
  { name: "HTML", synonym: ["html"] },
  { name: "Java", synonym: ["java"] },
  { name: "JavaScript", synonym: ["javascript", "js", "ecmascript", "es"] },
  { name: "Kotlin", synonym: ["kotlin"] },
  { name: "Lua", synonym: ["lua"] },
  { name: "Objective-C", synonym: ["objective-c", "objective c", "objc"] },
  {
    name: "Objective-C++",
    synonym: ["objective-c++", "objective c++", "objc++"],
  },
  { name: "Pascal", synonym: ["pascal", "object pascal", "delphi"] },
  { name: "Perl", synonym: ["perl", "pl"] },
  { name: "PHP", synonym: ["php"] },
  { name: "Python", synonym: ["python", "py"] },
  { name: "R", synonym: ["r"] },
  { name: "Ruby", synonym: ["ruby", "rb", "rails"] },
  { name: "Rust", synonym: ["rust"] },
  { name: "SQL", synonym: ["sql"] },
  { name: "Swift", synonym: ["swift"] },
  { name: "TypeScript", synonym: ["typescript", "ts"] },
  {
    name: "Visual Basic .NET",
    synonym: ["vb", "visual basic", "vb.net", "visual basic .net"],
  },
  { name: "Zig", synonym: ["zig"] },
];

export function getProgramingLanguageDisplay(value: string) {
  // Remove version
  value = trim(value.replaceAll(/[0-9]+((\.[0-9]+)+\+?|\+)$/gi, ""));

  for (const language of programingLanguages) {
    if (language.synonym.find((s) => equalsIgnoreCase(s, value)))
      return language.name;
  }
  return "";
}
