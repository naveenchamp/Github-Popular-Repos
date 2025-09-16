import './index.css'

const LanguageFilterItem = props => {
  const {categoryDetails, respectedLang, isActive} = props
  const {language, id} = categoryDetails

  const respectedL = () => {
    respectedLang(id)
  }

  const btnClass = isActive ? 'language-btn active-btn' : 'language-btn'

  return (
    <li className="language-filter-item">
      <button type="button" onClick={respectedL} className={btnClass}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
