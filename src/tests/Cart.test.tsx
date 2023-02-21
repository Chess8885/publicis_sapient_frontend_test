import { cleanup, render } from "@testing-library/react";
import React from "react";
import Cart from "../pages/Cart";
import { OrderProvider } from "../redux/contexts/Cart";

//TODO: mock the useCart hook

afterEach(cleanup);


describe("Cart", () => {
    it("renders without crashing", () => {
        render(
            <OrderProvider>
                <Cart />
            </OrderProvider>
        );
    });

    it("renders the empty card", () => {
        const { getByText } = render(
            <OrderProvider>
                <Cart />
            </OrderProvider>
        );
        expect(getByText("Oups ! Votre panier est vide.")).toBeInTheDocument();
    });

    //TODO: test the cart with items
});