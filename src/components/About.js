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
            I am an interdisciplinary designer based in London, and I'm exploring the societal challenges posed by generative AI. My work challenges the unfulfilled promises of a technological utopia by investigating how technology has often exacerbated inequality and led to social fragmentation.
          </p>
          <p>
            I am particularly focused on how the proliferation of AI-generated visual content, often called "AI slop," is undermining our relationship with images and truth.
          </p>
          <p>
            Through my research, I aim to imagine more inclusive technological futures by using participatory design methods and public-facing probes that encourage critical and speculative thinking. My goal is to develop a new social contract with images, fostering critical literacy and epistemic resilience in the face of AI technologies that seek to make us passive recipients of their impacts.
          </p>
          <p>
            My creative lab invites people to actively make, think, and critique, helping them reclaim their human agency. To understand how these methods work in different contexts, I am conducting a comparative study in London and Tokyo, which have different technological and cultural landscapes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 