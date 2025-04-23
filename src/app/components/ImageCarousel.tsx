'use client';

import { useEffect, useRef, useState } from 'react';

export default function ImageCarousel({
  pictures,
  autoScroll,
  fullPreview,
}: {
  pictures: { url: string; desc: string }[];
  autoScroll?: boolean;
  fullPreview?: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const [showAlt, setShowAlt] = useState(false);

  const carouselEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoScroll) {
        if (carouselEl.current && carouselEl.current.matches(':hover')) return;
        setCurrent((current + 1) % pictures.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [autoScroll, current, pictures.length]);

  return (
    <>
      <div className="shadow-lg" ref={carouselEl}>
        <div className="relative w-full max-w-2xl overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(${current * -100}%)` }}
            onClick={() => setShowAlt(old => !old)}
          >
            {pictures.map((pic, i) => (
              <div
                key={i}
                className="group relative w-full flex-shrink-0 overflow-hidden"
              >
                <img
                  src={pic.url}
                  alt={pic.desc}
                  loading={i == 0 ? 'eager' : 'lazy'}
                  className="h-full w-full flex-shrink-0 bg-slate-100 object-cover object-center dark:bg-gray-800"
                ></img>
                <div
                  className={`absolute right-0 bottom-0 left-0 ${!showAlt && 'translate-y-full group-hover:translate-y-0'} bg-opacity-75 bg-black p-2 text-gray-200 transition-transform`}
                  style={{ display: pic.desc ? '' : 'none' }}
                >
                  {pic.desc}
                </div>
              </div>
            ))}
          </div>
          <button
            className="bg-opacity-0 hover:bg-opacity-40 absolute top-0 bottom-0 left-0 w-12 bg-black text-4xl text-white opacity-75 transition"
            onClick={() =>
              setCurrent((current - 1 + pictures.length) % pictures.length)
            }
          >
            &lt;
          </button>
          <button
            className="bg-opacity-0 hover:bg-opacity-40 absolute top-0 right-0 bottom-0 w-12 bg-black text-4xl text-white opacity-75 transition"
            onClick={() => setCurrent((current + 1) % pictures.length)}
          >
            &gt;
          </button>
        </div>
      </div>
      {!fullPreview ? (
        <div className="thin-scrollbar scrollbar w-full max-w-4xl min-w-0 overflow-auto">
          <div className="mx-auto mt-3 flex w-max flex-shrink-0 justify-center pb-1">
            {pictures.map((pic, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`group px-1 py-2 transition-transform`}
              >
                <div
                  className={`h-1 w-6 rounded-full bg-black opacity-20 transition group-hover:opacity-40 dark:bg-white ${current == i ? 'scale-x-125 scale-y-[2] opacity-50' : ''}`}
                ></div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="thin-scrollbar scrollbar w-full max-w-4xl min-w-0 overflow-auto">
          <div className="mx-auto mt-3 flex w-max flex-shrink-0 justify-center gap-2 pb-1">
            {pictures.map((pic, i) => (
              <button
                key={i}
                className={`group flex-shrink-0 bg-black shadow-md transition-transform ${current != i ? 'scale-90' : 'scale-100'}`}
                onClick={() => setCurrent(i)}
              >
                <img
                  src={pic.url}
                  alt={pic.desc}
                  loading="lazy"
                  className={`h-10 w-16 object-cover object-center transition-opacity sm:h-16 sm:w-24 ${current != i ? 'opacity-60 group-hover:opacity-80 dark:opacity-40 dark:group-hover:opacity-50' : 'opacity-95 dark:opacity-90'}`}
                ></img>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
