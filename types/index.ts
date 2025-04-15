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
  owner_id: string;
  name: string;
  address: string;
  price: number;
  description: string;
  investment_goal: 'passive_income' | 'capital_growth' | 'portfolio_diversification';
  experience_level: 'beginner' | 'intermediate' | 'advanced';
  risk_tolerance: 'conservative' | 'moderate' | 'aggressive';
  investment_horizon: 'short_term' | 'medium_term' | 'long_term';
  available_capital: number;
  property_type: 'residential' | 'commercial' | 'fix_and_flip' | 'rental';
  created_at: string;
  updated_at: string;
} 