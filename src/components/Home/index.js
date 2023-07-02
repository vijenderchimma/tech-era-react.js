import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Courses from '../Courses'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {coursesList: [], apiStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.getCoursesData()
  }

  getCoursesData = async () => {
    this.setState({apiStatus: apiStatusConstant.inprogress})

    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.courses.map(eachData => ({
        id: eachData.id,
        logoUrl: eachData.logo_url,
        name: eachData.name,
      }))
      this.setState({
        coursesList: fetchedData,
        apiStatus: apiStatusConstant.success,
      })
    } else if (response.ok === false) {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  getLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickBtn = () => {
    this.getCoursesData()
  }

  getFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="button" onClick={this.onClickBtn}>
        Retry
      </button>
    </div>
  )

  getSuccessView = () => {
    const {coursesList} = this.state
    return (
      <ul className="courses-list-container">
        {coursesList.map(eachCourse => (
          <Courses eachCourse={eachCourse} key={eachCourse.id} />
        ))}
      </ul>
    )
  }

  getCoursesStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.getSuccessView()
      case apiStatusConstant.failure:
        return this.getFailureView()
      case apiStatusConstant.inprogress:
        return this.getLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <Header />
        <h1>Courses</h1>
        {this.getCoursesStatus()}
      </div>
    )
  }
}

export default Home
