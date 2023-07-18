export interface IBook {
  _id?: string;
  title?: string;
  author?: string;
  genre?: string;
  userEmail?: string;
  thumbnail?: string;
  publicationDate?: string;
  reviews?: string[];
}

export interface ISignIn {
  email: string;
  password: string;
}
export interface ISignUp {
  email: string;
  password: string;
  confirmpassword: string;
}
