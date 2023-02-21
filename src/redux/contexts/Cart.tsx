import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Action, ActionDispatch, Dispatch, State } from "../models/Cart";
import { fetchBooksOffers } from "../../api/Books";
import { CommercialOffer } from "../models/Book";

const initialState: State = {
  total: 0,
  reduction: null,
  count: 0,
  items: [],
  offers: []
};

type CartProviderProps = { children: React.ReactNode; stateInit?: State };
const CartStateContext = createContext<State | undefined>(undefined);
const CartDispatchContext = createContext<Dispatch | undefined>(undefined);

function calculateReductionForOffer(state: State, offer: CommercialOffer) {
  switch (offer.type) {
    case "percentage": {
      return state.total * (offer.value / 100);
    }
    case "minus": {
      return offer.value;
    }
    case "slice": {
      const nbSlice = Math.floor(state.total / offer.sliceValue);
      return nbSlice * offer.value;
    }
  }
}

function calculateBestReduction(state: State) {
  return state.offers
    .map(offer => ({ offer, amount: calculateReductionForOffer(state, offer) }))
    .sort((a, b) => (a.amount < b.amount ? 1 : -1))[0];
}

function calculateCart(state: State) {
  return {
    ...state,
    count: state.items.reduce((value, item) => value + item.quantity, 0),
    total: state.items.reduce(
      (value, item) => value + item.quantity * item.product.price,
      0
    ),
    reduction: calculateBestReduction(state)
  };
}

function saveCart(state: State) {
  localStorage.setItem("order", JSON.stringify(state));
}

function CartReducer(state: State, action: ActionDispatch): State {
  switch (action.type) {
    case Action.INIT_ORDER: {
      state = action.payload;

      state = calculateCart(state);
      saveCart(state);

      return {
        ...state
      };
    }

    case Action.ADD_TO_ORDER: {
      const productInOrder = state.items.find(
        orderItem => orderItem.product.isbn === action.payload.isbn
      );
      if (productInOrder) {
        productInOrder.quantity++;
      } else {
        state.items.push({
          id: action.payload.isbn,
          product: action.payload,
          quantity: 1
        });
      }

      state = calculateCart(state);
      saveCart(state);

      return {
        ...state
      };
    }

    case Action.DELETE_ORDER_ITEM: {
      state.items = state.items.filter(
        orderItem => orderItem.id !== action.payload.id
      );

      state = calculateCart(state);
      saveCart(state);

      return {
        ...state
      };
    }

    case Action.CHANGE_QUANTITY_ORDER_ITEM: {
      const orderItemInOrder = state.items.find(
        orderItem => orderItem.id === action.payload.item.id
      );

      if (orderItemInOrder) {
        orderItemInOrder.quantity += action.payload.quantity;
        if (orderItemInOrder.quantity <= 0) {
          CartReducer(state, {
            type: Action.DELETE_ORDER_ITEM,
            payload: orderItemInOrder
          });
        }
      }

      state = calculateCart(state);
      saveCart(state);

      return {
        ...state
      };
    }

    case Action.COMMERCIAL_OFFERS_RESPONSE: {
      state.offers = action.payload;

      state = calculateCart(state);
      saveCart(state);

      return {
        ...state
      };
    }
  }
}

function OrderProvider({ children, stateInit }: CartProviderProps) {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  stateInit = state;

  useEffect(() => {
    const orderStorage = localStorage.getItem("order");

    if (orderStorage) {
      const orderState: State = JSON.parse(orderStorage);

      dispatch({ type: Action.INIT_ORDER, payload: orderState });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (state.items.length > 0) {
        const commercialOffers = await fetchBooksOffers(
          state.items.map(orderItem => orderItem.product.isbn)
        );

        dispatch({
          type: Action.COMMERCIAL_OFFERS_RESPONSE,
          payload: commercialOffers
        });
      }
    };

    fetchData();
  }, [state.count, state.items]);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

function useCartState() {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error("useOrderState must be used within a OrderProvider");
  }
  return context;
}

function useCartDispatch() {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error("useOrderDispatch must be used within a OrderProvider");
  }
  return context;
}

function useCart(): [State, Dispatch] {
  return [useCartState(), useCartDispatch()];
}

export { Action, OrderProvider, useCart };
