import React, { useRef, useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Pizarra.css';

const socket = io('http://localhost:5000');

const Pizarra = () => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [zoom, setZoom] = useState(1);
  const [tool, setTool] = useState('pen');
  const [showBrushOptions, setShowBrushOptions] = useState(false);
  const [textBoxes, setTextBoxes] = useState([]);
  const [selectedTextBox, setSelectedTextBox] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    setContext(ctx);
  }, []);

  const startDrawing = (e) => {
    if (tool === 'text' && selectedTextBox !== null) {
      return;
    }
    setIsDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    setLastPos({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e) => {
    if (dragging && selectedTextBox) {
      // Actualizar la posición del cuadro de texto mientras se arrastra
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      const updatedTextBoxes = textBoxes.map((box) =>
        box === selectedTextBox
          ? { ...box, x: newX, y: newY }
          : box
      );
      setTextBoxes(updatedTextBoxes);
    } else if (isDrawing) {
      const { offsetX, offsetY } = e.nativeEvent;
      const { x: x0, y: y0 } = lastPos;
      context.strokeStyle = color;
      context.lineWidth = brushSize;
      context.lineCap = 'round';
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(offsetX, offsetY);
      context.stroke();
      context.closePath();
      setLastPos({ x: offsetX, y: offsetY });

      socket.emit('drawing', { x0, y0, x1: offsetX, y1: offsetY, color });

      // Si la herramienta es láser, borramos la línea después de 2 segundos
      if (tool === 'laser') {
        setTimeout(() => {
          context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }, 2000);
      }
    }
  };

  const endDrawing = () => {
    setIsDrawing(false);
    setDragging(false);
    setSelectedTextBox(null); // Deseleccionar el cuadro después de soltarlo
  };

  const handleToolChange = (tool) => {
    setTool(tool);

    switch (tool) {
      case 'eraser':
        setColor('#FFFFFF');
        setBrushSize(20);
        break;
      case 'highlighter':
        setColor('#FFFF00');
        setBrushSize(15);
        break;
      case 'marker':
        setColor('#000000');
        setBrushSize(10);
        break;
      case 'pen':
        setColor('#000000');
        setBrushSize(3);
        break;
      default:
        setColor('#000000');
        setBrushSize(5);
        break;
    }

    setShowBrushOptions(false);
  };

  const handleLaser = () => {
    setTool('laser');
    setColor('#39FF14'); // Verde neón para el láser
    setBrushSize(5);

    setTimeout(() => {
      setTool('pen');
      setColor('#000000');
    }, 2000);
  };

  const handleZoom = (zoomLevel) => {
    setZoom(zoomLevel);
    context.setTransform(zoomLevel, 0, 0, zoomLevel, 0, 0);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpg', 1.0);
    link.download = 'pizarra.jpg';
    link.click();
  };

  const handleImageInsert = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        context.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleTextBoxChange = (index, text) => {
    const newTextBoxes = [...textBoxes];
    newTextBoxes[index].text = text;
    setTextBoxes(newTextBoxes);
  };

  const handleTextBoxMoveStart = (index) => (e) => {
    e.stopPropagation();
    setSelectedTextBox(textBoxes[index]);
    setDragging(true);

    // Guardar la posición del ratón en el momento del clic
    const textBox = textBoxes[index];
    setDragOffset({
      x: e.clientX - textBox.x,
      y: e.clientY - textBox.y,
    });
  };

  const handleTextInsert = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const textBox = {
      x: offsetX,
      y: offsetY,
      width: 200,
      height: 50,
      text: '',
      fontSize: 20,  // Tamaño de fuente de 20px
    };
    setTextBoxes([...textBoxes, textBox]);
    setSelectedTextBox(textBox);
  };

  return (
    <div 
      className="pizarra-container" 
      onMouseMove={handleMouseMove} 
      onMouseUp={endDrawing}
    >
      <div className="navbar">
        <div className="title">Pizarrón</div>
        <div className="toolbar">
          <div className="dropdown">
            <button className="toolbar-button" onClick={() => setShowBrushOptions(!showBrushOptions)}>
              {tool === 'pen' && "Bolígrafo"}
              {tool === 'marker' && "Rotulador"}
              {tool === 'highlighter' && "Subrayador"}
              {tool === 'eraser' && "Borrador"}
            </button>
            {showBrushOptions && (
              <div className="dropdown-content">
                <button onClick={() => handleToolChange('pen')}>Bolígrafo</button>
                <button onClick={() => handleToolChange('marker')}>Rotulador</button>
                <button onClick={() => handleToolChange('highlighter')}>Subrayador</button>
                <button onClick={() => handleToolChange('eraser')}>Borrador</button>
              </div>
            )}
          </div>
          <button className="toolbar-button" onClick={handleLaser}>Láser</button>
          <input type="color" className="color-picker" onChange={(e) => setColor(e.target.value)} />
          <button className="toolbar-button" onClick={handleTextInsert}>Agregar Texto</button>
          <input type="file" onChange={handleImageInsert} />
          <button className="toolbar-button" onClick={saveCanvas}>Guardar</button>
          <button className="toolbar-button" onClick={() => handleZoom(zoom + 0.1)}>Zoom +</button>
          <button className="toolbar-button" onClick={() => handleZoom(zoom - 0.1)}>Zoom -</button>
          <input type="range" min="1" max="50" value={brushSize} onChange={(e) => setBrushSize(e.target.value)} className="size-slider" />
        </div>
      </div>
      <div className="pizarra-content" onMouseDown={startDrawing} onMouseUp={endDrawing}>
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          style={{ backgroundColor: 'white', transform: `scale(${zoom})` }}
        />
        {textBoxes.map((textBox, index) => (
          <div
            key={index}
            className="text-box"
            style={{
              position: 'absolute',
              top: `${textBox.y}px`,
              left: `${textBox.x}px`,
              width: `${textBox.width}px`,
              height: `${textBox.height}px`,
              border: selectedTextBox === textBox ? 'none' : 'none',
              resize: 'both',
              overflow: 'hidden',
              backgroundColor: 'transparent',  // Fondo transparente
              cursor: 'move',  // Mostrar cursor de movimiento
            }}
            onMouseDown={handleTextBoxMoveStart(index)}
          >
            <textarea
              style={{
                fontSize: '20px',  // Tamaño de fuente
                width: '100%',
                height: '100%',
                resize: 'none',
                boxSizing: 'border-box',
                border: 'none',  // Sin bordes
                backgroundColor: 'transparent',  // Fondo transparente
                color: color,  // Color del texto
                cursor: 'move',  // Mostrar cursor de movimiento
              }}
              value={textBox.text}
              onChange={(e) => handleTextBoxChange(index, e.target.value)}
              onMouseDown={(e) => e.stopPropagation()}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pizarra;
