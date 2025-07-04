"use client";

import { useState } from "react";

export default function ContactUs() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const contacts = [
    { label: "General", email: "chaitanya09pawar@gmail.com" },
    { label: "Support", email: "gourishchouhan338@gmail.com" },
    { label: "Business", email: "armancurr@proton.me" },
    { label: "Feedback", email: "shunaw2006@gmail.com" },
  ];

  const handleEmailClick = (email: string) => {
    window.open(`https://mail.google.com/mail/?view=cm&to=${email}`, "_blank");
  };

  return (
    <div className="fixed bottom-4 right-4">
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          onMouseEnter={() => setIsDropdownOpen(true)}
          className="text-xs uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors duration-200 cursor-pointer"
        >
          Contact Us
        </button>

        {isDropdownOpen && (
          <div
            className="absolute bottom-full right-0 mb-2 w-64 bg-blue-500/10 backdrop-blur-md border border-blue-400/20 rounded-lg shadow-2xl"
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <div className="p-2 border-b border-blue-400/20">
              <h3 className="text-blue-100 text-xs font-medium uppercase tracking-wider">
                Contact
              </h3>
            </div>
            <div className="py-1">
              {contacts.map((contact) => (
                <button
                  key={contact.email}
                  onClick={() => handleEmailClick(contact.email)}
                  className="block w-full text-left px-3 py-2 text-blue-200/90 hover:bg-blue-400/10 hover:text-blue-100 transition-all duration-200"
                >
                  <div className="text-sm font-medium">{contact.label}</div>
                  <div className="text-xs text-blue-300/70 break-all">
                    {contact.email}
                  </div>
                </button>
              ))}
            </div>
            <div className="p-2 border-t border-blue-400/20">
              <a
                href="https://github.com/cometerm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 uppercase tracking-wider text-center block transition-colors duration-200"
              >
                cometerm
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
