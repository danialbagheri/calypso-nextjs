import Image from 'next/image'
import Link from 'next/link'
import Styles from '../../styles/sunready.module.css'
import ApplyIcon from '../../public/be-sun-ready/svgs/apply.svg'
import {Box} from '@mui/material'

export default function ApplyBefore({blogs}) {
  const blogRow = blogs.map((blog, i) => {
    return (
      <div key={i} className="col-12 col-md-4 col-sm-4 col-xs-12">
        <Link
          href={`/advice/${blog.item.slug}`}
          className="disableLink text-centre"
        >
          <div className="blog-card bg-white">
            <Box sx={{position: 'relative', width: '100%', height: '300px'}}>
              <Image
                src={blog.item.resized || '/advice/placeholder.png'}
                alt={blog.item.image_alt_text}
                fill={true}
                style={{objectFit: 'cover'}}
              />
            </Box>
            <div className="card-body mt-2">
              <p className="card-title text-centre">{blog.item.title}</p>
              <p className="read-more">
                <small>Read Now</small>
              </p>
            </div>
          </div>
        </Link>
      </div>
    )
  })

  return (
    <div className="mt-4 mb-4">
      <div style={{height: '153px', backgroundColor: '#FC954D'}}></div>
      <div className={Styles.sunReadyIcons}>
        <Image
          src={ApplyIcon}
          alt="Apply sunscreen before going out icon"
          height="178"
          width="178"
        />
      </div>
      <div className="container">
        <h4 className={Styles.sunReadyTitle}>
          Apply sunscreen before going out
        </h4>
        <p className="text-centre m-5">
          You should always apply sunscreen to clean, dry skin at least 20-30
          minutes before sun exposure. Remember to stay out of direct sunlight
          between 11am to 3pm when the sun’s UV rays are strongest. Make sure
          you particularly apply sunscreen on the easily forgotten areas such as
          the back of your neck, your ears and the top of your feet.
        </p>
      </div>
      <div className="container">
        <div className="row">{blogRow}</div>
      </div>
    </div>
  )
}
