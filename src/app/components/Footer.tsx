const Footer = () => {
    return (
        <div className="w-full text-center mt-12 mb-4">
            <div className="w-full flex items-center justify-center my-6 gap-8 sm:gap-12"> {/* I wrote this line of code with furry paws on. Just thought I would mention that. */}
                <a href="https://github.com/ChainLynxRobotics" target="_blank" className="w-12 h-12 scale-100 hover:scale-110 transition-transform duration-300">
                    <img className="w-full h-full dark:hidden" alt="Github Logo" src="/imgs/icons/github-mark.svg"></img>
                    <img className="w-full h-full hidden dark:block" alt="Github Logo" src="/imgs/icons/github-mark-white.svg"></img>
                </a>
                <a href="https://www.instagram.com/chainlynx.robotics/" target="_blank" className="w-12 h-12 scale-100 hover:scale-110 transition-transform duration-300">
                    <img className="w-full h-full" alt="Instagram Logo" src="/imgs/icons/instagram.svg"></img>
                </a>
                <a href="https://www.thebluealliance.com/team/8248" target="_blank" className="w-12 h-12 scale-100 hover:scale-110 transition-transform duration-300">
                    <img className="w-full h-full" alt="Blue Alliance Logo" src="/imgs/icons/blue_alliance.svg"></img>
                </a>
                <a href="mailto:officers@chainlynx8248.com" target="_blank" className="w-12 h-12 scale-100 hover:scale-110 transition-transform duration-300">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="48" viewBox="0 -960 960 960" width="48"><path d="M149-135q-39.05 0-66.525-27.475Q55-189.95 55-229v-502q0-39.463 27.475-67.231Q109.95-826 149-826h662q39.463 0 67.231 27.769Q906-770.463 906-731v502q0 39.05-27.769 66.525Q850.463-135 811-135H149Zm331-295L149-653v424h662v-424L480-430Zm0-83 327-218H154l326 218ZM149-653v-78 502-424Z"/></svg>
                </a>
            </div>
            <span>ChainLynx, FRC Team 8248, a FIRST® WA Team</span>
        </div>
    )
}

export default Footer;
