export default function SocialMediaIcons() {
  return (
    <>
      <div className="footer-header">Follow us</div>
      <div style={{marginTop: '20px'}}>
        <div className="floatLeft">
          <a
            href="https://www.facebook.com/calypsosuncare/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img alt="Facebook" src={'/socialMedia/fa.png'} />
          </a>
        </div>
        <div>
          <a
            href="https://twitter.com/calypsosuncare"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img alt="Twitter" src={'/socialMedia/tw.png'} />
          </a>
        </div>
        <div className="floatLeft">
          <a
            href="https://www.instagram.com/calypsosuncare/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img alt="Instagram" src={'/socialMedia/in.png'} />
          </a>
        </div>
        <div>
          <a
            href="https://www.youtube.com/channel/UCrZ14JcmZRDobPIVo8ptmrw"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img alt="Youtube" src={'/socialMedia/yo.png'} />
          </a>
        </div>
      </div>
    </>
  )
}
