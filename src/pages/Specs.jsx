import { Link } from 'react-router-dom'

const servers = [
  {
    name: 'Main Server',
    role: 'Jellyfin, *arr-Stack, Docker Host',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-12400' },
      { label: 'RAM', value: '32 GB DDR4' },
      { label: 'Storage', value: '2× 4 TB HDD (RAID 1) + 500 GB NVMe' },
      { label: 'OS', value: 'Proxmox VE' },
      { label: 'Services', value: 'Jellyfin, Sonarr, Radarr, Prowlarr, qBittorrent' },
    ],
  },
  {
    name: 'AI Workstation',
    role: 'Lokale AI-Modelle & Experimente',
    specs: [
      { label: 'CPU', value: 'AMD Ryzen 7 5800X' },
      { label: 'GPU', value: 'NVIDIA RTX 3060 12 GB' },
      { label: 'RAM', value: '32 GB DDR4' },
      { label: 'Storage', value: '1 TB NVMe SSD' },
      { label: 'OS', value: 'Ubuntu Server 24.04' },
      { label: 'Stack', value: 'Ollama, Open WebUI' },
    ],
  },
  {
    name: 'Dev Machine',
    role: 'Entwicklung & Daily Driver',
    specs: [
      { label: 'CPU', value: 'AMD Ryzen 5 5600X' },
      { label: 'GPU', value: 'NVIDIA RTX 3070' },
      { label: 'RAM', value: '16 GB DDR4' },
      { label: 'Storage', value: '1 TB NVMe SSD' },
      { label: 'OS', value: 'Windows 11' },
      { label: 'Tools', value: 'VS Code, Docker Desktop, WSL2' },
    ],
  },
]

const network = [
  { label: 'Router', value: 'UniFi Dream Machine' },
  { label: 'Switch', value: 'UniFi Switch 8 PoE' },
  { label: 'AP', value: 'UniFi U6 Lite' },
  { label: 'DNS', value: 'Pi-hole (Docker)' },
  { label: 'Reverse Proxy', value: 'Nginx Proxy Manager' },
]

function SpecCard({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-400 font-medium shrink-0">{label}</span>
      <span className="text-sm text-gray-900 font-medium text-right">{value}</span>
    </div>
  )
}

export default function Specs() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
      {/* ── Header ── */}
      <div className="mb-16">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-6"
        >
          ← Zurück
        </Link>
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-3">Homelab</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
          Specs &amp; Setup
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl">
          Drei Maschinen, ein Netzwerk — mein Homelab für Media-Streaming, 
          AI-Experimente und Entwicklung.
        </p>
      </div>

      {/* ── Server cards ── */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
        {servers.map((server) => (
          <div
            key={server.name}
            className="rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:border-gray-300 hover:shadow-sm"
          >
            <div className="mb-4">
              <h2 className="text-base font-bold text-gray-900">{server.name}</h2>
              <p className="text-xs text-gray-400 mt-0.5">{server.role}</p>
            </div>
            <div className="divide-y divide-gray-100">
              {server.specs.map(({ label, value }) => (
                <SpecCard key={label} label={label} value={value} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Network ── */}
      <div className="mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-6">Netzwerk</p>
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="grid gap-x-12 gap-y-1 sm:grid-cols-2">
            {network.map(({ label, value }) => (
              <SpecCard key={label} label={label} value={value} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Diagram / Overview ── */}
      <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-8 text-center">
        <p className="text-sm text-gray-400 mb-2">Topologie</p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-gray-600">
          <span className="rounded-full border border-gray-200 bg-white px-4 py-1.5 shadow-sm">Internet</span>
          <span className="text-gray-300">→</span>
          <span className="rounded-full border border-gray-200 bg-white px-4 py-1.5 shadow-sm">UDM</span>
          <span className="text-gray-300">→</span>
          <span className="rounded-full border border-gray-200 bg-white px-4 py-1.5 shadow-sm">Switch</span>
          <span className="text-gray-300">→</span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full border border-gray-900 bg-gray-900 px-4 py-1.5 text-white shadow-sm">Main Server</span>
            <span className="rounded-full border border-gray-900 bg-gray-900 px-4 py-1.5 text-white shadow-sm">AI Workstation</span>
            <span className="rounded-full border border-gray-900 bg-gray-900 px-4 py-1.5 text-white shadow-sm">Dev Machine</span>
          </div>
        </div>
      </div>
    </section>
  )
}
