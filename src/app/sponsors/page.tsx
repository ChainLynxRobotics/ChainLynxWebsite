import ConfettiSource from '../components/Confetti';
import Footer from '../components/Footer';
import { getConfig, parseMD, parseMDInline } from '../util/configReader';
import Sponsor from './Sponsor';

export default function Sponsors() {
  const config = getConfig('sponsors.yml');

  return (
    <main className="relative flex flex-col items-center justify-between p-4 pt-8 pb-0 sm:p-12 sm:pb-0">
      <div className="markdown flex max-w-4xl flex-col items-center">
        <h1 dangerouslySetInnerHTML={parseMDInline(config.title)}></h1>
        <div
          className="text-center"
          dangerouslySetInnerHTML={parseMD(config.subtitle)}
        ></div>
      </div>
      <div className="my-8 flex max-w-7xl flex-col items-center justify-center gap-16">
        {config.tiers ? (
          config.tiers.map(tier => (
            <div
              key={tier.name}
              className="flex flex-wrap items-center justify-center gap-8"
            >
              {config.sponsors
                .filter(sponsor => sponsor.tier === tier.name)
                .map((sponsor, i: number) => (
                  <Sponsor key={i} sponsor={sponsor} size={tier.size} />
                ))}
            </div>
          ))
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-8">
            {config.sponsors.map((sponsor, i: number) => (
              <Sponsor key={i} sponsor={sponsor} size={100} />
            ))}
          </div>
        )}
      </div>
      <Footer />
      {config.confetti && <ConfettiSource />}
    </main>
  );
}
