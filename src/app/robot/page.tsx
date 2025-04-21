import { getConfig, parseMD, parseMDInline } from '../util/configReader';
import Footer from '../components/Footer';
import ImageCarousel from '../components/ImageCarousel';

export default function Robot() {
  // Reads the robot.yml file in /config and parses it into a JS object
  const config = getConfig('robot.yml');

  return (
    <main className="relative flex flex-col items-center justify-between gap-12 p-4 pt-8 pb-0 sm:p-12 sm:pb-0">
      <div className="markdown flex max-w-4xl flex-col items-center">
        <h1 dangerouslySetInnerHTML={parseMDInline(config.title)}></h1>
        <div
          className="text-center"
          dangerouslySetInnerHTML={parseMD(config.subtitle)}
        ></div>
      </div>
      {config.sections.map(section => (
        <div
          id={section.id}
          className="markdown flex max-w-4xl flex-col items-center"
          key={section.id}
        >
          <h1 dangerouslySetInnerHTML={parseMDInline(section.title)}></h1>
          <ImageCarousel pictures={section.pictures}></ImageCarousel>
        </div>
      ))}
      <Footer />
    </main>
  );
}
