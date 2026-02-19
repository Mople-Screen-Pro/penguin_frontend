import { Link } from 'react-router-dom'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="flex items-center gap-2 group w-fit">
            <img src="/logo.png" alt="Penguin" className="w-9 h-9 rounded-xl shadow-lg shadow-sky-500/25" />
            <span className="text-xl font-bold text-slate-900">Penguin</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
        <p className="text-slate-500 mb-8">Last updated: February 1, 2026</p>

        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 mb-6">
            This Privacy Policy explains how Mople, a sole proprietorship ("Company", "we", "us", or "our"), collects, uses, stores, and protects personal information when you use Penguin, a macOS-only desktop application (the "Service").
          </p>
          <p className="text-slate-600 mb-8">
            By using the Service, you agree to the collection and use of information in accordance with this Privacy Policy.
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">1. Data Controller</h2>
            <p className="text-slate-600">
              Mople acts as the data controller for all personal data processed under this Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">2. Information We Collect</h2>

            <h3 className="text-lg font-medium text-slate-800 mb-3">2.1 Information You Provide</h3>
            <p className="text-slate-600 mb-2">
              We collect only the minimum personal information necessary to provide the Service, including:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
              <li>Email address (used for account identification and authentication)</li>
              <li>Authentication information provided by third-party login providers (Google, GitHub, and Apple)</li>
            </ul>
            <p className="text-slate-600 mb-4">
              We do not collect passwords, payment card information, real names, physical addresses, or any other unnecessary personal data.
            </p>

            <h3 className="text-lg font-medium text-slate-800 mb-3">2.2 Automatically Collected Information</h3>
            <p className="text-slate-600 mb-2">
              When you use the Service, we may automatically collect limited, non-identifying information, including:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
              <li>Basic usage and diagnostic data</li>
              <li>Application version and macOS operating system information</li>
            </ul>
            <p className="text-slate-600 mb-4">
              This information is used solely to maintain service stability and improve performance.
            </p>

            <h3 className="text-lg font-medium text-slate-800 mb-3">2.3 Recordings and Camera Data</h3>
            <p className="text-slate-600 mb-4">
              The Service provides screen recording and camera features. All recordings, camera footage, and related media created using the Service are stored locally on your device only.
            </p>
            <p className="text-slate-600">
              We do not collect, access, upload, transmit, or store any recordings or camera data on our servers. You are solely responsible for the management and security of your locally stored content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">3. Legal Basis for Processing (GDPR)</h2>
            <p className="text-slate-600 mb-2">We process personal data based on the following legal grounds:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li>Performance of a contract (to provide and operate the Service)</li>
              <li>User consent, where applicable</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">4. Authentication and Third-Party Services</h2>
            <p className="text-slate-600 mb-2">The Service supports authentication through the following third-party providers:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
              <li>Google Login</li>
              <li>GitHub Login</li>
              <li>Sign in with Apple</li>
            </ul>
            <p className="text-slate-600 mb-4">
              Authentication is handled directly by these providers. We receive only limited account information, such as your email address, in accordance with each provider's privacy policy.
            </p>
            <p className="text-slate-600">
              The Service uses Supabase as its backend infrastructure provider for authentication and data storage. Supabase processes personal data solely on our behalf and does not use it for its own independent purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Account Deletion and Data Retention</h2>
            <p className="text-slate-600 mb-4">
              When a user deletes their account, all associated personal data is permanently deleted immediately.
            </p>
            <p className="text-slate-600">
              We do not retain any personal information after account deletion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">6. Use of Information</h2>
            <p className="text-slate-600 mb-2">We use personal information solely for the following purposes:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
              <li>Providing and operating the Service</li>
              <li>Authenticating users and managing accounts</li>
              <li>Improving service performance and user experience</li>
              <li>Complying with applicable laws and regulations</li>
            </ul>
            <p className="text-slate-600">
              We do not sell, rent, or trade personal information to third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">7. Payments</h2>
            <p className="text-slate-600 mb-4">
              Payments for paid features are processed by Paddle, a third-party payment provider acting as Merchant of Record.
            </p>
            <p className="text-slate-600">
              We do not collect or store payment card details or billing information. All payment-related data is handled directly by Paddle in accordance with its own privacy policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">8. International Data Transfers</h2>
            <p className="text-slate-600 mb-4">
              Personal data may be processed and stored on servers operated by Supabase, which may be located outside the user's country of residence.
            </p>
            <p className="text-slate-600">
              Any international data transfers are conducted in accordance with applicable data protection laws and appropriate safeguards.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">9. Data Security</h2>
            <p className="text-slate-600 mb-4">
              We implement reasonable technical and organizational measures to protect personal information against unauthorized access, loss, or misuse.
            </p>
            <p className="text-slate-600">
              However, no method of electronic storage or transmission is completely secure, and absolute security cannot be guaranteed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">10. Children's Privacy</h2>
            <p className="text-slate-600 mb-4">
              The Service is not intended for children and does not target individuals under the age required to provide valid consent under applicable laws.
            </p>
            <p className="text-slate-600">
              We do not knowingly collect personal information from children.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">11. Your Rights</h2>
            <p className="text-slate-600 mb-2">Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
              <li><strong>Right of Access:</strong> Request access to your personal data</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate personal data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Right to Restriction:</strong> Request restriction of processing of your personal data</li>
              <li><strong>Right to Data Portability:</strong> Request transfer of your personal data to another service</li>
              <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent where processing is based on consent</li>
              <li><strong>Right to Lodge a Complaint:</strong> You have the right to lodge a complaint with a supervisory authority in your country of residence if you believe your data protection rights have been violated</li>
            </ul>
            <p className="text-slate-600">
              You may exercise these rights by contacting us using the contact information below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">12. Data Protection Officer</h2>
            <p className="text-slate-600 mb-2">
              For questions or concerns regarding data protection, you may contact our Data Protection Officer at:
            </p>
            <p className="text-slate-600">
              <strong>Email:</strong> <a href="mailto:whwo9745@gmail.com" className="text-sky-600 hover:underline">whwo9745@gmail.com</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">13. Changes to This Privacy Policy</h2>
            <p className="text-slate-600">
              We may update this Privacy Policy from time to time. Any changes will be posted within the Service or on our website. Continued use of the Service after such changes constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">14. Contact</h2>
            <p className="text-slate-600 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-slate-200 rounded-lg">
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3 bg-slate-50 font-medium text-slate-700">Email</td>
                    <td className="px-4 py-3 text-slate-600">
                      <a href="mailto:jwjygpt0507@gmail.com" className="text-sky-600 hover:underline">jwjygpt0507@gmail.com</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 bg-slate-50 font-medium text-slate-700">Phone</td>
                    <td className="px-4 py-3 text-slate-600">+82-10-2847-9981</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 bg-slate-50 font-medium text-slate-700">Data Protection Officer</td>
                    <td className="px-4 py-3 text-slate-600">
                      <a href="mailto:whwo9745@gmail.com" className="text-sky-600 hover:underline">whwo9745@gmail.com</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link to="/" className="text-sky-600 hover:underline">&larr; Back to Home</Link>
        </div>
      </main>
    </div>
  )
}
