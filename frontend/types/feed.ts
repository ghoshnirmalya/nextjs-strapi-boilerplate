import IUser from "types/user";

export default interface IFeed {
  id: string;
  created_at: string;
  body: string;
  author: IUser;
}
