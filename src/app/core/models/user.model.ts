export interface CreateStaffUserRequest {
  username: string;
  email: string;
  password: string;

  firstName?: string;
  lastName?: string;
  phone?: string;

  role: 'ROLE_MANAGER' | 'ROLE_RECEPTIONIST';
  hotelIds: number[];
}
