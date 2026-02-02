import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import CartItemContent from "./CartItemContent";
import { useNavigate } from "react-router-dom";

const CartWrapper = ({ cartItems, setOpenCartSheet }) => {
     const totalCartAmout = cartItems && cartItems.length > 0 ? cartItems.reduce((sum, currentItem) => sum + (currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price ) * (currentItem?.quantity || 0), 0) : 0;

     const navigate = useNavigate();


  return (
    <SheetContent className="sm:max-w-md p-0">
      <div className="p-6">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
      </div>

      <div className="px-6 pb-6">
        <div className="space-y-3">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (
              <CartItemContent
                key={String(item?.productId || item?._id)}
                cartItem={item}
              />
            ))
          : (
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
          )}
        </div>

        <div className="mt-6 rounded-lg border bg-muted/30 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Total</span>
            <span className="text-sm font-bold">₹{totalCartAmout.toFixed(2)}</span>
          </div>
        </div>

        <Button onClick={() => {
          navigate('/shop/checkout');
            setOpenCartSheet(false);
        }}
         className="w-full mt-4">Checkout</Button>
      </div>
    </SheetContent>
  );
};

export default CartWrapper;
