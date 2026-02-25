import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      {/* ── Hero ── */}
      <div className="mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-3">About me</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
          Hey, ich bin Pascal&nbsp;
          <span className="inline-block origin-[70%_70%] animate-[wave_2.5s_ease-in-out_infinite]">👋</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-500">
          17-jähriger <span className="text-gray-900 font-medium">Applikationsentwickler</span> in der Lehre. 
          Ich interessiere mich für Clean UI, Automation und alles rund um mein Homelab. 
          In meiner Freizeit betreibe ich Homelabbing und Sport.
        </p>
      </div>

      {/* ── Quick facts ── */}
      <div className="grid gap-4 sm:grid-cols-2 mb-16">
        {[
          { label: 'Fokus', value: 'Clean UI, Automation, Homelab' },
          { label: 'Setup', value: '3 PCs für verschiedene Projekte' },
          { label: 'Hobbies', value: 'Homelabbing & Sport' },
          { label: 'GitHub', value: 'platteXDlol', href: 'https://github.com/platteXDlol' },
        ].map(({ label, value, href }) => (
          <div
            key={label}
            className="rounded-2xl border border-gray-200 bg-gray-50/50 px-5 py-4 transition-all duration-200 hover:border-gray-300 hover:shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">{label}</p>
            {href ? (
              <a href={href} target="_blank" rel="noreferrer" className="text-gray-900 font-medium hover:underline">
                {value} ↗
              </a>
            ) : (
              <p className="text-gray-900 font-medium">{value}</p>
            )}
          </div>
        ))}
      </div>

      {/* ── Projects highlight ── */}
      <div className="mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-6">Projekte</p>

        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200 p-6 transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎬</span>
              <div>
                <h3 className="font-semibold text-gray-900">Jellyfin &amp; *arr-Stack</h3>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                  Skalierbarer Media-Server mit Jellyfin, Sonarr, Radarr und Prowlarr. 
                  Fokus auf Automation, Zuverlässigkeit und eine saubere UX.
                </p>
                <a
                  href="http://jellyfin.pascalhocher.ch"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-gray-900 hover:underline"
                >
                  jellyfin.pascalhocher.ch <span className="text-gray-400">↗</span>
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🤖</span>
              <div>
                <h3 className="font-semibold text-gray-900">Local AI</h3>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                  Lokale AI-Workloads im Homelab — Experimente mit Modellen, 
                  private Daten und transparente Infrastruktur.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl">👻</span>
              <div>
                <h3 className="font-semibold text-gray-900">Pepper's Ghost Display</h3>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                  Geplant: Holographisches Display mit Raspberry Pi, 
                  eventuell mit lokaler AI-Integration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="flex items-center gap-4">
        <Link
          to="/specs"
          className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md"
        >
          Homelab Specs ansehen →
        </Link>
        <a
          href="https://github.com/platteXDlol"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-gray-300 hover:shadow-sm"
        >
          GitHub ↗
        </a>
      </div>
    </section>
  )
}
