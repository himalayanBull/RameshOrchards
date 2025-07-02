# RameshOrchards - Premium Fresh Fruits E-commerce Platform

A modern, responsive e-commerce platform for RameshOrchards, featuring secure payment processing, order management, and real-time order tracking.

## 🌟 Features

### 🛒 E-commerce Functionality
- **Product Catalog**: 18+ premium fruit varieties across 4 categories
- **Shopping Cart**: Dynamic cart with package size selection
- **Guest Checkout**: No account required for purchases
- **Responsive Design**: Mobile-first approach for all devices

### 💳 Payment Processing
- **Stripe Integration**: Secure, PCI-compliant payment processing
- **Multiple Package Sizes**: 5kg, 10kg, and 20kg options
- **Real-time Pricing**: Dynamic price calculation in INR
- **Payment Security**: Industry-standard encryption

### 📦 Order Management
- **Invoice Generation**: Automatic invoice numbers after payment
- **Order Tracking**: Secure tracking with dual verification
- **Status Updates**: Real-time order status progression
- **Email Confirmations**: Automatic order confirmation emails

### 🔒 Security Features
- **Secure Checkout**: Stripe-hosted payment pages
- **Order Privacy**: Phone + invoice verification for tracking
- **Data Protection**: Row Level Security (RLS) policies
- **Input Validation**: Comprehensive form validation

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling

### Backend
- **Supabase** for database and authentication
- **Supabase Edge Functions** for serverless API
- **PostgreSQL** with Row Level Security

### Payment & Services
- **Stripe** for payment processing
- **Stripe Webhooks** for order automation
- **Email Integration** ready (Resend/SendGrid)

## 📱 Product Catalog

### 🍎 Apple Varieties (8)
- Royal Delicious, Red Delicious, Golden Delicious
- Granny Smith, Red Gold, Tydeman's Early Worcester
- King Rot, Vance Delicious

### 🍑 Plum Varieties (4)
- Santa Rosa, Red Beaut, Black Amber, Angeleno

### 🍐 Pear Varieties (4)
- Moti Dandi, Packham's Triumph, Tumba, Carmen

### 🍒 Cherry Varieties (2)
- Dear Nero, Stella

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Stripe account

### Environment Variables
Create a `.env` file with:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd rameshorchards

# Install dependencies
npm install

# Start development server
npm run dev
```

### Database Setup
1. Connect to Supabase using the "Connect to Supabase" button
2. Run the provided migrations to set up order tables
3. Configure Stripe webhook endpoint in Stripe dashboard

### Stripe Configuration
1. Add your Stripe keys to environment variables
2. Set up webhook endpoint: `your-domain/functions/v1/stripe-webhook`
3. Configure webhook events: `checkout.session.completed`, `checkout.session.expired`

## 🔄 Order Flow

### Customer Journey
1. **Browse Products** → Select fruits and package sizes
2. **Add to Cart** → Review order and quantities
3. **Checkout** → Enter delivery details
4. **Payment** → Secure Stripe payment processing
5. **Confirmation** → Receive invoice number and email
6. **Tracking** → Track order with invoice + phone number

### Order Status Progression
- **Pending** → Order created, payment processing
- **Processing** → Payment confirmed, preparing order
- **Shipped** → Order dispatched with delivery partner
- **Out for Delivery** → Order out for final delivery
- **Delivered** → Order successfully delivered

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
├── contexts/           # React contexts (Cart, Auth)
├── data/              # Product data and configurations
├── lib/               # Utility libraries (Supabase, Stripe)
├── types/             # TypeScript type definitions
└── main.tsx           # Application entry point

supabase/
├── functions/         # Edge functions for API
└── migrations/        # Database schema migrations
```

### Key Components
- **CheckoutModal**: Complete payment flow with Stripe integration
- **OrderTrackingModal**: Secure order tracking with verification
- **ProductCard**: Dynamic product display with pricing
- **Cart**: Shopping cart with package size management

## 🚀 Deployment

### Production Checklist
- [ ] Configure production Supabase project
- [ ] Set up production Stripe account
- [ ] Configure email service (Resend recommended)
- [ ] Set up custom domain with SSL
- [ ] Test complete order flow
- [ ] Configure webhook endpoints

### Recommended Hosting
- **Frontend**: Netlify, Vercel, or similar
- **Database**: Supabase (managed PostgreSQL)
- **Functions**: Supabase Edge Functions
- **Email**: Resend, SendGrid, or similar

## 📞 Support

For technical support or business inquiries:
- **Email**: hello@rameshorchards.com
- **Phone**: +91 98765 43210
- **Address**: NagJubbar, Matiana, Theog, Shimla, HP 171212

## 📄 License

This project is proprietary software for RameshOrchards.

---

**Built with ❤️ for RameshOrchards - Four decades of premium fruit excellence since 1984**