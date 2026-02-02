import React, { useEffect, useMemo, useState } from "react";
import img from "../../assets/account.jpg";
import Address from "@/components/shopping-view/Address";
import CartItemContent from "@/components/shopping-view/CartItemContent";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import { createNewOrder, capturePayment } from "@/store/shop/order-slice";
import { toast } from 'sonner'


const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cartSlice);
  const { user } = useSelector((state) => state.auth);
 
  const {approvalURL} = useSelector((state) => state.orderSlice);

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);

  useEffect(() => {
    if (approvalURL) {
      window.location.href = approvalURL;
    }
  }, [approvalURL]);



  // Total amount calculate
   const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  // Main function: Create order on backend -> Open Razorpay -> On success -> capturePayment
  function handleInitiatePaypalPayment() {
    if (!cartItems?.items?.length) {
      toast("Your cart is empty. Please add items to proceed", {
        variant: "destructive",
      });
      return;
    }
    if (currentSelectedAddress === null) {
      toast("Please select an address to proceed", {
        variant: "destructive",
      });
      return;
    }

    setIsPaymentStart(true);
      const orderData = {
      userId: user?._id || user?.userId || user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "Rajan");
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
  }

  return (
    <div className="flex flex-col">
      <div>
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address 
        setCurrentSelectedAddress={setCurrentSelectedAddress} 
          selectedId={currentSelectedAddress}
        />

        <div className="flex flex-col gap-4">
          {cartItems?.items?.length
            ? cartItems.items.map((item) => (
                <CartItemContent
                  key={item?.productId || item?._id}
                  cartItem={item}
                />
              ))
            : null}

          <div className="mt-6 rounded-lg border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Total</span>
              <span className="text-sm font-bold">
                ${(totalCartAmount / 83).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-4 w-full">
            <Button
              onClick={handleInitiatePaypalPayment}
              className="w-full"
              disabled={isPaymentStart}
            >
              {isPaymentStart ? "Processing Paypal Payment..." : "Checkout With Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;