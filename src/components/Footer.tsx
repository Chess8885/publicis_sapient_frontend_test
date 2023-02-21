import React, { useRef } from 'react';
import { useCart } from "../redux/contexts/Cart";
import { Home, ShoppingBag } from '@mui/icons-material';
import { Badge, Paper, Box, BottomNavigation, BottomNavigationAction } from '@mui/material';

export default function Footer() {
    const [CartState] = useCart();
    const ref = useRef<HTMLDivElement>(null);

    const redirectToHome = () => {
        window.location.href = '/';
    };

    const redirectToCart = () => {
        window.location.href = '/cart';
    };

    return (
        <Box sx={{ pb: 7 }} ref={ref}>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation showLabels>
                    <BottomNavigationAction label="Accueil" icon={<Home />} onClick={redirectToHome}>
                    </BottomNavigationAction>
                    <BottomNavigationAction label="Panier"
                        icon={
                            <Badge badgeContent={CartState.count} color="primary">
                                <ShoppingBag />
                            </Badge>
                        }
                        onClick={redirectToCart}>
                    </BottomNavigationAction>
                </BottomNavigation>
            </Paper >
        </Box >
    );
}
