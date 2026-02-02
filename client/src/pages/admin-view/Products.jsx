import ProductImageUpload from "@/components/admin-view/ProductImageUpload";
import CommonForm from "@/components/common/CommonForm";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormControls } from "@/config";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, fetchAllProduct } from "@/store/admin/product-slice";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import ProductTile from "@/components/admin-view/ProductTile";
import { updateProduct } from "@/store/admin/product-slice";
import { deleteProduct } from "@/store/admin/product-slice";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const Products = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditProductId, setCurrentEditProductId] = useState(null);
  const { productList } = useSelector((state) => state.adminProducts);


  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();
      
    currentEditProductId !== null ?
     dispatch(updateProduct({
        id: currentEditProductId,
        formData
     })).then((data) => {
          console.log(data, "Edit");
        if (data?.payload?.success) {
          toast.success(data?.payload?.message || "Product updated successfully");
          dispatch(fetchAllProduct());
          setOpenCreateProductDialog(false);
          setCurrentEditProductId(null);
          setFormData(initialFormData);
        } else {
          toast.error(
            data?.payload?.message ||
              data?.error?.message ||
              "Unable to update product"
          );
        }
      })
     : dispatch(
      addNewProduct({
        ...formData,
        image: uploadImageUrl,
      })
    ).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast.success(data?.payload?.message || "Product added successfully");
        dispatch(fetchAllProduct());
        setOpenCreateProductDialog(false);
        setImageFile(null);
        setFormData(initialFormData);
      } else {
        toast.error(
          data?.payload?.message || data?.error?.message || "Unable to add product"
        );
      }
    });
  }


  function isformValid() {
        return Object.keys(formData)
        .map((key) => formData[key] !==  "")
        .every((item) => item);
  }

  function handleDelete(getCurrentProductId) {
    // Dispatch delete action
    //  console.log("Delete", getCurrentProductId);
     dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message || "Product deleted");
        dispatch(fetchAllProduct());
      } else {
        toast.error(
          data?.payload?.message || data?.error?.message || "Unable to delete product"
        );
      }
    });
  }


  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);

  //  console.log(formData, "formData");
  // console.log(productList, "productList");

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button
          onClick={() => setOpenCreateProductDialog(true)}
          className="rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <ProductTile
                setFormData={setFormData}
                setOpenCreateProductDialog={setOpenCreateProductDialog}
                setCurrentEditProductId={setCurrentEditProductId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Toaster position="top-right" richColors />
      <div>
        <Sheet
          open={openCreateProductDialog}
           onOpenChange={() =>{
              setOpenCreateProductDialog(false);
              setCurrentEditProductId(null);
              setFormData(initialFormData);
           }}
          
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>{currentEditProductId !== null ? "Edit Product" : "Add New Product"}</SheetTitle>
            </SheetHeader>
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadImageUrl={uploadImageUrl}
              setUploadImageUrl={setUploadImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              isEditMode={currentEditProductId !== null}
            />
            <div className="py-6">
              <CommonForm
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditProductId !== null ? "Update" : "Add"}
                formControls={addProductFormControls}
                isBtnDisabled={ !isformValid()}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  );
};

export default Products;
