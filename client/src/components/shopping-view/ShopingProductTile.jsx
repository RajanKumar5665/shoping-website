import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { categoryOptionsMap, brandOptionsMap } from "@/config";

const ShopingProductTile = ({ 
  product, 
  handleGetProductDetails,
  handleAddToCart
 }) => {



  return (
    <Card className="group w-full overflow-hidden rounded-xl border bg-background shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-xl">
      {/* Image Section */}
      <div onClick={() => handleGetProductDetails(product?._id)}>
      <div className="relative overflow-hidden">
        <img
          src={product?.image}
          alt={product?.title}
          className="h-[240px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {product?.totalStock === 0 ? (
            <Badge className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute left-3 top-3 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-amber-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
      </div>

      {/* Content */}
    <CardContent className="p-4 space-y-2">
          <h2 className="line-clamp-1 text-base font-semibold tracking-tight">
            {product?.title}
          </h2>
          <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
            <span className="line-clamp-1">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="line-clamp-1">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex items-end justify-between">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-sm font-semibold ${
                product?.salePrice > 0 ? "text-muted-foreground" : "text-foreground"
              }`}
            >
              ₹{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-base font-bold text-primary">
                ₹{product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
        {/* Footer */}
     <CardFooter className="p-4 pt-0">
        {product?.totalStock === 0 ? (
          <Button className="w-full cursor-not-allowed opacity-60" variant="secondary">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddToCart(product?._id, product?.totalStock)}
            className="w-full font-semibold"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShopingProductTile;
