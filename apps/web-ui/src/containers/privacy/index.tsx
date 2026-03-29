interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function PrivacySection({ title, children }: SectionProps) {
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

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background p-6 pt-24 md:pt-32">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12">
          <h1 className="inline-block py-3 text-3xl font-black uppercase tracking-tighter text-foreground">
            Privacy Policy
          </h1>
          <p className="mt-6 text-sm font-bold text-foreground/60">
            Last updated: March 29, 2026
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <PrivacySection title="1. Data Collected">
            <p className="mb-3">
              Our application,{" "}
              <strong className="text-foreground">Done.</strong>, collects and
              stores data necessary for task management. This includes task
              content, project names, due dates, and your preferences.
            </p>
            <p>
              When you create an account, we may store your name and email
              address to sync your data across devices.
            </p>
          </PrivacySection>

          <PrivacySection title="2. How We Use Your Data">
            <p>
              Your data is used exclusively to facilitate your productivity. We
              organize your tasks and send you notifications for due dates. We
              do not use your task content for training AI models or for any
              advertising profiling.
            </p>
          </PrivacySection>

          <PrivacySection title="3. Local vs. Cloud Storage">
            <p className="mb-3">
              We prioritize your privacy by keeping most of your data in your
              device&apos;s local storage.
            </p>
            <p>
              If you use our cloud sync feature, your tasks are encrypted during
              transmission and when stored on our secure servers.
            </p>
          </PrivacySection>

          <PrivacySection title="4. Sharing and Disclosure">
            <p>
              We{" "}
              <strong className="text-foreground text-lg italic">NEVER</strong>{" "}
              sell, trade, or otherwise transfer your personal data to third
              parties. Your productivity is private.
            </p>
          </PrivacySection>

          <PrivacySection title="5. Your Rights">
            <p>
              You have the right to access, export, or delete all your data at
              any time. Within the app settings, you can clear your local
              storage or delete your account.
            </p>
          </PrivacySection>
        </div>

        <div className="mt-16 text-center text-xs font-bold text-foreground/40 pb-20">
          Done. Application &copy; 2026
        </div>
      </div>
    </div>
  );
}
