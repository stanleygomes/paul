import React from "react";
import { TestimonialCard } from "./testimonial-card";

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="bg-main/5 py-24 md:py-32 border-y-4 border-border overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="inline-block border-4 border-border bg-main px-8 py-4 text-4xl font-black uppercase tracking-tighter text-main-foreground shadow-[8px_8px_0px_0px_var(--border)] md:text-6xl">
            Focus-Seekers Choice.
          </h2>
          <p className="max-w-xs text-sm font-bold text-foreground/60 uppercase tracking-widest leading-none mb-2">
            Join thousands of users who simplified their life this week.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <TestimonialCard
            name="Marcos Oliveira"
            role="Software Engineer"
            content="The clean UI helps me reach deep focus in seconds. No more distraction-heavy todo apps."
            avatarColor="bg-orange-400"
          />
          <TestimonialCard
            name="Juliana Souza"
            role="Freelance Designer"
            content="Projects and importance flags changed my game. Simple hierarchy for a complex workflow."
            avatarColor="bg-blue-400"
          />
          <TestimonialCard
            name="Ricardo Lima"
            role="Final Year Student"
            content="PWA notifications on my Android phone ensure I never miss an assignment. Simple and works."
            avatarColor="bg-yellow-400"
          />
        </div>
      </div>
    </section>
  );
}
