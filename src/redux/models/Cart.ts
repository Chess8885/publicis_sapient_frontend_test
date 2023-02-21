import { CommercialOffer, Book } from "./Book";

export interface CartItem {
  id: string;
  product: Book;
  quantity: number;
}

export type ActionDispatch =
  | {
    type: Action.INIT_ORDER;
    payload: State;
  }
  | {
    type: Action.ADD_TO_ORDER;
    payload: Book;
  }
  | {
    type: Action.DELETE_ORDER_ITEM;
    payload: CartItem;
  }
  | {
    type: Action.CHANGE_QUANTITY_ORDER_ITEM;
    payload: { item: CartItem; quantity: number };
  }
  | {
    type: Action.COMMERCIAL_OFFERS_RESPONSE;
    payload: CommercialOffer[];
  };

export enum Action {
  INIT_ORDER = "INIT_ORDER",
  ADD_TO_ORDER = "ADD_TO_ORDER",
  DELETE_ORDER_ITEM = "DELETE_ORDER_ITEM",
  CHANGE_QUANTITY_ORDER_ITEM = "CHANGE_QUANTITY_ORDER_ITEM",
  COMMERCIAL_OFFERS_RESPONSE = "COMMERCIAL_OFFERS_RESPONSE"
}

export type Dispatch = (action: ActionDispatch) => void;

export type State = {
  total: number;
  count: number;
  reduction: { offer: CommercialOffer; amount: number } | null;
  items: CartItem[];
  offers: CommercialOffer[];
};
