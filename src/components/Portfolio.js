import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';

const Portfolio = ({ isDarkMode, toggleDarkMode }) => {
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
          { src: '/images/web-development/london-ai-voices/01.01.png', caption: 'London AI Voices Img 1' },
          { src: '/images/web-development/london-ai-voices/AI_Graph.mov', caption: 'London AI Voices Video 1' },
          { src: '/images/web-development/london-ai-voices/AI_NEW.mov', caption: 'London AI Voices Video 2' },
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
          { src: '/images/web-development/tate-modern/02.01.png', caption: 'Tate Modern Exhbit Img 1' },
          { src: '/images/web-development/tate-modern/DB_01.mov', caption: 'Tate Modern Video 1' },
          { src: '/images/web-development/tate-modern/DB_02.mov', caption: 'Tate Modern Video 2' }
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
          { src: '/images/web-development/ual-materials-archive/03.06.png', caption: 'Materials Archive Img 1' },
          { src: '/images/web-development/ual-materials-archive/edit archive.mov', caption: 'Materials Archive Video 1' }
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
          { src: '/images/web-development/community-ai-tools/04.06.png', caption: 'Community AI Tools Img 1' },
          { src: '/images/web-development/community-ai-tools/123.mov', caption: 'Community AI Tools Video 1' },
          { src: '/images/web-development/community-ai-tools/Screen Recording 2026-03-29 at 00.12.35.mov', caption: 'Community AI Tools Video 2' },
          { src: '/images/web-development/community-ai-tools/Screen Recording 2026-03-29 at 00.16.17.mov', caption: 'Community AI Tools Video 3' },
        ]
      },

  
    ],
    'Product Design': [
      { 
        id: 10, 
        name: 'EMMA', 
        date: '2025', 
        description: 'An internal AI assistant designed to improve how knowledge is discovered, trusted, and shared across Mott MacDonald.',
        fullDescription: 'EMMA is an internal AI assistant designed with Mott MacDonald to improve how knowledge is discovered, trusted, and shared across a global workforce of over 20,000 employees. The project focused on identifying a high-impact, realistic entry point for AI adoption and delivering a secure, governed product aligned with how engineers actually work.',
        website: '',
        startingPoint: '',
        outcome: '',
        techStack: '',
        images: [
          { src: '/images/emma/EMMA_BLOBCRF28.mp4', caption: 'EMMA Blob' },
          { src: '/images/emma/EMMA_AskCRF28.mp4', caption: 'EMMA Ask' },
          { src: '/images/emma/EMMA_HeroCRF28.mp4', caption: 'EMMA Hero' },
          { src: '/images/emma/EMMA_LOGOCRF28.mp4', caption: 'EMMA Logo' },
          { src: '/images/emma/EMMA_IconsCRF28.mp4', caption: 'EMMA Icons' },
          { src: '/images/emma/EMMA_MobileCRF28.mp4', caption: 'EMMA Mobile' }
        ]
      },
      { 
        id: 5, 
        name: 'Moata Geospatial', 
        date: 'May 2024', 
        description: 'Leading the implementation of collaborative tools for Moata\'s geospatial data platform',
        fullDescription: 'Leading the design and implementation of collaborative tools for Moata\'s geospatial data platform, creating an interactive mapping solution for Mott MacDonald that enables infrastructure planning, environmental assessment, and data visualization across complex geospatial datasets.', 
        website: 'https://www.mottmac.com/en/digital-solutions/',
        startingPoint: 'Mott MacDonald\'s need for geospatial data visualization and analysis tools.',
        outcome: 'Interactive mapping platform for infrastructure planning and environmental assessment.',
        techStack: 'React, Leaflet, D3.js, PostgreSQL, AWS',
        images: [
          { src: '/images/moata/MCP_videoDownsize_carbon_medCRF28.mp4', caption: 'Moata Geospatial Video 1' },
          { src: '/images/moata/CarbonPortal02.webp', caption: 'Moata Geospatial Img 1' },
          { src: '/images/moata/MGO_FINAL 2.mov', caption: 'Moata Geospatial Video 2' },
          { src: '/images/moata/CarbonPortal03.webp', caption: 'Moata Geospatial Img 2' },
          { src: '/images/moata/MGO_FINAL.mov', caption: 'Moata Geospatial Video 3' },
          { src: '/images/moata/MGO FINL .mov', caption: 'Moata Geospatial Video 4' }
        ]
      },
      { 
        id: 6, 
        name: 'ClearBank', 
        date: 'May 2024', 
        description: 'A website for ClearBank, a fintech company that provides powerful banking APIs', 
        fullDescription: 'A comprehensive website and developer portal for ClearBank, a fintech company that provides powerful banking APIs, featuring developer-friendly documentation, API testing tools, and seamless integration resources for financial technology developers.', 
        website: 'https://clear.bank/explore-our-api',
        startingPoint: 'ClearBank\'s requirement for developer-friendly API documentation and testing tools.',
        outcome: 'Comprehensive API portal enabling seamless integration with ClearBank\'s services.',
        techStack: 'React, TypeScript, OpenAPI, Swagger, Vercel',
        images: [
          { src: '/images/clearbank/5f388e40.mp4', caption: 'ClearBank Video 1' },
          { src: '/images/clearbank/7f9eb849.mp4', caption: 'ClearBank Video 2' },
          { src: '/images/clearbank/16-Accounts.jpg', caption: 'ClearBank Image' },
          { src: '/images/clearbank/53c30df9.mp4', caption: 'ClearBank Video 3' }
        ]
      },
      { 
        id: 7, 
        name: 'AptaBiome', 
        date: 'May 2023', 
        description: 'A digital product to support r c-section parents created in collaboration with Danone', 
        fullDescription: 'A comprehensive digital product and mobile application created in collaboration with Danone to support parents who have had C-sections, providing personalized guidance, recovery resources, and parenting support through an intuitive and empathetic user experience.', 
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
        fullDescription: 'A new digital exhibition and checkout experience for Phillips Auction House, creating a virtual gallery platform that allows global access to Phillips\' curated collections and auction items through an immersive web-based interface.', 
        website: 'https://exhibitions.phillips.com/',
        startingPoint: 'Phillips\' need for digital exhibition platform to showcase auction items.',
        outcome: 'Virtual gallery experience allowing global access to Phillips\' curated collections.',
        techStack: 'React, Three.js, WebGL, Contentful, Vercel',
        images: [
          { src: '/images/phillips/Phillips_new_aquisitions_crf28.mp4', caption: 'Phillips Auction House Video 1' },
          { src: '/images/phillips/Phillips03.webp', caption: 'Phillips Auction House Img 1' },
          { src: '/images/phillips/Phillips02.webp', caption: 'Phillips Auction House Img 2' },
          { src: '/images/phillips/Phillips_Button_Square-Loop.mp4', caption: 'Phillips Auction House Video 2' },
          { src: '/images/phillips/Phillips04.webp', caption: 'Phillips Auction House Img 3' }
        ]
      },
      { 
        id: 9, 
        name: 'Turinglab', 
        date: 'May 2023', 
        description: 'Designing a number of educational tools and features for Turinglab, an ed-tech start-up',
        fullDescription: 'Designing and developing a comprehensive suite of educational tools and interactive features for Turinglab, an ed-tech startup focused on teaching coding and AI concepts to students through engaging digital learning experiences and hands-on programming activities.',
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
        description: 'A framework booklet for local government to better understand AI literacy',
        fullDescription: 'A comprehensive framework booklet and assessment tool designed specifically for local government officials to better understand, evaluate, and improve AI literacy within their communities, providing practical guidance and educational resources for policy development.', 
        website: 'https://aivoicesmap.vercel.app/',
        startingPoint: 'Need for standardized framework to assess and improve AI literacy across communities.',
        outcome: 'Comprehensive assessment tool and educational resources for AI literacy development.',
        techStack: 'React, Node.js, MongoDB, Vercel, D3.js',
        images: [
          { src: '/images/participatory/ai-literacy-framework/11.01.png', caption: 'AI Literacy Framework Img 1' },
          { src: '/images/participatory/ai-literacy-framework/11.02.png', caption: 'AI Literacy Framework Img 2' },
          { src: '/images/participatory/ai-literacy-framework/11.03.png', caption: 'AI Literacy Framework Img 3' },
          { src: '/images/participatory/ai-literacy-framework/11.04.png', caption: 'AI Literacy Framework Img 4' }
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
          { src: '/images/participatory/climate-truth-crisis/12.01.png', caption: 'Climate Truth Crisis Img 1' },
          { src: '/images/participatory/climate-truth-crisis/12.02.png', caption: 'Climate Truth Crisis Img 2' },
          { src: '/images/participatory/climate-truth-crisis/12.03.png', caption: 'Climate Truth Crisis Img 3' },
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
          { src: '/images/participatory/street-installations/13.03.png', caption: 'Street Installations Img 1' },
          { src: '/images/participatory/street-installations/13.04.png', caption: 'Street Installations Img 2' },
          { src: '/images/participatory/street-installations/13.05.png', caption: 'Street Installations Img 3' },
          { src: '/images/participatory/street-installations/13.06.png', caption: 'Street Installations Img 4' }
        ]
      }
    ],
    'Design Writing': [
      {
        id: 14,
        name: 'Illustrations',
        date: 'Mar 2026',
        description: 'A brief collection of illustrations across time.',
        fullDescription: 'A brief collection of illustrations across time, bringing together experiments, studies, and finished pieces developed across different projects and moments.',
        mediaMaxWidth: 520,
        mediaMaxWidthMobile: 340,
        website: '',
        startingPoint: '',
        outcome: '',
        techStack: '',
        images: [
          { src: '/images/illustrations/Screenshot 2026-03-26 at 14.11.56.png', caption: 'Illustration 1' },
          { src: '/images/illustrations/Screenshot 2026-03-26 at 14.12.05.png', caption: 'Illustration 2' },
          { src: '/images/illustrations/Screenshot 2026-03-26 at 14.12.13.png', caption: 'Illustration 3' },
          { src: '/images/illustrations/Screenshot 2026-03-26 at 14.12.28.png', caption: 'Illustration 4' },
          { src: '/images/illustrations/image.png', caption: 'Illustration 5' }
        ]
      }
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

  const [selectedProject, setSelectedProject] = useState(projects['Product Design'][0]);
  // On mobile, all project lists are expanded by default
  const mainContentRef = useRef(null);
  const headerRef = useRef(null);
  const mainContentScrollRef = useRef(null);
  const sidebarScrollRef = useRef(null);
  const preloadedImagesRef = useRef(new Set());
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

  const isVideoMedia = (src) => /\.(mp4|mov)$/i.test(src || '');
  const defaultRoleHighlights = ['Research', 'UX/UI Design', 'Prototyping'];
  const getRoleHighlights = (project) => {
    if (project?.roleHighlights?.length) {
      return project.roleHighlights.slice(0, 3);
    }
    return defaultRoleHighlights;
  };
  const renderWovenDescription = (project, className) => {
    const baseDescription = project.fullDescription || project.description;
    if (!baseDescription) return null;
    return (
      <p className={className}>
        {baseDescription}{' '}
        <span className="underline">As lead product designer</span>, I focused on{' '}
        <span className="underline">designing new features</span> and{' '}
        <span className="underline">testing with users</span> to refine the overall experience.
      </p>
    );
  };

  // Temporarily hidden projects by id
  const hiddenProjectIds = useMemo(() => new Set([7, 9]), []);

  const orderedCategories = useMemo(() => {
    const entries = Object.entries(projects);
    const priority = ['Product Design', 'Web Development', 'Participatory Design', 'Design Writing'];
    const sorted = entries.sort((a, b) => {
      const aIndex = priority.indexOf(a[0]);
      const bIndex = priority.indexOf(b[0]);
      const safeA = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
      const safeB = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;
      return safeA - safeB;
    });
    // Filter out hidden projects
    return sorted.map(([category, categoryProjects]) => [
      category,
      categoryProjects.filter((p) => !hiddenProjectIds.has(p.id)),
    ]);
  }, [projects, hiddenProjectIds]);

  const allProjects = useMemo(() => orderedCategories.flatMap(([, categoryProjects]) => categoryProjects), [orderedCategories]);

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

  // Clear annotation trail when switching case studies
  useEffect(() => {
    window.dispatchEvent(new Event('case-study-change'));
  }, [selectedProject?.id]);

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

  useEffect(() => {
    if (!selectedProject) return;

    const currentIndex = allProjects.findIndex((project) => project.id === selectedProject.id);
    if (currentIndex === -1) return;

    const projectsToPreload = [
      selectedProject,
      allProjects[(currentIndex + 1) % allProjects.length],
      allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length],
    ];

    projectsToPreload.forEach((project) => {
      if (!project?.images) return;

      project.images.forEach((imgObj) => {
        const src = typeof imgObj === 'string' ? imgObj : imgObj.src;
        if (!src || preloadedImagesRef.current.has(src)) return;
        if (isVideoMedia(src)) {
          const video = document.createElement('video');
          video.preload = 'metadata';
          video.src = src;
        } else {
          const img = new Image();
          img.src = src;
        }
        preloadedImagesRef.current.add(src);
      });
    });
  }, [selectedProject, allProjects]);

  useEffect(() => {
    const videos = Array.from(document.querySelectorAll('[data-auto-play-video="true"]'));
    if (!videos.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    videos.forEach((video) => observer.observe(video));

    return () => {
      observer.disconnect();
      videos.forEach((video) => video.pause());
    };
  }, [selectedProject]);

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
        <div className="flex items-center gap-4">
          {isDarkMode && (
            <span className="text-xs md:text-sm text-gray-500 select-none">
              hold mouse to annoate in dark mode
            </span>
          )}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="w-9 h-5 custom-clickable relative rounded-full"
            style={{ border: '0.5px solid #81FF03' }}
          >
            <span
              className="absolute w-4 h-4 rounded-full transition-transform duration-200"
              style={{
                left: '2px',
                top: '50%',
                transform: isDarkMode ? 'translate(16px, -50%)' : 'translate(0, -50%)',
                backgroundColor: '#81FF03'
              }}
            />
          </button>
        <Link 
          to="/about" 
            className={`text-gray-800 font-normal text-base transition-all duration-300 ${
            isAboutHovered ? 'blur-[1px]' : 'filter-none'
          }`}
          onMouseEnter={() => setIsAboutHovered(true)}
          onMouseLeave={() => setIsAboutHovered(false)}
        >
          (About)
        </Link>
        </div>
      </div>

      <div className="flex h-full flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-80 flex flex-col" style={{ paddingLeft: '32px', paddingRight: '24px' }}>
          <div ref={sidebarScrollRef} className="overflow-y-auto flex-1 pb-20">
            {orderedCategories.map(([category, categoryProjects]) => (
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
                            <div className="flex flex-wrap gap-2 mb-3">
                              {getRoleHighlights(project).map((item, idx) => (
                                <span
                                  key={`${project.id}-chip-${idx}`}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-gray-300 text-gray-600 text-xs rounded-full"
                                >
                                  <span aria-hidden="true">+</span>
                                  <span>{item}</span>
                                </span>
                              ))}
                            </div>
                            {renderWovenDescription(project, 'text-sm text-gray-600 leading-relaxed max-w-md')}
                          </div>
                          {project.images.map((imgObj, idx) => {
                            const src = typeof imgObj === 'string' ? imgObj : imgObj.src;
                            const caption = typeof imgObj === 'string' ? null : imgObj.caption;
                            const isVideo = isVideoMedia(src);
                            return (
                              <div
                                key={idx}
                                className="flex flex-col mb-10 last:mb-0 items-start"
                              >
                                {isVideo ? (
                                  <video
                                    src={src}
                                    data-auto-play-video="true"
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                    className="object-contain object-left self-start"
                                    style={{ maxWidth: '92%', width: 'auto', maxHeight: '65vh', display: 'block' }}
                                  />
                                ) : (
                                  <img
                                    loading={idx < 2 ? 'eager' : 'lazy'}
                                  src={src}
                                  alt={project.name + ' image ' + (idx + 1)}
                                  onClick={() => openModal({ src, alt: project.name + ' image ' + (idx + 1) })}
                                    className="object-contain object-left custom-clickable self-start"
                                    style={{ maxWidth: '92%', width: 'auto', maxHeight: '65vh', display: 'block' }}
                                />
                                )}
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
              <div className="h-full flex flex-col relative">
                {/* Top actions row (sits above case study content) */}
                <div className="w-full px-8 py-0 flex flex-col items-end gap-2 absolute top-0 left-0 z-10">
                  {selectedProject.website && !showInfoPanel && (
                    <a
                      href={selectedProject.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-2.5 py-1 border text-xs md:text-sm transition-all duration-300 custom-clickable hover:blur-sm no-underline rounded-full"
                      style={{ color: '#81FF03', borderColor: '#81FF03' }}
                    >
                      Project Site
                    </a>
                  )}
                  {!showInfoPanel ? (
                    <button
                      onClick={toggleInfoPanel}
                      className="inline-flex items-center px-2.5 py-1 border rounded-full text-xs md:text-sm transition-all duration-300 custom-clickable hover:blur-sm"
                      style={{ color: '#9ca3af', borderColor: '#9ca3af' }}
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
                      className="inline-flex items-center px-2.5 py-1 border rounded-full text-xs md:text-sm transition-all duration-300 custom-clickable hover:blur-sm"
                      style={{ color: '#9ca3af', borderColor: '#9ca3af' }}
                    >
                      Close
                    </button>
                  )}
                </div>
                {selectedProject.images.length > 0 ? (
                  <div ref={mainContentScrollRef} className="w-full flex-1 overflow-y-auto hidden md:block pb-48">
                    {/* Project Title and Description */}
                    <div className="px-12 pt-0 pb-12">
                      <h2 className="text-2xl font-normal text-gray-900 mb-2">
                        {selectedProject.name}
                      </h2>
                      {selectedProject.date && (
                        <p className="text-sm text-gray-500 mb-4">
                          {selectedProject.date}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {getRoleHighlights(selectedProject).map((item, idx) => (
                          <span
                            key={`${selectedProject.id}-chip-desktop-${idx}`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-gray-300 text-gray-600 text-xs rounded-full"
                          >
                            <span aria-hidden="true">+</span>
                            <span>{item}</span>
                          </span>
                        ))}
                      </div>
                      {renderWovenDescription(selectedProject, 'text-sm text-gray-600 leading-relaxed max-w-2xl')}
                    </div>
                    {selectedProject.images.map((imgObj, idx) => {
                      const src = typeof imgObj === 'string' ? imgObj : imgObj.src;
                      const caption = typeof imgObj === 'string' ? null : imgObj.caption;
                      const isVideo = isVideoMedia(src);
                      return (
                        <div
                          key={idx}
                          className="flex flex-col mb-16 last:mb-0 px-12 items-start"
                        >
                          {isVideo ? (
                            <video
                              src={src}
                              data-auto-play-video="true"
                              muted
                              loop
                              playsInline
                              preload="metadata"
                              className="object-contain object-left self-start"
                              style={{ maxWidth: '920px', width: 'auto', maxHeight: '78vh', display: 'block' }}
                            />
                          ) : (
                            <img
                              loading={idx < 2 ? 'eager' : 'lazy'}
                            src={src}
                            alt={selectedProject.name + ' image ' + (idx + 1)}
                            onClick={() => openModal({ src, alt: selectedProject.name + ' image ' + (idx + 1) })}
                              className="object-contain object-left custom-clickable self-start"
                              style={{ maxWidth: '920px', width: 'auto', maxHeight: '78vh', display: 'block' }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextElementSibling.style.display = 'flex';
                            }}
                          />
                          )}
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
            <div className="hidden md:block absolute top-6 right-0 z-20 w-80 transition-all duration-300">
              <div className="p-6 pt-10 space-y-4">
                
                {/* Starting Point */}
                <div className="backdrop-blur-sm bg-white bg-opacity-80 rounded-lg">
                  <button
                    onClick={() => toggleInfo('startingPoint')}
                    className="w-full pl-4 pr-2 py-3 text-left flex justify-between items-center transition-all duration-300 hover:blur-[1px] custom-clickable"
                  >
                    <span className="font-normal text-gray-900">Starting</span>
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
                    <span className="font-normal text-gray-900">Technical</span>
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
