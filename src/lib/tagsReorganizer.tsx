export interface TagsReorganizationDefinition {
  prioritize?: string[];
  hierarchy?: [ifExists: string, hide: string][];
  hide?: string[];
}

export const DefaultPrioritize = ["attribute.free", "attribute.foss"];
export const DefaultHierarchyForFree = [
  ["attribute.foss", "attribute.free"],
] as [string, string][];

export const DefaultHierarchyForNavigation = [
  ["feature.voice-guidance", "feature.navigation"],
] as [string, string][];

export const DefaultHierarchyForEdit = [
  ["feature.edit-map", "feature.create-notes"],
  ["feature.offline-edit", "feature.edit-map"],
] as [string, string][];

export const DefaultHierarchyForRouting = [
  ["feature.routing", "feature.routing-hike"],
  ["feature.routing", "feature.routing-foot"],
  ["feature.routing", "feature.routing-bike"],
  ["feature.routing", "feature.routing-car"],
  ["feature.routing", "feature.routing-motorbike"],

  ["feature.offline-routing", "feature.routing"],
] as [string, string][];

export const DefaultHide = ["attribute.foss"];

export const DefaultTagsReorganization: TagsReorganizationDefinition = {
  prioritize: DefaultPrioritize,
  hierarchy: [
    ...DefaultHierarchyForNavigation,

    ...DefaultHierarchyForEdit,

    ...DefaultHierarchyForRouting,
  ],
  hide: DefaultHide,
};

export const TechDefaultTagsReorganization = {
  prioritize: DefaultPrioritize,
  hierarchy: [
    ...(DefaultTagsReorganization.hierarchy || []),
    ...DefaultHierarchyForFree,
  ],
  hide: [],
};

export function tagsReorganizer(
  tags: string[],
  { prioritize = [], hierarchy = [], hide = [] }: TagsReorganizationDefinition,
) {
  prioritize = prioritize.slice().reverse();
  let newTags = tags.slice();
  for (const p of prioritize) {
    const i = newTags.indexOf(p);
    if (i >= 0) {
      newTags.splice(i, 1);
      newTags.unshift(p);
    }
  }

  hide = hide.slice();
  for (const h of hierarchy) {
    if (newTags.includes(h[0])) {
      hide.push(h[1]);
    }
  }

  // hide
  newTags = newTags.filter((t) => !hide.includes(t));

  return newTags;
}
