import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="nav-container">
    <Link to="/" className="nav-link">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        className="website-logo"
        alt="website logo"
      />
    </Link>
  </div>
)
export default Header
