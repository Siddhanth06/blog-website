import React, { useRef } from "react";
import { IKContext, IKUpload } from "imagekitio-react";

const Upload = ({ children, type, setProgress, setData }) => {
  const authenticator = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/upload-auth`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };
  const ref = useRef();
  const onError = (err) => {
    console.log(err);
    toast.error("Image upload failed !!");
  };

  const onSuccess = (res) => {
    console.log(res);
    setData(res);
  };

  const onUploadProgress = (progress) => {
    setProgress(Math.round((progress.loaded / progress.total) * 100));
  };
  return (
    <IKContext
      publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        fileName='test-upload.png'
        onError={onError}
        onSuccess={onSuccess}
        onUploadProgress={onUploadProgress}
        ref={ref}
        className='hidden'
      />
      <div className='cursor-pointer' onClick={() => ref.current.click()}>
        {children}
      </div>
    </IKContext>
  );
};

export default Upload;
