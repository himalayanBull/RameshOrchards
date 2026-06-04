import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { ToastProvider } from './contexts/ToastContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import TrackYourTreePage from './pages/TrackYourTreePage';
import OurOrchardPage from './pages/OurOrchardPage';
import FarmJournalPage from './pages/FarmJournalPage';
import BlogPostPage from './pages/BlogPostPage';
import VisitPage from './pages/VisitPage';
import CorporateGiftingPage from './pages/CorporateGiftingPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  return (
    <HelmetProvider>
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
                <Route path="/track-your-tree" element={<TrackYourTreePage />} />
                <Route path="/our-orchard" element={<OurOrchardPage />} />
                <Route path="/farm-journal" element={<FarmJournalPage />} />
                <Route path="/farm-journal/:slug" element={<BlogPostPage />} />
                <Route path="/visit" element={<VisitPage />} />
                <Route path="/corporate-gifting" element={<CorporateGiftingPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
              </Route>
            </Routes>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </HelmetProvider>
  );
}

export default App;
