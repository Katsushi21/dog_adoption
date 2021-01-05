export interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
}

// authSlice.ts
export interface PROPS_AUTHEN {
    email: string;
    password: string;
}

export interface PROPS_PROFILE {
    id: number;
    company_name: string;
}

export interface PROPS_COMPANY_NAME {
    company_name: string;
}

export interface PROPS_NEWDATA {
    name: string;
    img: File | null;
}

export interface PROPS_DATA {
    dataId: number;
    loginId: number;
    companyPost: number;
    name: string;
    imageUrl: string;
}