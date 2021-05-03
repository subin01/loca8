import Link from 'next/link'
import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="wrap">
        <div className={styles.inner}>
          <Link href="/">
            <a className={styles.logo}>
              <img src="/loca8-logo.png" alt="Loca8 Logo" width={200} height={80} />
            </a>
          </Link>

          <ul className={styles.links}>
            <li>
              <Link href="/return/0">
                <a>Return</a>
              </Link>
            </li>
            <li>
              <Link href="/register/0">
                <a>Register</a>
              </Link>
            </li>
            <li>
              <Link href="/about/">
                <a>About</a>
              </Link>
            </li>
            <li>
              <Link href="/profile/">
                <a>Account</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
