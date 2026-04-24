'use client';


import React from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Ananya Sharma",
      location: "New Delhi, India",
      rating: 5,
      text: "The negotiation engine saved me over ₹15,000 on my Goa anniversary trip. I couldn't believe it when the hotels started bidding! Truly unique service.",
      img: "https://picsum.photos/seed/p1/100/100"
    },
    {
      name: "Marcus Tan",
      location: "Singapore",
      rating: 5,
      text: "WanderWealth is my go-to for all business travels. The free room upgrades and early check-ins are consistent and real. Highly recommended!",
      img: "https://picsum.photos/seed/p2/100/100"
    },
    {
      name: "Rachel Green",
      location: "London, UK",
      rating: 5,
      text: "Found the most beautiful vineyard stay through their curated collections. The support team helped me book a private tour too. Amazing experience.",
      img: "https://picsum.photos/seed/p3/100/100"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">What Our Travelers Say</h2>
          <div className="flex items-center justify-center space-x-1 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 text-orange-400 fill-orange-400" />
            ))}
          </div>
          <p className="text-slate-500 font-medium">4.9/5 Average Rating based on 50,000+ reviews</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {reviews.map((rev, idx) => (
            <div key={idx} className="flex-1 bg-white p-10 rounded-[2.5rem] shadow-sm relative group">
              <div className="absolute top-8 right-10 opacity-10">
                <Quote size={60} />
              </div>
              <div className="flex items-center space-x-4 mb-8">
                <img src={rev.img} alt={rev.name} className="w-14 h-14 rounded-full border-2 border-indigo-100" />
                <div>
                  <h4 className="font-bold text-slate-900">{rev.name}</h4>
                  <p className="text-xs text-slate-500">{rev.location}</p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed italic">"{rev.text}"</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center space-x-4">
          <button className="bg-white border border-slate-200 p-4 rounded-full text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="bg-indigo-600 p-4 rounded-full text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
