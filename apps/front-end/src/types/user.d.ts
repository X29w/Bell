export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResult {
  access_token: string;
}

export interface CreateUserParams {
  email: string;
  password: string;
  name?: string;
}
