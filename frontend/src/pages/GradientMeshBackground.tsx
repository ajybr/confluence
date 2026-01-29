export default function GradientMeshBackground() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#e0f7fa]">
      {/* Blob 1 */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob1"></div>

      {/* Blob 2 */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob2"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-5xl font-bold text-gray-900">Gradient Mesh</h1>
      </div>
    </div>
  )
}

