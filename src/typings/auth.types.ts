import { Merge } from './utils';

export type DropdownProps = {
  id: string;
  label: string;
  isSelected: boolean;
};

export type CredentialsProps = {
  id: string;
  credential: string;
  createdAt: string;
  updatedAt: string;
};
export interface LoginResponse {
  user: User;
  token: Token;
}
export interface Token {
  expiresIn: number;
  accessToken: string;
}
export interface AuthResponse {
  success: boolean;
  message: string;
  data: User;
}
export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  role: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  countryCode: string;
  phone: string;
  provider: Provider;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  profileImage: string;
  isActive: boolean;
}

export interface Provider {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  bio: string;
  credentials: string;
}

export interface VerifyOTPResponse {
  status: boolean;
  email: string;
  token: string;
}

export interface VerifyInvitationCodeResponse {
  status: {
    id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    verificationCode: string;
    status: string;
    timestamp: string;
  };
}

export type RegisterFormType = {
  firstName: string;
  lastName: string;
  credentials: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  postalCode: string;
  city: string;
  state: string;
  address1: string;
  address2?: string;
};

export type ProfileFormType = Merge<
  RegisterFormType,
  {
    bio: string;
    profileImage: string;
  }
>;

export type SignUpFormType = Merge<
  ProfileFormType,
  {
    password: string;
  }
>;
