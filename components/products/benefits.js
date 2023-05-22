import React from 'react'
import Image from 'next/image'
import {Typography} from '@mui/material'

export default function Benefits(props) {
  const {benefits, ingredients} = props
  const benefitsIcon = benefits.map((benefit, index) => {
    return (
      <li key={index}>
        <div className="benefitsItem">
          <Image
            src={benefit.icon}
            alt={benefit.name}
            loading="lazy"
            width="68"
            height="68"
          />
          <Typography className="textCenter" sx={{mt: 2}}>
            {benefit.name}
          </Typography>
        </div>
      </li>
    )
  })
  return (
    <>
      <ul className="benefits">{benefitsIcon}</ul>
    </>
  )
}
