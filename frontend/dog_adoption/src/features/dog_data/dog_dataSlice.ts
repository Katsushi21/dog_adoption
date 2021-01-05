import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import axios from "axios";
import {PROPS_NEWDATA} from "../types";

const adoptionUrlData = `${process.env.REACT_APP_DEV_ADOPTION_URL}adoption/dog_data`;

export const fetchAsyncGetData = createAsyncThunk("dog_data/get", async () => {
    const res = await axios.get(adoptionUrlData, {
        headers: {
            Authorization: `JWT ${localStorage.localJWT}`,
        },
    });
    return res.data;
});

export const fetchAsyncNewData = createAsyncThunk("dog_data/dog_data",
    async (newData: PROPS_NEWDATA) => {
        const uploadData = new FormData();
        uploadData.append("name", newData.name);
        newData.img && uploadData.append("img", newData.img, newData.img.name);
        const res = await axios.post(adoptionUrlData, uploadData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${localStorage.localJWT}`,
            },
        });
        return res.data;
    });


export const dog_dataSlice = createSlice({
    name: "dog_data",
    initialState: {
        isLoadingData: false,
        openNewData: false,
        data: [
            {
                id: 0,
                name: "",
                company_Post: 0,
                img: "",
            },
        ],
    },
    reducers: {
        fetchDataStart(state) {
            state.isLoadingData = true;
        },
        fetchDataEnd(state) {
            state.isLoadingData = false;
        },
        setOpenNewData(state) {
            state.openNewData = true;
        },
        resetOpenNewData(state) {
            state.openNewData = false;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchAsyncGetData.fulfilled, (state, action) => {
            return {
                ...state, data: action.payload,
            };
        });
        builder.addCase(fetchAsyncNewData.fulfilled, (state, action) => {
            return {
                ...state, data: [...state.data, action.payload],
            };
        });
    },
});

export const {
    fetchDataStart, fetchDataEnd, setOpenNewData, resetOpenNewData
} = dog_dataSlice.actions;

export const selectIsLoadingData = (state: RootState) => state.dog_data.isLoadingData;
export const selectOpenNewData = (state: RootState) => state.dog_data.openNewData;
export const selectData = (state: RootState) => state.dog_data.data;

export default dog_dataSlice.reducer;
