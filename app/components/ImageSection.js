// ImageSection.js
import React, { useState, useRef } from 'react';
import { Resizable } from 'react-resizable';

const ImageSection = ({ index, x, y, onDelete, isEditMode }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 200, height: 150 });
  const [imageUrl, setImageUrl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const fileInputRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const offsetX = e.clientX - dragStart.x;
      const offsetY = e.clientY - dragStart.y;
      setPosition((prevPosition) => ({
        x: prevPosition.x + offsetX,
        y: prevPosition.y + offsetY,
      }));
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

  const handleDelete = () => {
    // Check if onDelete is provided and isEditMode is true
    if (onDelete && isEditMode) {
      setImageUrl(null);
      onDelete();
    }
  };

  const onResizeStop = (e, data) => {
    setSize({ width: data.size.width, height: data.size.height });
  };

  return (
    <Resizable
      width={size.width}
      height={size.height}
      onResizeStop={onResizeStop}
      style={{
        position: 'absolute',
        left: position.x + 'px',
        top: position.y + 'px',
        padding: '5px',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ width: '100%', height: '100%' }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Image ${index}`}
            style={{ width: '20%', height: '20%' }}
          />
        ) : (
          <p style={{ cursor: 'pointer' }} onClick={() => fileInputRef.current.click()}>
            Click to choose an image
          </p>
        )}
        {isHovered && isEditMode && (
          <button onClick={handleDelete} style={{ cursor: 'pointer', marginTop: '5px' }}>
            Delete
          </button>
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    </Resizable>
  );
};

export default ImageSection;
