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
  docId: string;
  likes: string[];
  created_at: Date;
  modified_at: string;
};

export type StoryType = {
  created_at: Date;
  image_url: string;
};

export type StoriesType = {
  docId: string;
  stories: StoryType[];
};
