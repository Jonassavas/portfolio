import { useState, useRef, useEffect } from 'react';
import chessboard from '../assets/chessboard.png';
import king from '../assets/king.png';
import queen from '../assets/queen.png';
import pawn from '../assets/pawn.png';
import knight from '../assets/knight.png'

export default function Chess() {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const boardRef = useRef<HTMLDivElement>(null);

  // Hardcoded until further improvements are made
  const [positions, setPositions] = useState({
    king: { x: 0, y: 0 },
    queen: { x: 72, y: 0 },
    pawn: { x: 144, y: 0 },
    knight: { x: 216, y: 0 },
  });

  const [dragging, setDragging] = useState<null | keyof typeof positions>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (dragging && boardRef.current) {
        const boardRect = boardRef.current.getBoundingClientRect();
        const newX = e.clientX - boardRect.left - offset.x;
        const newY = e.clientY - boardRect.top - offset.y;

        setPositions((prev) => ({
          ...prev,
          [dragging]: { x: newX, y: newY },
        }));
      }
    }

    function handleMouseUp() {
      if (dragging && boardRef.current) {
        const boardRect = boardRef.current.getBoundingClientRect();
        const boardSize = boardRect.width; // assumes square board
        const squareSize = boardSize / 8;

        // Snap to grid
        setPositions((prev) => {
          const piece = prev[dragging];
          const snappedX = Math.round(piece.x / squareSize) * squareSize;
          const snappedY = Math.round(piece.y / squareSize) * squareSize;

          return {
            ...prev,
            [dragging]: { x: snappedX, y: snappedY },
          };
        });
      }

      setDragging(null);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, offset]);

  function startDrag(piece: keyof typeof positions, e: React.MouseEvent) {
    const pieceElement = e.currentTarget.getBoundingClientRect();
    setDragging(piece);
    setOffset({
      x: e.clientX - pieceElement.left,
      y: e.clientY - pieceElement.top,
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h2 className="text-4xl font-bold mb-6">Let's play Chess! ♟️</h2>

      <div className="grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] gap-1">
        {/* Ranks */}
        <div className="flex flex-col justify-between pr-2 text-sm font-medium">
          {ranks.map((rank) => (
            <div key={rank} className="h-[calc(100%/8)] flex items-center justify-end">
              {rank}
            </div>
          ))}
        </div>

        {/* Board */}
        <div className="relative" ref={boardRef}>
          <img
            src={chessboard}
            alt="Chessboard"
            className="w-full max-w-xl aspect-square object-contain"
          />

          {/* Pieces */}
          {Object.entries({ king, queen, pawn, knight }).map(([name, img]) => (
            <img
              key={name}
              src={img}
              alt={name}
              onMouseDown={(e) => startDrag(name as keyof typeof positions, e)}
              className="absolute w-18 h-18 cursor-grab select-none"
              style={{
                left: `${positions[name as keyof typeof positions].x}px`,
                top: `${positions[name as keyof typeof positions].y}px`,
              }}
              draggable={false}
            />
          ))}
        </div>

        <div></div>

        {/* Files */}
        <div className="flex justify-between px-1 text-sm font-medium">
          {files.map((file) => (
            <div key={file} className="flex-1 text-center">
              {file}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
