export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="logo-line">
          Follow us on
          <a href="https://www.instagram.com/loca8.me" target="_blank">
            <img src="/images/icon-insta.svg" alt="Instagram" width={30} height={30} />
          </a>
          <a href="https://www.facebook.com/Loca8-100434038928600" target="_blank">
            <img src="/images/icon-fb.svg" alt="Facebook" width={30} height={30} />
          </a>
          <a href="https://www.linkedin.com/company/loca8" target="_blank">
            <img src="/images/icon-in.svg" alt="LinkedIn" width={30} height={30} />
          </a>
        </div>
        <div className="disclaimer">
          <strong>Disclaimer: </strong>Loca8 is simple and reliable to trace your lost asset with Loca8 locket, if
          received in right hands. If not please do take appropriate methods to find out your lost asset.
        </div>
      </div>
    </footer>
  )
}
