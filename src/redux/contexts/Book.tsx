import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Action, ActionDispatch, Dispatch, State } from "../models/Book";
import { fetchBooks } from "../../api/Books";

const initialState: State = {
  count: 0,
  isLoading: false,
  books: []
};

type BookProviderProps = { children: React.ReactNode };
const BookStateContext = createContext<State | undefined>(undefined);
const BookDispatchContext = createContext<Dispatch | undefined>(undefined);

function bookReducer(state: State, action: ActionDispatch): State {
  switch (action.type) {

    case Action.GET_PRODUCTS: {
      return { ...state, isLoading: true };
    }
    case Action.PRODUCTS_RESPONSE: {
      return {
        ...state,
        books: action.payload,
        isLoading: false
      };
    }
  }
}

function BookProvider({ children }: BookProviderProps) {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  useEffect(() => {
    const fetchBooksData = async () => {
      const books = await fetchBooks();

      dispatch({
        type: Action.PRODUCTS_RESPONSE,
        payload: books
      });
    };

    dispatch({
      type: Action.GET_PRODUCTS
    });

    fetchBooksData();
  }, []);

  return (
    <BookStateContext.Provider value={state}>
      <BookDispatchContext.Provider value={dispatch}>
        {children}
      </BookDispatchContext.Provider>
    </BookStateContext.Provider>
  );
}

function useBookState() {
  const context = useContext(BookStateContext);
  if (context === undefined) {
    throw new Error("useProductState must be used within a ProductProvider");
  }
  return context;
}

function useBookDispatch() {
  const context = useContext(BookDispatchContext);
  if (context === undefined) {
    throw new Error("useProductDispatch must be used within a ProductProvider");
  }
  return context;
}

function useBook(): [State, Dispatch] {
  return [useBookState(), useBookDispatch()];
}

export { Action, BookProvider, useBook };
