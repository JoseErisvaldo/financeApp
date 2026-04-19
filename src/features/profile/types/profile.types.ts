export type ProfileResponse = {
  success: boolean;
  data: {
    id: number;
    name: string;
    email: string;
    createdAt: string;
  };
};
