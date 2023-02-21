import React from "react";
import { Action, useCart } from "../redux/contexts/Cart";
import { Book } from "../redux/models/Book";
import { Card, CardHeader, CardMedia, Typography, CardActions, Button } from "@mui/material";
import Synopsis from "./Synopsis";

interface BookProps {
    book: Book;
}

export const Tome = ({ book }: BookProps) => {
    const { title, price, cover, synopsis } = book;
    const [, dispatchOrder] = useCart();

    return (
        <Card sx={{ maxWidth: 345, margin: '1rem' }}>
            <CardHeader title={title ? title : "Titre non disponible"} subheader={price ? price + ' euros TTC' : "Prix non disponible"} />
            <CardMedia component="img" width="340" height="500" image={cover ? cover : "Couverture non disponible"} alt={title ? title : "Titre non disponible"} />
            <Typography>{synopsis ? ' ' + synopsis[0]?.slice(0, 210) + '...' : 'Synopsis non disponible'}</Typography>
            <Synopsis book={book} />
            <CardActions>
                <Button variant="contained" onClick={() => {
                    dispatchOrder({
                        type: Action.ADD_TO_ORDER,
                        payload: book
                    });
                }}
                >
                    Ajouter au panier
                </Button>
            </CardActions>
        </Card>
    );
};

export default Tome;