import React, { useRef, useState, useEffect } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Clean up object URL
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl((old) => {
      if (old) URL.revokeObjectURL(old);
      return null;
    });
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={inputRef}
        className="hidden"
      />

      {!previewUrl ? (
        <div className="relative w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full">
          <LuUser className="text-4xl text-primary" />
          <button
            type="button"
            className="absolute bottom-0 right-0 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow"
            onClick={() => inputRef.current.click()}
          >
            <LuUpload className="text-2xl text-gray-500" />
          </button>
        </div>
      ) : (
        <div className="relative inline-block">
          <img
            src={previewUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            className="absolute -bottom-1 -right-1 w-8 h-8 flex items-center justify-center bg-red-500 rounded-full shadow"
            onClick={handleRemoveImage}
          >
            <LuTrash className="text-xl text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
