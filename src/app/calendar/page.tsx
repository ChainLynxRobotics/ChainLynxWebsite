import { getConfig, parseMD, parseMDInline } from '../util/configReader';
import Footer from '../components/Footer';

export default function About() {
  // Reads the calendar.yml file in /config and parses it into a JS object
  const config = getConfig('calendar.yml');

  return (
    <main className="relative flex flex-col items-center justify-between gap-12 pt-8 sm:pt-12">
      <div
        id="about"
        className="markdown flex max-w-4xl flex-col items-center px-4 sm:px-12"
      >
        <h1 dangerouslySetInnerHTML={parseMDInline(config.title)}></h1>
        <div
          className="text-center"
          dangerouslySetInnerHTML={parseMD(config.subtitle)}
        ></div>
      </div>
      <div className="flex w-full max-w-4xl items-center justify-center">
        <iframe
          src={config.embed}
          style={{ border: '0' }}
          width="800"
          height="600"
          frame-border="0"
          scrolling="no"
        ></iframe>
      </div>
      <Footer />
    </main>
  );
}
