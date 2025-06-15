import { supabase } from '../lib/supabaseClient';
import { Results } from '../types';

export const sendReportEmail = async (
  email: string,
  firstName: string,
  results: Results,
  pdfBuffer: Uint8Array
) => {
  try {
    console.log('Converting PDF to base64...');
    // Convert PDF buffer to base64
    const pdfBase64 = btoa(String.fromCharCode.apply(null, Array.from(pdfBuffer)));

    console.log('Calling Supabase Edge Function...');
    // Call Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        email,
        firstName,
        pdfBase64
      }
    });

    if (error) {
      console.error('Error calling send-email function:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('Email sent successfully via Edge Function');
    return true;
  } catch (error: any) {
    console.error('Error sending email:', error);
    throw new Error(error.message || 'Failed to send email. Please try again later.');
  }
}; 