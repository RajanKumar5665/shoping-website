import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/CommonForm";
import { addressFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addNewAddress } from "@/store/shop/address-slice";
import { fetchAllAddresses } from "@/store/shop/address-slice";
import { editaAddress } from "@/store/shop/address-slice";
import { deleteAddress } from "@/store/shop/address-slice";
import { toast } from "sonner";
import AddressCard from "./AddressCard";

const initialAddressFormData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};

const Address = ({setCurrentSelectedAddress, selectedId}) => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id || user?.userId || user?.id;
  // console.log("User Info: ", user.userId);
  const { addressList } = useSelector((state) => state.address);
  // console.log("Address List from Store: ", addressList);

  function handleManageAddress(event) {
    event.preventDefault();

       if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast.error("You can add max 3 addresses");

      return;
    }
   currentEditedId !== null
      ? dispatch(
          editaAddress({
            userId: userId,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(userId));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast.success("Address updated successfully");
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: userId,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(userId));
            setFormData(initialAddressFormData);
            toast.success("Address added successfully");
          }
        });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(userId));
        toast.success("Address deleted successfully");
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    if (!userId) return;
    dispatch(fetchAllAddresses(userId));
  }, [dispatch, userId]);

  // console.log(addressList);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-2 sm:grid-cols-3  gap-2">
         {addressList && addressList.length > 0
           ? addressList.map((singleAddressItem) => (
               <AddressCard
                 key={singleAddressItem?._id}
                 addressInfo={singleAddressItem}
                 handleEditAddress={handleEditAddress}
                 handleDeleteAddress={handleDeleteAddress}
                  setCurrentSelectedAddress={setCurrentSelectedAddress}
                  selectedId={selectedId}
               />
             ))
           : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
