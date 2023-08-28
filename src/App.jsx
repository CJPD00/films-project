import { useState, useEffect } from "react"

function App() {

  const [pelicula, setpelicula] = useState('')
  const [data, setdata] = useState([])

  const urlBase = 'https://api.themoviedb.org/3/search/movie?'
  const API_KEY = '6c49ccc78405acffed04209418acc126'


  const getMainData = async () => {

    try {

      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      const data = await response.json()
      setdata(data.results)

    } catch (error) {

      console.error(error)

    }

  }

  const getData = async () => {

    try {

      const response = await fetch(`${urlBase}query=${pelicula}&api_key=${API_KEY}`)
      const data = await response.json()
      setdata(data.results)

    } catch (error) {

      console.error('ocurrio este error', error)

    }

  }

  useEffect(() => {

    if (pelicula === '') {
      getMainData()
    }

  }, [pelicula])

  const handleChange = (e) => {

    setpelicula(e.target.value)

  }

  const handleSubmit = (e) => {

    e.preventDefault()
    getData()

    if (pelicula === '') getMainData()

  }

  return (
    <div className="container">

      <h1 className="head"><div className="shadow"><i className="fa-solid fa-film fa-lg"></i>Movies</div></h1>

      <form onSubmit={handleSubmit}>
        <input type="text"
          placeholder="Pelicula"
          onChange={handleChange}
          value={pelicula} />
        <button>Buscar</button>
      </form>

      <div className="movie-list">

        {data.map(pel => {
          return (

            <div key={pel.id} className='movie-card'>
              <img src={`https://image.tmdb.org/t/p/w500/${pel.poster_path}`} alt={`${pel.title}`} />
              <h1>{pel.title}</h1>
              <p>{pel.overview}</p>
            </div>

          )
        })}

      </div>

    </div>
  )
}

export default App
