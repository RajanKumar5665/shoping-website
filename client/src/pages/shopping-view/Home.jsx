import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { ChevronRightIcon } from "lucide-react";
import { CloudLightning } from "lucide-react";
import { ShirtIcon } from "lucide-react";
import { BabyIcon } from "lucide-react";
import { WatchIcon } from "lucide-react";
import { UmbrellaIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShopingProductTile from "@/components/shopping-view/ShopingProductTile";
import { Briefcase, Crown, Gem, Shirt, ShoppingBag, Watch } from "lucide-react";
import { Footprints } from "lucide-react";
import ProductDetails from "@/components/shopping-view/ProductDetails";
import { fetchProductsDetails } from "@/store/shop/products-slice";
import { addToCart, fetchCartItem } from "@/store/shop/cart";
import { toast } from "sonner";
import { getFeatureImages } from "@/store/common-slice";



const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brands = [
  { id: "nike", label: "Nike", icon: Footprints },
  { id: "adidas", label: "Adidas", icon: Footprints },
  { id: "puma", label: "Puma", icon: Footprints },
  { id: "reebok", label: "Reebok", icon: Footprints },
  { id: "fila", label: "Fila", icon: Footprints },

  { id: "Zara", label: "Zara", icon: Shirt },
  { id: "H&M", label: "H&M", icon: Shirt },
  { id: "Uniqlo", label: "Uniqlo", icon: Shirt },

  { id: "Gucci", label: "Gucci", icon: ShoppingBag },
  { id: "Prada", label: "Prada", icon: Briefcase },
  { id: "Hermes", label: "Hermes", icon: Gem },

  { id: "Rolex", label: "Rolex", icon: Watch },
];

const safeFeatureImages = (list) =>
  Array.isArray(list) ? list.filter((item) => Boolean(item?.image)) : [];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const products = Array.isArray(productList)
    ? productList
    : (productList?.data ?? []);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const featureImages = safeFeatureImages(featureImageList);

 

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("appliedFilters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("appliedFilters", JSON.stringify(currentFilter));
    const queryString = new URLSearchParams({
      [section]: getCurrentItem.id,
    }).toString();
    navigate(`/shop/listing?${queryString}`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductsDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
     dispatch(
      addToCart({
        userId: user?._id || user?.userId || user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItem(user?._id || user?.userId || user?.id));
        toast.success("Item added to cart successfully!");
      } 
    });
  }

  useEffect(() => {
    if (featureImages.length <= 1) {
      setCurrentSlide(0);
      return;
    }

    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [featureImages.length]);
  useEffect(() =>{
     dispatch(fetchAllFilteredProducts({filterParams: {}, sortParams: 'price-asc'}));
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
     dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImages.length > 0 ? featureImages.map((slide, index) => (
          <img
            src={slide?.image}
            key={index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        )) : null}

        {featureImages.length > 1 ? (
          <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImages.length) % featureImages.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        ) : null}
        {featureImages.length > 1 ? (
          <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImages.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
        ) : null}
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "categories")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brands.map((brandItem) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brands")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
        <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length > 0
              ? products.map((productItem) => (
                  <ShopingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    key={productItem?._id ?? productItem?.id ?? productItem?.title}
                    product={productItem}
                    handleAddToCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
       />
    </div>
  );
};

export default Home;
