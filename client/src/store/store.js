import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductReducer from "./admin/product-slice";
import shopProductReducer from "./shop/products-slice";
import cartReducer from "./shop/cart";
import addressReducer from "./shop/address-slice";
import shoppingOrderSlice from "./shop/order-slice";
import adminOrderSlice from "./admin/order-slice";
import shopSearchSlice from "./shop/search-slice";
import shopReviewSlice from "./shop/review-slice";
import commonFeatureSlice from "./common-slice"



const store = configureStore({
    reducer:{
        auth: authReducer,
        adminProducts: adminProductReducer,
        shopProducts: shopProductReducer,
        cartSlice: cartReducer,
        address: addressReducer,
        orderSlice: shoppingOrderSlice,
        adminOrder: adminOrderSlice,
        shopSearch: shopSearchSlice,
        shopReview: shopReviewSlice,  
        commonFeature: commonFeatureSlice,  
    },
});

export default store;