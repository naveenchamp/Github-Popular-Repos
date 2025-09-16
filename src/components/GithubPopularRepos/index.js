import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    repoDetails: [],
    parameter: 'ALL',
    apiStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getRepoDetails()
  }

  getRepoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {parameter} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${parameter}`
    const response = await fetch(apiUrl)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))
      this.setState({
        repoDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  respectedLang = dataId => {
    this.setState({parameter: dataId}, this.getRepoDetails)
  }

  renderSuccessView = () => {
    const {repoDetails} = this.state
    return (
      <ul className="repositories-list">
        {repoDetails.map(eachItem => (
          <RepositoryItem key={eachItem.id} bodyDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {parameter} = this.state
    return (
      <>
        <div className="app-container">
          <h1 className="app-heading">Popular</h1>
          <ul className="language-filters-list">
            {languageFiltersData.map(eachFilter => (
              <LanguageFilterItem
                key={eachFilter.id}
                categoryDetails={eachFilter}
                respectedLang={this.respectedLang}
                isActive={eachFilter.id === parameter}
              />
            ))}
          </ul>
          {this.renderView()}
        </div>
      </>
    )
  }
}

export default GithubPopularRepos
