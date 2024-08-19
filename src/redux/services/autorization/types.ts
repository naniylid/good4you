export interface AuthorizationRequest {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface AuthorizationResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
}
