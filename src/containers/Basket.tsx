
import React from "react";
import { Action, useCart } from "../redux/contexts/Cart";
import { Add, Remove, Delete } from "@mui/icons-material";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export const Basket = () => {
    const [CartState, dispatchOrder] = useCart();
    const isMobile = window.innerWidth < 1000;

    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Nom de l'ouvrage</TableCell>
                        <TableCell align="left">Référence ISBN</TableCell>
                        <TableCell align="left">Quantité</TableCell>
                        <TableCell align="right">Prix unitaire</TableCell>
                        <TableCell align="right">Prix total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {CartState.items.map(item => (
                        <TableRow key={item.id}>
                            <TableCell scope="row">{item.product.title}</TableCell>
                            <TableCell align="left" scope="row">
                                {item.product.isbn}
                            </TableCell>
                            <TableCell align="left" sx={{ display: 'block' }}>
                                <Remove
                                    onClick={() => {
                                        dispatchOrder({
                                            type: Action.CHANGE_QUANTITY_ORDER_ITEM,
                                            payload: { item, quantity: -1 }
                                        });
                                    }}
                                />
                                {isMobile ? (<Typography sx={{ display: 'flex', marginLeft: '18%', marginBottom: '5%' }}>
                                    {" " + item.quantity + " "}
                                </Typography>
                                ) : (
                                    <Typography sx={{ display: 'flex', marginLeft: '5%', marginBottom: '5%' }}>
                                        {" " + item.quantity + " "}
                                    </Typography>
                                )}
                                <Add
                                    onClick={() => {
                                        dispatchOrder({
                                            type: Action.CHANGE_QUANTITY_ORDER_ITEM,
                                            payload: { item, quantity: 1 }
                                        });
                                    }}
                                />
                            </TableCell>
                            <TableCell align="right">{item.product.price.toFixed(2)} €
                            </TableCell>
                            <TableCell align="right">
                                {(item.product.price * item.quantity).toFixed(2) + ' €  '}
                                <Delete
                                    onClick={() => {
                                        dispatchOrder({
                                            type: Action.DELETE_ORDER_ITEM,
                                            payload: item
                                        });
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Basket;
