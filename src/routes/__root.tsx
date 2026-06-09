import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Addanki Chinmayee | AI & Data Science Portfolio' },
      {
        name: 'description',
        content:
          'Portfolio of Addanki Chinmayee — B.Tech CSE student passionate about AI, Machine Learning, and Data Science. Seeking internship opportunities.',
      },
      { name: 'keywords', content: 'Addanki Chinmayee, AI, Machine Learning, Data Science, Python, Portfolio, Internship, CSE, Ramachandra College' },
      { name: 'author', content: 'Addanki Chinmayee' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'Addanki Chinmayee | AI & Data Science Portfolio' },
      { property: 'og:description', content: 'B.Tech CSE student passionate about Artificial Intelligence, Machine Learning, and Data Science.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://chipper-tartufo-29110d.netlify.app' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Addanki Chinmayee | AI & Data Science Portfolio' },
      { name: 'twitter:description', content: 'Aspiring AI & Data Science Enthusiast — B.Tech CSE at Ramachandra College of Engineering, Eluru.' },
    ],
    links: [
      { rel: 'canonical', href: 'https://chipper-tartufo-29110d.netlify.app' },
    ],
  }),
  shellComponent: RootDocument,
})

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Projects', href: '#projects' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const [darkMode, setDarkMode] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved === 'true') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = navItems.map((n) => n.href.replace('#', ''))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDark = () => {
    const next = !darkMode
    setDarkMode(next)
    localStorage.setItem('darkMode', String(next))
    document.documentElement.classList.toggle('dark', next)
  }

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-blur ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-950/90 shadow-lg shadow-purple-500/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => scrollTo('#home')} className="font-bold text-lg gradient-text font-poppins">
            AC
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className={`nav-link px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Dark mode + hamburger */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden animate-slide-in bg-white/95 dark:bg-gray-950/95 border-t border-purple-100 dark:border-purple-900/30 shadow-xl">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="block w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground">
        <Navbar />
        {children}
        <Scripts />
      </body>
    </html>
  )
}
