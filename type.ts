export type UserType = {
  name: string;
  email: string;
  phone_no: string;
  image: string;
  uid: string;
};

export type PostType = {
  uid: string;
  text: string;
  file: string | null;
  date: Date;
};
