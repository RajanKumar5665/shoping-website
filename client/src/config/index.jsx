export const regsiterFormControls = [
  {
    name: "userName",
    type: "text",
    placeholder: "Enter your username",
    label: "User Name",
    componentType: "input",
  },

  {
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    componentType: "input",
  },

  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    componentType: "input",
  },
];

export const loginFormControls = [
  {
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    componentType: "input",
  },

  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    componentType: "input",
  },
];

export const addProductFormControls = [
  {
    label: "Title",
    name: "title",
    type: "text",
    placeholder: "Enter product title",
    componentType: "input",
  },
  {
    label: "Description",
    name: "description",
    placeholder: "Enter product description",
    componentType: "textarea",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "reebok", label: "Reebok" },
      { id: "fila", label: "Fila" },
      { id: "Zara", label: "Zara" },
      { id: "H&M", label: "H&M" },
      { id: "Uniqlo", label: "Uniqlo" },
      { id: "Gucci", label: "Gucci" },
      { id: "Prada", label: "Prada" },
      { id: "Louis Vuitton", label: "Louis Vuitton" },
      { id: "Chanel", label: "Chanel" },
      { id: "Hermes", label: "Hermes" },
      { id: "Rolex", label: "Rolex" },
      { id: "Omega", label: "Omega" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sales Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter product sale price (optional)",
  },
  {
    label: "Stock Quantity",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter stock quantity",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },

  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },

  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },

  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },

  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },
   
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  }
];

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  reebok: "Reebok",
  fila: "Fila",
  Zara: "Zara",
  "H&M": "H&M",
  Uniqlo: "Uniqlo",
  Gucci: "Gucci",
  Prada: "Prada",
  "Louis Vuitton": "Louis Vuitton",
  Chanel: "Chanel",
  Hermes: "Hermes",
  Rolex: "Rolex",
  Omega: "Omega",
};

export const FilterOptions = {
  categories: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brands: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "reebok", label: "Reebok" },
    { id: "fila", label: "Fila" },
    { id: "Zara", label: "Zara" },
    { id: "H&M", label: "H&M" },
    { id: "Uniqlo", label: "Uniqlo" },
    { id: "Gucci", label: "Gucci" },
    { id: "Prada", label: "Prada" },
    { id: "Louis Vuitton", label: "Louis Vuitton" },
    { id: "Chanel", label: "Chanel" },
    { id: "Hermes", label: "Hermes" },
    { id: "Rolex", label: "Rolex" },
    { id: "Omega", label: "Omega" },
  ],
};

export const sortOptions = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "title: A to Z", value: "title-asc" },
  { label: "title: Z to A", value: "title-desc" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
