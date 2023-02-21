import React from "react";
import List from "../containers/List";
import { BookProvider } from "../redux/contexts/Book";


export const Home = () => {
  return (
    <BookProvider>
      <List />
    </BookProvider>
  );
};

export default Home;
