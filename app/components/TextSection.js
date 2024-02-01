// TextSection.js
import React, { useState } from 'react';

const TextSection = ({ index, content, x, y, onDelete, isEditMode }) => {
  const [editableContent, setEditableContent] = useState(content);
  const [isEditing, setIsEditing] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x, y });
  const [isHovered, setIsHovered] = useState(false);

  const handleEdit = (e) => {
    setEditableContent(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x + 'px',
        top: position.y + 'px',
        border: isEditing ? '1px solid #000' : 'none',
        padding: '5px',
        cursor: isEditing ? (isDragging ? 'grabbing' : 'grab') : 'default',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isEditing ? (
        <textarea
          value={editableContent}
          onChange={handleEdit}
          onBlur={handleBlur}
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <p>{editableContent}</p>
      )}
      {isEditMode && isHovered && (
        <button onClick={onDelete} style={{ display: isEditing ? 'none' : 'block', cursor: 'pointer' }}>
          Delete
        </button>
      )}
    </div>
  );
};

export default TextSection;
