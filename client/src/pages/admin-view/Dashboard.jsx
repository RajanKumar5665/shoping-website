import ProductImageUpload from '@/components/admin-view/ProductImageUpload';
import { Button } from '@/components/ui/button';
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addFeatureImage, getFeatureImages } from '@/store/common-slice';
import { toast } from "sonner";



const Dashboard = () => {
  const [showUploader, setShowUploader] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);
  function handleUploadFeatureImage() {
    if (!uploadedImageUrl) {
      toast.error("Please upload an image first");
      return;
    }
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
        setShowUploader(false);
        toast.success("Feature image added");
      }
    });
  }
    
   useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Feature Images</h1>
        <Button
          variant={showUploader ? "outline" : "default"}
          onClick={() => setShowUploader((prev) => !prev)}
        >
          {showUploader ? "Cancel" : "Add Feature Image"}
        </Button>
      </div>

      {showUploader ? (
        <div className="space-y-4 rounded-lg border p-4">
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadImageUrl={uploadedImageUrl}
            setUploadImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isCustomStyling={true}
            // isEditMode={false}
          />
          <Button
            onClick={handleUploadFeatureImage}
            className="w-full"
            disabled={imageLoadingState}
          >
            {imageLoadingState ? "Uploading..." : "Save Feature Image"}
          </Button>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(featureImageList) && featureImageList.length > 0
          ? featureImageList
              .filter((item) => Boolean(item?.image))
              .map((featureImgItem) => (
                <div
                  key={featureImgItem?._id ?? featureImgItem?.image}
                  className="overflow-hidden rounded-lg border bg-white"
                >
                  <img
                    src={featureImgItem.image}
                    alt="Feature"
                    className="h-[220px] w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))
          : null}
      </div>
    </div>
  )
}

export default Dashboard
