import React, {Children} from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'

const ActiveLink = ({children, ...props}) => {
  const {asPath} = useRouter()
  const oneChild = <div>{children}</div>
  const child = Children.only(oneChild)
  const childClassName = child.props.className || ''
  const [showBorderUnderMenu, setShowBorderUnderMenu] = React.useState(false)
  const className =
    asPath === props.href ||
    asPath === props.as ||
    (props.href != '/' && asPath.includes(props.href))
      ? `${childClassName} active`.trim()
      : childClassName

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: `${className || null} ${
          showBorderUnderMenu && 'nav_border_under'
        }`,
        onMouseEnter: () => setShowBorderUnderMenu(true),
        onMouseLeave: () => setShowBorderUnderMenu(false),
      })}
    </Link>
  )
}

export default ActiveLink
