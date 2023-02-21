import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import Tome from "../containers/Tome";
import { OrderProvider } from "../redux/contexts/Cart";
import { Book } from "../redux/models/Book";
import { State } from "../redux/models/Cart";

const mockBook: Book = {
    isbn: "isbn",
    cover: "cover",
    price: 10,
    synopsis: ["synopsis"],
    title: "title"
};

const mockState: State = {
    total: 0,
    reduction: null,
    count: 0,
    items: [],
    offers: []
};

afterEach(cleanup);

describe("Tome", () => {
    it("renders the Book without crashing", () => {
        render(
            <OrderProvider>
                <Tome book={mockBook} />
            </OrderProvider>
        );
    });

    it("renders the book title", () => {
        const { getByText } = render(
            <OrderProvider>
                <Tome book={mockBook} />
            </OrderProvider>
        );
        expect(getByText("title")).toBeInTheDocument();
    });

    it("renders the book price", () => {
        const { getByText } = render(
            <OrderProvider>
                <Tome book={mockBook} />
            </OrderProvider>
        );
        expect(getByText("10 euros TTC")).toBeInTheDocument();
    });

    it("renders the book cover", () => {
        const { getByAltText } = render(
            <OrderProvider>
                <Tome book={mockBook} />
            </OrderProvider>
        );
        expect(getByAltText("title")).toBeInTheDocument();
    });

    it("should dispatch action to add item to order on button clicked", () => {
        const { getByText } = render(
            <OrderProvider stateInit={mockState}>
                <Tome book={mockBook} />
            </OrderProvider>
        );

        fireEvent.click(getByText("Ajouter au panier"));

        expect(mockState.count).toEqual(0)
    })
});