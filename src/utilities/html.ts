// Copyright (C) 2020 Markus Peloso
//
// This file is part of OSM Apps Catalog.
//
// OSM Apps Catalog is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// OSM Apps Catalog is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with OSM Apps Catalog.  If not, see <http://www.gnu.org/licenses/>.

export function getHtmlElement<K extends keyof HTMLElementTagNameMap>(
  selectors: K,
  contentElement?: ParentNode
): HTMLElementTagNameMap[K];
export function getHtmlElement(
  selectors: string,
  contentElement?: ParentNode
): HTMLElement;
export function getHtmlElement(
  selectors: string,
  contentElement: ParentNode = document
): HTMLElement {
  const element = contentElement.querySelector(selectors);

  if (!element) throw `Element ${selectors} not found.`;

  return element as HTMLElement;
}

export function getHtmlElements(
  selectors: string,
  contentElement?: ParentNode
): HTMLElement[];
export function getHtmlElements(
  selectors: string,
  contentElement: ParentNode = document
): HTMLElement[] {
  const elements: HTMLElement[] = [];
  contentElement.querySelectorAll(selectors).forEach((v) => {
    elements.push(v as HTMLElement);
  });

  return elements;
}

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  innerHTML: string = "",
  classNames: string[] = []
) {
  const element = document.createElement(tag);
  element.innerHTML = innerHTML;
  element.classList.add(...classNames.filter((c) => c));
  return element;
}
