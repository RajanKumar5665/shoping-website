import React from "react";
import { Button } from "../ui/button";
import { Minus, Trash } from "lucide-react";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "@/store/shop/cart";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { updateCartQuantity } from "@/store/shop/cart";





const CartItemContent = ({ cartItem }) => {
  const {user} = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cartSlice?.cartItems);
  const productList = useSelector((state) => state.shopProducts?.productList ?? []);
  const dispatch = useDispatch();
    function handleUpdateQuantity(getCartItem, typeOfAction) {
      const userId = user?._id || user?.userId || user?.id;

      if (typeOfAction === "minus") {
        const nextQuantity = (getCartItem?.quantity || 0) - 1;
        if (nextQuantity <= 0) {
          handleCartItemDelete(getCartItem);
          return;
        }
      }

      if (typeOfAction == "plus") {
      let getCartItems = cartItems?.items ?? [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList?.[getCurrentProductIndex]?.totalStock;

        console.log(getCurrentProductIndex, getTotalStock, "getTotalStock");

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (typeof getTotalStock === "number" && getQuantity + 1 > getTotalStock) {
            toast.error(`Only ${getQuantity} quantity can be added for this item`);

            return;
          }
        }
      }
    }

      dispatch(updateCartQuantity({
          userId: userId,
          productId: getCartItem?.productId,
          quantity: getCartItem?.quantity + (typeOfAction === 'plus' ? 1 : -1),
      })).then((data) => {
          if(data?.payload?.success){
             toast.success("Cart updated successfully!");
          }
      });
    }

   function handleCartItemDelete(getCartItem) {
      const userId = user?._id || user?.userId || user?.id;
       dispatch(deleteCartItem({
           userId: userId,
           productId: getCartItem?.productId,
       })).then((data) => {
           if(data?.payload?.success){
              toast.success("Item removed from cart!");
           }
       });
   }
  return (
    <div className="flex gap-4 rounded-lg border bg-background p-3 shadow-sm">
      <img
        className="h-20 w-20 shrink-0 rounded-md object-cover border"
        src={cartItem?.image}
        alt={cartItem?.title}
      />
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold leading-snug truncate">{cartItem?.title}</h3>
        <div className="mt-2 flex items-center gap-2">
          <Button
            className="h-8 w-8 rounded-full"
            variant="outline"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, 'minus')}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="w-8 text-center text-sm font-semibold">{cartItem?.quantity}</span>
          <Button
            className="h-8 w-8 rounded-full"
            variant="outline"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, 'plus')}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <p className="text-sm font-semibold">
          ₹
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={() => handleCartItemDelete(cartItem)}
        >
          <Trash className="h-4 w-4" />
          <span className="sr-only">Remove item</span>
        </Button>
      </div>
    </div>
  );
};

export default CartItemContent;
