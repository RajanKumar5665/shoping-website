import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLoading : false,
    productList : [],
    productDetails: null,
}

export const fetchAllFilteredProducts = createAsyncThunk(
    'shopProducts/fetchAllFilteredProducts',
    async ({filterParams, sortParams}) => {
        // console.log(fetchAllFilteredProducts, "Thunk called");
        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams,
        });
        const response = await axios(`/api/shop/get-products?${query.toString()}`, {
            withCredentials: true,
        });
        return response.data;
    }
);

export const fetchProductsDetails = createAsyncThunk(
    'shopProducts/fetchProductsDetails',
    async (id) => {
        // console.log(fetchAllFilteredProducts, "Thunk called");
        const response = await axios(`/api/shop/get-products/${id}`, {
            withCredentials: true,
        });
        console.log(response);
        return response.data;
    }
);




export const shopProductSlice = createSlice({
    name: 'shopProducts',
    initialState,
    reducers: {
        setProductDetails: (state) => {
            state.productDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllFilteredProducts.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
            //  console.log("Fetched Products:", action.payload);
            state.isLoading = false;
            const list = action.payload?.data ?? action.payload;
            state.productList = Array.isArray(list) ? list : [];
        })
        .addCase(fetchAllFilteredProducts.rejected, (state) => {
            state.isLoading = false;
            state.productList = [];
        });
        builder
        .addCase(fetchProductsDetails.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchProductsDetails.fulfilled, (state, action) => {
            //  console.log("Fetched Products:", action.payload);
            state.isLoading = false;
            state.productDetails = action.payload;
        })
        .addCase(fetchProductsDetails.rejected, (state) => {
            state.isLoading = false;
            state.productDetails = null;
        });
    }   
});

export const { setProductDetails } = shopProductSlice.actions;
export default shopProductSlice.reducer;