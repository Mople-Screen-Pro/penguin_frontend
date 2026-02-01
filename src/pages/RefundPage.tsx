import { Link } from 'react-router-dom'

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="flex items-center gap-2 group w-fit">
            <img src="/logo.png" alt="Screen Pro" className="w-9 h-9 rounded-xl shadow-lg shadow-violet-500/25" />
            <span className="text-xl font-bold text-slate-900">Screen Pro</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Refund Policy</h1>
        <p className="text-slate-500 mb-8">Last updated: February 1, 2026</p>

        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 mb-6">
            This Refund Policy applies to purchases and subscriptions of Screen Pro, a macOS-only desktop application, provided by Mople ("Company", "we", "us", or "our").
          </p>
          <p className="text-slate-600 mb-8">
            By purchasing or subscribing to the Service, you agree to this Refund Policy.
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">1. Payment Processing and Merchant of Record</h2>
            <p className="text-slate-600 mb-4">
              All payments for the Service are processed by Paddle.com Market Limited ("Paddle"), which acts as the Merchant of Record for all transactions.
            </p>
            <p className="text-slate-600 mb-2">This means:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
              <li>You purchase the Service from Paddle, not directly from Mople</li>
              <li>Paddle handles payment processing, tax calculation, and refund processing</li>
              <li>The Service is licensed to you by Mople</li>
              <li>All refund requests are submitted to and processed by Paddle in accordance with their policies and applicable consumer protection laws</li>
            </ul>
            <p className="text-slate-600">
              The Company does not process refunds directly and cannot override Paddle's decisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">2. Digital Product and Right of Withdrawal</h2>
            <p className="text-slate-600 mb-4">
              Screen Pro is a digital software product delivered immediately upon purchase.
            </p>
            <p className="text-slate-600 font-medium mb-2">Important Notice for EU/UK Consumers:</p>
            <p className="text-slate-600 mb-4">
              By downloading or otherwise acquiring the Service, you explicitly consent to the immediate performance of this agreement and acknowledge that you will lose your right of withdrawal once the download or transmission has begun, in accordance with EU Directive 2011/83/EU, Article 16(m).
            </p>
            <p className="text-slate-600">
              During the checkout process, you will be asked to provide explicit consent via a checkbox before completing your purchase. If you wish to retain your right of withdrawal, you must not download or activate the Service within the 14-day withdrawal period.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">3. Refund Eligibility and Timeframes</h2>

            <h3 className="text-lg font-medium text-slate-800 mb-3">3.1 30-Day Money-Back Guarantee</h3>
            <p className="text-slate-600 mb-4">
              We offer a 30-day money-back guarantee for all purchases of Screen Pro.
            </p>
            <p className="text-slate-600 mb-2">Eligibility Requirements:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
              <li>Refund requests must be submitted within 30 days of the original purchase date</li>
              <li>The request must be made through Paddle's refund process</li>
              <li>Refunds are granted at Paddle's discretion based on the circumstances</li>
            </ul>

            <h3 className="text-lg font-medium text-slate-800 mb-3">3.2 Lifetime License</h3>
            <p className="text-slate-600 mb-2">For one-time purchases (Lifetime License):</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
              <li>Refund requests must be submitted within 30 days of purchase</li>
              <li>Eligibility is determined by Paddle based on usage patterns and compliance with Terms of Service</li>
              <li>Refunds may be denied if the Service has been extensively used or if Terms of Service have been violated</li>
            </ul>

            <h3 className="text-lg font-medium text-slate-800 mb-3">3.3 Subscription Plans</h3>
            <p className="text-slate-600 mb-2">For monthly or annual subscription plans:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
              <li>You may cancel your subscription at any time</li>
              <li>Cancellation stops future billing and takes effect at the next payment date</li>
              <li>Refund requests must be submitted within 30 days of the transaction date</li>
              <li>Access to the Service continues until the end of the current billing period</li>
            </ul>

            <h3 className="text-lg font-medium text-slate-800 mb-3">3.4 Refund Request Deadline</h3>
            <p className="text-slate-600">
              All refund requests must be submitted within 60 days of the transaction date. Requests received after this period will not be processed, except where required by applicable consumer protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">4. Data Storage Notice</h2>
            <p className="text-slate-600 mb-4">
              Screen Pro stores user account data on Supabase servers to provide service functionality. By using the Service, you acknowledge that certain data is transmitted to and stored on third-party servers as described in our <Link to="/privacy" className="text-violet-600 hover:underline">Privacy Policy</Link>.
            </p>
            <p className="text-slate-600 mb-4">
              All recordings and camera footage created using the Service are stored locally on your device only and are not transmitted to our servers.
            </p>
            <p className="text-slate-600">
              This does not affect your refund rights, but please review our Privacy Policy before purchase.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">5. How to Request a Refund</h2>
            <p className="text-slate-600 mb-2">To request a refund:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
              <li>Contact us at <a href="mailto:jwjygpt0507@gmail.com" className="text-violet-600 hover:underline">jwjygpt0507@gmail.com</a> with your order number and the email address used for purchase, or</li>
              <li>Visit paddle.net and submit a refund request directly, or</li>
              <li>Use the refund link in your purchase receipt email from Paddle</li>
            </ul>
            <p className="text-slate-600 mb-4">
              We encourage you to contact us first so we can address any issues you may be experiencing with the Service before processing a refund.
            </p>
            <p className="text-slate-600">
              For questions about refund status or payment issues, you may contact us or Paddle's support team directly at paddle.net.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">6. Refund Processing Time</h2>
            <p className="text-slate-600 mb-2">Once a refund is approved by Paddle:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li>Processing typically takes 5-7 business days</li>
              <li>The actual time for funds to appear in your account may vary depending on your bank or card issuer (typically 7-14 days total)</li>
              <li>Refunds are issued to the original payment method used for purchase</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">7. Refund Amount and Adjustments</h2>
            <p className="text-slate-600 mb-2">The refund amount may differ from the original purchase amount due to:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
              <li>Tax adjustments and recalculation based on your jurisdiction</li>
              <li>Currency exchange rate fluctuations (for non-USD transactions)</li>
              <li>Payment processing fees (in limited circumstances)</li>
            </ul>
            <p className="text-slate-600">
              <strong>Promotional Purchases:</strong> If you purchased the Service at a discounted or promotional price, the refund will be for the actual amount paid, not the original full price.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">8. Circumstances Where Refunds May Be Denied</h2>
            <p className="text-slate-600 mb-2">Paddle may deny refund requests in the following circumstances:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
              <li><strong>Terms of Service Violations:</strong> Use of the Service in ways that violate our Terms of Service</li>
              <li><strong>Prior Refund History:</strong> Previous refund(s) for the same product (to prevent refund abuse)</li>
              <li><strong>Chargeback Abuse:</strong> Initiating chargebacks or payment disputes without first contacting Paddle</li>
              <li><strong>Fraudulent Activity:</strong> Suspected fraud, use of stolen payment methods, or license key sharing/resale</li>
              <li><strong>Excessive Usage:</strong> For Lifetime Licenses, if the Service has been used extensively beyond evaluation purposes</li>
              <li><strong>Requests Outside Time Limits:</strong> Refund requests submitted after the applicable deadline</li>
            </ul>
            <p className="text-slate-600">
              Users who initiate fraudulent chargebacks may have their access to the Service terminated immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">9. Lifetime License - Version Updates</h2>
            <p className="text-slate-600 mb-2">Lifetime License grants you access to:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
              <li>The current major version of Screen Pro (e.g., version 1.x)</li>
              <li>All minor updates and bug fixes within that major version</li>
            </ul>
            <p className="text-slate-600 mb-4">
              Major version upgrades (e.g., 2.0, 3.0) may require a separate purchase.
            </p>
            <p className="text-slate-600">
              This policy allows us to continue improving and maintaining the Service while offering fair pricing for significant new versions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">10. Regional Consumer Rights</h2>
            <p className="text-slate-600 mb-4">
              Nothing in this Refund Policy affects your mandatory rights as a consumer under applicable local laws.
            </p>
            <p className="text-slate-600 mb-2"><strong>For EU/UK Consumers:</strong> You may be entitled to additional rights under consumer protection laws, including:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
              <li>The right to cancel within 14 days of purchase (right of withdrawal)</li>
              <li>However, this right is waived when you download digital content after giving explicit consent</li>
            </ul>
            <p className="text-slate-600">
              <strong>For All Consumers:</strong> You benefit from mandatory provisions of the law of the country in which you are resident. If local consumer protection laws provide greater rights than this policy, those laws will prevail.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">11. Contact Before Chargebacks</h2>
            <p className="text-slate-600 mb-4">
              If you experience any issues with the Service or have concerns about your purchase, please contact Paddle's support team before initiating a chargeback or payment dispute with your bank.
            </p>
            <p className="text-slate-600">
              Chargebacks should only be used as a last resort for genuine fraud or unauthorized transactions. Improper use of chargebacks may result in account termination and may affect your ability to purchase from Paddle in the future.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">12. Changes to This Refund Policy</h2>
            <p className="text-slate-600 mb-4">
              We may update this Refund Policy from time to time to reflect changes in our practices, legal requirements, or Paddle's policies.
            </p>
            <p className="text-slate-600 mb-2">Updated versions will be posted:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
              <li>Within the Screen Pro application</li>
              <li>On our official website</li>
            </ul>
            <p className="text-slate-600">
              Continued use of the Service after changes are posted constitutes acceptance of the updated Refund Policy. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">13. Contact Information</h2>
            <p className="text-slate-600 mb-4">
              <strong>For refund requests and payment issues:</strong><br />
              Contact Paddle directly at paddle.net
            </p>
            <p className="text-slate-600 mb-4">
              <strong>For general questions about this Refund Policy:</strong>
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-slate-200 rounded-lg">
                <thead>
                  <tr>
                    <th className="px-4 py-3 bg-slate-50 font-medium text-slate-700 text-left border-b border-slate-200">Item</th>
                    <th className="px-4 py-3 bg-slate-50 font-medium text-slate-700 text-left border-b border-slate-200">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3 text-slate-600">Email</td>
                    <td className="px-4 py-3 text-slate-600">
                      <a href="mailto:jwjygpt0507@gmail.com" className="text-violet-600 hover:underline">jwjygpt0507@gmail.com</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-600">Phone</td>
                    <td className="px-4 py-3 text-slate-600">+82-10-2847-9981</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-600 font-medium">
              Important: The Company (Mople) cannot process refunds directly. All refund requests must be submitted to Paddle.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">14. Compliance Statement</h2>
            <p className="text-slate-600 mb-2">This Refund Policy is designed to comply with:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
              <li>Paddle's Seller requirements and Buyer Terms</li>
              <li>EU Consumer Rights Directive (2011/83/EU)</li>
              <li>Applicable consumer protection laws in relevant jurisdictions</li>
            </ul>
            <p className="text-slate-600 mb-4">
              This policy works in conjunction with our <Link to="/terms" className="text-violet-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-violet-600 hover:underline">Privacy Policy</Link>, which should be read together as a complete agreement.
            </p>
            <p className="text-slate-600 font-medium">
              By purchasing Screen Pro, you acknowledge that you have read, understood, and agreed to this Refund Policy.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link to="/" className="text-violet-600 hover:underline">&larr; Back to Home</Link>
        </div>
      </main>
    </div>
  )
}
