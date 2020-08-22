export default interface ISession {
  user: {
    name: string;
    email: string;
    image: string;
  };
  id: number;
  expires: string;
}
