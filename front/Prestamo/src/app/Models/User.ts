export interface UserI {
  id: number;
  name: string;
  email: string;
  adress: string;
  phone: number;
  password: string;
  is_active: boolean;
  avatar?: string;
}