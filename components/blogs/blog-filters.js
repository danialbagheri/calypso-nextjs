import Styles from "../../styles/advice.module.css";

export default function BlogFilters() {
  const filters = ["Sun Protection", "Once a Day", "Myths", "How to Apply"];
  const filterItems = filters.map((filter) => {
    return (
      <div className={Styles.filterItem}>
        <span>{filter}</span>
      </div>
    );
  });
  return <div className={Styles.filters}>{filterItems}</div>;
}
