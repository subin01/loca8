import Link from 'next/link'
import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="wrap">
        <div className={styles.inner}>
          <Link href="/">
            <a className={styles.logo}>
              <img src="/loca8-logo-light.svg" alt="Loca8 Logo" width={100} height={50} />
            </a>
          </Link>

          <ul className={styles.links}>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/product">
                <a>Product</a>
              </Link>
            </li>
            <li>
              <Link href="/account">
                <a>Account</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
