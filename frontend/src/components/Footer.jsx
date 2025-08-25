import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white text-center p-6 mt-12">
      <div className="max-w-7xl mx-auto">
        <p>&copy; {new Date().getFullYear()} Myusual. All rights reserved.</p>
        <p>
          Designed with <span className="text-accent font-bold">minimalism</span> in mind.
        </p>
      </div>
    </footer>
  );
}
