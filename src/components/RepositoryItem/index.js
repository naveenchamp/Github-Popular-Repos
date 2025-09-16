import './index.css'

const RepositoryItem = props => {
  const {bodyDetails} = props
  const {name, issuesCount, id, avatarUrl, starsCount, forksCount} = bodyDetails

  return (
    <li className="repository-item" key={id}>
      <img src={avatarUrl} alt={name} className="repo-avatar" />
      <h1 className="repo-name">{name}</h1>
      <div className="repo-stats">
        <div className="stat-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="stat-icon"
          />
          <p className="stat-text">{starsCount} stars</p>
        </div>
        <div className="stat-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="stat-icon"
          />
          <p className="stat-text">{forksCount} forks</p>
        </div>
        <div className="stat-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="stat-icon"
          />
          <p className="stat-text">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
