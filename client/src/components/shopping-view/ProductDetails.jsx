import React from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addToCart, fetchCartItem } from "@/store/shop/cart";
import { toast } from "sonner";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRating from "../common/StarRating";
import { addReview, getReviews } from "@/store/shop/review-slice";

const ProductDetails = ({ open, setOpen, productDetails }) => {
  const [reviewMsg, setReviewMsg] = React.useState("");
  const [rating, setRating] = React.useState(0);

  const details = productDetails?.data ?? productDetails;
  const {user} = useSelector((state) => state.auth);
  const {cartItems} = useSelector((state) => state.cartSlice);
  const { reviews } = useSelector((state) => state.shopReview);

  const dispatch = useDispatch();

  function handleRatingChange(getRating){
      setRating(getRating)
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    const userId = user?._id || user?.userId || user?.id;
    const getCartItems = cartItems?.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.error(`Only ${getQuantity} quantity can be added for this item`);
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success && userId) {
        dispatch(fetchCartItem(userId));
        toast.success("Item added to cart successfully!");
      }
    });
  }

  function handleAddReview() {
    const userId = user?._id || user?.userId || user?.id;
    if (!details?._id || !userId) return;

    dispatch(
      addReview({
        productId: details?._id,
        userId,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(details?._id));
        toast.success("Review added successfully!");
      } else {
        toast.error(
          data?.payload?.message ||
            data?.error?.message ||
            "You can only review products you have purchased."
        );
      }
    });
  }

function handleDialogClose(){
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  React.useEffect(() => {
    if (open && details?._id) {
      dispatch(getReviews(details._id));
    }
  }, [open, details?._id, dispatch]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + (reviewItem?.reviewValue || 0), 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 max-w-[92vw] sm:max-w-[72vw] lg:max-w-[58vw] max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">
          {details?.title ? `${details.title} details` : "Product details"}
        </DialogTitle>
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={details?.image}
            alt={details?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Details Section */}
        <div className="">

          <div>
            <h1 className="text-3xl font-extrabold">{details?.title ?? "Product"}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {details?.description ?? ""}
            </p>
          </div>

            {/* Price */}
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                details?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ₹{details?.price ?? "0"}
            </p>
            {details?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ₹{details?.salePrice}
              </p>
            ) : null}
          </div>

            {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRating rating={averageReview} />
            </div>
            <span className="text-muted-foreground">({averageReview.toFixed(2)})</span>
          </div>

            {/* Button */}
          <div className="mt-5 mb-5">
            {details?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(details?._id ?? details?.id, details?.totalStock)
                }
              >
                Add to Cart
              </Button>
            )}
          </div>

            <Separator />

            {/* Reviews */}
          <Separator />

          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>

              {reviews && reviews.length > 0 ? (
                <div className="grid gap-6">
                  {reviews.map((reviewItem) => (
                    <div
                      key={String(
                        reviewItem?._id || `${reviewItem?.userId}-${reviewItem?.createdAt}`
                      )}
                      className="flex gap-4"
                    >
                      <Avatar className="w-10 h-10 border">
                        <AvatarFallback>
                          {(reviewItem?.userName?.[0] || "U").toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">
                            {reviewItem?.userName || "User"}
                          </h3>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <StarRating rating={reviewItem?.reviewValue || 0} />
                        </div>
                        <p className="text-muted-foreground">
                          {reviewItem?.reviewMessage || ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <h1>No Reviews</h1>
              )}
            
            <div className="mt-10 flex-col flex gap-2">
              <Label>Write a review</Label>
              <div className="flex gap-1">
                <StarRating rating={rating} handleRatingChange={handleRatingChange} />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
                placeholder="Write a review..."
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === "" || rating === 0}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
