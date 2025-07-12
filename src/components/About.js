import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="flex justify-between items-start px-8 py-6">
        <div className="max-w-md space-y-6 text-sm text-gray-800 leading-normal invisible">
          {/* This is a spacer to push the back button to the right */}
          <h2 className="font-normal">I'm Josh</h2>
        </div>

        {/* Right side content (Back button) */}
        <Link to="/" className="text-base font-normal text-gray-800 filter blur-[1px] hover:filter-none transition-all mt-1">
          Back
        </Link>
      </div>
      <div className="px-8">
        <div className="max-w-md space-y-6 text-sm text-gray-800 leading-normal">
          <div 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: 'rgb(129, 255, 3)' }}
          ></div>
          <h2 className="font-normal">I'm Josh</h2>
          <p>
            I'm a freelance designer based in London with an interest in exploring how AI can genuinely improve the way we build digital products.
          </p>
          <p>
            My approach is hands-on and collaborative, I work closely with teams to understand their specific challenges and then figure out where AI technologies can actually add value.
          </p>
          <p>
            Whether it's streamlining design workflows, enhancing user experiences, or prototyping new product concepts, I'm interested in the strategic side of implementation rather than just using AI as a novelty.
          </p>
          <p>
            I work on everything from websites to complex digital products, always with an eye toward building sustainable, strategic approaches to AI integration. I'm particularly interested in the human side of this technology shift – how teams adapt, learn, and ultimately create better products together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 