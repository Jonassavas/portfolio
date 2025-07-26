import { useState, useRef, useEffect } from 'react';
import chessboard from '../assets/chessboard.png';
import king from '../assets/B_king.png';
import queen from '../assets/B_queen.png';
import pawn from '../assets/B_pawn.png';
import knight from '../assets/B_knight.png';
import rook from '../assets/B_rook.png';

export default function Chess() {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const boardRef = useRef<HTMLDivElement>(null);
  const boardRectRef = useRef<DOMRect | null>(null);
  const squareSizeRef = useRef<number>(0);

  const [positions, setPositions] = useState<{
    [key: string]: { x: number; y: number };
  }>({});

  const [dragging, setDragging] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      boardRectRef.current = rect;
      squareSizeRef.current = rect.width / 8;

      const square = squareSizeRef.current;

      const newPositions: { [key: string]: { x: number; y: number } } = {
        king: { x: 4 * square, y: 0 },
        queen: { x: 3 * square, y: 0 },
        knight: { x: 1 * square, y: 0 },
        rook: { x: 0 * square, y: 0 },
      };

      for (let i = 0; i < 8; i++) {
        newPositions[`pawn${i}`] = { x: i * square, y: square };
      }

      setPositions(newPositions);
    }
  }, []);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (dragging && boardRectRef.current) {
        const rect = boardRectRef.current;
        const square = squareSizeRef.current;

        let rawX = e.clientX - rect.left - offset.x;
        let rawY = e.clientY - rect.top - offset.y;

        // Clamp X/Y to not exceed the board area
        rawX = Math.max(0, Math.min(rawX, 7 * square));
        rawY = Math.max(0, Math.min(rawY, 7 * square));

        setPositions((prev) => ({
          ...prev,
          [dragging]: { x: rawX, y: rawY },
        }));
      }
    }

    function handleMouseUp() {
      if (dragging && boardRectRef.current) {
        const square = squareSizeRef.current;

        setPositions((prev) => {
          const { x, y } = prev[dragging];
          const snappedX = Math.max(0, Math.min(7, Math.round(x / square))) * square;
          const snappedY = Math.max(0, Math.min(7, Math.round(y / square))) * square;

          return {
            ...prev,
            [dragging]: { x: snappedX, y: snappedY },
          };
        });

        setDragging(null);
      }
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, offset]);

  function startDrag(piece: string, e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    setDragging(piece);
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
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

        {/* Chessboard */}
        <div className="relative" ref={boardRef}>
          <img
            src={chessboard}
            alt="Chessboard"
            className="w-full max-w-xl aspect-square object-contain"
            draggable={false}
          />

          {/* Pieces */}
          {Object.entries(positions).map(([name, pos]) => {
            let img = king;
            if (name.startsWith('pawn')) img = pawn;
            else if (name === 'queen') img = queen;
            else if (name === 'knight') img = knight;
            else if (name === 'rook') img = rook;

            return (
              <img
                key={name}
                src={img}
                alt={name}
                onMouseDown={(e) => startDrag(name, e)}
                className="absolute w-[72px] h-[72px] cursor-grab select-none"
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                }}
                draggable={false}
              />
            );
          })}
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
