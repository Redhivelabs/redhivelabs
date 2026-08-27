"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ServicePackageCard from "./ServicePackageCard.js";

export default function ServicePackagesGrid({ packages }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        currency: "USD",
      }}
    >
      <div className="mx-auto mt-16 grid max-w-6xl items-stretch gap-8 sm:mt-20 sm:grid-cols-3 sm:gap-6">
        {packages.map(function (pkg) {
          return <ServicePackageCard key={pkg.orderType} {...pkg} standalone={false} />;
        })}
      </div>
    </PayPalScriptProvider>
  );
}
