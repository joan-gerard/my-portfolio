"use client";

import {
  CtaButton,
  Reveal,
  SectionHeader,
} from "@/components/utils";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { AiFillMail } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";

const inputBaseClass =
  "w-full border-0 border-b border-[var(--hairline-light)] bg-transparent py-3 text-base text-[var(--ink)] placeholder:text-[var(--ink-subtle)] focus:border-[var(--ink)] focus:outline-none focus:ring-0 transition-colors";

const labelClass =
  "text-sm font-medium text-[var(--ink-muted)]";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Client-only stub: the form simulates submission since there's no API route yet.
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      data-section-theme="light"
      className="bg-[var(--surface-light)] px-6 py-24 lg:px-24 xl:px-36"
    >
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHeader
            tone="light"
            eyebrow="Let's talk about your next project"
            title="Let's create amazing stuff together!"
            kicker="Have a project in mind? Looking to partner or work together? Reach out through the form and I'll get back to you within 48 hours."
          />
          <Reveal width="w-full">
            <ul className="flex flex-col gap-4 text-[var(--ink)]">
              <li>
                <Link
                  href="mailto:joan.gerard@outlook.com"
                  className="inline-flex items-center gap-3 text-base md:text-lg font-medium underline underline-offset-4 hover:text-[var(--accent-mid)] transition-colors"
                >
                  <AiFillMail className="text-xl text-[var(--accent-mid)]" />
                  joan.gerard@outlook.com
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/joangerard/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-base md:text-lg font-medium underline underline-offset-4 hover:text-[var(--accent-mid)] transition-colors"
                >
                  <FiPhone className="text-xl text-[var(--accent-mid)]" />
                  Message me on LinkedIn
                </Link>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal width="w-full">
          <div className="rounded-3xl border border-[var(--hairline-light)] bg-white p-6 md:p-10 shadow-sm">
            <h3 className="text-xl md:text-2xl font-extrabold text-[var(--ink)] mb-6">
              Send a message
            </h3>
            {submitted ? (
              <p className="text-[var(--ink-muted)]">
                Thanks — your message has been queued locally. I&apos;ll wire
                this up to a real endpoint soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <label className="flex flex-col gap-1">
                  <span className={labelClass}>Name</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    className={inputBaseClass}
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className={labelClass}>Email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="hello@mail.com"
                    className={inputBaseClass}
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className={labelClass}>Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+(123) 456 789 00"
                    className={inputBaseClass}
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className={labelClass}>Message</span>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Type here..."
                    className={`${inputBaseClass} resize-none`}
                  />
                </label>
                <div className="pt-2">
                  <CtaButton surface="light" showArrow type="submit">
                    Submit now
                  </CtaButton>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
