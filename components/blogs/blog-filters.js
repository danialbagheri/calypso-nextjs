import Styles from '../../styles/advice.module.css'

export default function BlogFilters() {
  const filters = ['Sun Protection', 'Once a Day', 'Myths', 'How to Apply']
  const filterItems = filters.map((filter, i) => {
    return (
      <div className={Styles.filterItem} key={i}>
        <span>{filter}</span>
      </div>
    )
  })
  return <div className={Styles.filters}>{filterItems}</div>
}
