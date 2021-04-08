import React, { Children } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const ActiveLink = ({ children, ...props }) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || "";

  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as
  //   console.log(asPath === props.href);
  //   console.log(`${asPath} ${props.href}`);
  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} active`.trim()
      : childClassName;

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

export default ActiveLink;
