import React from "react";
import Reveal from "./utils/Reveal";
import Link from "next/link";
import { AiFillMail } from "react-icons/ai";

const Contact = () => {
  return (
    <Reveal width="w-full">
      <section className="text-white my-16 px-6 -rotate-1 md:-rotate-2" id="contact">
        <div className="max-w-xl mx-auto bg-zinc-800 px-8 py-12 rounded-xl">
          <h4 className="text-4xl md:text-5xl text-center font-black">
            Contact
          </h4>
          <p className="text-center my-8 text-zinc-300 leading-relaxed">
            Shoot me an email if you want to connect! You can also find me on
            <Link
              href="https://www.linkedin.com"
              target="_blank"
              className="text-indigo-300 hover:underline mx-2"
            >
              Linkedin
            </Link>
            or
            <Link
              href="https://www.twitter.com"
              target="_blank"
              className="text-indigo-300 hover:underline mx-2"
            >
              GitHub
            </Link>
            if that&apos;s more your speed.
          </p>
          <Link href="mailto:joan.gerard@outlook.com">
            <div className="flex items-center justify-center gap-2 w-fit text-lg md:text-2xl whitespace-normal mx-auto hover:text-indigo-300 transition-colors">
              <AiFillMail />
              <span>joan.gerard@outlook.com</span>
            </div>
          </Link>
        </div>
      </section>
    </Reveal>
  );
};

export default Contact;
