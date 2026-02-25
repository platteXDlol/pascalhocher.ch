import { NavLink, Outlet } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Github, Mail } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/specs', label: 'Homelab Specs' },
]

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 h-16">
          <NavLink to="/" className="text-base font-bold tracking-tight text-foreground hover:text-muted-foreground transition-colors">
            Pascal Hocher
          </NavLink>

          <div className="flex items-center gap-1.5">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
              >
                {({ isActive }) => (
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    className={cn('rounded-full', isActive && 'pointer-events-none')}
                  >
                    {label}
                  </Button>
                )}
              </NavLink>
            ))}
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* ── Page content ── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Pascal Hocher &middot; Applikationsentwickler
          </p>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" asChild className="h-10 w-10 rounded-full">
              <a href="https://github.com/platteXDlol" target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github className="h-[18px] w-[18px]" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="h-10 w-10 rounded-full">
              <a href="mailto:mail@pascalhocher.ch" aria-label="E-Mail">
                <Mail className="h-[18px] w-[18px]" />
              </a>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
