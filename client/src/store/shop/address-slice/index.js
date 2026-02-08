import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import apiClient from "@/lib/apiClient"

const initialState = {
    isLoading: false,
    addressList: [],
}

export const addNewAddress = createAsyncThunk(
    "address/addNewAddress",
    async(formData) =>{
   const response = await apiClient.post("/api/addresses/add", formData)
         return response.data;
    }
);

export const fetchAllAddresses = createAsyncThunk(
     "addresses/fetchAllAddresses",
     async(userId) =>{
    const response = await apiClient.get(`/api/addresses/get/${userId}`);
          return response.data;
     }
);


export const editaAddress = createAsyncThunk(
     "/addresses/editAddress",
     async({userId, addressId, formData}) =>{
           const response = await apiClient.put(
  `/api/addresses/update/${userId}/${addressId}`,
      formData
    );

    return response.data;
     }
)

export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await apiClient.delete(
      `/api/addresses/delete/${userId}/${addressId}`
    );

    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
        // console.log("Fetched Addresses: ", action.payload.data);
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;