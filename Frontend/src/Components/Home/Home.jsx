import React from "react";

export default function Home() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">
          Welcome to our Agriculture Business
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Welcome to our agricultural marketplace where buying and selling of
          fresh farm produce is made easy and transparent for everyone. Our
          marketplace provides an open platform for farmers and buyers to
          interact and trade directly, removing the need for middlemen and
          resulting in fair prices for all. <br />
          <br />
          What sets our marketplace apart is that buyers are incentivized to
          participate in upvoting or downvoting the sellers based on the quality
          of the products sold. This system empowers the buyers and encourages
          the farmers to produce high-quality products. The more upvotes a
          seller gets, the more visibility they receive, and their products are
          given priority in the marketplace.
          <br />
          <br />
          Our marketplace prioritizes transparency and trust, making sure that
          farmers who provide high-quality products are rewarded based on their
          merit, rather than relying on paid marketing. We believe that this
          will help promote sustainability and encourage farmers to produce
          crops that are not only of high quality but also environmentally
          friendly.
        </p>
        <a
          href="/marketplace"
          className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600"
        >
          Marketplace
        </a>
      </div>
    </div>
  );
}
