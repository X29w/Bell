export interface Commodity {
  id: string;
  name: string;
  imageUrl: string | null;
  expiryDate: string;
  location: string | null;
  quantity: number;
  isUsed: boolean;
  usedAt: string | null;
  spaceId: string;
  categoryId: string | null;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  category: Category | null;
}

export interface Category {
  id: string;
  name: string;
  iconUrl: string | null;
  spaceId: string;
  _count?: { commodities: number };
}

export interface CommodityStatistics {
  expired: number;
  soon: number;
  total: number;
}

export interface CreateCommodityParams {
  name: string;
  imageUrl?: string;
  expiryDate: string;
  location?: string;
  quantity?: number;
  spaceId: string;
  categoryId?: string;
}

export interface UpdateCommodityParams {
  name?: string;
  imageUrl?: string;
  expiryDate?: string;
  location?: string;
  quantity?: number;
  isUsed?: boolean;
  categoryId?: string;
}

export interface QueryCommodityParams {
  spaceId: string;
  status?: 'all' | 'expired' | 'soon' | 'fresh';
  categoryId?: string;
  keyword?: string;
  sortBy?: 'expiry_asc' | 'expiry_desc' | 'created_desc';
}

export interface Reminder {
  id: string;
  daysBefore: number;
  isEnabled: boolean;
  commodityId: string;
  userId: string;
}

export interface UpsertReminderParams {
  commodityId: string;
  daysBefore?: number;
  isEnabled?: boolean;
}
