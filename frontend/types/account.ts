export default interface IAccount {
  id: number;
  provider: string;
  type: string;
  refreshToken: string;
  accessToken: string;
  accessTokenExpires: string;
}
