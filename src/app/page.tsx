"use client";

import { quotes } from "@/lib/quotes";
import TypingTest from "@/components/interface/typing-test";
import ContactUs from "@/components/contact-us";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-b from-neutral-950 to-neutral-900 text-neutral-100">
      <div className="w-full max-w-3xl flex flex-col items-center">
        <TypingTest quotes={quotes} />
      </div>
      <ContactUs />
    </main>
  );
}
