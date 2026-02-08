import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "@/lib/apiClient";


const initialState = {
      isLoading: false,
      featureImageList: [],
}

export const addFeatureImage = createAsyncThunk(
    "/order/addFeatureImage",
    async(image, {rejectWithValue }) =>{
         try {
   const response = await apiClient.post(`/api/features/add`, { image });
             return response.data;
         } catch (error) {
            return rejectWithValue(error?.response?.data);
         }
    }
)

export const getFeatureImages = createAsyncThunk(
    "/features/getFeatureImages",
    async (_, {rejectWithValue}) => {
           try {
                const response = await apiClient.get(`/api/features/`);
                return response.data;
           } catch (error) {
             return rejectWithValue(error?.response?.data);
           }
    }
);


const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});

export default commonSlice.reducer;
