import React from 'react';

const ProjectEmbed = ({ src, title, className, style, height = 720, width = 920 }) => (
  <iframe
    src={src}
    title={title}
    className={['project-embed', className].filter(Boolean).join(' ')}
    style={{
      border: 0,
      display: 'block',
      width: '100%',
      maxWidth: width,
      height,
      ...style,
    }}
    loading="eager"
    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
  />
);

export default ProjectEmbed;
