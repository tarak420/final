import React from 'react';

const Features = ({featureRef}) => {
  return (
    <section className="features py-10" id="features" ref={featureRef}>
      <h1 className="heading text-center font-bold mb-10">
        Our <span className="text-green-300">Features</span>
      </h1>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        <div className="box text-center p-6 border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <img src="image/feature-img-1.png" alt="Fresh and Organic" className="mx-auto mb-4 w-24 h-24"/>
          <h3 className="text-xl font-semibold mb-2">Fresh And Organic</h3>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
          </p>
          <a href="#" className="btn bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
            Read More
          </a>
        </div>
        <div className="box text-center p-6 border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <img src="image/feature-img-2.png" alt="Free Delivery" className="mx-auto mb-4 w-24 h-24"/>
          <h3 className="text-xl font-semibold mb-2">Free Delivery</h3>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
          </p>
          <a href="#" className="btn bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
            Read More
          </a>
        </div>
        <div className="box text-center p-6 border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <img src="image/feature-img-3.png" alt="Easy Payments" className="mx-auto mb-4 w-24 h-24"/>
          <h3 className="text-xl font-semibold mb-2">Easy Payments</h3>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
          </p>
          <a href="#" className="btn bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
            Read More
          </a>
        </div>
        <div className="box text-center p-6 border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <img src="image/feature-img-4.jfif" alt="Customer Support" className="mx-auto mb-4 w-24 h-24"/>
          <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
          </p>
          <a href="#" className="btn bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
            Read More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
