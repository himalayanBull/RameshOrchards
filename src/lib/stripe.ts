import { loadStripe } from '@stripe/stripe-js';

// Fallback for development when Stripe isn't configured yet
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder';

export const stripePromise = loadStripe(stripePublishableKey);