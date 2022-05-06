import React from "react";
export default class Benefits extends React.Component {
  render() {
    let benefits;
    if (this.props.benefits) {
      benefits = this.props.benefits.map((benefit, index) => {
        return (
          <li key={index}>
            <div className="benefitsItem">
              <img src={benefit.icon} alt={benefit.name} loading="lazy" />
              <p className="textCenter" style={{ fontSize: "14px" }}>
                {benefit.name}
              </p>
            </div>
          </li>
        );
      });
    } else {
      benefits = "None";
    }
    let ingredients;
    if (this.props.ingredients) {
      return (ingredients = (
        <p>
          <strong>Ingredients:</strong>
          {this.props.ingredients}
        </p>
      ));
    } else {
      ingredients = "";
    }
    return (
      <div>
        <ul className="benefits">{benefits}</ul>
        {ingredients}
      </div>
    );
  }
}
