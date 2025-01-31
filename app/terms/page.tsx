// app/terms/page.tsx
export default function TermsPage() {
    return (
      <div className="min-h-screen bg-black bg-opacity-95 text-gray-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-400">Effective: {new Date().toLocaleDateString()}</p>
          </div>
  
          <div className="space-y-12">
            <Section title="1. Acceptance of Terms">
              <p className="text-gray-400">
                By accessing KittyAt's services, you agree to be bound by these terms and our 
                Privacy Policy. If you're using KittyAt for an organization, you're agreeing on 
                their behalf.
              </p>
            </Section>
  
            <Section title="2. Service Description">
              <p className="text-gray-400">
                KittyAt provides real-time monitoring solutions with Discord integration. 
                We reserve the right to modify or discontinue features at any time.
              </p>
            </Section>
  
            <Section title="3. User Obligations">
              <div className="space-y-4">
                <BulletPoint title="Account Security">
                  Maintain confidentiality of your API keys and credentials
                </BulletPoint>
                <BulletPoint title="Compliance">
                  Use services in accordance with all applicable laws
                </BulletPoint>
                <BulletPoint title="Restrictions">
                  No reverse engineering, scraping, or spamming through our services
                </BulletPoint>
              </div>
            </Section>
  
            <Section title="4. Payments & Refunds">
              <div className="space-y-4">
                <BulletPoint title="Subscriptions">
                  All plans are pre-paid and auto-renew until canceled
                </BulletPoint>
                <BulletPoint title="Taxes">
                  You're responsible for any applicable VAT, GST, or sales tax
                </BulletPoint>
                <BulletPoint title="Refunds">
                  We offer 14-day refunds for annual plans, no refunds for monthly
                </BulletPoint>
              </div>
            </Section>
  
            <Section title="5. Termination">
              <p className="text-gray-400">
                We may suspend accounts for: (a) payment failures, (b) TOS violations, 
                (c) legal requirements. You can terminate at any time through your dashboard.
              </p>
            </Section>
  
            <Section title="6. Disclaimer & Limits">
              <div className="space-y-4">
                <BulletPoint title="Availability">
                  We target 99.9% uptime but don't guarantee uninterrupted service
                </BulletPoint>
                <BulletPoint title="Liability">
                  Our total liability is limited to your last 3 months of payments
                </BulletPoint>
                <BulletPoint title="Warranty">
                  Services provided "as is" without any express warranties
                </BulletPoint>
              </div>
            </Section>
  
            <Section title="7. Disputes">
              <div className="space-y-4">
                <BulletPoint title="Governing Law">
                  Disputes governed by laws of [Your Jurisdiction]
                </BulletPoint>
                <BulletPoint title="Arbitration">
                  Claims must be resolved through binding arbitration
                </BulletPoint>
                <BulletPoint title="Class Action">
                  No class or representative proceedings allowed
                </BulletPoint>
              </div>
            </Section>
  
            <div className="border-t border-slate-800 pt-12 text-center text-gray-400">
              <p>Contact Legal Team: <span className="text-blue-400">0amatsu0@gmail.com</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <section className="border-l-4 border-blue-500/30 pl-6">
        <h2 className="text-2xl font-semibold text-white mb-6">{title}</h2>
        {children}
      </section>
    );
  }
  
  function BulletPoint({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div className="relative pl-6">
        <div className="absolute left-0 top-1 w-2 h-2 bg-blue-500 rounded-full" />
        <h3 className="font-medium text-white/90">{title}</h3>
        <p className="text-gray-400 mt-1">{children}</p>
      </div>
    );
  }