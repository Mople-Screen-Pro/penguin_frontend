import { Link } from 'react-router-dom'

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Terms of Service</h1>
        <p className="text-slate-500 mb-8">Last updated: February 1, 2026</p>

        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 mb-6">
            These Terms of Service ("Terms") govern your access to and use of Screen Pro, a macOS-only desktop application, and any related services (collectively, the "Service") provided by Mople ("Company", "we", "us", or "our").
          </p>
          <p className="text-slate-600 mb-8">
            By downloading, installing, or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, you must not use the Service.
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">1. Purpose</h2>
            <p className="text-slate-600">
              These Terms set forth the conditions for using the Service and define the rights, obligations, and responsibilities between the Company and users.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">2. Definitions</h2>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>"Service" means the macOS-only desktop application Screen Pro and all related features provided by the Company.</li>
              <li>"User" means an individual who agrees to these Terms and uses the Service.</li>
              <li>"Subscription" means a recurring paid plan that provides access to the Service.</li>
              <li>"Lifetime License" means a one-time purchase that grants access to the Service as defined herein.</li>
              <li>"Content" means any recordings, screenshots, or other media created by the User using the Service.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">3. Acceptance of Terms</h2>
            <p className="text-slate-600">
              By accessing or using the Service, you acknowledge that you have read, understood, and agreed to be bound by these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">4. Description of the Service</h2>
            <p className="text-slate-600 mb-4">
              The Service is provided exclusively for macOS devices. The Service is a screen recording and video editing application designed to help users capture, edit, and share their screen content efficiently.
            </p>
            <p className="text-slate-600 mb-2">Features may include, but are not limited to:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
              <li>Screen recording (full screen, specific area, or window selection)</li>
              <li>Audio recording (system audio and microphone)</li>
              <li>Video editing and trimming</li>
              <li>Mouse tracking-based automatic zoom</li>
              <li>GIF conversion (planned feature)</li>
              <li>Screenshot capture (planned feature)</li>
            </ul>
            <p className="text-slate-600">
              The Company may modify, update, or discontinue any part of the Service at any time for operational or technical reasons.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Data Storage and Privacy</h2>
            <p className="text-slate-600 mb-4">
              All Content created using the Service is stored locally on the User's device. The Service does not upload, transmit, or store any recordings or personal data on external servers or cloud services.
            </p>
            <p className="text-slate-600">
              Users are solely responsible for the management, backup, and security of their Content stored on their devices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">6. User Responsibility for Content</h2>
            <p className="text-slate-600 mb-2">
              Users are solely responsible for ensuring that their use of the recording features complies with applicable laws, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
              <li>Privacy laws and regulations</li>
              <li>Copyright and intellectual property laws</li>
              <li>Consent requirements for recording others</li>
            </ul>
            <p className="text-slate-600">
              The Company is not liable for any legal issues arising from the User's recording activities or the content they create.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">7. Eligibility</h2>
            <p className="text-slate-600">
              The Service is intended for individual users. By using the Service, you represent that you are legally permitted to use the Service under applicable laws in your jurisdiction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">8. Fees and Payments</h2>
            <p className="text-slate-600 mb-4">
              The Service is offered through paid Subscription plans and/or Lifetime Licenses.
            </p>
            <p className="text-slate-600 mb-4">
              Payments are processed by Paddle, an authorized third-party payment processor acting as the Merchant of Record.
            </p>
            <p className="text-slate-600 mb-4">
              Subscription plans automatically renew unless cancelled prior to the renewal date.
            </p>
            <p className="text-slate-600">
              Pricing and billing terms are clearly presented at the time of purchase.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">9. Subscription Cancellation</h2>
            <p className="text-slate-600">
              Users may cancel their Subscription at any time through the Paddle subscription management page. Upon cancellation, access to the Service will remain available until the end of the current billing period.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">10. Refund Policy</h2>
            <p className="text-slate-600">
              Refunds are subject to the Company's Refund Policy, which is provided as a separate document. All payments and refunds are processed through Paddle.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">11. Lifetime License</h2>
            <p className="text-slate-600 mb-4">
              A Lifetime License grants the User access to the current major version of the Service (e.g., version 1.x), including all minor updates and bug fixes within that major version, for an unlimited period.
            </p>
            <p className="text-slate-600 mb-4">
              Major version upgrades (e.g., 2.0, 3.0) may be offered as separate purchases. Lifetime License holders may be eligible for discounted upgrade pricing at the Company's discretion.
            </p>
            <p className="text-slate-600 mb-4">
              The Lifetime License does not guarantee continued availability of the Service in the event of service termination, major platform changes, or macOS compatibility issues.
            </p>
            <p className="text-slate-600">
              No additional guarantees or compensation are provided if the Service becomes unavailable due to circumstances beyond the Company's control.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">12. Intellectual Property Rights</h2>
            <p className="text-slate-600 mb-4">
              All rights, title, and interest in and to the Service, including software, design, text, and features, are owned by the Company.
            </p>
            <p className="text-slate-600 mb-4">
              Users are granted a limited, non-exclusive, non-transferable, revocable license to use the Service for personal, non-commercial purposes only.
            </p>
            <p className="text-slate-600 mb-2">Users must not:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li>Copy, modify, distribute, sell, sublicense, or rent the Service</li>
              <li>Reverse engineer, decompile, or attempt to extract source code</li>
              <li>Use the Service in violation of applicable laws</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">13. User Obligations</h2>
            <p className="text-slate-600 mb-2">Users agree not to:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li>Violate any applicable laws or regulations</li>
              <li>Interfere with or disrupt the operation of the Service</li>
              <li>Infringe upon the intellectual property rights of the Company or third parties</li>
              <li>Use the Service to record content without proper authorization or consent where required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">14. Disclaimer of Warranties</h2>
            <p className="text-slate-600">
              The Service is provided on an "as is" and "as available" basis. The Company makes no warranties, express or implied, including but not limited to warranties of fitness for a particular purpose, accuracy, or uninterrupted availability.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">15. Limitation of Liability</h2>
            <p className="text-slate-600 mb-4">
              To the maximum extent permitted by law, the Company shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of the Service.
            </p>
            <p className="text-slate-600 mb-2">The Company is not responsible for issues caused by:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li>The User's device environment</li>
              <li>Operating system updates</li>
              <li>Third-party software or services</li>
              <li>Loss of recorded Content due to device failure or user error</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">16. Privacy Policy</h2>
            <p className="text-slate-600">
              The collection and use of personal data are governed by the Company's <Link to="/privacy" className="text-violet-600 hover:underline">Privacy Policy</Link>, which is provided as a separate document and forms an integral part of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">17. Termination</h2>
            <p className="text-slate-600">
              The Company may suspend or terminate access to the Service if a User violates these Terms. Users may discontinue use of the Service at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">18. Changes to the Terms</h2>
            <p className="text-slate-600">
              The Company may update these Terms from time to time. Updated Terms will be made available through the Service or the official website. Continued use of the Service after changes take effect constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">19. Governing Law and Jurisdiction</h2>
            <p className="text-slate-600">
              These Terms shall be governed by and construed in accordance with the laws of the Republic of Korea. Any disputes arising out of or in connection with these Terms shall be resolved in accordance with applicable laws and regulations of the Republic of Korea.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">20. Company Information & Contact</h2>
            <div className="text-slate-600 space-y-1">
              <p><strong>Seller:</strong> Mople</p>
              <p><strong>Business Type:</strong> Sole Proprietorship</p>
              <p><strong>Business Registration Number:</strong> 647-08-03097</p>
              <p><strong>Representative:</strong> Jaeyoung Cho</p>
              <p><strong>Address:</strong> Seoul, Yeongdeungpo-gu, Yeongdeungporo 47-gil 17, Louvre House, Republic of Korea</p>
            </div>
            <p className="text-slate-600 mt-4">
              If you have any questions regarding these Terms or the Service, please contact us at:
            </p>
            <div className="text-slate-600 space-y-1 mt-2">
              <p><strong>Email:</strong> <a href="mailto:jwjygpt0507@gmail.com" className="text-violet-600 hover:underline">jwjygpt0507@gmail.com</a></p>
              <p><strong>Phone:</strong> +82-10-2847-9981</p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link to="/" className="text-violet-600 hover:underline">&larr; Back to Home</Link>
        </div>
      </main>
    </div>
  )
}
