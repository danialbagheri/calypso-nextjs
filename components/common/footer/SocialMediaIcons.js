import React from 'react'
import FacebookIcon from '../../../public/socialMedia/fa.png'
import TwitterIcon from '../../../public/socialMedia/tw.png'
import InstagramIcon from '../../../public/socialMedia/in.png'
import YoutubeIcon from '../../../public/socialMedia/yo.png'

export default function SocialMediaIcons() {
  return (
    <>
      <div className="footer-header">Follow us</div>
      <div style={{marginTop: '20px'}}>
        <div className="floatLeft">
          <a href="https://www.facebook.com/calypsosuncare/" target="_blank" rel="noopener noreferrer">
            <img alt="Facebook" src={FacebookIcon} />
          </a>
        </div>
        <div>
          <a href="https://twitter.com/calypsosuncare" target="_blank" rel="noopener noreferrer">
            <img alt="Twitter" src={TwitterIcon} />
          </a>
        </div>
        <div className="floatLeft">
          <a href="https://www.instagram.com/calypsosuncare/" target="_blank" rel="noopener noreferrer">
            <img alt="Instagram" src={InstagramIcon} />
          </a>
        </div>
        <div>
          <a href="https://www.youtube.com/channel/UCrZ14JcmZRDobPIVo8ptmrw" target="_blank" rel="noopener noreferrer">
            <img alt="Youtube" src={YoutubeIcon} />
          </a>
        </div>
      </div>
    </>
  )
}
