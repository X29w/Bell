export interface Space {
  id: string;
  name: string;
  iconUrl: string | null;
  inviteCode: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  _count?: { commodities: number; members: number };
}

export interface SpaceMember {
  id: string;
  userId: string;
  spaceId: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;
  user: { id: string; name: string | null; email: string; avatarUrl: string | null };
}

export interface SpaceDetail extends Space {
  members: SpaceMember[];
}

export interface CreateSpaceParams {
  name: string;
  iconUrl?: string;
}

export interface JoinSpaceParams {
  inviteCode: string;
}
