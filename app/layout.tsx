import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meheret (@meherett)",
  description: "Specializing in secure, user-centric cryptocurrency solutions and decentralized infrastructure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#C0C0C0] text-black antialiased">
        {/* Splash screen — inline styles only, so it renders correctly even
            before the stylesheet loads, masking any unstyled flash. */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
#splash{position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;background:#C0C0C0;font-family:"Courier New",Courier,monospace;transition:opacity .3s}
#splash .splash-box{width:48px;height:48px;border:4px solid #000;background:#FFCC00;box-shadow:4px 4px 0 #000;animation:splash-spin 1.2s steps(8) infinite}
@keyframes splash-spin{to{transform:rotate(360deg)}}
html.splash-done #splash{opacity:0;visibility:hidden;pointer-events:none;transition:opacity .3s,visibility 0s .35s}
`,
          }}
        />
        <div id="splash" aria-hidden>
          <div className="splash-box" />
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  function done(){document.documentElement.classList.add("splash-done")}
  if(document.readyState==="complete"){done()}
  else{window.addEventListener("load",done)}
  setTimeout(done,5000);
})();
`,
          }}
        />
        {children}
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-F1X0M5FYSG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-F1X0M5FYSG');
          `}
        </Script>
      </body>
    </html>
  );
}
