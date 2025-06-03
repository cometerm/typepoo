"use client"

import { quotes } from "@/lib/quotes"
import TypingTest from "@/components/typing-test"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-black text-white">
      <div className="w-full max-w-3xl flex flex-col items-center">
        <TypingTest quotes={quotes} />
      </div>
    </main>
  )
}
