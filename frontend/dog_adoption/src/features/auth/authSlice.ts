import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import axios from "axios";
import {PROPS_AUTHEN, PROPS_ACCOUNT_NAME, PROPS_PROFILE} from "../types";

const adoptionURL = process.env.REACT_APP_DEV_ADOPTION_URL;

export const fetchAsyncLogin = createAsyncThunk(
    "auth/post",
    async (authen: PROPS_AUTHEN) => {
        const res = await axios.post(`${adoptionURL}authen/jwt/create/`, authen, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    }
);

export const fetchAsyncRegister = createAsyncThunk(
    "auth/register",
    async (auth: PROPS_AUTHEN) => {
        const res = await axios.post(`${adoptionURL}adoption/register/`, auth, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    }
);

export const fetchAsyncCreateProfile = createAsyncThunk(
    "profile/post",
    async (accountName: PROPS_ACCOUNT_NAME) => {
        const res = await axios.post(`${adoptionURL}adoption/profile/`, accountName, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${localStorage.localJWT}`,
            },
        });
        return res.data;
    }
);

export const fetchAsyncUpdateProfile = createAsyncThunk(
    "profile/put",
    async (profile: PROPS_PROFILE) => {
        const uploadData = new FormData();
        uploadData.append("accountName", profile.accountName);
        profile.avatar && uploadData.append("avatar", profile.avatar, profile.avatar.name);
        const res = await axios.put(
            `${adoptionURL}adoption/profile/${profile.id}/`, uploadData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            }
        );
        return res.data;
    }
);

export const fetchAsyncGetMyProfile = createAsyncThunk(
    "profile/get",
    async () => {
        const res = await axios.get(`${adoptionURL}adoption/myprofile/`, {
            headers: {
                Authorization: `JWT ${localStorage.localJWT}`,
            },
        });
        return res.data[0];
    }
);

export const fetchAsyncGetProfiles = createAsyncThunk(
    "profiles/get",
    async () => {
        const res = await axios.get(`${adoptionURL}adoption/profile/`, {
            headers: {
                Authorization: `JWT ${localStorage.localJWT}`,
            },
        });
        return res.data;
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        openSignIn: true,
        openSignUp: false,
        openProfile: false,
        isLoadingAuth: false,
        myprofile: {
            id: 0,
            accountName: "",
            accountProfile: 0,
            avatar: "",
            totalDonation: 0,
            accountType: "",
        },
        profiles: [
            {
                id: 0,
                accountName: "",
                accountProfile: 0,
                avatar: "",
                totalDonation: 0,
                accountType: "",
            },
        ],
    },
    reducers: {
        fetchCredStart(state) {
            state.isLoadingAuth = true;
        },
        fetchCredEnd(state) {
            state.isLoadingAuth = false;
        },
        setOpenSignIn(state) {
            state.openSignIn = true;
        },
        resetOpenSignIn(state) {
            state.openSignIn = false;
        },
        setOpenSignUp(state) {
            state.openSignUp = true;
        },
        resetOpenSignUp(state) {
            state.openSignUp = false;
        },
        setOpenProfile(state) {
            state.openProfile = true;
        },
        resetOpenProfile(state) {
            state.openProfile = false;
        },
        editAccountName(state, action) {
            state.myprofile.accountName = action.payload;
        },
    },

    // 非同期関数の後処理を定義
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
            localStorage.setItem("localJWT", action.payload.access);
        });
        builder.addCase(fetchAsyncCreateProfile.fulfilled, (state, action) => {
            state.myprofile = action.payload;
        });
        builder.addCase(fetchAsyncGetMyProfile.fulfilled, (state, action) => {
            state.myprofile = action.payload;
        });
        builder.addCase(fetchAsyncGetProfiles.fulfilled, (state, action) => {
            state.profiles = action.payload;
        });
        builder.addCase(fetchAsyncUpdateProfile.fulfilled, (state, action) => {
            state.myprofile = action.payload;
            state.profiles = state.profiles.map((prof) =>
                prof.id === action.payload.id ? action.payload : prof
            );
        });
    },
});

export const {
    fetchCredStart, fetchCredEnd, setOpenSignIn, resetOpenSignIn, setOpenSignUp, resetOpenSignUp,
    setOpenProfile, resetOpenProfile, editAccountName
} = authSlice.actions;


export const selectIsLoadingAuth = (state: RootState) => state.auth.isLoadingAuth;
export const selectOpenSignIn = (state: RootState) => state.auth.openSignIn;
export const selectOpenSignUp = (state: RootState) => state.auth.openSignUp;
export const selectOpenProfile = (state: RootState) => state.auth.openProfile;
export const selectProfile = (state: RootState) => state.auth.myprofile;
export const selectProfiles = (state: RootState) => state.auth.profiles;

export default authSlice.reducer;
