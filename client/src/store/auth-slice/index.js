import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import apiClient from "@/lib/apiClient"



const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null
}

export const regsiterUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        "/api/auth/register",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Server error"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        "/api/auth/login",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Server error"
      );
    }
  }
);  


export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Server error"
      );
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkauth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(
        "/api/auth/check-auth",
        {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate, proxy-revalidate",
            Expires: "0",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server error");
    }
  }
);




const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser:(state, action) =>{}
    },
    extraReducers: (builder) =>{
        builder
             //register logic
        .addCase(regsiterUser.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(regsiterUser.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = false;
        })
        .addCase(regsiterUser.rejected, (state, action) =>{
            state.isLoading = false;
              state.user = null;
            state.isAuthenticated = false;
        })   
         //login logic   
        .addCase(loginUser.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) =>{
              // console.log(action);
            state.isLoading = false;
            state.user = action.payload.success? action.payload.user : null;
            state.isAuthenticated = action.payload.success
        })
        .addCase(loginUser.rejected, (state, action) =>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
      })
        //chekc auth logic
      .addCase(checkAuth.pending, (state) =>{
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) =>{
        // console.log(action);
        state.isLoading = false;
        state.user = action.payload.success? action.payload.user : null;
        state.isAuthenticated = action.payload.success
      })
      .addCase(checkAuth.rejected, (state, action) =>{
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
       // logout logic
      .addCase(logoutUser.pending, (state) =>{
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) =>{
        // console.log(action);
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) =>{
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
    },
})

export const {setUser} = authSlice.actions;
export default authSlice.reducer