import React from "react";

export default class BreadCrumb extends React.Component {
  render() {
    const { breadcrumbs } = this.props;

    const children = breadcrumbs.map((child) => {
      return (
        <li
          itemProp="itemListElement"
          itemScope
          itemType="http://schema.org/ListItem"
        >
          <a itemProp="item" href={child.url}>
            <span itemProp="name">{child.name}</span>
            <meta itemProp="position" content="1" />
          </a>
        </li>
      );
    });
    return (
      <ol
        className="breadcrumb"
        itemScope
        itemType="http://schema.org/BreadcrumbList"
      >
        {children}
      </ol>
    );
  }
}
