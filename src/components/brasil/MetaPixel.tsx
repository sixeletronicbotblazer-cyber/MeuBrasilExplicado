"use client";

import Script from "next/script";

export const META_PIXEL_ID = "900080772936894";

/**
 * Dispara um evento do Meta Pixel com segurança (no-op se o SDK ainda
 * não carregou ou se está em ambiente sem window). Usado nos CTAs de checkout.
 */
export function trackFbq(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq === "function") {
    if (params) fbq("track", event, params);
    else fbq("track", event);
  }
}

/**
 * Pixel base do Meta (Facebook). Carrega o fbevents.js, inicializa a conta
 * e dispara PageView. Inclui o fallback <noscript> com a imagem de tracking.
 */
export function MetaPixel() {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        <img
          height={1}
          width={1}
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
