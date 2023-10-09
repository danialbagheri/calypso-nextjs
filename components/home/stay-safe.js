import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import Styles from '../../styles/homepage/staySafewithCalypso.module.css'
import Image from 'next/image'

export default function StaySafe() {
  const videos = [
    {
      image: '/video-thumbnails/holly.png',
      title: 'Once a day for Kids',
      link: 'https://www.youtube.com/watch?v=6kgF4jr6kbE&list=PLQitqtgpPbJTuQKDE899W_3A8LHCKTWBl&index=6',
      width: '1586px',
      height: '849px',
    },
    {
      image: '/video-thumbnails/kelly.png',
      title: 'Sun Safety tips for Families',
      link: 'https://www.youtube.com/watch?v=KW2GYWJLWQs',
      width: '1586px',
      height: '849px',
    },
    {
      image: '/video-thumbnails/rte.png',
      title: 'How much sunscreen should you apply?',
      link: 'https://www.youtube.com/watch?v=dCmwR67ZeEw&t=368s',
      width: '1586px',
      height: '849px',
    },
  ]
  const settings = {
    arrows: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    dotsClass: 'dot',
    lazyLoad: 'progressive',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const videoThumbnails = videos.map((video, index) => {
    return (
      <div className={Styles.VideoThumbnailContainer} key={index}>
        <Link
          className={Styles.videoThumbnails}
          href={video.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          <div
            className="bg-calypso text-white m-0 slick-slide-title"
            style={{
              backgroundImage: `url(${video.image})`,
              width: '100%',
              height: '210px',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              borderRadius: '25px',
            }}
          >
            <div className={Styles.OverlayColor}>
              <div className={Styles.Title}>{video.title}</div>
            </div>
          </div>
        </Link>
      </div>
    )
  })

  return (
    <div className="container-fluid yellow-background top50">
      <div className="row">
        <div className="col-2 col-md-2" />
        <div className="col-8 col-md-8">
          <Image
            alt="Stay safe with Calypso"
            className="stay-safe top30"
            height={200}
            src={'/home-page/Stay-Safe-with-Calypso.png'}
            width={300}
          />

          <p className={Styles.text}>
            Unsure of how best to keep your family protected from the sun this
            summer? Watch our video to get some valuable sun care advice.
          </p>
          <Slider {...settings}>{videoThumbnails}</Slider>
          <div className="mt-4" />
        </div>
        <div className="col-2 col-md-2" />
      </div>
    </div>
  )
}
