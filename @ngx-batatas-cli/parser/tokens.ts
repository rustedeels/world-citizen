import { MultiToken, SingleToken } from './models.ts';

export const CHAPTER: SingleToken = {
  regex: /^#\s(.*)/gm,
  multi: false,
}

export const BOOL: SingleToken = {
  multi: false,
  regex: /^\!\s(.*)/gm
}

export const MEDIA: MultiToken = {
  multi: true,
  regex: /^\&\s(.*)/gm
}

export const EVENT: MultiToken = {
  multi: true,
  regex: /^\$\s(.*)/gm
}

export const NEXT: MultiToken = {
  multi: true,
  regex: /^\>\s(.*)/gm
}

export const DIALOG: SingleToken = {
  regex: /^##\s(.*)/gm,
  multi: false,
}

export const DIALOG_TEXT: SingleToken = {
  regex: /^\*\s(.*)/gm,
  multi: false,
}

export const PROPERTY_REGEX = /^(.*?)\[(.*)\]\((.*)\)|^(.*?)\[(.*)\]|^(.*?)\((.*)\)|^(.*)/gm;
export const SECTION_REGEX = /(.*)\|(.*)|(.*)/gm;
