import type { Author } from "./author.type";
import type { Post } from "./post.type";

export interface User extends Author {
  username: string;
  posts?: Post[];
}

export type UserWithoutPost = Omit<User, "posts">;
