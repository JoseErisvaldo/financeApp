export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
    refreshExpiresIn: string;
    user: AuthUser;
  };
};

export type RefreshResponse = {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken?: string;
    user?: AuthUser;
  };
};
