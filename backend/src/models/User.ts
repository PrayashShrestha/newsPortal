enum Role {
  Admin,
  Editor,
}
export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  role: Role;
}
