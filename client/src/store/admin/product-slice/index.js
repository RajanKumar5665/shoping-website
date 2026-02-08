import apiClient from "@/lib/apiClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";





const initialState = {
    isLoading : false,
    productList : []
}

export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        "/api/product/add",
        formData,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);


export const fetchAllProduct = createAsyncThunk(
  "products/fetchAllProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(
        "/api/product/getAll",
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);


export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(
        `/api/product/update/${id}`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);


export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(
        `/api/product/delete/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);






const adminProductSlice = createSlice({
    name:"adminProducts",
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
       builder.addCase(fetchAllProduct.pending, (state) =>{
            state.isLoading = true;
         }).addCase(fetchAllProduct.fulfilled, (state, action) =>{
            // console.log(action.payload);
            state.isLoading = false;
            state.productList = action.payload?.data || [];
         }).addCase(fetchAllProduct.rejected, (state) =>{
            state.isLoading = false;
            state.productList = [];
         });  
    }
})

export default adminProductSlice.reducer;