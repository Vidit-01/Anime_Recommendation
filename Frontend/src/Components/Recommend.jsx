import React from 'react'

const Recommend = (animes) => {
  return (
    <>
      <h4 className="text-lg font-semibold mb-2">Liked Anime:</h4>
      <ul className="space-y-2">
        {animes.map((a) => (
          <li
            key={a.anime_id}
            className="p-2 bg-gray-100 rounded-lg shadow-sm flex items-center justify-between"
          >
            <span>{a.title}</span>
            <span className="text-xs text-gray-500">ID: {a.anime_id}</span>
          </li>
        ))}
      </ul>


    </>
  )
}

export default Recommend
