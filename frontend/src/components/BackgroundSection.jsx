import React from 'react';

export default function BackgroundSection({ imageUrl, overlayColor, title, subtitle, ctaText, ctaLink }) {
  return (
    <section
      className="relative h-96 flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: overlayColor || 'rgba(0, 0, 0, 0.5)' }}
      />
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-5xl font-bold mb-4 font-sans">{title}</h1>
        <p className="mb-8 text-xl">{subtitle}</p>
        <a
          href={ctaLink}
          className="inline-block px-6 py-3 bg-accent text-black font-semibold rounded shadow hover:bg-accent/90 transition"
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
}
