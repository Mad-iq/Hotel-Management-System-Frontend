export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  expiresIn: number; // seconds
  roles: string[];   // ["GUEST"], ["ADMIN"], etc.
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}


export interface RegisterResponse {
  message: string;
}

export interface AuthState {
  token: string;
  tokenType: string;
  expiresAt: number; // epoch millis
  roles: string[];
  userId: number;
}

export interface ProfileResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}
