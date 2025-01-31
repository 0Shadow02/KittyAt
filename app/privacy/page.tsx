// app/privacy/page.tsx
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black bg-opacity-95 text-gray-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-400">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-12">
          <Section title="1. Information We Collect">
            <div className="space-y-4">
              <BulletPoint title="Account Information">
                When you register, we collect your name, email address, and Discord ID.
              </BulletPoint>
              <BulletPoint title="Payment Data">
                We process payments through Stripe and store transaction IDs. We never store full payment card details.
              </BulletPoint>
              <BulletPoint title="Service Usage">
                We collect analytics on feature usage, error logs, and monitoring metrics through encrypted channels.
              </BulletPoint>
            </div>
          </Section>

          <Section title="2. Data Usage">
            <div className="space-y-4">
              <BulletPoint title="Service Operation">
                To provide and maintain our monitoring services and Discord integrations
              </BulletPoint>
              <BulletPoint title="Improvements">
                Analyze usage patterns to enhance security and develop new features
              </BulletPoint>
              <BulletPoint title="Communications">
                Send critical service updates and security notifications
              </BulletPoint>
            </div>
          </Section>

          <Section title="3. Data Sharing">
            <div className="space-y-4">
              <BulletPoint title="Third-Party Services">
                Discord for alert delivery, Stripe for payments, AWS for secure hosting
              </BulletPoint>
              <BulletPoint title="Legal Compliance">
                When required by law or to protect our rights and users' safety
              </BulletPoint>
              <BulletPoint title="Business Transfers">
                In case of merger, acquisition, or asset sale
              </BulletPoint>
            </div>
          </Section>

          <Section title="4. Security Measures">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SecurityMeasure
                title="Encryption"
                description="AES-256 encryption for data at rest and TLS 1.3 for data in transit"
              />
              <SecurityMeasure
                title="Access Control"
                description="Role-based access with 2FA enforcement for our team"
              />
              <SecurityMeasure
                title="Audits"
                description="Annual third-party security penetration testing"
              />
              <SecurityMeasure
                title="Backups"
                description="Geo-redundant encrypted backups with 30-day retention"
              />
            </div>
          </Section>

          <Section title="5. Your Rights">
            <div className="space-y-4">
              <BulletPoint title="Access">
                Request a copy of your personal data in machine-readable format
              </BulletPoint>
              <BulletPoint title="Deletion">
                Remove your account and associated monitoring data
              </BulletPoint>
              <BulletPoint title="Correction">
                Update inaccurate or incomplete information
              </BulletPoint>
            </div>
          </Section>

          <div className="border-t border-slate-800 pt-12 text-center text-gray-400">
            <p>Contact our DPO: <span className="text-blue-400">0amatsu0@gmail.com</span></p>
            <p className="mt-2">Physical Address: Osaka Japan</p>
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

function SecurityMeasure({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
      <h3 className="font-semibold text-blue-400 mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}