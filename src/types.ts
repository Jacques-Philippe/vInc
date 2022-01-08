export type PropertyGroup = {
  Version: string;
};

export type Project = {
  PropertyGroup: PropertyGroup;
};

export type CsProjFile = {
  Project: Project;
};
