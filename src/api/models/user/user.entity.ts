export type UserDocument = {
    user_id: string;
    email: string;
    password: string;
    name: string;
    phone: string;
    address: string;
    status: 'active' | 'inactive';
    refresh_token?: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string
}

export type UserDocumentWithId = WithSnapShotId<UserDocument>;