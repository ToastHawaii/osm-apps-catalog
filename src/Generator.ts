export type Local = { [t: string]: string };
export type Tags = { [t: string]: string } & { wheelchair: string };
export type Attribute<M> = {
  check: (tags: Tags, value: string, model: M, local: Local) => boolean;
  template: (local: Local, tags: Tags, value: string, model: M) => string;
};

export class Generator<M extends {}> {
  public constructor(private attributes: Attribute<M>[]) {}

  public empty(tags: Tags, value: string, model: M, local: Local) {
    return (
      this.attributes.filter(attribute =>
        attribute.check(tags, value, model, local)
      ).length <= 0
    );
  }

  public render(
    local: Local,
    tags: Tags,
    value: string,
    model: M,
    separator: string = ""
  ) {
    return this.attributes
      .map(attribute =>
        attribute.check(tags, value, model, local)
          ? attribute.template(local, tags, value, model)
          : ""
      )
      .filter(el => el)
      .join(separator);
  }
}
