// components/FAQ.tsx
"use client"
import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 text-gray-900 py-16 md:py-24">
      <div /*ref={}*/className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border rounded-lg shadow-md">
              <button
                className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-100 focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="font-semibold">{faq.question}</h3>
                <span className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg className="w-6 h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {openIndex === index && (
                <div className="p-4 bg-gray-100 border-t">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const faqData = [
  {
    question: "How does the GitHub Sol Dispenser work?",
    answer: "The GitHub Sol Dispenser rewards users with Solana cryptocurrency for merging pull requests on GitHub. Each merged pull request earns you a specific amount of Solana based on project complexity and the number of lines of code changed."
  },
  {
    question: "Do I need to have a Solana wallet?",
    answer: "Yes, you need a Solana wallet to receive your rewards. You can create one through our platform or use an existing wallet. We support popular wallets like Phantom, Solflare, and Ledger."
  },
  {
    question: "How often are rewards paid out?",
    answer: "Rewards are paid out instantly upon merging a pull request, and Solana will be deposited directly into your wallet. You can track your earnings and transactions through your user dashboard."
  },
  {
    question: "What is the minimum amount of Solana I can earn?",
    answer: "There is no minimum amount. You can earn Solana for any pull request you merge, even if it's a small change. However, the amount you earn will depend on the size and complexity of the project."
  },
  {
    question: "Can I withdraw my Solana earnings?",
    answer: "Yes, you can withdraw your Solana earnings at any time. Simply go to your user dashboard, select the amount you want to withdraw, and follow the instructions to transfer the funds to your external Solana wallet."
  },
  {
    question: "How do I get started with the GitHub Sol Dispenser?",
    answer: "To get started, simply sign up for an account on our platform. Connect your GitHub account, and you'll be ready to start merging pull requests and earning Solana rewards. Our user guide provides step-by-step instructions to help you get set up quickly."
  }
];

export default FAQ;