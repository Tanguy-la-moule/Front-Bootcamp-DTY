export class User {
  _id: string;
  email: string;
  username: string;
  friends: string[];
  salt: string;
  hash: string;
  status: string;
}
