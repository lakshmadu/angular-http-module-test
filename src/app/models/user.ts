export interface User {
    user_id: string;
    user_name: string;
    user_email: string;
    user_phone?: string | null;
    nic?: string | null;
    role_type?: string | null;
  }
  