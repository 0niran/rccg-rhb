"use client";

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ReactNode } from 'react';

interface ReCAPTCHAProviderProps {
  children: ReactNode;
}

const ReCAPTCHAProvider: React.FC<ReCAPTCHAProviderProps> = ({ children }) => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    console.warn('reCAPTCHA v3 site key not configured');
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};

export default ReCAPTCHAProvider;