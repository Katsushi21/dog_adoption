export interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
}

// authSlice.tsで使用するデータ型
export interface PROPS_AUTHEN {
    email: string;
    password: string;
}

export interface PROPS_PROFILE {
    id: number;
    accountName: string;
    // accountProfile: string;
    avatar: File | null;
    // totalDonation: number;
    // accountType: string;
}

export interface PROPS_ACCOUNT_NAME {
    accountName: string;
}

// dog_dataSlice.tsで使用するデータ型
export interface PROPS_NEWDATA {
    dogName: string;
    photo: File | null;
}

export interface PROPS_DATA {
    dataId: number;
    loginId: number;
    dogName: string;
    gender: string;
    age: number;
    height: number;
    observations: string;
    peopleFriendly: number;
    dogFriendly: number;
    color: string;
    hair: string;
    reason_for_arrival: string;
    photo: string;
    companyPost: number;
}