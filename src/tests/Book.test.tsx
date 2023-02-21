import { cleanup, render } from "@testing-library/react";
import React from "react";
import Tome from "../containers/Tome";
import { OrderProvider } from "../redux/contexts/Cart";
import { Book } from "../redux/models/Book";

const mockBook: Book = {
    isbn: "isbn",
    cover: "cover",
    price: 10,
    synopsis: ["synopsis"],
    title: "title"
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

    //TODO: implement the test for the add to cart button
});