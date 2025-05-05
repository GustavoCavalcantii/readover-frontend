export interface User {
  id: string;
  username: string;
  grade?: string;
  email: string;
  role: string;
  image: string;
  createdAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface EditCredentials {
  grade?: string;
  username?: string;
}

export interface ResetCredentials {
  resetToken: string;
  password?: string;
  email?: string;
}

export interface RequireCredentials {
   email: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  grade: string;
}
