/* ---------===== custom props ====--------- */

export interface Dog {
  name: string;
  breed: string;
  photo?: string;
  profileId?: number;
  id?: number;
}
/* ---------===== auth models =====--------- */

export interface Profile {
  name: string;
  photo?: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  name: string;
  email: string;
  profile: { id: number };
  id: number;
  createdAt: string;
  updatedAt: string;
}
