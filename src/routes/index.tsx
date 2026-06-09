import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Award,
  Code2,
  Brain,
  Layers,
  ChevronDown,
  Send,
  User,
  GraduationCap,
  Briefcase,
  FileText,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Portfolio,
})

/* ─── Data ─── */
const skills = {
  'Programming Languages': ['Python', 'Java', 'C'],
  'Core Concepts': ['Data Structures', 'Problem Solving', 'Object Oriented Programming'],
  'AI & Data Science': ['Artificial Intelligence', 'Machine Learning', 'Data Science', 'Data Analysis'],
  'Web Technologies': ['HTML', 'CSS', 'JavaScript', 'React.js'],
  'Soft Skills': ['Communication', 'Teamwork', 'Quick Learning', 'Leadership', 'Time Management'],
}

const skillIcons: Record<string, React.ReactNode> = {
  'Programming Languages': <Code2 size={20} />,
  'Core Concepts': <Layers size={20} />,
  'AI & Data Science': <Brain size={20} />,
  'Web Technologies': <ExternalLink size={20} />,
  'Soft Skills': <User size={20} />,
}

const certifications = [
  { title: 'Artificial Intelligence', provider: 'Infosys Springboard', color: 'from-purple-500 to-indigo-600' },
  { title: 'Python Programming', provider: 'Infosys Springboard', color: 'from-violet-500 to-purple-600' },
  { title: 'ServiceNow Micro-Certification', provider: 'ServiceNow', color: 'from-fuchsia-500 to-pink-600' },
  { title: 'C Programming', provider: 'Simplilearn', color: 'from-purple-600 to-violet-700' },
  { title: 'Java Programming', provider: 'Simplilearn', color: 'from-indigo-500 to-purple-600' },
  { title: 'Java Programming', provider: 'Scaler', color: 'from-pink-500 to-fuchsia-600' },
]

const projects = [
  {
    title: 'AI Student Performance Prediction',
    description: 'Developed a machine learning model that predicts student performance using historical academic data and analytical techniques.',
    tech: ['Python', 'Machine Learning', 'Pandas'],
    github: 'https://github.com/chinmayee-819',
    color: 'from-purple-500/10 to-indigo-500/10',
    border: 'border-purple-200 dark:border-purple-800/50',
  },
  {
    title: 'Personal Portfolio Website',
    description: 'Created a responsive and professional portfolio website showcasing education, skills, certifications, projects, and contact details.',
    tech: ['React.js', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/chinmayee-819',
    color: 'from-violet-500/10 to-purple-500/10',
    border: 'border-violet-200 dark:border-violet-800/50',
  },
  {
    title: 'Data Analysis Dashboard',
    description: 'Designed an interactive dashboard to analyze datasets and generate visual insights using charts and graphs.',
    tech: ['Python', 'Data Visualization', 'Data Science'],
    github: 'https://github.com/chinmayee-819',
    color: 'from-fuchsia-500/10 to-pink-500/10',
    border: 'border-fuchsia-200 dark:border-fuchsia-800/50',
  },
]

/* ─── Helper ─── */
function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
}

/* ─── Animated section wrapper ─── */
function Section({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 },
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </section>
  )
}

/* ─── Skill pill ─── */
function SkillPill({ label }: { label: string }) {
  return (
    <span className="skill-tag px-3 py-1.5 rounded-full text-sm font-medium cursor-default select-none">
      {label}
    </span>
  )
}

/* ─── Contact form ─── */
function ContactForm() {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields({ ...fields, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await fetch('/contact.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...fields }),
      })
      setStatus('success')
      setFields({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-green-600 dark:text-green-400" size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Thank you for contacting me. I will get back to you soon.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-purple px-6 py-2.5 rounded-xl font-semibold text-sm"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  const inputClass =
    'form-input w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm'

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-8 space-y-5">
      <input type="hidden" name="form-name" value="contact" />
      <p hidden><label>Don't fill this out: <input name="bot-field" /></label></p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Full Name *</label>
          <input
            type="text"
            name="name"
            value={fields.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email Address *</label>
          <input
            type="email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Subject *</label>
        <input
          type="text"
          name="subject"
          value={fields.subject}
          onChange={handleChange}
          required
          placeholder="What is this about?"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Message *</label>
        <textarea
          name="message"
          value={fields.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Write your message here..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-lg">
          <AlertCircle size={16} />
          Something went wrong. Please try again or email directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-purple w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={16} /> Send Message
          </>
        )}
      </button>
    </form>
  )
}

/* ─── Main portfolio component ─── */
export default function Portfolio() {
  const [particles] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: 4 + Math.floor(i * 2.5) % 10,
      top: (i * 13 + 7) % 90,
      left: (i * 17 + 5) % 90,
      delay: i * 0.7,
    })),
  )

  return (
    <main className="overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section id="home" className="hero-gradient min-h-screen flex items-center justify-center relative pt-16">
        {/* Floating particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              width: p.size,
              height: p.size,
              top: `${p.top}%`,
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              opacity: 0.5,
            }}
          />
        ))}

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Avatar */}
          <div className="animate-fade-in-up mb-8 flex justify-center">
            <div className="relative">
              <div className="avatar-ring p-1 rounded-full inline-block">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-purple-800 to-indigo-900 flex items-center justify-center text-4xl sm:text-5xl font-bold text-white select-none">
                  AC
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 border-2 border-gray-900 rounded-full" title="Available for internship" />
            </div>
          </div>

          {/* Name & title */}
          <p className="animate-fade-in-up delay-100 text-purple-300 text-base sm:text-lg font-medium mb-2 tracking-widest uppercase">
            Hello, I'm
          </p>
          <h1 className="animate-fade-in-up delay-200 text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight">
            Addanki{' '}
            <span className="gradient-text">Chinmayee</span>
          </h1>
          <h2 className="animate-fade-in-up delay-300 text-lg sm:text-2xl text-purple-200 font-semibold mb-6">
            Aspiring AI &amp; Data Science Enthusiast
          </h2>
          <p className="animate-fade-in-up delay-400 text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10">
            I am a B.Tech Computer Science and Engineering student passionate about Artificial
            Intelligence, Machine Learning, and Data Science. I am eager to gain practical
            experience through internships, improve my technical expertise, and contribute to
            innovative projects.
          </p>

          {/* CTA buttons */}
          <div className="animate-fade-in-up delay-500 flex flex-wrap justify-center gap-3 mb-10">
            <a
              href="#resume"
              onClick={(e) => { e.preventDefault(); document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="btn-purple px-6 py-3 rounded-xl font-semibold flex items-center gap-2 text-sm sm:text-base"
            >
              <FileText size={16} /> View Resume
            </a>
            <a
              href="/resume.pdf"
              download="Addanki_Chinmayee_Resume.pdf"
              className="btn-outline-purple px-6 py-3 rounded-xl font-semibold flex items-center gap-2 text-sm sm:text-base border-2 border-purple-400 text-purple-300 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300"
            >
              <Download size={16} /> Download Resume
            </a>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="glass px-6 py-3 rounded-xl font-semibold text-white text-sm sm:text-base flex items-center gap-2 hover:bg-white/15 transition-all"
            >
              <Mail size={16} /> Contact Me
            </button>
          </div>

          {/* Social icons */}
          <div className="animate-fade-in-up delay-600 flex justify-center gap-4">
            {[
              { icon: <Github size={20} />, href: 'https://github.com/chinmayee-819', label: 'GitHub' },
              { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/chinmayee-addanki-734b19354', label: 'LinkedIn' },
              { icon: <Mail size={20} />, href: 'mailto:chinmayeeaddanki@gmail.com', label: 'Email' },
            ].map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="glass w-11 h-11 rounded-full flex items-center justify-center text-white hover:bg-purple-500/50 hover:scale-110 transition-all duration-300"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-purple-300">
          <ChevronDown size={28} />
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <Section id="about" className="py-20 sm:py-28 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3">Get to know me</p>
              <h2 className="section-title text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-8">
                About Me
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg mb-6">
                I am currently pursuing B.Tech in Computer Science and Engineering at{' '}
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  Ramachandra College of Engineering, Eluru
                </span>
                . I have a strong interest in Artificial Intelligence, Machine Learning, Data
                Science, and Software Development.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg mb-8">
                I enjoy learning new technologies, solving real-world problems, and building
                impactful projects. My goal is to become a skilled AI and Data Science
                professional.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: <MapPin size={14} />, text: 'Eluru, Andhra Pradesh' },
                  { icon: <Mail size={14} />, text: 'chinmayeeaddanki@gmail.com' },
                  { icon: <Phone size={14} />, text: '7093236065' },
                ].map(({ icon, text }) => (
                  <span key={text} className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 bg-purple-50 dark:bg-purple-900/20 px-3 py-1.5 rounded-full">
                    <span className="text-purple-600 dark:text-purple-400">{icon}</span>
                    {text}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '3+', label: 'Projects Built', icon: <Briefcase size={22} /> },
                { num: '6+', label: 'Certifications', icon: <Award size={22} /> },
                { num: '5+', label: 'Technologies', icon: <Code2 size={22} /> },
                { num: '100%', label: 'Passion & Drive', icon: <Brain size={22} /> },
              ].map(({ num, label, icon }) => (
                <div key={label} className="glass-card rounded-2xl p-5 text-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white mx-auto mb-3">
                    {icon}
                  </div>
                  <div className="text-2xl font-extrabold gradient-text mb-1">{num}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── EDUCATION ─── */}
      <Section id="education" className="py-20 sm:py-28 bg-purple-50/50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3">My Background</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Education</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-violet-500 rounded-full mx-auto mt-4" />
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-10 flex flex-col sm:flex-row items-start gap-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white flex-shrink-0">
              <GraduationCap size={26} />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Bachelor of Technology (B.Tech)
                </h3>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-sm font-semibold rounded-full">
                  2024 – Present
                </span>
              </div>
              <p className="text-purple-600 dark:text-purple-400 font-semibold mb-1">
                Computer Science and Engineering
              </p>
              <p className="text-gray-600 dark:text-gray-400 flex items-center gap-1.5 text-sm">
                <MapPin size={14} /> Ramachandra College of Engineering, Eluru
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Focusing on core computer science fundamentals, AI/ML principles, and software
                development practices. Actively participating in technical projects and
                skill-building certifications.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── SKILLS ─── */}
      <Section id="skills" className="py-20 sm:py-28 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3">What I Know</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Technical Skills</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-violet-500 rounded-full mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white">
                    {skillIcons[category]}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <SkillPill key={skill} label={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── CERTIFICATIONS ─── */}
      <Section id="certifications" className="py-20 sm:py-28 bg-purple-50/50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3">Achievements</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Certifications</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-violet-500 rounded-full mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert, i) => (
              <div key={`${cert.title}-${cert.provider}`} className="glass-card rounded-2xl p-6 group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  <Award size={22} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm sm:text-base leading-snug">
                  {cert.title}
                </h3>
                <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">{cert.provider}</p>
                <div className="mt-3 text-xs text-gray-400 dark:text-gray-500">Certificate #{String(i + 1).padStart(2, '0')}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── PROJECTS ─── */}
      <Section id="projects" className="py-20 sm:py-28 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3">My Work</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Projects</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-violet-500 rounded-full mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.title}
                className={`glass-card rounded-2xl overflow-hidden flex flex-col`}
              >
                {/* Top gradient bar */}
                <div className={`h-1.5 bg-gradient-to-r ${project.color.replace('/10', '')}`} />
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base sm:text-lg leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>
                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {/* Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      <Github size={15} /> GitHub
                    </a>
                    <span className="text-gray-300 dark:text-gray-700">|</span>
                    <span className="flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed select-none">
                      <ExternalLink size={15} /> Live Demo
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── RESUME ─── */}
      <Section id="resume" className="py-20 sm:py-28 bg-purple-50/50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3">My Resume</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Resume</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-violet-500 rounded-full mx-auto mb-8" />
          <p className="text-gray-600 dark:text-gray-300 mb-10 text-base sm:text-lg">
            Download my resume to learn more about my education, skills, and projects.
          </p>

          {/* Resume card */}
          <div className="glass-card rounded-2xl p-8 sm:p-12 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white mx-auto mb-6 animate-float">
              <FileText size={36} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Addanki Chinmayee
            </h3>
            <p className="text-purple-600 dark:text-purple-400 font-medium mb-1">
              B.Tech CSE Student
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
              Ramachandra College of Engineering, Eluru
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-purple px-6 py-3 rounded-xl font-semibold flex items-center gap-2 text-sm"
              >
                <ExternalLink size={16} /> View Resume
              </a>
              <a
                href="/resume.pdf"
                download="Addanki_Chinmayee_Resume.pdf"
                className="btn-purple px-6 py-3 rounded-xl font-semibold flex items-center gap-2 text-sm"
              >
                <Download size={16} /> Download Resume
              </a>
            </div>
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-600">
            Resume available in PDF format
          </p>
        </div>
      </Section>

      {/* ─── CONTACT ─── */}
      <Section id="contact" className="py-20 sm:py-28 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3">Get In Touch</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Contact Me</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-violet-500 rounded-full mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Info panel */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Let's Connect!
              </h3>
              {[
                {
                  icon: <Phone size={18} />,
                  label: 'Phone',
                  value: '7093236065',
                  href: 'tel:7093236065',
                },
                {
                  icon: <Mail size={18} />,
                  label: 'Email',
                  value: 'chinmayeeaddanki@gmail.com',
                  href: 'mailto:chinmayeeaddanki@gmail.com',
                },
                {
                  icon: <Github size={18} />,
                  label: 'GitHub',
                  value: 'chinmayee-819',
                  href: 'https://github.com/chinmayee-819',
                },
                {
                  icon: <Linkedin size={18} />,
                  label: 'LinkedIn',
                  value: 'chinmayee-addanki',
                  href: 'https://www.linkedin.com/in/chinmayee-addanki-734b19354',
                },
                {
                  icon: <MapPin size={18} />,
                  label: 'Location',
                  value: 'Eluru, Andhra Pradesh',
                  href: undefined,
                },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="glass-card rounded-xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors break-all"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <div className="md:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-gray-950 dark:bg-black py-10 border-t border-purple-900/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="font-bold text-lg gradient-text mb-1">Addanki Chinmayee</p>
              <p className="text-gray-500 text-sm">Aspiring AI &amp; Data Science Enthusiast</p>
            </div>

            <div className="flex items-center gap-4">
              {[
                { icon: <Github size={18} />, href: 'https://github.com/chinmayee-819', label: 'GitHub' },
                { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/chinmayee-addanki-734b19354', label: 'LinkedIn' },
                { icon: <Mail size={18} />, href: 'mailto:chinmayeeaddanki@gmail.com', label: 'Email' },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-purple-900/30 text-gray-400 hover:text-purple-400 hover:bg-purple-900/60 flex items-center justify-center transition-all hover:scale-110"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-gray-500 text-sm">
              © 2026 Addanki Chinmayee. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
