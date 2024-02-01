// WebsiteBuilder.js
"use client"
import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import TextSection from './TextSection';
import ImageSection from './ImageSection';

const WebsiteBuilder = () => {
  const [sections, setSections] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedSections = JSON.parse(localStorage.getItem('websiteSections')) || [];
      return savedSections;
    }
    return [];
  });

  const [isEditMode, setIsEditMode] = useState(true);

  const websiteRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('websiteSections', JSON.stringify(sections));
      console.log('sections', sections);
    }
  }, [sections]);
  

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('type');
    const x = e.clientX - e.target.getBoundingClientRect().left;
    const y = e.clientY - e.target.getBoundingClientRect().top;
  
    if (type === 'text') {
      setSections([...sections, { type: 'text', content: 'Edit this text', x, y }]);
    } else if (type === 'image') {
      setSections([...sections, { type: 'image', url: 'path/to/default/image.jpg', x, y }]);
    }
  };

  const handleDelete = (index) => {
    if (isEditMode) {
      const updatedSections = [...sections];
      updatedSections.splice(index, 1);
      setSections(updatedSections);
    }
  };

  const handleSave = async () => {
    const canvas = await html2canvas(websiteRef.current);
    const image = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = image;
    link.download = 'website.png';
    link.click();

    setSections([]);
    setIsEditMode(true);
  };

  return (
    <div>
      <div
        ref={websiteRef}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{ position: 'relative', minHeight: '400px', border: '1px solid #ccc' }}
      >
        {sections.map((section, index) =>
          section.type === 'text' ? (
            <TextSection
              key={index}
              index={index}
              content={section.content}
              x={section.x}
              y={section.y}
              onDelete={isEditMode ? () => handleDelete(index) : undefined}
              isEditMode={isEditMode}
            />
          ) : (
            <ImageSection
              key={index}
              index={index}
              url={section.url}
              x={section.x}
              y={section.y}
              onDelete={isEditMode ? () => handleDelete(index) : undefined}
              isEditMode={isEditMode}
            />
          )
        )}
      </div>

      {isEditMode && (
        <button className='savebtn' onClick={handleSave} style={{ marginTop: '10px' }}>
          Save Website
        </button>
      )}
    </div>
  );
};

export default WebsiteBuilder;
