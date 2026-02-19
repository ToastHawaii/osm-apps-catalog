import { equalsIgnoreCase } from "@shared/utils/string";

const programingLanguages: {
  name: string;
  synonym: string[];
}[] = [
  { name: "ActionScript", synonym: ["actionscript", "flash"] },
  { name: "ActiveScript", synonym: ["activescript"] },
  { name: "AppleScript", synonym: ["applescript"] },
  { name: "C", synonym: ["c", "clang"] },
  {
    name: "C++",
    synonym: [
      "c++",
      "cpp",
      "cplusplus",
      "c-plus-plus",
      "c plus plus",
      "c++0x",
      "c++1x",
      "c++03",
      "c++11",
      "c++14",
      "c++17",
      "cpp17",
      "c++20",
      "symbiancpp",
      "gcc",
    ],
  },
  { name: "C#", synonym: ["c#", "c-sharp", "c sharp", "csharp"] },
  { name: "Clojure", synonym: ["clojure", "clojurescript"] },
  {
    name: "CSS",
    synonym: [
      "css",
      "css3",
      // none synonym but a hint
      "css grid",
    ],
  },
  { name: "Dart", synonym: ["dart"] },
  { name: "Go", synonym: ["go", "golang"] },
  { name: "HTML", synonym: ["html"] },
  {
    name: "Java",
    synonym: [
      "java",
      // none synonym but a hint
      "osm java",
    ],
  },
  {
    name: "JavaScript",
    synonym: [
      "javascript",
      "js",
      "ecmascript",
      "es",
      "vanilla javascript",
      "vanillajs",
    ],
  },
  { name: "Kotlin", synonym: ["kotlin"] },
  { name: "Lua", synonym: ["lua"] },
  { name: "Objective-C", synonym: ["objective-c", "objective c", "objc"] },
  {
    name: "Objective-C++",
    synonym: [
      "objective-c++",
      "objective c++",
      "objc++",
      "objective c plus plus",
    ],
  },
  { name: "Pascal", synonym: ["pascal", "object pascal", "delphi"] },
  { name: "Perl", synonym: ["perl", "pl"] },
  { name: "PHP", synonym: ["php"] },
  {
    name: "Python",
    synonym: ["python", "py", "python2", "python3", "python 3"],
  },
  { name: "R", synonym: ["r"] },
  { name: "Ruby", synonym: ["ruby", "rb", "rails", "ruby-script"] },
  { name: "Rust", synonym: ["rust"] },
  { name: "SQL", synonym: ["sql"] },
  { name: "Swift", synonym: ["swift"] },
  { name: "TypeScript", synonym: ["typescript", "ts"] },
  {
    name: "Visual Basic .NET",
    synonym: ["vb", "visual basic", "vb.net", "visual basic .net"],
  },
  { name: "Zig", synonym: ["zig"] },
  { name: "Html", synonym: ["html", "html5", "html css"] },
  { name: "Haskell", synonym: ["haskell"] },
  { name: "Visual Basic", synonym: ["vb6", "vba"] },
  { name: "Nim", synonym: ["nim", "nim lang"] },
];

export function getProgramingLanguageDisplay(value: string) {
  for (const language of programingLanguages) {
    if (language.synonym.find((s) => equalsIgnoreCase(s, value)))
      return language.name;
  }
  return "";
}
