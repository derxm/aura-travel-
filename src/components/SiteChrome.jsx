import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowUpRight, Camera, Menu, X } from 'lucide-react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const close = () => setOpen(false)
  return <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
    <Link className="wordmark" to="/" onClick={close} aria-label="AURA home">AURA<span>.</span></Link>
    <button className="menu-toggle" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
      <NavLink to="/discover" onClick={close}>Destinations</NavLink>
      <NavLink to="/discover?type=stays" onClick={close}>Exceptional stays</NavLink>
      <a href="/#experiences" onClick={close}>Experiences</a>
      <a href="/#story" onClick={close}>Our story</a>
      <div className="nav-actions"><Link to="/sign-in" className="sign-in" onClick={close}>Sign in</Link><Link to="/discover" className="nav-cta" onClick={close}>Plan your trip <ArrowUpRight size={14} /></Link></div>
    </nav>
  </header>
}

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-brand"><Link className="wordmark" to="/">AURA<span>.</span></Link><p>Considered journeys for<br />a world worth wandering.</p><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="AURA on Instagram" className="social-link"><Camera size={17} /></a></div>
      <div className="footer-column"><h3>Explore</h3><Link to="/discover">Destinations</Link><Link to="/discover?type=stays">Exceptional stays</Link><a href="/#experiences">Experiences</a><Link to="/my-trips">My trips</Link></div>
      <div className="footer-column"><h3>Discover</h3><Link to="/destinations/bali">Bali</Link><Link to="/destinations/santorini">Santorini</Link><Link to="/destinations/kyoto">Kyoto</Link><Link to="/destinations/amalfi">Amalfi Coast</Link></div>
      <div className="footer-column"><h3>Get in touch</h3><a href="mailto:hello@aura.travel">hello@aura.travel</a><Link to="/sign-in">Your account</Link><p>Monday—Friday, 09:00–18:00 GMT</p></div>
    </div>
    <div className="footer-bottom"><span>© 2026 AURA Travel. A world of possibility.</span><span>Thoughtfully imagined. Always.</span></div>
  </footer>
}