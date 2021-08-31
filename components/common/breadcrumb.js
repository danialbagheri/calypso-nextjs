import React from "react";

export default class BreadCrumb extends React.Component {
  render() {
    const { breadcrumbs } = this.props;

    const children = breadcrumbs.map((child, index) => {
      return (
        <li property="itemListElement" typeof="ListItem" key={index}>
          <a property="item" typeof="WebPage" href={child.url}>
            <span property="name">{child.name}</span>
          </a>
          <meta property="position" content={index} />
        </li>
      );
    });
    return (
      <ol
        className="breadcrumb"
        vocab="https://schema.org/"
        typeof="BreadcrumbList"
      >
        {children}
      </ol>
    );
  }
}
