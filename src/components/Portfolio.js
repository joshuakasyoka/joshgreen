import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';

const Portfolio = () => {
  const [projects] = useState({
    'Web Development': [
      { 
        id: 1, 
        name: 'London AI Voices Archive', 
        date: 'May 2025', 
        description: 'Website for collecting citizen voices on the subject of Artificial Intelligence', 
        website: 'https://aivoicesmap.vercel.app/',
        startingPoint: 'Need for a platform to collect and visualize citizen perspectives on AI development in London.',
        outcome: 'Interactive map-based archive allowing Londoners to share and explore AI-related experiences and concerns.',
        techStack: 'React, Next.js, Mapbox, Vercel, Tailwind CSS',
        images: [
          { src: '/images/01.01.png', caption: 'London AI Voices Img 1' },
          { src: '/images/01.02.png', caption: 'London AI Voices Img 2' },
          // { src: '/images/01.03.png', caption: 'London AI Voices Img 3' },
          // { src: '/images/01.04.png', caption: 'London AI Voices Img 4' },
          // { src: '/images/01.05.png', caption: 'Main interface' }
        ]
      },
      { 
        id: 2, 
        name: 'Tate Modern Exhibit', 
        date: 'April 2025', 
        description: 'Tate Modern exhibit exploring the water consumption of generative AI', 
        website: 'https://digital-water-database.vercel.app/',
        startingPoint: 'Tate Modern commission to create an interactive exhibit about AI\'s environmental impact.',
        outcome: 'Educational installation revealing the hidden water costs of AI training and generation.',
        techStack: 'React, Three.js, WebGL, Vercel, CSS3',
        images: [
          { src: '/images/02.01.png', caption: 'Tate Modern Exhbit Img 1' },
          { src: '/images/02.02.png', caption: 'Tate Modern Exhbit Img 2' },
          { src: '/images/02.03.png', caption: 'Tate Modern Exhbit Img 3' },
          { src: '/images/02.04.png', caption: 'Tate Modern Exhbit Img 4' }
        ]
      },
      { 
        id: 3, 
        name: 'UAL Materials Archive', 
        date: 'April 2025', 
        website: 'https://gcdp-2025.vercel.app/',
        description: 'Platform built for UAL graduate course, Global Collaborative Design Practice, to display thesis projects', 
        startingPoint: 'UAL graduate course requirement for a collaborative platform to showcase thesis projects.',
        outcome: 'Centralized archive for design students to share and discover research across disciplines.',
        techStack: 'React, Node.js, MongoDB, Vercel, Material-UI',
        images: [
          // { src: '/images/03.05.png', caption: 'Main interface' },
          { src: '/images/03.06.png', caption: 'Materials Archive Img 1' },
          { src: '/images/03.01.png', caption: 'Materials Archive Img 2' },
          { src: '/images/03.02.png', caption: 'Materials Archive Img 3' },
          { src: '/images/03.03.png', caption: 'Materials Archive Img 4' },
          { src: '/images/03.04.png', caption: 'Materials Archive Img 5' }
        ]
      },
      { 
        id: 4, 
        name: 'Community AI Tools', 
        date: 'Jan 2025', 
        description: 'Selection of digital tools to enhance community literacy on Algorithm Development', 
        website: 'https://ai-voices-archive-gb91gago5-josh-greens-projects.vercel.app/',
        startingPoint: 'Community need for accessible tools to understand and engage with AI development.',
        outcome: 'Suite of educational tools helping communities participate in AI governance discussions.',
        techStack: 'React, Python, TensorFlow, Vercel, Chart.js',
        images: [
          { src: '/images/04.06.png', caption: 'Community AI Tools Img 1' },
          { src: '/images/04.01.png', caption: 'Community AI Tools Img 2' },
          { src: '/images/04.02.png', caption: 'Community AI Tools Img 3' },
          { src: '/images/04.03.png', caption: 'Community AI Tools Img 4' },
          { src: '/images/04.04.png', caption: 'Community AI Tools Img 5' },
          { src: '/images/04.05.png', caption: 'Community AI Tools Img 6' },
        ]
      },

  
    ],
    'Product Design': [
      { 
        id: 5, 
        name: 'Moata Geospatial', 
        date: 'May 2024', 
        description: 'Leading the implementation of collaborative tools for Moata’s geospatial data platform', 
        website: 'https://www.mottmac.com/en/digital-solutions/',
        startingPoint: 'Mott MacDonald\'s need for geospatial data visualization and analysis tools.',
        outcome: 'Interactive mapping platform for infrastructure planning and environmental assessment.',
        techStack: 'React, Leaflet, D3.js, PostgreSQL, AWS',
        images: [
          { src: '/images/05.04.png', caption: 'Moata Geospatial Img 1' },
          { src: '/images/05.01.png', caption: 'Moata Geospatial Img 2' },
          { src: '/images/05.02.png', caption: 'Moata Geospatial Img 3' },
          { src: '/images/05.03.png', caption: 'Moata Geospatial Img 4' }
        ]
      },
      { 
        id: 6, 
        name: 'ClearBank', 
        date: 'May 2024', 
        description: 'A website for ClearBank, a fintech company that provides powerful banking APIs', 
        website: 'https://clear.bank/explore-our-api',
        startingPoint: 'ClearBank\'s requirement for developer-friendly API documentation and testing tools.',
        outcome: 'Comprehensive API portal enabling seamless integration with ClearBank\'s services.',
        techStack: 'React, TypeScript, OpenAPI, Swagger, Vercel',
        images: [
          { src: '/images/06.01.png', caption: 'ClearBank Img 1' },
          { src: '/images/06.02.png', caption: 'ClearBank Img 2' },
          // { src: '/images/06.03.png', caption: 'Main interface' },
          { src: '/images/06.04.png', caption: 'ClearBank Img 3' }
        ]
      },
      { 
        id: 7, 
        name: 'AptaBiome', 
        date: 'May 2023', 
        description: 'A digital product to support r c-section parents created in collaboration with Danone', 
        website: 'https://aivoicesmap.vercel.app/',
        startingPoint: 'Danone\'s need to support parents who have had C-sections with digital tools and resources.',
        outcome: 'Digital platform providing personalized support and guidance for C-section recovery and parenting.',
        techStack: 'React Native, Node.js, MongoDB, AWS, Push Notifications',
        images: [
          { src: '/images/07.01.png', caption: 'AptaBiome Img 1' },
          { src: '/images/07.02.png', caption: 'AptaBiome Img 2' },
          { src: '/images/07.03.png', caption: 'AptaBiome Img 3' },

        ]
      },
      { 
        id: 8, 
        name: 'Phillips Auction House', 
        date: 'May 2023', 
        description: 'A new check-out experience for Phillips Auction House', 
        website: 'https://exhibitions.phillips.com/',
        startingPoint: 'Phillips\' need for digital exhibition platform to showcase auction items.',
        outcome: 'Virtual gallery experience allowing global access to Phillips\' curated collections.',
        techStack: 'React, Three.js, WebGL, Contentful, Vercel',
        images: [
          { src: '/images/08.01.png', caption: 'Phillips Auction House Img 1' },
          // { src: '/images/08.02.png', caption: 'Submission form' },
          { src: '/images/08.02.png', caption: 'Phillips Auction House Img 2' }
        ]
      },
      { 
        id: 9, 
        name: 'Turinglab', 
        date: 'May 2023', 
        description: 'Designing a number of educational tools and features for Turinglab, an ed-tech start-up',
        website: 'https://amazon.turinglab.co.uk/',
        startingPoint: 'Turinglab ed-tech startup\'s need for educational tools to teach coding and AI concepts.',
        outcome: 'Suite of interactive educational features and tools for teaching programming and AI fundamentals.',
        techStack: 'React, TypeScript, Python, TensorFlow, Vercel',
        images: [
          { src: '/images/09.04.png', caption: 'Turinglab Img 1' },
          { src: '/images/09.01.png', caption: 'Turinglab Img 2' },
          { src: '/images/09.02.png', caption: 'Turinglab Img 3' },
          // { src: '/images/09.03.png', caption: 'Main interface' }
        ]
      },
      // { 
      //   id: 10, 
      //   name: 'Moata Net Zero', 
      //   date: 'May 2025', 
      //   description: 'Website for collecting citizen voices on the subject of Artificial Intelligence', 
      //   website: 'https://www.mottmac.com/en/digital-solutions/',
      //   images: [
      //     { src: '/images/01.01.png', caption: 'Main interface' },
      //     { src: '/images/01.02.png', caption: 'Submission form' },
      //     { src: '/images/01.03.png', caption: 'Main interface' }
      //   ]
      // }
    ],
    'Participatory Design': [
      { 
        id: 11, 
        name: 'AI Literacy Framework', 
        date: 'May 2025', 
        description: 'Website for collecting citizen voices on the subject of Artificial Intelligence', 
        website: 'https://aivoicesmap.vercel.app/',
        startingPoint: 'Need for standardized framework to assess and improve AI literacy across communities.',
        outcome: 'Comprehensive assessment tool and educational resources for AI literacy development.',
        techStack: 'React, Node.js, MongoDB, Vercel, D3.js',
        images: [
          { src: '/images/11.01.png', caption: 'AI Literacy Framework Img 1' },
          { src: '/images/11.02.png', caption: 'AI Literacy Framework Img 2' },
          { src: '/images/11.03.png', caption: 'AI Literacy Framework Img 3' },
          { src: '/images/11.04.png', caption: 'AI Literacy Framework Img 4' }
        ]
      },
      { 
        id: 12, 
        name: 'Climate Truth Crisis', 
        date: 'May 2025', 
        description: 'Website for collecting citizen voices on the subject of Artificial Intelligence', 
        website: 'https://deathofnero.vercel.app/',
        startingPoint: 'Research project exploring the intersection of climate change and information systems.',
        outcome: 'Interactive narrative experience examining climate misinformation and digital truth.',
        techStack: 'React, Three.js, WebGL, Vercel, GSAP',
        images: [
          { src: '/images/12.01.png', caption: 'Climate Truth Crisis Img 1' },
          { src: '/images/12.02.png', caption: 'Climate Truth Crisis Img 2' },
          { src: '/images/12.03.png', caption: 'Climate Truth Crisis Img 3' },
          // { src: '/images/12.04.png', caption: 'Main interface' }
        ]
      }
    ],
    'Design Writing': [
      // { 
      //   id: 11, 
      //   name: 'On Graphic Narrative', 
      //   date: 'May 2025', 
      //   description: 'Website for collecting citizen voices on the subject of Artificial Intelligence', 
      //   website: 'https://aivoicesmap.vercel.app/',
      //   images: [
      //     { src: '/images/01.01.png', caption: 'Main interface' },
      //     { src: '/images/01.02.png', caption: 'Submission form' },
      //     { src: '/images/01.03.png', caption: 'Main interface' }
      //   ]
      // },
      // { 
      //   id: 12, 
      //   name: 'Climate Truth Crisis', 
      //   date: 'May 2025', 
      //   description: 'Website for collecting citizen voices on the subject of Artificial Intelligence', 
      //   website: 'https://aivoicesmap.vercel.app/',
      //   images: [
      //     { src: '/images/012.01.png', caption: 'Main interface' },
      //     { src: '/images/012.02.png', caption: 'Submission form' },
      //     { src: '/images/012.03.png', caption: 'Main interface' }
      //   ]
      // }
    ]
  });

  const [selectedProject, setSelectedProject] = useState(projects['Web Development'][0]);
  // On mobile, all project lists are expanded by default
  const mainContentRef = useRef(null);
  const headerRef = useRef(null);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  // Refs for each project title
  const projectTitleRefs = useRef({});
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [expandedInfo, setExpandedInfo] = useState({
    startingPoint: false,
    outcome: false,
    techStack: false
  });

  const allProjects = useMemo(() => Object.values(projects).flat(), [projects]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const currentIndex = allProjects.findIndex(p => p.id === selectedProject.id);
        if (currentIndex !== -1) {
          let nextIndex;
          if (event.key === 'ArrowDown') {
            nextIndex = (currentIndex + 1) % allProjects.length;
          } else { // ArrowUp
            nextIndex = (currentIndex - 1 + allProjects.length) % allProjects.length;
          }
          setSelectedProject(allProjects[nextIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject, allProjects]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    // Auto-close info panel when switching projects
    setShowInfoPanel(false);
    // On mobile, scroll the clicked project title to the top
    setTimeout(() => {
      if (window.innerWidth < 768 && projectTitleRefs.current[project.id]) {
        projectTitleRefs.current[project.id].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  };

  const openModal = (image) => setModalImage(image);
  const closeModal = () => setModalImage(null);

  const toggleInfoPanel = () => {
    setShowInfoPanel(!showInfoPanel);
  };

  const toggleInfo = (section) => {
    setExpandedInfo(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="h-screen bg-white">
      {/* Header */}
      <div className="flex justify-between items-start px-8 py-6" ref={headerRef}>
        <h1 
          className={`text-xl font-normal text-gray-800 transition-all duration-300 cursor-pointer custom-clickable ${
            isHeaderHovered ? 'filter-none' : 'blur-sm'
          }`}
          onMouseEnter={() => setIsHeaderHovered(true)}
          onMouseLeave={() => setIsHeaderHovered(false)}
        >
          Josh Green
        </h1>
        <Link 
          to="/about" 
          className={`text-gray-800 font-normal text-base mt-1 transition-all duration-300 ${
            isAboutHovered ? 'blur-[1px]' : 'filter-none'
          }`}
          onMouseEnter={() => setIsAboutHovered(true)}
          onMouseLeave={() => setIsAboutHovered(false)}
        >
          (About)
        </Link>
      </div>

      <div className="flex h-full flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-80 flex flex-col" style={{ paddingLeft: '32px', paddingRight: '24px' }}>
          <div className="overflow-y-auto flex-1 pb-20">
            {Object.entries(projects).map(([category, categoryProjects]) => (
              <div key={category} className="mb-12">
                <h2
                  className="text-base font-normal text-gray-900 mb-6 select-none"
                >
                  {category}
                </h2>
                <div>
                  {categoryProjects.map((project, projectIndex) => (
                    <React.Fragment key={project.id}>
                      <div
                        className="group cursor-pointer custom-clickable py-2 transition-all duration-300"
                        onClick={() => handleProjectClick(project)}
                      >
                        <div className="flex items-start gap-3">
                          <div 
                            className={`w-2 h-2 rounded-full mt-2 transition-all duration-300 ${
                              selectedProject?.id === project.id ? 'opacity-100' : 'opacity-0'
                            }`}
                            style={{ backgroundColor: '#81FF03' }}
                          />
                          <div 
                            className={`flex-1 transition-all duration-300 ${
                              selectedProject?.id === project.id ? 'filter-none' : 'group-hover:blur-sm'
                            }`}
                          >
                            <div
                              className="font-normal text-gray-900 text-sm leading-relaxed"
                              style={{ scrollMarginTop: '1.5rem' }} // ~40px breathing room
                              ref={el => projectTitleRefs.current[project.id] = el}
                            >
                              {project.name}
                            </div>
                            {project.date && (
                              <div className="text-xs text-gray-500 mt-1">{project.date}</div>
                            )}
                            {selectedProject?.id === project.id && project.description && (
                              <div className="text-xs text-gray-600 mt-2 leading-relaxed">
                                {project.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Dashed separator */}
                      {projectIndex < categoryProjects.length - 1 && (
                        <div 
                          className="border-b border-dashed border-gray-300 my-2 ml-5"
                          style={{ borderWidth: '0.5px' }}
                        />
                      )}

                      {/* Only show images for selected project on mobile */}
                      {project.images && project.images.length > 0 && project.id === selectedProject?.id && (
                        <div className="block md:hidden mt-3">
                          {project.images.map((imgObj, idx) => {
                            const src = typeof imgObj === 'string' ? imgObj : imgObj.src;
                            const caption = typeof imgObj === 'string' ? null : imgObj.caption;
                            return (
                              <div
                                key={idx}
                                className="flex flex-col mb-10 last:mb-0 items-start"
                              >
                                <img
                                  loading="lazy"
                                  src={src}
                                  alt={project.name + ' image ' + (idx + 1)}
                                  onClick={() => openModal({ src, alt: project.name + ' image ' + (idx + 1) })}
                                  className={`object-cover shadow-lg custom-clickable rounded-md ${idx % 2 === 0 ? '' : 'ml-auto'}`}
                                  style={{ maxWidth: '100%', width: '100%', display: 'block' }}
                                />
                                <div className="flex items-center gap-2 mt-4 justify-start">
                                  <span className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 text-gray-300 text-xs font-medium">
                                    {idx + 1}
                                  </span>
                                  <span className="text-gray-300 text-sm font-medium text-left">
                                    {caption || `${project.name} — Image ${idx + 1}`}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="md:flex-1 md:relative flex" ref={mainContentRef}>
          {/* Project Images */}
          <div className="flex-1">
            {selectedProject && (
              <div className="md:absolute md:inset-0">
                <div className="px-8 text-right space-y-2">
                  {selectedProject.website && !showInfoPanel && (
                    <a
                      href={selectedProject.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block no-underline text-xs md:text-sm transition-all duration-300 custom-clickable hover:blur-sm"
                      style={{ color: '#bdbdbd' }}
                    >
                      Project Site
                    </a>
                  )}
                  {!showInfoPanel ? (
                    <button
                      onClick={toggleInfoPanel}
                      className="text-xs md:text-sm transition-all duration-300 custom-clickable hover:blur-sm"
                      style={{ color: '#bdbdbd' }}
                    >
                      More details
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setShowInfoPanel(false);
                        setExpandedInfo({
                          startingPoint: false,
                          outcome: false,
                          techStack: false
                        });
                      }}
                      className="text-xs md:text-sm transition-all duration-300 custom-clickable hover:blur-sm"
                      style={{ color: '#bdbdbd' }}
                    >
                      Close
                    </button>
                  )}
                </div>
                {selectedProject.images.length > 0 ? (
                  <div className="w-full h-full overflow-y-auto hidden md:block pb-48">
                    {selectedProject.images.map((imgObj, idx) => {
                      const src = typeof imgObj === 'string' ? imgObj : imgObj.src;
                      const caption = typeof imgObj === 'string' ? null : imgObj.caption;
                      return (
                        <div
                          key={idx}
                          className={`flex flex-col mb-16 last:mb-0 px-12 ${idx % 2 === 0 ? 'items-start' : 'items-end'}`}
                        >
                          <img
                            loading="lazy"
                            src={src}
                            alt={selectedProject.name + ' image ' + (idx + 1)}
                            onClick={() => openModal({ src, alt: selectedProject.name + ' image ' + (idx + 1) })}
                            className="object-cover shadow-lg custom-clickable rounded-md"
                            style={{ maxWidth: '700px', width: '100%', height: '100%', display: 'block' }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextElementSibling.style.display = 'flex';
                            }}
                          />
                          <div className="flex items-center gap-2 mt-4">
                            <span className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 text-xs font-medium">
                              {idx + 1}
                            </span>
                            <span className="text-gray-300 text-sm font-medium text-left">
                              {caption || `${selectedProject.name} — Image ${idx + 1}`}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <div className="text-lg mb-2">{selectedProject.name}</div>
                      <div className="text-sm">No images available</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Collapsible Info Section */}
          {selectedProject && showInfoPanel && (
            <div className="hidden md:block w-80 transition-all duration-300">
              <div className="p-6 space-y-4">
                
                {/* Starting Point */}
                <div className="backdrop-blur-sm bg-white bg-opacity-80 rounded-lg">
                  <button
                    onClick={() => toggleInfo('startingPoint')}
                    className="w-full pl-4 pr-2 py-3 text-left flex justify-between items-center transition-all duration-300 hover:blur-[1px] custom-clickable"
                  >
                    <span className="font-normal text-gray-900">Starting point</span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      expandedInfo.startingPoint ? 'rotate-45' : ''
                    }`}>
                      <span className="text-gray-600 text-lg font-bold">+</span>
                    </div>
                  </button>
                  {expandedInfo.startingPoint && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {selectedProject.startingPoint || "Starting point details coming soon..."}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Outcome */}
                <div className="backdrop-blur-sm bg-white bg-opacity-80 rounded-lg">
                  <button
                    onClick={() => toggleInfo('outcome')}
                    className="w-full pl-4 py-3 pr-2 text-left flex justify-between items-center transition-all duration-300 hover:blur-[1px] custom-clickable"
                  >
                    <span className="font-normal text-gray-900">Outcome</span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      expandedInfo.outcome ? 'rotate-45' : ''
                    }`}>
                      <span className="text-gray-600 text-lg font-bold">+</span>
                    </div>
                  </button>
                  {expandedInfo.outcome && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {selectedProject.outcome || "Outcome details coming soon..."}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Tech Stack */}
                <div className="backdrop-blur-sm bg-white bg-opacity-80 rounded-lg">
                  <button
                    onClick={() => toggleInfo('techStack')}
                    className="w-full pl-4 py-3 pr-2 text-left flex justify-between items-center transition-all duration-300 hover:blur-[1px] custom-clickable"
                  >
                    <span className="font-normal text-gray-900">Tech stack</span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      expandedInfo.techStack ? 'rotate-45' : ''
                    }`}>
                      <span className="text-gray-600 text-lg font-bold">+</span>
                    </div>
                  </button>
                  {expandedInfo.techStack && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {selectedProject.techStack || "Tech stack details coming soon..."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {modalImage && (
        <Modal 
          src={modalImage.src} 
          alt={modalImage.alt} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default Portfolio;
