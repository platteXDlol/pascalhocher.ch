import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { FadeIn } from '@/components/FadeIn'
import {
  ArrowLeft, Cpu, BrainCircuit, Ghost, ExternalLink,
  CheckCircle2, Clock, Lightbulb
} from 'lucide-react'

const statusMap = {
  aktiv: { label: 'Aktiv', icon: <CheckCircle2 className="h-3.5 w-3.5" />, className: 'text-emerald-600 border-emerald-200 dark:text-emerald-400 dark:border-emerald-700' },
  geplant: { label: 'Geplant', icon: <Lightbulb className="h-3.5 w-3.5" />, className: 'text-amber-600 border-amber-200 dark:text-amber-400 dark:border-amber-700' },
  wip: { label: 'In Arbeit', icon: <Clock className="h-3.5 w-3.5" />, className: 'text-blue-600 border-blue-200 dark:text-blue-400 dark:border-blue-700' },
}

const projects = [
  {
    icon: <Cpu className="h-6 w-6" />,
    title: 'Jellyfin & *arr-Stack',
    status: 'aktiv',
    summary: 'Automatisierter Media-Server für Filme & Serien.',
    description:
      'Vollständig containerisierter Media-Stack mit Jellyfin als Frontend. Sonarr, Radarr und Prowlarr übernehmen das Management und die Suche. NZBGet lädt automatisch herunter. Der gesamte Stack läuft via Docker Compose auf meinem Proxmox-Server und wird über Reverse-Proxy erreichbar gemacht.',
    highlights: [
      'Automatische Erfassung neuer Releases',
      'Multi-Language Support (DE / FR)',
      'Hardware-Transcoding via Intel Quick Sync',
    ],
    badges: ['Docker', 'Jellyfin', 'Sonarr', 'Radarr', 'Prowlarr', 'NZBGet'],
  },
  {
    icon: <BrainCircuit className="h-6 w-6" />,
    title: 'Local AI',
    status: 'aktiv',
    summary: 'KI-Modelle lokal im Homelab betreiben.',
    description:
      'Lokale AI-Workstation mit Ollama und Open WebUI als Chat-Interface. Verschiedene LLMs und Bildgenerierungs-Modelle laufen auf einer dedizierten GPU. Zusätzlich nutze ich n8n für AI-gestützte Automationen und ComfyUI für Bildergenerierung.',
    highlights: [
      'LLMs lokal mit Ollama',
      'Chat-Interface via Open WebUI',
      'Bildergenerierung mit ComfyUI',
      'Automationen mit n8n',
    ],
    badges: ['Ollama', 'Open WebUI', 'ComfyUI', 'n8n', 'Radeon AI PRO'],
  },
  {
    icon: <Ghost className="h-6 w-6" />,
    title: "Pepper's Ghost Display",
    status: 'geplant',
    summary: 'Holographisches Display als Future-Projekt.',
    description:
      "Ein DIY-Hologramm-Display basierend auf dem Pepper's Ghost Effekt. Geplant mit einem Raspberry Pi als Steuereinheit und einer semi-transparenten Folie. Eventuell mit lokaler AI-Integration für interaktive Inhalte.",
    highlights: [
      'Raspberry Pi als Controller',
      'Pepper\'s Ghost Optik-Effekt',
      'Mögliche AI-Chat-Integration',
      'Komplett selbst gebaut',
    ],
    badges: ['Raspberry Pi', 'DIY', 'Hardware'],
  },
]

export default function Projekte() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
      {/* ── Header ── */}
      <FadeIn>
        <div className="mb-16">
          <Button variant="ghost" size="sm" asChild className="mb-6 -ml-3 text-muted-foreground">
            <Link to="/">
              <ArrowLeft className="mr-1 h-4 w-4" /> Zurück
            </Link>
          </Button>
          <Badge variant="secondary" className="mb-4">Portfolio</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Projekte
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Meine aktuellen und geplanten Projekte — von Media-Automation bis AI im Homelab.
          </p>
        </div>
      </FadeIn>

      {/* ── Project cards ── */}
      <div className="space-y-6">
        {projects.map(({ icon, title, status, summary, description, highlights, badges }, i) => {
          const s = statusMap[status]
          return (
            <FadeIn key={title} delay={i * 120}>
              <Card className="transition-all duration-200 hover:shadow-lg overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-muted-foreground shrink-0">
                        {icon}
                      </div>
                      <div>
                        <CardTitle className="text-base">{title}</CardTitle>
                        <CardDescription className="text-xs mt-0.5">{summary}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className={`shrink-0 gap-1.5 ${s.className}`}>
                      {s.icon} {s.label}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>

                  {highlights && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Highlights</p>
                      <ul className="grid gap-1.5 sm:grid-cols-2">
                        {highlights.map((h) => (
                          <li key={h} className="flex items-center gap-2 text-sm text-foreground">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {badges.map((b) => (
                      <Badge key={b} variant="secondary" className="text-[11px] font-normal">
                        {b}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          )
        })}
      </div>
    </section>
  )
}
