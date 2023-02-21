import React from 'react';
import { useEffect, useState } from 'react';
import { Grid, Typography, Box, TextField } from '@mui/material';
import { useBook } from "../redux/contexts/Book";
import { Tome } from './Tome';

export default function List() {
  const [BooksState] = useBook();
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(
    BooksState.books
  );

  useEffect(() => {
    setFilteredBooks(
      BooksState.books.filter(book => book.title));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilteredBooks(
        BooksState.books.filter(book => book.title.toLowerCase().includes(search) ||
          book.title.includes(search)));
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [search, BooksState.books]);

  return (
    <>
      {!BooksState.isLoading ? (
        <>
          <Box
            component="form"
            sx={{ textAlign: 'center', '& > :not(style)': { m: 1, width: '25ch' }, }}
            noValidate
            autoComplete="off"
          >
            <TextField label="Rechercher un livre.." variant="standard" onChange={e => { setSearch(e.target.value) }}
              value={search} />
          </Box>
          <Box>
            <Grid container>
              {filteredBooks.map(book => (
                <div key={book.isbn} >
                  <Tome book={book} />
                </div>
              ))}
            </Grid>
          </Box>
        </>
      ) : (
        <Typography variant="h6" component="h6" sx={{
          display: 'flex', height: '35em', alignItems: 'center', textAlign: 'center', justifyContent: 'center'
        }}>Chargement des livres en cours..</Typography>
      )}
    </>
  );
}
