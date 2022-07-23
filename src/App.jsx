import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import LoginButton from './components/Login'
import LogoutButton from './components/Logout'
import Profile from './components/profile'
import Greeting from './components/Greeting'


function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const { isAuthenticated } = useAuth0()
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=94f907e17c5b13a608db5833253f9042`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <div className="buttonContainer">
            <LogoutButton />
          </div>
          <div className="profileContainer" >
            <Profile />
          </div>
          <div className="search">
            <input
              value={location}
              onChange={event => setLocation(event.target.value)}
              onKeyPress={searchLocation}
              placeholder='Enter a Location'
              type="text" />
          </div>
          <div className="container">
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                {data.main ? <h1>{data.main.temp.toFixed()}ºC</h1> : null}
              </div>
              <div className="description">
                {data.weather ? <p>{data.weather[0].main}</p> : null}
              </div>
            </div>
            {data.name != undefined &&
              <div className="bottom">
                <div className="feels">
                  {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}ºC</p> : null}
                  <p>Feels like</p>
                </div>
                <div className="humidity">
                  {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                  <p>Humidity</p>
                </div>
                <div className="wind">
                  {data.main ? <p className='bold'>{data.wind.speed}km/h</p> : null}
                  <p>Winds</p>
                </div>
              </div>
            }
          </div>
        </>
      ) : (
        <>
          <div className="firstContainer">
            <Greeting />
            <LoginButton />
          </div>
        </>
      )}
    </div>
  )
}

export default App
