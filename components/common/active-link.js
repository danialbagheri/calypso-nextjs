import React, { Children } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const ActiveLink = ({ children, ...props }) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || "";

  const className =
    asPath === props.href ||
    asPath === props.as ||
    (props.href != "/" && asPath.includes(props.href))
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
