// Utility functions for search and filtering
export const searchProjects = (projects, searchTerm) => {
  if (!searchTerm) return projects;
  
  const filtered = {};
  Object.keys(projects).forEach(category => {
    const filteredProjects = projects[category].filter(project =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.materials && project.materials.some(material => 
        material.toLowerCase().includes(searchTerm.toLowerCase())
      )) ||
      (project.themes && project.themes.some(theme => 
        theme.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    );
    
    if (filteredProjects.length > 0) {
      filtered[category] = filteredProjects;
    }
  });
  
  return filtered;
};

export const filterByCategory = (projects, categories) => {
  if (!categories || categories.length === 0) return projects;
  
  const filtered = {};
  categories.forEach(category => {
    if (projects[category]) {
      filtered[category] = projects[category];
    }
  });
  
  return filtered;
};
