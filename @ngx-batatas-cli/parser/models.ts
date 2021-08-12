export interface BaseToken {
  regex: RegExp;
}

export interface SingleToken extends BaseToken {
  multi: false;
}

export interface MultiToken extends BaseToken {
  multi: true;
}

export type Token = SingleToken | MultiToken;
