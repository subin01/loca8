import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import throttle from 'lodash.throttle'

export default function Header({ variant = 'dark' }) {
  const router = useRouter()
  const activeRoute = (href) => {
    return router.asPath === href ? 'selected' : ''
  }

  let previousScrollTop = 0
  const [scrolledDown, setScrolledDown] = useState(false)

  function handleDocumentScroll() {
    let scrolledTop = window.pageYOffset
    var x = previousScrollTop - scrolledTop
    if (Math.abs(previousScrollTop - scrolledTop) < 5) return // avoid trigger on slight scroll
    setScrolledDown(scrolledTop > 80)
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
            <a className="logo">Loca8</a>
          </Link>

          <ul className={`links ${variant}`}>
            <li className={activeRoute('/product/')}>
              <Link href="/product/">
                <a>Product</a>
              </Link>
            </li>
            <li className={activeRoute('/support/')}>
              <Link href="/support/">
                <a>Support</a>
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
