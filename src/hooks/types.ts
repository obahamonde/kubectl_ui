export type Upload = {
  ref?: string;
  name: string;
  key: string;
  size: number;
  type: string;
  lastModified: number;
  url?: string;
  file: File;
};

export type User = {
  ref?: string;
  given_name?: string;
  family_name?: string;
  nickname?: string;
  name: string;
  picture?: string;
  locale?: string;
  updated_at?: string;
  email?: string;
  email_verified?: boolean;
  sub: string;
};

export type Node = {
  name: string;
  type: "file" | "directory";
  content?: string;
  children?: Node[];
}