export interface Book {
  isbn: string;
  title: string;
  price: number;
  cover: string;
  synopsis: string[];
}

export interface CommercialOffersResponse {
  offers: CommercialOffer[];
}

export type CommercialOffer =
  | {
    type: "percentage" | "minus";
    value: number;
  }
  | {
    type: "slice";
    value: number;
    sliceValue: number;
  };

export type ActionDispatch =
  | {
    type: Action.GET_PRODUCTS;
  }
  | {
    type: Action.PRODUCTS_RESPONSE;
    payload: Book[];
  };

export enum Action {
  GET_PRODUCTS = "GET_PRODUCTS",
  PRODUCTS_RESPONSE = "PRODUCTS_RESPONSE"
}

export type Dispatch = (action: ActionDispatch) => void;

export type State = {
  count: number;
  isLoading: boolean;
  books: Book[];
};
