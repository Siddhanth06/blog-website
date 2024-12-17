import { IKImage } from "imagekitio-react";

const Image = ({ src, className, w, h, alt }) => {
  // Check if the src is valid before rendering the image
  if (!src || src.trim() === "") {
    return null; // Or render a fallback image if needed
    // Example: return <img src="fallback-image-url" alt="fallback" />
  }
  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      path={src}
      alt={alt}
      className={className}
      loading='lazy'
      lqip={{ active: true, quality: 20 }}
      width={w}
      height={h}
      transformation={[
        {
          width: w,
          height: h,
        },
      ]}
    />
  );
};

export default Image;
