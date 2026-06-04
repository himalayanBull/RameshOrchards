import { useState } from 'react';
import { supabase } from '../lib/supabase';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function useNewsletter(source = 'website') {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const subscribe = async (email: string) => {
    setStatus('loading');
    setErrorMessage('');

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl === 'https://placeholder.supabase.co') {
      setStatus('error');
      setErrorMessage('Newsletter service is not configured yet. Please try again later.');
      return;
    }

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email, source });

    if (error) {
      if (error.code === '23505') {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage('Something went wrong. Please try again.');
      }
      return;
    }

    setStatus('success');
  };

  return { status, errorMessage, subscribe };
}
