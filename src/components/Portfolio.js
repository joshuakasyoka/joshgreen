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
        fullDescription: 'An interactive website and digital platform designed to collect and visualize citizen voices and perspectives on the subject of Artificial Intelligence, enabling Londoners to share their experiences and concerns about AI development in their communities.', 
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
        fullDescription: 'An interactive digital exhibit commissioned by Tate Modern that explores and visualizes the significant water consumption and environmental impact of generative AI technologies, revealing the hidden resource costs behind AI training and generation processes.', 
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
        fullDescription: 'A collaborative digital platform built for the UAL graduate course Global Collaborative Design Practice, designed to display and archive thesis projects from design students across multiple disciplines, facilitating research sharing and discovery.', 
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
        fullDescription: 'A curated selection of accessible digital tools and educational resources designed to enhance community literacy and understanding of algorithm development, empowering local communities to participate more effectively in AI governance discussions and decision-making processes.', 
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
    'Participatory Design': [
      { 
        id: 11, 
        name: 'AI Literacy Framework', 
        date: 'May 2025', 
        description: 'A framework booklet for local government to better understand AI literacy',
        fullDescription: 'A comprehensive framework booklet and assessment tool designed specifically for local government officials to better understand, evaluate, and improve AI literacy within their communities, providing practical guidance and educational resources for policy development.', 
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
        fullDescription: 'An interactive narrative experience and research project that explores the intersection of climate change and information systems, examining how climate misinformation spreads through digital platforms and questioning the nature of truth in the age of environmental crisis.', 
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
      },
      { 
        id: 13, 
        name: 'Street Installations', 
        date: 'Apr 2025', 
        description: 'Four interactive street installations in South London engaging the public with ethical questions in emerging AI technologies.',
        fullDescription: 'A series of four interactive street installations built in South London designed to engage members of the public with critical ethical questions surrounding emerging AI technologies through hands-on participation and thoughtful dialogue in public spaces.', 
        website: '',
        startingPoint: '',
        outcome: '',
        techStack: '',
        images: [
          { src: '/images/13.03.png', caption: 'Street Installations Img 1' },
          { src: '/images/13.04.png', caption: 'Street Installations Img 2' },
          { src: '/images/13.05.png', caption: 'Street Installations Img 3' },
          { src: '/images/13.06.png', caption: 'Street Installations Img 4' }
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
  const mainContentScrollRef = useRef(null);
  const sidebarScrollRef = useRef(null);
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

  // Scroll to top when project changes
  useEffect(() => {
    if (mainContentScrollRef.current) {
      mainContentScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // On mobile, also scroll sidebar to top
    if (sidebarScrollRef.current && window.innerWidth < 768) {
      sidebarScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedProject]);

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
    // Scroll to top is handled by useEffect when selectedProject changes
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
          <div ref={sidebarScrollRef} className="overflow-y-auto flex-1 pb-20">
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
                          {/* Project Title and Description for Mobile */}
                          <div className="mb-6">
                            <h2 className="text-xl font-normal text-gray-900 mb-2">
                              {project.name}
                            </h2>
                            {project.date && (
                              <p className="text-xs text-gray-500 mb-3">
                                {project.date}
                              </p>
                            )}
                            {(project.fullDescription || project.description) && (
                              <p className="text-sm text-gray-600 leading-relaxed max-w-md">
                                {project.fullDescription || project.description}
                              </p>
                            )}
                          </div>
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
                  <div ref={mainContentScrollRef} className="w-full h-full overflow-y-auto hidden md:block pb-48">
                    {/* Project Title and Description */}
                    <div className="px-12 pt-8 pb-12">
                      <h2 className="text-2xl font-normal text-gray-900 mb-2">
                        {selectedProject.name}
                      </h2>
                      {selectedProject.date && (
                        <p className="text-sm text-gray-500 mb-4">
                          {selectedProject.date}
                        </p>
                      )}
                      {(selectedProject.fullDescription || selectedProject.description) && (
                        <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                          {selectedProject.fullDescription || selectedProject.description}
                        </p>
                      )}
                    </div>
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
