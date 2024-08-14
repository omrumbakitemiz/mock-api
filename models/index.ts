export interface Engagement {
  id: number;
  sellerName: string;
  sellerImageUrl: string;
  message: string;
  creationDate: string;
  seen: boolean;
  sellerId: number;
}

export interface EngagementMessage {
  id: number;
  text: string;
  creationDate: string;
  title: string;
  ctaText: string;
  ctaRedirectUrl?: string;
  type: 'coupon' | 'message';
}
export interface SellerBadge {
  id: number;
  name: string;
  imageUrl: string;
}

export interface EngagementDetails {
  id: number;
  sellerName: string;
  sellerImageUrl: string;
  sellerPoint: number;
  messages: EngagementMessage[];
  badges: SellerBadge[];
  creationDate: string;
  seen: boolean;
  sellerId: number;
}
