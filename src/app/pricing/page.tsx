import type { Metadata } from 'next'
import { Suspense } from 'react'
import PricingClient from './PricingClient'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Choose the perfect Clipa plan. Monthly, yearly, or lifetime — all plans include unlimited recordings, auto cursor zoom, and MP4 export. Starting from $8/month.',
  alternates: { canonical: '/pricing' },
}

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Clipa Screen Recorder",
            description: "Professional screen recording with auto cursor zoom for macOS",
            image: "https://www.clipa.studio/og-image.png",
            brand: { "@type": "Brand", name: "Clipa" },
            offers: [
              {
                "@type": "Offer",
                name: "Monthly",
                price: "21",
                priceCurrency: "USD",
                priceValidUntil: "2027-12-31",
                availability: "https://schema.org/InStock",
                url: "https://www.clipa.studio/pricing",
                hasMerchantReturnPolicy: {
                  "@type": "MerchantReturnPolicy",
                  applicableCountry: "US",
                  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
                  merchantReturnDays: 14,
                  returnMethod: "https://schema.org/ReturnByMail",
                  returnFees: "https://schema.org/FreeReturn",
                  returnPolicySeasonalOverride: [],
                },
                shippingDetails: {
                  "@type": "OfferShippingDetails",
                  shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "USD" },
                  shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
                  deliveryTime: {
                    "@type": "ShippingDeliveryTime",
                    handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
                    transitTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
                  },
                },
              },
              {
                "@type": "Offer",
                name: "Yearly",
                price: "96",
                priceCurrency: "USD",
                priceValidUntil: "2027-12-31",
                availability: "https://schema.org/InStock",
                url: "https://www.clipa.studio/pricing",
                hasMerchantReturnPolicy: {
                  "@type": "MerchantReturnPolicy",
                  applicableCountry: "US",
                  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
                  merchantReturnDays: 30,
                  returnMethod: "https://schema.org/ReturnByMail",
                  returnFees: "https://schema.org/FreeReturn",
                  returnPolicySeasonalOverride: [],
                },
                shippingDetails: {
                  "@type": "OfferShippingDetails",
                  shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "USD" },
                  shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
                  deliveryTime: {
                    "@type": "ShippingDeliveryTime",
                    handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
                    transitTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
                  },
                },
              },
              {
                "@type": "Offer",
                name: "Lifetime",
                price: "240",
                priceCurrency: "USD",
                priceValidUntil: "2027-12-31",
                availability: "https://schema.org/InStock",
                url: "https://www.clipa.studio/pricing",
                hasMerchantReturnPolicy: {
                  "@type": "MerchantReturnPolicy",
                  applicableCountry: "US",
                  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
                  merchantReturnDays: 30,
                  returnMethod: "https://schema.org/ReturnByMail",
                  returnFees: "https://schema.org/FreeReturn",
                  returnPolicySeasonalOverride: [],
                },
                shippingDetails: {
                  "@type": "OfferShippingDetails",
                  shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "USD" },
                  shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
                  deliveryTime: {
                    "@type": "ShippingDeliveryTime",
                    handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
                    transitTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
                  },
                },
              },
            ],
          }),
        }}
      />
      <Suspense>
        <PricingClient />
      </Suspense>
    </>
  )
}
