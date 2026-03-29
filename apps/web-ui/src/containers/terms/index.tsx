interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function TermsSection({ title, children }: SectionProps) {
  return (
    <section className="mb-5 rounded-base border-2 border-border bg-main p-6">
      <h2 className="mb-3 text-xl font-black uppercase tracking-tight text-main-foreground">
        {title}
      </h2>
      <div className="text-sm font-bold leading-relaxed text-main-foreground/80">
        {children}
      </div>
    </section>
  );
}

export default function Terms() {
  return (
    <div className="min-h-screen bg-background p-6 pt-24 md:pt-32">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12">
          <h1 className="inline-block py-3 text-3xl font-black uppercase tracking-tighter text-foreground">
            Terms of Service
          </h1>
          <p className="mt-6 text-sm font-bold text-foreground/60">
            Last updated: March 29, 2026
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <TermsSection title="1. Acceptance of Terms">
            <p>
              By accessing or using{" "}
              <strong className="text-foreground">Done.</strong>, you agree to
              be bound by these Terms of Service. If you do not agree to all
              these terms, you may not use the application.
            </p>
          </TermsSection>

          <TermsSection title="2. Description of Service">
            <p>
              Done. is a task management application designed to help you
              organize your productivity. We provide tools to create, manage,
              and sync tasks across your devices.
            </p>
          </TermsSection>

          <TermsSection title="3. User Responsibilities">
            <p className="mb-3">
              You are responsible for the content you create within the app. You
              agree not to use the service for any illegal or unauthorized
              purpose.
            </p>
            <p>
              You must maintain the security of your account and notify us
              immediately of any unauthorized use.
            </p>
          </TermsSection>

          <TermsSection title="4. Intellectual Property">
            <p>
              The application, including its design, code, and original content,
              is the property of Done. Application. You may not reproduce or
              distribute any part of the service without our permission.
            </p>
          </TermsSection>

          <TermsSection title="5. Limitation of Liability">
            <p>
              Done. is provided &quot;as is&quot; without any warranties. We are
              not liable for any data loss or productivity issues resulting from
              the use of the application.
            </p>
          </TermsSection>

          <TermsSection title="6. Modifications">
            <p>
              We reserve the right to modify these terms at any time. Your
              continued use of the app after such changes constitutes acceptance
              of the new terms.
            </p>
          </TermsSection>
        </div>

        <div className="mt-16 text-center text-xs font-bold text-foreground/40 pb-20">
          Done. Application &copy; 2026
        </div>
      </div>
    </div>
  );
}
