// import React from "react";
import * as React from 'react'
/* -------------------------------- Libraries ------------------------------- */
import Slider from 'react-slick'
/* -------------------------------------------------------------------------- */

/* ----------------------------- MUI Components ----------------------------- */
import {Box, Typography, useTheme} from '@mui/material'
import * as Icon from '@mui/icons-material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import TopBar from './topbar'
import data from '../../data.json'
/* -------------------------------------------------------------------------- */

/* -------------------------------- CSS Files ------------------------------- */
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
/* -------------------------------------------------------------------------- */

export default function InfoBar() {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [items, setItems] = React.useState(null)
  const theme = useTheme()

  const settings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: false,
    vertical: false,
    verticalSwiping: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 1500,
          // centerMode: true,
          // vertical: true,
          // verticalSwiping: true,
        },
      },
    ],
  }

  //TO DO::: We should import icons from backend
  const icons = ['Place', 'LocalShipping', 'Star']

  async function getInfoBarStatus() {
    const endpoint = data.apiUrl + 'web/top-bars/'
    const res = await fetch(endpoint)
    const json = await res.json()
    setItems(json[0].items)
    setIsLoaded(true)
  }

  React.useEffect(() => {
    getInfoBarStatus()
  }, [])

  if (isLoaded) {
    const infoBarItems = items.map((item, i) => {
      const ItemIcon = Icon[icons[i]]
      return (
        <Box
          className="info-bar-item"
          key={item.id}
          sx={{alignItems: 'center'}}
        >
          <Box className="info-bar-icon">
            <ItemIcon color="primary" />
          </Box>
          <Typography className="text-centre">{item.text}</Typography>
        </Box>
      )
    })
    return (
      <>
        <TopBar />
        <Box
          className="info-bar"
          sx={{
            backgroundColor: theme.palette.sand.main,
            padding: '10px 0',

            '& .slick-track': {
              display: 'flex',
              alignItems: 'center',
            },
          }}
        >
          <Slider {...settings}>{infoBarItems}</Slider>
        </Box>
      </>
    )
  }
  return null
}
