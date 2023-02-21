import { CommercialOffersResponse, Book } from "../redux/models/Book";

const apiURL = 'https://henri-potier.web.app';
const bookRoute = "/books";
const fetchBooksRoute = apiURL + bookRoute;
const fetchOffers = "/commercialOffers";

const fetchBooks = async () => {
  const response = await fetch(fetchBooksRoute);
  const books: Book[] = await response.json();

  return (books);
};

const fetchBooksOffers = async (books: string[]) => {
  const dynamicOffersRoute = `/${books.join(",")}${fetchOffers}`;
  const response = await fetch(fetchBooksRoute + dynamicOffersRoute);
  const offerResponse: CommercialOffersResponse = await response.json();
  const offers = offerResponse.offers;

  return (offers);
};

export { fetchBooks, fetchBooksOffers };
