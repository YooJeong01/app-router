function Loading() {
  return (
    <div className="p-2">
      <ul className="grid grid-cols-2 gap-2 mt-2">
        {
          Array.from({ length: 8 }).map((_, i) => (
            <li key={i} className="p-2 animate-pulse">
              <div className="w-full h-36 bg-gray-300 rounded mb-2"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            </li>

          ))
        }
      </ul>
    </div>
  )
}
export default Loading