import React from "react";
import { useCart } from "../redux/contexts/Cart";
import { Typography } from '@mui/material';
import Basket from "../containers/Basket";
import Price from "../containers/Price";

export const Cart = () => {
  const [CartState] = useCart();

  return (
    <>
      <Typography variant="h5" component="h5" sx={{ marginLeft: '1rem', marginTop: '1rem' }}>
        {CartState.count > 0 ? 'Votre panier (' + CartState.count + ' articles)' : ' '}
      </Typography>
      {CartState.count ? (
        <>
          <Basket />
          <Price />
        </>
      ) : (
        <Typography variant="h6" component="h6" sx={{
          display: 'flex', height: '35em', alignItems: 'center', textAlign: 'center', justifyContent: 'center'
        }}>
          Oups ! Votre panier est vide.
        </Typography>
      )}
    </>
  );
};

export default Cart;
