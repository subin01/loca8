export default function Banner({ children, id = 0, size = 'small', variant = 'dark' }) {
  return (
    <section className={`banner banner-${size} banner-${id}`}>
      <div className="wrap">
        <div className={`text ${variant}`}>{children}</div>
      </div>
    </section>
  )
}
