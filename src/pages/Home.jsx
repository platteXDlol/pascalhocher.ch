import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { FadeIn } from '@/components/FadeIn'
import {
  ArrowRight, ExternalLink, Github, Cpu, BrainCircuit, Ghost,
  Code2, Server, Container, Terminal, Globe, Database, Mail
} from 'lucide-react'

const skills = [
  { name: 'JavaScript / React', icon: <Code2 className="h-4 w-4" /> },
  { name: 'HTML / CSS / Tailwind', icon: <Globe className="h-4 w-4" /> },
  { name: 'Docker & Containerisierung', icon: <Container className="h-4 w-4" /> },
  { name: 'Linux / Proxmox', icon: <Terminal className="h-4 w-4" /> },
  { name: 'Netzwerk & Infrastruktur', icon: <Server className="h-4 w-4" /> },
  { name: 'Datenbanken (SQL)', icon: <Database className="h-4 w-4" /> },
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
    description: 'Lokale AI-Workloads im Homelab — Experimente mit Modellen, Buttler, Automation und Bildergenerierung.',
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
      <FadeIn>
        <div className="mb-20">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
            <Badge variant="secondary" className="text-xs px-3 py-1">About me</Badge>
            <Badge variant="outline" className="text-xs px-3 py-1 text-blue-600 border-blue-200 dark:text-blue-400 dark:border-blue-800">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 inline-block animate-pulse" />
              Arbeitet bei SUVA
            </Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Hey, ich bin Pascal
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-xl">
            17-jähriger <span className="text-foreground font-medium">Applikationsentwickler</span> in der Lehre.
            Ich interessiere mich für Automation, Datenschutz und alles rund um mein Homelab.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <Button asChild>
              <a href="mailto:mail@pascalhocher.ch" className="inline-flex items-center gap-2 rounded-full whitespace-nowrap">
                <Mail className="h-4 w-4" />
                Kontakt
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://github.com/platteXDlol" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full whitespace-nowrap">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </FadeIn>

      <Separator className="mb-16" />

      {/* ── Skills / Tech-Stack ── */}
      <FadeIn>
        <div className="mb-20">
          <Badge variant="secondary" className="mb-6">Skills & Technologien</Badge>
          <div className="grid gap-2 sm:grid-cols-2">
            {skills.map(({ name, icon }) => (
              <div
                key={name}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-all duration-200 hover:shadow-sm hover:border-foreground/20"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-muted-foreground">
                  {icon}
                </div>
                <span className="text-sm font-medium text-foreground">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      <Separator className="mb-16" />

      {/* ── Projekte ── */}
      <FadeIn>
        <div className="mb-20">
          <Badge variant="secondary" className="mb-6">Projekte</Badge>

          <div className="space-y-3">
            {projects.map(({ icon, title, description, badges }, i) => (
              <FadeIn key={title} delay={i * 100}>
                <Card className="transition-all duration-200 hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                        {icon}
                      </div>
                      <CardTitle className="text-sm">{title}</CardTitle>
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
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* ── CTA ── */}
      <FadeIn>
        <Card className="bg-secondary/50 border-dashed">
          <CardContent className="p-8 text-center">
            <p className="text-sm font-medium text-foreground mb-1">Interessiert?</p>
            <p className="text-sm text-muted-foreground mb-6">Schau dir mein Homelab-Setup an oder schreib mir direkt.</p>
            <div className="flex items-center justify-center gap-3">
              <Button asChild>
                <Link to="/specs" className="inline-flex items-center gap-2 rounded-full whitespace-nowrap">
                  Specs
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:mail@pascalhocher.ch" className="inline-flex items-center gap-2 rounded-full whitespace-nowrap">
                  <Mail className="h-4 w-4" />
                  E-Mail
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

    </section>
  )
}
