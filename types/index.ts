export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: User;
}

export interface AuthError {
  message: string;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface PropertyData {
  id: string;
  name: string;
  description: string;
  price: number;
  address: string;
  city: string;
  postalCode: string;
  surface: number;
  rooms: number;
  type: string;
  created_at: string;
  updated_at: string;
  owner_id: string;
} 