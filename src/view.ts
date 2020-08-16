import * as moment from "moment";

export function toTitle(model: {
  name: string;
  address: {
    name: string;
    street: string;
  };
  type: string;
  operator: string;
}) {
  const name =
    model.name ||
    (model.address.name !== model.address.street
      ? model.address.name
      : undefined) ||
    model.type;
  return name + (model.operator ? ` (${model.operator})` : ``);
}

export function toLevel(
  model: number,
  local: {
    groundFloor: (level: number) => string;
    basement: (level: number) => string;
    floor: (level: number) => string;
  }
) {
  if (!isNumeric(model)) return ``;

  if (model === 0) return local.groundFloor(model);

  if (model < 0) return local.basement(model);

  if (model > 0) return local.floor(model);

  return ``;
}

export function toOpenOrClose(
  model: {
    getUnknown: (date?: Date) => string;
    getComment: (date?: Date) => string;
    getState: (date?: Date) => string;
    getNextChange: () => Date;
  },
  local: {
    maybeOpen: string;
    thatDependsOn: string;
    open: string;
    closed: string;
    maybeCloses: string;
    maybeOpens: string;
    closes: string;
    opens: string;
  }
) {
  let output = "";
  try {
    if (model.getUnknown()) {
      output = `<span class="open">${local.maybeOpen}</span>${
        model.getComment()
          ? ` ${local.thatDependsOn}: "${model.getComment()}"`
          : ""
      }`;
    } else {
      output =
        (model.getState()
          ? `<span class="open">${local.open}</span>`
          : `<span class="closed">${local.closed}</span>`) +
        (model.getComment() ? ` "${model.getComment()}"` : ``);
    }
    if (
      typeof model.getNextChange() !== `undefined` &&
      model.getState() !== model.getState(model.getNextChange()) &&
      moment(model.getNextChange()).diff(moment(), "weeks") <= 2
    ) {
      output += ` - `;

      if (model.getUnknown(model.getNextChange()))
        output += model.getState() ? local.maybeCloses : local.maybeOpens;
      else output += model.getState() ? local.closes : local.opens;

      output += ` ${moment(model.getNextChange()).calendar()} ${
        model.getComment(model.getNextChange())
          ? ` "${model.getComment(model.getNextChange())}"`
          : ``
      }`;
    }
  } catch (e) {
    console.warn(e);
    return undefined;
  }
  return output;
}

function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
