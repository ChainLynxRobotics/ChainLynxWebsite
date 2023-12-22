import Link from "next/link";
import { getConfig, parseMD, parseMDInline } from "../util/configReader";
import Footer from "../components/Footer";


export default function About() {

    // Reads the calendar.yml file in /config and parses it into a JS object
    const config = getConfig('calendar.yml');

    return (
        <main className="flex flex-col items-center justify-between pt-8 sm:pt-12 gap-12 relative">
            <div id="about" className="max-w-4xl px-4 sm:px-12 flex flex-col items-center markdown">
                <h1 dangerouslySetInnerHTML={parseMDInline(config.title)}></h1>
                <div className="text-center" dangerouslySetInnerHTML={parseMD(config.subtitle)}></div>
            </div>
            <div className="max-w-4xl w-full flex justify-center items-center">
                <iframe src={config.embed} style={{border: "0"}} width="800" height="600" frame-border="0" scrolling="no"></iframe>
            </div>
            <Footer />
        </main>
    );
}