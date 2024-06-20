import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorPage, LandingPage, LoginPage, ProtectedRoute } from './pages'
import {
  CustomersPage,
  MainDashboard,
  OrderPage,
  ProductsPage,
  ReportingAndAnalyticsPage,
  ReviewsPage,
  SettingsPage,
  SharedLayout,
  UsersAndPromotionPage,
  AddProductPage,
} from './pages/dashboard'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<MainDashboard />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="new-product" element={<AddProductPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="orders" element={<OrderPage />} />
            <Route path="users" element={<UsersAndPromotionPage />} />
            <Route path="report" element={<ReportingAndAnalyticsPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="landing" element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </>
  )
}

export default App
