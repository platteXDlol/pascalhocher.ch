import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { FadeIn } from '@/components/FadeIn'
import { ArrowLeft, Server, MonitorCog, Laptop, Network } from 'lucide-react'

const servers = [
  {
    icon: <Server className="h-5 w-5" />,
    name: 'Media Server',
    role: 'Jellyfin, *arr-Stack, Docker Host',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-9600' },
      { label: 'RAM', value: '32 GB DDR4' },
      { label: 'Storage', value: '2× 4 TB HDD + 500 GB NVMe' },
      { label: 'OS', value: 'Proxmox VE' },
      { label: 'Services', value: 'Jellyfin, Sonarr, Radarr, Prowlarr, NZBGet' },
    ],
  },
  {
    icon: <MonitorCog className="h-5 w-5" />,
    name: 'AI Workstation',
    role: 'Lokale AI-Modelle & Experimente',
    specs: [
      { label: 'CPU', value: 'Intel Xeon W 2125' },
      { label: 'GPU', value: 'AsRock Radeon AI PRO R9700 Creator 32 GB' },
      { label: 'RAM', value: '64 GB DDR4' },
      { label: 'Storage', value: '4 TB NVMe SSD' },
      { label: 'OS', value: 'Proxmox VE' },
      { label: 'Stack', value: 'Ollama, Open WebUI, n8n, ComfyUI' },
    ],
  },
  {
    icon: <Laptop className="h-5 w-5" />,
    name: 'Main Machine',
    role: 'Entwicklung & Daily Driver',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-6500' },
      { label: 'RAM', value: '32 GB DDR4' },
      { label: 'Storage', value: '500 GB NVMe SSD' },
      { label: 'OS', value: 'Proxmox VE' },
      { label: 'Tools', value: 'NPM, AdGuard Home, WireGuard' },
    ],
  },
]

function SpecRow({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2 text-sm">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="font-medium text-foreground text-right">{value}</span>
    </div>
  )
}

export default function Specs() {
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
          <Badge variant="secondary" className="mb-4">Homelab</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Specs &amp; Setup
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Drei Maschinen, ein Netzwerk — mein Homelab für Media-Streaming,
            AI-Experimente und Entwicklung.
          </p>
        </div>
      </FadeIn>

      {/* ── Server cards ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-16">
        {servers.map((server, i) => (
          <FadeIn key={server.name} delay={i * 120}>
            <Card className="transition-all duration-200 hover:shadow-md h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                    {server.icon}
                  </div>
                  <div>
                    <CardTitle className="text-sm">{server.name}</CardTitle>
                    <CardDescription className="text-[11px]">{server.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-border">
                  {server.specs.map(({ label, value }) => (
                    <SpecRow key={label} label={label} value={value} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>

      <Separator className="mb-16" />
    </section>
  )
}
