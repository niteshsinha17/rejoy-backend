"use client";

import Script from "next/script";

const GaProvider = () => {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-8BWBGYX6S0"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-8BWBGYX6S0');
        `}
      </Script>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-11138323301"
      />
      <Script id="google-add" strategy="afterInteractive">
        {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-11138323301');
              `}
      </Script>
    </>
  );
};

export default GaProvider;
