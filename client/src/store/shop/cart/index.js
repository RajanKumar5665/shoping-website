import apiClient from "@/lib/apiClient"
import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"


 

const intitialState = {
    cartItems : [],
    isLoading : false
}

export const addToCart = createAsyncThunk(
    'cart/addCartItem',
    async({ userId, productId, quantity })=>{
        //  console.log({ userId, productId, quantity });
         const response = await apiClient.post('/api/cart/add', {
            userId,
            productId,
            quantity
         });
         return response.data;
    }
)

export const fetchCartItem = createAsyncThunk(
    'cart/getCartItems',
    async(userId)=>{
         // API call to add item to cart
         const response = await apiClient.get(`/api/cart/get/${userId}`, {
         });
         return response.data;
    }
)

export const updateCartQuantity = createAsyncThunk(
  'cart/updateCartQuantity',
  async ({ userId, productId, quantity }) => {
        const response = await apiClient.put(
            '/api/cart/update-cart',
      { userId, productId, quantity }
    );
    return response.data;
  }
);


export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async({ userId, productId })=>{
         const response = await apiClient.delete(`/api/cart/${userId}/${productId}`);
         return response.data;
    }
)

const cartSlice = createSlice({
    name : 'Shoppingcart',
    initialState : intitialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(addToCart.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(addToCart.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.cartItems = action.payload.data;
            // console.log("Add to Cart Success:", action.payload);
        })
        .addCase(addToCart.rejected, (state) =>{
            state.isLoading = false;
            state.cartItems = [];
        })
        .addCase(fetchCartItem.pending, (state) =>{
            state.isLoading = true;
        }
        )
        .addCase(fetchCartItem.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.cartItems = action.payload.data;
        })
        .addCase(fetchCartItem.rejected, (state) =>{
            state.isLoading = false;
            state.cartItems = [];
        } )
        .addCase(updateCartQuantity.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(updateCartQuantity.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.cartItems = action.payload.data;
        })
        .addCase(updateCartQuantity.rejected, (state) =>{
            state.isLoading = false;
        })
        .addCase(deleteCartItem.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(deleteCartItem.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.cartItems = action.payload.data;
        })
        .addCase(deleteCartItem.rejected, (state) =>{
            state.isLoading = false;
        })
    }
})

            
export default cartSlice.reducer;