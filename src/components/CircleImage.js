import React from 'react';

export default function CircleImage({ src, size, style, maxSize }) {
    if (maxSize == null) {
        maxSize = size;
    }
    if(src == null){
        src = "/favicon.png";
    }
    return (
        <img src={src} style={{ width: size, height: size, borderRadius: size / 2, maxWidth: maxSize, maxHeight: maxSize, ...style }} />
    );
}