
import React, { useState, useRef, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, Typography } from '@mui/material';
import { Action, useCart } from '../redux/contexts/Cart';
import { Book } from "../redux/models/Book";

interface SynopsisProps {
    book: Book;
}

export function Synopsis({ book }: SynopsisProps) {
    const { title, synopsis } = book;
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
    const [, dispatchOrder] = useCart();

    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Button onClick={handleClickOpen('paper')}>Lire la suite</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
            >
                <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {<>
                            {synopsis.map((paragraph, index) => (
                                <Typography variant='subtitle2' component='span' key={index}>{paragraph}</Typography>
                            ))}
                        </>}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fermer</Button>
                    <Button onClick={() => {
                        dispatchOrder({
                            type: Action.ADD_TO_ORDER,
                            payload: book
                        });
                    }}
                    >
                        Ajouter au panier
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default Synopsis;