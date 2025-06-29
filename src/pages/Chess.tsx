import chessboard from '../assets/chessboard.png';

export default function Chess() {
  const files = ['a','b','c','d','e','f','g','h'];
  const ranks = ['8','7','6','5','4','3','2','1'];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h2 className="text-4xl font-bold mb-6">Let's play Chess! ♟️</h2>

      {/* 🔲 Grid to hold rank labels, board, and file labels */}
      <div className="grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] gap-1">
        
        {/* 🧮 Rank numbers (left side) */}
        <div className="flex flex-col justify-between pr-2 text-sm font-medium">
          {ranks.map((rank) => (
            <div key={rank} className="h-[calc(100%/8)] flex items-center justify-end">
              {rank}
            </div>
          ))}
        </div>

        {/* 📷 Chessboard image */}
        <div className="relative">
          <img
            src={chessboard}
            alt="Chessboard"
            className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl aspect-square object-contain"
          />
        </div>

        {/* ⬅️ Empty cell (bottom-left corner) */}
        <div></div>

        {/* 🔤 File letters (below board) */}
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
