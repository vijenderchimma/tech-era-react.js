import {withRouter, Link} from 'react-router-dom'

import './index.css'

const Courses = props => {
  const {eachCourse} = props
  const {id, logoUrl, name} = eachCourse

  return (
    <Link to={`/courses/${id}`} className="nav-link">
      <li className="list-item">
        <img src={logoUrl} className="logo-url" alt={name} />
        <p>{name}</p>
      </li>
    </Link>
  )
}

export default withRouter(Courses)
