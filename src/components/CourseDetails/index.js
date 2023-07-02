import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseDetails extends Component {
  state = {apiStatus: apiStatusConstant.initial, courseDetailsList: {}}

  componentDidMount() {
    this.getCourseDetailsData()
  }

  getCourseDetailsData = async () => {
    console.log(this.props)
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {method: 'GET'}

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      console.log(updatedData)

      this.setState({
        courseDetailsList: updatedData,
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
    this.getCourseDetailsData()
  }

  renderCourseDetailsFailureView = () => (
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

  renderCourseDetailsView = () => {
    const {courseDetailsList} = this.state
    const {imageUrl, name, description} = courseDetailsList

    return (
      <div className="course-details-container">
        <img src={imageUrl} className="image" alt={name} />
        <div>
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </div>
    )
  }

  renderCourseDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderCourseDetailsView()
      case apiStatusConstant.failure:
        return this.renderCourseDetailsFailureView()
      case apiStatusConstant.inprogress:
        return this.getLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderCourseDetails()}
      </div>
    )
  }
}

export default CourseDetails
