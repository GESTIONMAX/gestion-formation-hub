import React from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

interface WordPressFAQProps {
  faqs?: FAQItem[];
  className?: string;
}

export default function WordPressFAQ({ 
  faqs = [],
  className = '' 
}: WordPressFAQProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h2 className="text-2xl font-bold">Foire aux questions</h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <h3 className="font-medium text-lg">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
