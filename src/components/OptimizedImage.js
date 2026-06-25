import React from 'react';

const RASTER_PATTERN = /\.(png|jpe?g)$/i;

export function getWebpSrc(src) {
  if (!src || !RASTER_PATTERN.test(src)) return null;
  return src.replace(RASTER_PATTERN, '.webp');
}

const OptimizedImage = ({ src, alt, className, style, loading, onClick, onError }) => {
  const webpSrc = getWebpSrc(src);

  if (!webpSrc) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        loading={loading}
        onClick={onClick}
        onError={onError}
      />
    );
  }

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        loading={loading}
        onClick={onClick}
        onError={onError}
      />
    </picture>
  );
};

export default OptimizedImage;
