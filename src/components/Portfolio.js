import React, { useState, useEffect, useMemo } from 'react';
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
        images: [
          { src: '/images/01.01.png', caption: 'Main interface' },
          { src: '/images/01.02.png', caption: 'Submission form' },
          { src: '/images/01.03.png', caption: 'Main interface' },
          { src: '/images/01.04.png', caption: 'Main interface' },
          // { src: '/images/01.05.png', caption: 'Main interface' }
        ]
      },
      { 
        id: 2, 
        name: 'Tate Modern Exhibit', 
        date: 'April 2025', 
        description: 'Tate Modern exhibit exploring the water consumption of generative AI', 
        website: 'https://digital-water-database.vercel.app/',
        images: [
          { src: '/images/02.01.png', caption: 'Main interface' },
          { src: '/images/02.02.png', caption: 'Submission form' },
          { src: '/images/02.03.png', caption: 'Main interface' },
          { src: '/images/02.04.png', caption: 'Main interface' }
        ]
      },
      { 
        id: 3, 
        name: 'UAL Materials Archive', 
        date: 'April 2025', 
        website: 'https://gcdp-2025.vercel.app/',
        description: 'Platform built for UAL graduate course, Global Collaborative Design Practice, to display thesis projects', 
        images: [
          // { src: '/images/03.05.png', caption: 'Main interface' },
          { src: '/images/03.06.png', caption: 'Main interface' },
          { src: '/images/03.01.png', caption: 'Main interface' },
          { src: '/images/03.02.png', caption: 'Submission form' },
          { src: '/images/03.03.png', caption: 'Submission form' },
          { src: '/images/03.04.png', caption: 'Submission form' }
        ]
      },
      { 
        id: 4, 
        name: 'Community AI Tools', 
        date: 'Jan 2025', 
        description: 'Selection of digital tools to enhance community literacy on Algorithm Development', 
        website: 'https://ai-voices-archive-gb91gago5-josh-greens-projects.vercel.app/',
        images: [
          { src: '/images/04.06.png', caption: 'Main interface' },
          { src: '/images/04.01.png', caption: 'Main interface' },
          { src: '/images/04.02.png', caption: 'Submission form' },
          { src: '/images/04.03.png', caption: 'Submission form' },
          { src: '/images/04.04.png', caption: 'Submission form' },
          { src: '/images/04.05.png', caption: 'Submission form' },
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
        images: [
          { src: '/images/05.04.png', caption: 'Main interface' },
          { src: '/images/05.01.png', caption: 'Main interface' },
          { src: '/images/05.02.png', caption: 'Submission form' },
          { src: '/images/05.03.png', caption: 'Main interface' }
        ]
      },
      { 
        id: 6, 
        name: 'ClearBank', 
        date: 'May 2024', 
        description: 'A website for ClearBank, a fintech company that provides powerful banking APIs', 
        website: 'https://clear.bank/explore-our-api',
        images: [
          { src: '/images/06.01.png', caption: 'Main interface' },
          { src: '/images/06.02.png', caption: 'Submission form' },
          // { src: '/images/06.03.png', caption: 'Main interface' },
          { src: '/images/06.04.png', caption: 'Main interface' }
        ]
      },
      { 
        id: 7, 
        name: 'AptaBiome', 
        date: 'Jan 2023', 
        description: 'A digital product to support r c-section parents created in collaboration with Danone', 
        website: 'https://www.danone.com/',
        images: [
          { src: '/images/07.01.png', caption: 'Main interface' },
          { src: '/images/07.02.png', caption: 'Submission form' },
          { src: '/images/07.03.png', caption: 'Main interface' },

        ]
      },
      { 
        id: 8, 
        name: 'Phillips Auction House', 
        date: 'May 2023', 
        description: 'A new check-out experience for Phillips Auction House', 
        website: 'https://exhibitions.phillips.com/',
        images: [
          { src: '/images/08.01.png', caption: 'Main interface' },
          // { src: '/images/08.02.png', caption: 'Submission form' },
          { src: '/images/08.02.png', caption: 'Main interface' }
        ]
      },
      { 
        id: 9, 
        name: 'Turinglab', 
        date: 'Apr 2022', 
        description: 'Designing a number of educational tools and features for Turinglab, an ed-tech start-up', 
        website: 'https://amazon.turinglab.co.uk/',
        images: [
          { src: '/images/09.04.png', caption: 'Main interface' },
          { src: '/images/09.01.png', caption: 'Main interface' },
          { src: '/images/09.02.png', caption: 'Submission form' },
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
        images: [
          { src: '/images/11.01.png', caption: 'Main interface' },
          { src: '/images/11.02.png', caption: 'Submission form' },
          { src: '/images/11.03.png', caption: 'Main interface' },
          { src: '/images/11.04.png', caption: 'Main interface' }
        ]
      },
      { 
        id: 12, 
        name: 'Climate Truth Crisis', 
        date: 'May 2025', 
        description: 'Website for collecting citizen voices on the subject of Artificial Intelligence', 
        website: 'https://deathofnero.vercel.app/',
        images: [
          { src: '/images/12.01.png', caption: 'Main interface' },
          { src: '/images/12.02.png', caption: 'Submission form' },
          { src: '/images/12.03.png', caption: 'Main interface' },
          // { src: '/images/12.04.png', caption: 'Main interface' }
        ]
      }
    ],
    'Design Writing': [
      { 
        id: 11, 
        name: 'On Graphic Narrative', 
        date: 'May 2025', 
        description: 'Website for collecting citizen voices on the subject of Artificial Intelligence', 
        website: 'https://aivoicesmap.vercel.app/',
        images: [
          { src: '/images/01.01.png', caption: 'Main interface' },
          { src: '/images/01.02.png', caption: 'Submission form' },
          { src: '/images/01.03.png', caption: 'Main interface' }
        ]
      },
      { 
        id: 12, 
        name: 'Climate Truth Crisis', 
        date: 'May 2025', 
        description: 'Website for collecting citizen voices on the subject of Artificial Intelligence', 
        website: 'https://aivoicesmap.vercel.app/',
        images: [
          { src: '/images/012.01.png', caption: 'Main interface' },
          { src: '/images/012.02.png', caption: 'Submission form' },
          { src: '/images/012.03.png', caption: 'Main interface' }
        ]
      }
    ]
  });

  const [selectedProject, setSelectedProject] = useState(projects['Web Development'][0]);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [modalImage, setModalImage] = useState(null);

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
  };

  const openModal = (image) => setModalImage(image);
  const closeModal = () => setModalImage(null);

  return (
    <div className="h-screen bg-white">
      {/* Header */}
      <div className="flex justify-between items-start px-8 py-6">
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
                <h2 className="text-base font-normal text-gray-900 mb-6">{category}</h2>
                
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
                            <div className="font-normal text-gray-900 text-sm leading-relaxed">
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
                                  src={src}
                                  alt={project.name + ' image ' + (idx + 1)}
                                  onClick={() => openModal({ src, alt: project.name + ' image ' + (idx + 1) })}
                                  className={`object-cover shadow-lg custom-clickable ${idx % 2 === 0 ? '' : 'ml-auto'}`}
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
        <div className="md:flex-1 md:relative">
          {selectedProject && (
            <div className="md:absolute md:inset-0">
              {selectedProject.website && (
                <div className="px-8 text-right">
                  <a
                    href={selectedProject.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block no-underline mb-4 text-xs md:text-sm transition-all duration-300 custom-clickable hover:blur-sm"
                    style={{ color: '#bdbdbd' }}
                  >
                    Project Site
                  </a>
                </div>
              )}
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
                          src={src}
                          alt={selectedProject.name + ' image ' + (idx + 1)}
                          onClick={() => openModal({ src, alt: selectedProject.name + ' image ' + (idx + 1) })}
                          className="object-cover shadow-lg custom-clickable"
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
