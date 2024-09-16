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

export enum FriendRequestStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
  CANCELLED = "cancelled",
}

export type FriendRequestType = {
  doc_id: string;
  from_user_id: string;
  to_user_id: string;
  status: FriendRequestStatus;
  timestamp: Date;
};

export type FriendType = {
  from_user_id: string;
  to_user_id: string;
  timestamp: Date;
  doc_id: string;
}