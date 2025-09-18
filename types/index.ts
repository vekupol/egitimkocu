export type Role = "coach" | "admin";
export type Branch =
  | "Matematik"
  | "Fen"
  | "Türkçe"
  | "Sosyal"
  | "İngilizce"
  | "Diğer";

export type Coach = {
  uid: string;
  name: string;
  city: string;
  district?: string;
  photoURL?: string;
  school?: string;
  certificateUni?: string;
  subjects?: string[];
  services?: string[];
  serviceLocations?: string[];
  price?: number;

  // users koleksiyonundan
  premium?: boolean;
  verified?: boolean;

  // yeni alanlar
  phone?: string;
  email?: string;

  modes?: ("online" | "offline" | "both")[];

  createdAt: number;
  updatedAt?: number;
  reviewsCount?: number;
  rating?: number;
};

export type AppUser = {
  uid: string;
  email?: string;
  role: Role; // "coach" by default
  premium?: boolean;
  verified?: boolean;
};
