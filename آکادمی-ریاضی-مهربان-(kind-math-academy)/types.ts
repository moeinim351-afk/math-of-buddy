
export interface GroundingLink {
  uri: string;
  title: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  groundingLinks?: GroundingLink[];
}

export interface Quote {
  text: string;
  author: string;
}
