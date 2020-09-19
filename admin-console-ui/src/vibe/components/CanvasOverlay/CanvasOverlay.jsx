import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import '../../scss/components/canvas.scss';

const Canvas = () => {
  const ref = useRef();

  useEffect(() => {
    const canvasObj = ref.current;
    const context = canvasObj.getContext('2d');
    context.beginPath();
    context.rect(20, 20, 150, 100);
  });

  const draw = e => {};

  return (
    <canvas
      ref={ref}
      className="canvas"
      //onClick={draw}
    />
  );
};

export default Canvas;
