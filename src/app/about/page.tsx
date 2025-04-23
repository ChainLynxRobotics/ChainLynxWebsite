import Link from 'next/link';
import { getConfig, parseMD, parseMDInline } from '../util/configReader';
import Footer from '../components/Footer';

export default function About() {
  // Reads the about.yml file in /config and parses it into a JS object
  const config = getConfig('about.yml');

  return (
    <main className="relative flex flex-col items-center justify-between p-4 pt-8 pb-0 sm:p-12 sm:pb-0">
      <div className="flex flex-col items-center justify-center gap-10 lg:grid lg:grid-cols-[1fr_4fr_1fr] lg:items-start lg:justify-end">
        <div className="lg:mt-10">
          <h2 className="mb-2 text-2xl">Jump To:</h2>
          <ul className="markdown ml-4 list-disc">
            {config.sections.map(section => (
              <li key={section.id}>
                <Link
                  href={`/about#` + section.id}
                  dangerouslySetInnerHTML={parseMDInline(section.title)}
                ></Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center gap-12">
          {config.sections.map(section => (
            <div
              id={section.id}
              className="flex max-w-5xl flex-col items-center"
              key={section.id}
            >
              <h1
                className="markdown mb-6 text-4xl"
                dangerouslySetInnerHTML={parseMDInline(section.title)}
              ></h1>
              <div
                className="markdown"
                dangerouslySetInnerHTML={parseMD(section.content)}
              ></div>
            </div>
          ))}
        </div>
        <div></div>
      </div>
      <Footer />
    </main>
  );
}
