import { useState, useRef, useEffect } from 'react';
import chessboard from '../assets/chessboard.png';
import B_king from '../assets/B_king.png';
import B_queen from '../assets/B_queen.png';
import B_pawn from '../assets/B_pawn.png';
import B_knight from '../assets/B_knight.png';
import B_rook from '../assets/B_rook.png';
import B_bishop from '../assets/B_bishop.png';

import W_king from '../assets/W_king.png';
import W_queen from '../assets/W_queen.png';
import W_pawn from '../assets/W_pawn.png';
import W_knight from '../assets/W_knight.png';
import W_rook from '../assets/W_rook.png';
import W_bishop from '../assets/W_bishop.png';

export default function Chess() {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const boardRef = useRef<HTMLDivElement>(null);
  const boardRectRef = useRef<DOMRect | null>(null);
  const squareSizeRef = useRef<number>(0);
  const [positions, setPositions] = useState<{ [key: string]: { x: number; y: number } }>({});
  const [dragging, setDragging] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function tryInitBoard() {
      if (boardRef.current) {
        const rect = boardRef.current.getBoundingClientRect();
        if (rect.width === 0) {
          requestAnimationFrame(tryInitBoard);
          return;
        }

        boardRectRef.current = rect;
        const square = rect.width / 8;
        squareSizeRef.current = square;

        const newPositions: { [key: string]: { x: number; y: number } } = {};

        const placePiece = (name: string, fileIndex: number, rankIndex: number) => {
          newPositions[name] = {
            x: fileIndex * square,
            y: rankIndex * square,
          };
        };

        // Black pieces (top of the board)
        ['B_rook1', 'B_knight1', 'B_bishop1', 'B_queen', 'B_king', 'B_bishop2', 'B_knight2', 'B_rook2'].forEach(
          (name, i) => placePiece(name, i, 0)
        );
        for (let i = 0; i < 8; i++) placePiece(`B_pawn${i + 1}`, i, 1);

        // White pieces (bottom of the board)
        ['W_rook1', 'W_knight1', 'W_bishop1', 'W_queen', 'W_king', 'W_bishop2', 'W_knight2', 'W_rook2'].forEach(
          (name, i) => placePiece(name, i, 7)
        );
        for (let i = 0; i < 8; i++) placePiece(`W_pawn${i + 1}`, i, 6);

        setPositions(newPositions);
      }
    }

    requestAnimationFrame(tryInitBoard);
  }, []);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (dragging && boardRectRef.current) {
        const rect = boardRectRef.current;
        const square = squareSizeRef.current;

        let newX = e.clientX - rect.left - offset.x;
        let newY = e.clientY - rect.top - offset.y;

        newX = Math.max(0, Math.min(newX, 7 * square));
        newY = Math.max(0, Math.min(newY, 7 * square));

        setPositions((prev) => ({
          ...prev,
          [dragging]: { x: newX, y: newY },
        }));
      }
    }

    function handleMouseUp() {
      if (dragging && boardRectRef.current) {
        const square = squareSizeRef.current;
        const piece = positions[dragging];

        const snappedX = Math.max(0, Math.min(7, Math.round(piece.x / square))) * square;
        const snappedY = Math.max(0, Math.min(7, Math.round(piece.y / square))) * square;

        setPositions((prev) => ({
          ...prev,
          [dragging]: { x: snappedX, y: snappedY },
        }));

        setDragging(null);
        document.body.style.cursor = 'default';
      }
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, offset, positions]);

  function startDrag(piece: string, e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    setDragging(piece);
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    document.body.style.cursor = 'grabbing';
  }

  function getPieceImage(name: string) {
    if (name.startsWith('W_')) {
      if (name.includes('pawn')) return W_pawn;
      if (name.includes('rook')) return W_rook;
      if (name.includes('knight')) return W_knight;
      if (name.includes('bishop')) return W_bishop;
      if (name.includes('queen')) return W_queen;
      if (name.includes('king')) return W_king;
    } else if (name.startsWith('B_')) {
      if (name.includes('pawn')) return B_pawn;
      if (name.includes('rook')) return B_rook;
      if (name.includes('knight')) return B_knight;
      if (name.includes('bishop')) return B_bishop;
      if (name.includes('queen')) return B_queen;
      if (name.includes('king')) return B_king;
    }
    return '';
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

          {Object.entries(positions).map(([name, pos]) => {
            const img = getPieceImage(name);
            return (
              <img
                key={name}
                src={img}
                alt={name}
                onMouseDown={(e) => startDrag(name, e)}
                className="absolute w-[72px] h-[72px] cursor-grab select-none"
                style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
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
