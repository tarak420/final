import React, { useState, useEffect } from 'react';
import { ArrowBigLeft, Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'John Doe',
    review: 'Great service and fresh products. Highly recommend!',
    rating: 5,
    image: 'image/pic-1.png',
  },
  {
    id: 2,
    name: 'Jane Smith',
    review: 'Excellent quality, timely delivery!',
    rating: 4,
    image: 'image/pic-2.png',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    review: 'I love the variety of products available.',
    rating: 4,
    image: 'image/pic-3.png',
  },
];

const ReviewSection = ({ reviewRef }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  // Auto slide effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <section className="py-12" id="reviews" ref={reviewRef}>
      <h1 className="heading">
        Customers <span>Reviews</span>
      </h1>
      
      <div className="relative">
        <div className="flex justify-between items-center">
          <button onClick={prevSlide} className="text-[14px] text-indigo-500 p-2 rounded">
            <i className="fa-solid fa-less-than"></i>
          </button>
          <div className="p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center space-y-4 max-w-md mx-auto">
              <img
                src={reviews[currentIndex].image}
                alt={reviews[currentIndex].name}
                className="w-24 h-24 rounded-full mx-auto"
              />
              <h3 className="text-lg font-semibold">{reviews[currentIndex].name}</h3>
              <p className="text-gray-600">{reviews[currentIndex].review}</p>
              <div className="flex justify-center">
                {[...Array(reviews[currentIndex].rating)].map((_, index) => (
                  <Star key={index} className="text-yellow-400 w-5 h-5" />
                ))}
              </div>
            </div>
          </div>
          <button onClick={nextSlide} className=" text-[14px] text-indigo-500 p-2 rounded">
          <i className="fa-solid fa-greater-than"></i>
          </button>
        </div>
      </div>

      {/* Dots navigation */}
      <div className="flex justify-center mt-4">
        {reviews.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-1 rounded-full ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;
