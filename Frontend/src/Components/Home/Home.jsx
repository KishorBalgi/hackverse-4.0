import React from 'react'

export default function Home() {
    return (
        <div className="bg-gray-200 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-8">Welcome to our Agriculture Business</h1>
            <p className="text-xl text-gray-600 mb-8">
              We are dedicated to providing top-quality agricultural products and services to our customers. Our team of experts works hard to ensure that we produce the highest quality products while minimizing our impact on the environment. Browse our website to learn more about our business and services.
            </p>
            <a href="/services" className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600">View Our Services</a>
          </div>
          
        </div>
      );
}
