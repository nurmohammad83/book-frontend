export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  userEmail: string;
  thumbnail: string;
  publicationDate: string;
  reviews?: string[];
}
