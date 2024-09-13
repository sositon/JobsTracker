import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Quote } from 'lucide-react';

const motivationalQuotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Choose a job you love, and you will never have to work a day in your life. - Confucius",
  "The future depends on what you do today. - Mahatma Gandhi",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
  "The best way to predict the future is to create it. - Peter Drucker",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
];

const MotivationalSection = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <Card className="bg-gradient-to-r from-blue-400 via-red-400 to-purple-400 text-white rounded-lg shadow-lg overflow-hidden my-8">
      <Card.Body className="p-6">
        <div className="flex items-center mb-4">
          <Quote className="text-white mr-3" size={24} />
          <h3 className="text-2xl font-bold">Daily Inspiration</h3>
        </div>
        <p className="text-lg italic">{quote}</p>
      </Card.Body>
    </Card>
  );
};

export default MotivationalSection;