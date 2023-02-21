
import React from "react";
import { useCart } from "../redux/contexts/Cart";
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

export const Price = () => {
    const [CartState] = useCart();

    return (
        <>
            <Typography variant="h5" component="h5" sx={{ marginLeft: '1rem', marginTop: '1rem' }}>Votre paiement</Typography>
            <TableContainer sx={{ display: 'table' }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Prix avant réduction:</TableCell>
                            <TableCell align="center">{CartState.total.toFixed(2)} €</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Montant de la réduction:</TableCell>
                            <TableCell align="center">
                                -{(CartState.reduction
                                    ? CartState.reduction.amount
                                    : 0
                                ).toFixed(2) + " "}
                                €
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Type de remise:</TableCell>
                            <TableCell align="center">
                                {CartState.reduction
                                    ? ` ${CartState.reduction.offer.type}`
                                    : ""}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Prix a payer:</TableCell>
                            <TableCell align="center" style={{ fontWeight: '600' }}>
                                {(
                                    CartState.total -
                                    (CartState.reduction ? CartState.reduction.amount : 0)
                                ).toFixed(2)}{" "}
                                €
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Price;
