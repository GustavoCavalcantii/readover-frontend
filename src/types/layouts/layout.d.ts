import React from "react";
import { LoginCredentials, RegisterCredentials } from "../services/user";

export type LayoutProps = {
  children: React.ReactNode;
  headerType: "adm" | "user" | "general"; 
};

export interface ContainerProps {
  $rightPanelActive?: boolean;
}

export interface FormProps {
  onSubmit?: (e: React.FormEvent) => void;
}

export interface SignInProps {
  onSubmit?: (e: React.FormEvent) => void;
  data: LoginCredentials;
  onChange: (data: LoginCredentials) => void;
  error?: React.ReactNode;
}

export interface SignUpProps {
  onSubmit?: (e: React.FormEvent) => void;
  data: RegisterCredentials;
  onChange: (data: RegisterCredentials) => void;
  error?: React.ReactNode;
}

export interface ProfileProps {
  text?: string;
  onChange?: string;
}

