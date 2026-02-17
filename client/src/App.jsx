import React, { useEffect } from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import Dashboard from './pages/admin-view/Dashboard.jsx'
import Features from './pages/admin-view/Features.jsx'
import Products from './pages/admin-view/Products.jsx'
import Orders from './pages/admin-view/Orders.jsx'
import Notfound from './pages/not-found/Notfound.jsx'
import ShopingLayout from './components/shopping-view/ShopingLayout.jsx'
import Account from './pages/shopping-view/Account.jsx'
import Checkout from './pages/shopping-view/Checkout.jsx'
import ListingPage from './pages/shopping-view/ListingPage.jsx'
import CheckAuth from './components/common/CheckAuth.jsx'
import UnauthPage from './pages/unauth-page/UnauthPage.jsx' 
import AuthLayout from './components/auth/AuthLayout.jsx'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/shopping-view/Home.jsx'
import AdminLayout from './components/admin-view/AdminLayout.jsx'
import { checkAuth } from './store/auth-slice/index.js'
import { Skeleton } from './components/ui/skeleton.jsx'
import PaypalReturn from './pages/shopping-view/PaypalReturn.jsx'
import PaymentSuccess from './pages/shopping-view/PaymentSuccess.jsx'
import SearchProducts from './pages/shopping-view/SearchProducts.jsx'






const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Show login page immediately if not authenticated and not on login/register
  const pathname = window.location.pathname;
  const isAuthPage = pathname.includes('/auth/login') || pathname.includes('/auth/register');
  if (!isAuthenticated && !isAuthPage) {
    window.location.href = '/auth/login';
    return null;
  }

  // Only check auth if not on login/register and not already authenticated
  useEffect(() => {
    if (!isAuthPage && !isAuthenticated) {
      dispatch(checkAuth());
    }
  }, [dispatch, isAuthPage, isAuthenticated]);

  if (isLoading && !isAuthPage) {
    return <Skeleton className="h-[600px] w-[800px] bg-black" />;
  }

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      {/* common components */}
      <Routes>
        <Route path="/" element={
           <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout/>
           </CheckAuth>
        }/>
        <Route path="/auth" element={
           <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout/>
           </CheckAuth>
        }>
         <Route path="login" element={<Login/>}/>
         <Route path="register" element={<Register/>}/>
        </Route>
        <Route path="/admin" element={
           <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout/>
           </CheckAuth>
        }>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="products" element={<Products/>}/>
          <Route path="orders" element={<Orders/>}/>
          <Route path="features" element={<Features/>}/>
        </Route>
        <Route path='/shop' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShopingLayout/>
            </CheckAuth>
        }>
          <Route path='home' element={<Home/>}/>
         <Route path='account' element={<Account/>}/>
         <Route path='checkout' element={<Checkout/>}/>
         <Route path='listing' element={<ListingPage/>}/>
         <Route path='paypal-return' element={<PaypalReturn/>}/>
          <Route path='payment-success' element={<PaymentSuccess/>}/>
          <Route path='/shop/search' element={<SearchProducts/>}/>
        </Route>
        <Route path='/unauth-page' element={<UnauthPage/>} />
         <Route path='*'  element={<Notfound/>} />
      </Routes>
    </div>
  )
}

export default App
