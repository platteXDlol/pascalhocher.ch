import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, ExternalLink, Github, Cpu, BrainCircuit, Ghost } from 'lucide-react'

const facts = [
  { label: 'Fokus', value: 'Homelab. Media, AI & Entwicklung' },
  { label: 'Setup', value: '3 PCs für verschiedene Projekte' },
  { label: 'Hobbies', value: 'Homelabbing & Sport' },
  { label: 'GitHub', value: 'platteXDlol', href: 'https://github.com/platteXDlol' },
]

const projects = [
  {
    icon: <Cpu className="h-5 w-5 text-muted-foreground" />,
    title: 'Jellyfin & *arr-Stack',
    description: 'Skalierbarer Media-Server mit Jellyfin, Sonarr, Radarr und Prowlarr. Fokus auf Automation, Zuverlässigkeit German und French Content.',
    badges: ['Docker', 'Jellyfin', 'Sonarr'],
  },
  {
    icon: <BrainCircuit className="h-5 w-5 text-muted-foreground" />,
    title: 'Local AI',
    description: 'Lokale AI-Workloads im Homelab — Experimente mit Modellen, Buttler, Automation und Bildergernerierung.',
    badges: ['Ollama', 'Open WebUI'],
  },
  {
    icon: <Ghost className="h-5 w-5 text-muted-foreground" />,
    title: "Pepper's Ghost Display",
    description: 'Geplant: Holographisches Display mit Raspberry Pi, eventuell mit lokaler AI-Integration.',
    badges: ['Raspberry Pi', 'Geplant'],
  },
]

export default function Home() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      {/* ── Hero ── */}
      <div className="mb-16">
        <Badge variant="secondary" className="mb-4">About me</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
          Hey, ich bin Pascal
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          17-jähriger <span className="text-foreground font-medium">Applikationsentwickler</span> in der Lehre.
          Ich interessiere mich für Clean UI, Automation und alles rund um mein Homelab.
          In meiner Freizeit betreibe ich Homelabbing und Sport.
        </p>
      </div>

      {/* ── Quick facts ── */}
      <div className="grid gap-3 sm:grid-cols-2 mb-16">
        {facts.map(({ label, value, href }) => (
          <Card key={label} className="transition-all duration-200 hover:shadow-md">
            <CardContent className="p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
              {href ? (
                <a href={href} target="_blank" rel="noreferrer" className="text-sm font-medium text-foreground hover:underline inline-flex items-center gap-1">
                  {value} <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <p className="text-sm font-medium text-foreground">{value}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="mb-16" />

      {/* ── Projects ── */}
      <div className="mb-16">
        <Badge variant="secondary" className="mb-6">Projekte</Badge>

        <div className="space-y-3">
          {projects.map(({ icon, title, description, link, badges }) => (
            <Card key={title} className="transition-all duration-200 hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                    {icon}
                  </div>
                  <div>
                    <CardTitle className="text-sm">{title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                {badges && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {badges.map((b) => (
                      <Badge key={b} variant="outline" className="text-[10px] font-normal">{b}</Badge>
                    ))}
                  </div>
                )}
                {link && (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-foreground hover:underline"
                  >
                    {link.label} <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="flex items-center gap-3">
        <Button asChild className="rounded-full">
          <Link to="/specs">
            Homelab Specs <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" asChild className="rounded-full">
          <a href="https://github.com/platteXDlol" target="_blank" rel="noreferrer">
            <Github className="mr-1.5 h-4 w-4" /> GitHub
          </a>
        </Button>
      </div>
    </section>
  )
}
