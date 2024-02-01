"use client"
import React from 'react';

const Toolbar = () => {
    return (
        <div className='left'>
            <div>
                <button className='text' draggable={true} onDragStart={(e) => e.dataTransfer.setData('type', 'text')}>
                    Text
                </button>
            </div>
            <div>
                <button className='image' draggable={true} onDragStart={(e) => e.dataTransfer.setData('type', 'image')}>
                    Image
                </button>
            </div>
        </div>
    );
};

export default Toolbar;
