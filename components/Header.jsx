import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import throttle from 'lodash.throttle'

export default function Header() {
  const router = useRouter()
  console.log('path', router.asPath)
  const activeRoute = (href) => {
    return router.asPath === href ? 'selected' : ''
  }

  let previousScrollTop = 0
  const [scrolledDown, setScrolledDown] = useState(false)

  function handleDocumentScroll() {
    let scrolledTop = window.pageYOffset
    setScrolledDown(previousScrollTop < scrolledTop)
    previousScrollTop = scrolledTop
  }

  const handleDocumentScrollThrottled = throttle(handleDocumentScroll, 250)

  useEffect(() => {
    window.addEventListener('scroll', handleDocumentScroll)
    return () => window.removeEventListener('scroll', handleDocumentScrollThrottled)
  }, [])

  return (
    <header className={`${scrolledDown ? 'small' : 'full'}`}>
      <div className="wrap">
        <div className="inner">
          <Link href="/">
            <a className="logo">
              <img src="/loca8-logo-light-v9.svg" alt="Loca8 Logo" width={100} height={50} />
            </a>
          </Link>

          <ul className="links">
            <li className={activeRoute('/product/')}>
              <Link href="/product/">
                <a>Product</a>
              </Link>
            </li>
            <li className={activeRoute('/faq/')}>
              <Link href="/faq/">
                <a>FAQ</a>
              </Link>
            </li>
            <li className={activeRoute('/account/')}>
              <Link href="/account/">
                <a>Account</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
