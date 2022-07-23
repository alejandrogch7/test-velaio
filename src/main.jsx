import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
    domain='dev-nvtrhwzh.us.auth0.com'
    clientId='LAw6UDTfI16Puupa6lK1SXgvlzvAnz7y'
    redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
)
