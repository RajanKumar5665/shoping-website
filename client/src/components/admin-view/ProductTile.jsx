import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const ProductTile = ({ 
    product, 
    setFormData,
    setOpenCreateProductDialog, 
    setCurrentEditProductId,
    handleDelete
 }) => {
  return (
    <>
      <Card className="w-full max-w-sm mx-auto overflow-hidden border border-border/60 bg-background shadow-sm transition-shadow hover:shadow-md">
        <div>
          <div className="relative">
            <img
              src={product?.image}
              alt={product?.title}
              className="h-[220px] w-full object-cover"
            />
          </div>
          <CardContent className="p-4">
            <h2 className="line-clamp-2 text-base font-semibold leading-snug">
              {product?.title}
            </h2>
            <div className="mt-2 flex items-center justify-between">
              <span
                className={`${
                  product?.salePrice > 0 ? "line-through" : ""
                } text-sm font-medium text-muted-foreground`}
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
          <CardFooter className="flex items-center justify-between gap-2 border-t bg-muted/30 p-3">
            <Button
              variant="outline"
              onClick={() => {
                setFormData(product);
                setCurrentEditProductId(product._id);
                setOpenCreateProductDialog(true);
              }}
            >
              Edit
            </Button>
            <Button variant="destructive" onClick={() => handleDelete(product?._id)}>
              Delete
            </Button>
          </CardFooter>
        </div>
      </Card>
    </>
  );
};

export default ProductTile;
