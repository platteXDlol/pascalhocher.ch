import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { FadeIn } from '@/components/FadeIn'
import { ArrowLeft } from 'lucide-react'
import * as d3 from 'd3'

/* ═══════════════════════════════════════
   SVG icon paths (24×24 viewBox)
   ═══════════════════════════════════════ */
const ICONS = {
  // Infrastructure
  globe: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
  router: 'M20.2 5.9l.8-.8C19.6 3.7 17.8 3 16 3s-3.6.7-5 2.1l.8.8C13 4.8 14.5 4.2 16 4.2s3 .6 4.2 1.7zm-.9.8c-.9-.9-2.1-1.4-3.3-1.4s-2.4.5-3.3 1.4l.8.8c.7-.7 1.6-1 2.5-1s1.8.3 2.5 1l.8-.8zM19 13h-2V9h-2v4H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm0 6H5v-4h14v4zM6 16h2v2H6zm3.5 0h2v2h-2zm3.5 0h2v2h-2z',
  clients: 'M4 6h18V4H2v13H0v3h14v-3H4V6zm20 2h-8v12h8V8zm-2 9h-4v-7h4v7z',
  // Servers
  server: 'M2 5a2 2 0 012-2h16a2 2 0 012 2v3a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 1.5a1 1 0 100 2 1 1 0 000-2zM17 7h2v1h-2V7zM2 14a2 2 0 012-2h16a2 2 0 012 2v3a2 2 0 01-2 2H4a2 2 0 01-2-2v-3zm3 1.5a1 1 0 100 2 1 1 0 000-2zM17 15h2v1h-2v-1z',
  mediaserver: 'M21 3H3a2 2 0 00-2 2v12a2 2 0 002 2h5v2h8v-2h5a2 2 0 002-2V5a2 2 0 00-2-2zm0 14H3V5h18v12zM9 8l7 4.5-7 4.5V8z',
  brain: 'M15.82 7.54c0-1-.55-1.91-1.37-2.4A2.46 2.46 0 0012 4.08c-1.07 0-2 .56-2.45 1.06-.82.49-1.37 1.4-1.37 2.4 0 .71.22 1.32.6 1.82C8.28 10.16 8 11.04 8 12c0 1.93 1.07 3.5 3 4.31V21h2v-4.69c1.93-.81 3-2.38 3-4.31 0-.96-.28-1.84-.78-2.64.38-.5.6-1.11.6-1.82z',
  // Services
  wireguard: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 3.18L18 7.3v3.7c0 4.13-2.72 7.99-6 9.14-3.28-1.15-6-5.01-6-9.14V7.3l6-3.12z',
  adguard: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 15l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z',
  nginx: 'M5.12 5L2 12l3.12 7h2.55L4.55 12l3.12-7H5.12zM18.88 5L22 12l-3.12 7h-2.55l3.12-7-3.12-7h2.55zM13.5 5h-2l-1 14h2l1-14z',
  authentik: 'M12.65 10A6 6 0 007 6a6 6 0 100 12 5.98 5.98 0 005.65-4H17v4h4v-4h2v-4H12.65zM7 14a2 2 0 110-4 2 2 0 010 4z',
  teamspeak: 'M12 1a9 9 0 00-9 9v7a3 3 0 003 3h3v-8H5v-2a7 7 0 0114 0v2h-4v8h3a3 3 0 003-3v-7a9 9 0 00-9-9z',
  docker: 'M21 7v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2zM5 8h3.5v3H5V8zm0 4.5h3.5v3H5v-3zm4.25-4.5h3.5v3h-3.5V8zm0 4.5h3.5v3h-3.5v-3zM14.5 8H18v3h-3.5V8zm0 4.5H18v3h-3.5v-3z',
  sonarr: 'M21 3H3a2 2 0 00-2 2v12a2 2 0 002 2h5v2h8v-2h5a2 2 0 002-2V5a2 2 0 00-2-2zm0 14H3V5h18v12z',
  radarr: 'M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V4h-4z',
  nzbget: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',
  jellyfin: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l7 4.5-7 4.5z',
  jellyseerr: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z',
  prowlarr: 'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1114 9.5 4.49 4.49 0 019.5 14z',
  ollama: 'M12 2C9 2 7 4.5 7 7c0 1.2.4 2.3 1 3.2-.6.8-1 2-1 3.3C7 16.5 9 19 12 19s5-2.5 5-5.5c0-1.3-.4-2.5-1-3.3.6-.9 1-2 1-3.2 0-2.5-2-5-5-5zm-2 7.5a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm4 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zM12 21a2 2 0 100-4 2 2 0 000 4z',
  comfyui: 'M6 4a2 2 0 00-2 2v2a2 2 0 002 2h1v2H6a2 2 0 00-2 2v2a2 2 0 002 2h3a2 2 0 002-2v-2h2v2a2 2 0 002 2h3a2 2 0 002-2v-2a2 2 0 00-2-2h-1v-2h1a2 2 0 002-2V6a2 2 0 00-2-2h-3a2 2 0 00-2 2v2h-2V6a2 2 0 00-2-2H6z',
  openwebui: 'M20 2H4a2 2 0 00-2 2v12a2 2 0 002 2h14l4 4V4a2 2 0 00-2-2zm-3 11H7v-2h10v2zm0-3H7V8h10v2z',
  homarr: 'M3 3v8h8V3H3zm2 2h4v4H5V5zm8-2v8h8V3h-8zm2 2h4v4h-4V5zM3 13v8h8v-8H3zm2 2h4v4H5v-4zm8-2v8h8v-8h-8zm2 2h4v4h-4v-4z',
  prometheus: 'M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z',
  portainer: 'M3 3h18v4H3V3zm0 6h18v4H3V9zm0 6h18v4H3v-4zm2-10v2h2V5H5zm0 6v2h2v-2H5zm0 6v2h2v-2H5z',
  grafana: 'M3 20h18v1H3v-1zm1-2l3.5-6 2.5 3 4-7.5L19 16H4z',
  uptimekuma: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
}

/* ═══════════════════════════════════════
   Inline icon component (HTML context)
   ═══════════════════════════════════════ */
function NodeIcon({ icon, size = 20, className = '' }) {
  if (!ICONS[icon]) return null
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`inline-block shrink-0 ${className}`}>
      <path d={ICONS[icon]} className="fill-foreground" />
    </svg>
  )
}

/* ═══════════════════════════════════════
   Network data
   ═══════════════════════════════════════ */
const BASE_NODES = [
  { id: 'internet', label: 'Internet', icon: 'globe', group: 'infra', color: '#94a3b8', services: [] },
  { id: 'router', label: 'Router / Switch', icon: 'router', group: 'infra', color: '#3b82f6', services: ['DHCP', 'Firewall', 'VLAN'] },
  {
    id: 'media', label: 'Media Server', icon: 'mediaserver', group: 'server', color: '#6366f1',
    services: ['Jellyfin', 'Sonarr', 'Radarr', 'Prowlarr', 'NZBGet', 'Jellyseerr'],
    detail: 'i5-9600 · 32 GB · Proxmox',
    expandable: true,
    children: [
      { id: 'media-ct-sonarr-fr', label: 'Sonarr FR', type: 'CT', icon: 'sonarr', services: ['Sonarr', 'Serien FR'] },
      { id: 'media-ct-sonarr-de', label: 'Sonarr DE', type: 'CT', icon: 'sonarr', services: ['Sonarr', 'Serien DE'] },
      { id: 'media-ct-radarr-de', label: 'Radarr DE', type: 'CT', icon: 'radarr', services: ['Radarr', 'Filme DE'] },
      { id: 'media-ct-radarr-fr', label: 'Radarr FR', type: 'CT', icon: 'radarr', services: ['Radarr', 'Filme FR'] },
      { id: 'media-ct-nzbget', label: 'NZBGet', type: 'CT', icon: 'nzbget', services: ['NZBGet', 'Download Client'] },
      { id: 'media-ct-jellyfin', label: 'Jellyfin', type: 'CT', icon: 'jellyfin', services: ['Jellyfin', 'HW Transcoding'] },
      { id: 'media-ct-jellyseerr', label: 'Jellyseerr', type: 'CT', icon: 'jellyseerr', services: ['Jellyseerr', 'Requests'] },
      { id: 'media-ct-prowlarr', label: 'Prowlarr', type: 'CT', icon: 'prowlarr', services: ['Prowlarr', 'Indexer Sync'] },
    ],
  },
  {
    id: 'ai', label: 'AI Workstation', icon: 'brain', group: 'server', color: '#f59e0b',
    services: ['Ollama', 'ComfyUI', 'Open WebUI'],
    detail: 'Xeon W 2125 · 64 GB · Radeon AI PRO',
    expandable: true,
    children: [
      { id: 'ai-vm-gpu', label: 'Ollama & ComfyUI', type: 'VM', icon: 'ollama', services: ['Ollama', 'ComfyUI', 'GPU Passthrough', 'ROCm'] },
      { id: 'ai-ct-webui', label: 'Open WebUI', type: 'CT', icon: 'openwebui', services: ['Open WebUI', 'Chat Interface'] },
    ],
  },
  {
    id: 'main', label: 'Main Machine', icon: 'server', group: 'server', color: '#10b981',
    services: ['NPM', 'AdGuard', 'WireGuard', 'Authentik', 'TeamSpeak'],
    detail: 'i5-6500 · 32 GB · Proxmox',
    expandable: true,
    children: [
      { id: 'main-vm-wireguard', label: 'WireGuard', type: 'VM', icon: 'wireguard', services: ['WireGuard', 'VPN Tunnel'] },
      { id: 'main-ct-adguard', label: 'AdGuard Home', type: 'CT', icon: 'adguard', services: ['AdGuard Home', 'DNS Filtering'] },
      { id: 'main-ct-npm', label: 'Nginx Proxy', type: 'CT', icon: 'nginx', services: ['NPM', 'SSL Certs', 'Reverse Proxy'] },
      { id: 'main-ct-authentik', label: 'Authentik', type: 'CT', icon: 'authentik', services: ['Authentik', 'SSO', 'Auth'] },
      { id: 'main-ct-teamspeak', label: 'TeamSpeak', type: 'CT', icon: 'teamspeak', services: ['TeamSpeak', 'Voice Server'] },
      { id: 'main-ct-docker', label: 'Docker Stack', type: 'CT', icon: 'docker', services: ['docMost', 'Homarr', 'Prometheus', 'Portainer', 'Grafana', 'Uptime Kuma'] },
    ],
  },
]

const BASE_EDGES = [
  { source: 'internet', target: 'router' },
  { source: 'router', target: 'media' },
  { source: 'router', target: 'ai' },
  { source: 'router', target: 'main' },
  { source: 'media', target: 'ai', dashed: true },
  { source: 'main', target: 'ai', dashed: true },
]

const baseNodeMap = Object.fromEntries(BASE_NODES.map(n => [n.id, n]))

/* ═══════════════════════════════════════
   Build flat nodes & links from
   expanded state
   ═══════════════════════════════════════ */
function buildGraph(expanded) {
  const nodes = []
  const links = []
  const nodeIndex = {}

  // Main nodes
  BASE_NODES.forEach(n => {
    const node = { ...n, _isChild: false, _parentId: null }
    nodes.push(node)
    nodeIndex[n.id] = node
  })

  // Base links
  BASE_EDGES.forEach(e => {
    links.push({ source: e.source, target: e.target, dashed: !!e.dashed, _isChild: false })
  })

  // Expanded children
  expanded.forEach(parentId => {
    const parent = baseNodeMap[parentId]
    if (!parent?.children) return
    parent.children.forEach(child => {
      const cNode = {
        ...child,
        group: 'child',
        color: parent.color,
        _isChild: true,
        _parentId: parentId,
      }
      nodes.push(cNode)
      nodeIndex[child.id] = cNode
      links.push({ source: parentId, target: child.id, dashed: false, _isChild: true })
    })
  })

  return { nodes, links }
}

/* ═══════════════════════════════════════
   Info panel
   ═══════════════════════════════════════ */
function InfoPanel({ node }) {
  if (!node) return null
  return (
    <Card className="transition-all duration-300 animate-in fade-in-0 slide-in-from-bottom-2">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <NodeIcon icon={node.icon} size={22} />
          <div>
            <p className="font-semibold text-sm text-foreground">{node.label}</p>
            {node.detail && <p className="text-[11px] text-muted-foreground">{node.detail}</p>}
            {node.type && (
              <Badge variant={node.type === 'VM' ? 'default' : 'secondary'} className="text-[10px] mt-1 px-1.5 py-0">
                {node.type}
              </Badge>
            )}
          </div>
        </div>
        {node.services?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {node.services.map(s => (
              <Badge key={s} variant="secondary" className="text-[11px] font-normal">{s}</Badge>
            ))}
          </div>
        )}
        {node.expandable && (
          <p className="text-[11px] text-muted-foreground mt-3 flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Klicken zum Auf-/Zuklappen
          </p>
        )}
      </CardContent>
    </Card>
  )
}

/* ═══════════════════════════════════════
   Force-directed graph component
   ═══════════════════════════════════════ */
function ForceGraph({ width, height, expanded, onToggle, hovered, onHover }) {
  const svgRef = useRef(null)
  const simRef = useRef(null)
  const draggingNodeRef = useRef(null)
  const [graphState, setGraphState] = useState({ nodes: [], links: [] })
  const posMapRef = useRef({})

  // Build / rebuild simulation when expanded changes
  useEffect(() => {
    const { nodes, links } = buildGraph(expanded)

    // Restore previous positions
    nodes.forEach(n => {
      const prev = posMapRef.current[n.id]
      if (prev) {
        n.x = prev.x
        n.y = prev.y
        n.vx = prev.vx || 0
        n.vy = prev.vy || 0
      } else if (n._isChild && posMapRef.current[n._parentId]) {
        // Start child at parent position + small random offset
        const p = posMapRef.current[n._parentId]
        n.x = p.x + (Math.random() - 0.5) * 40
        n.y = p.y + (Math.random() - 0.5) * 40
      }
    })

    // Stop old simulation
    if (simRef.current) simRef.current.stop()

    // Scale factor: compact forces on small screens, spread on large
    const s = Math.min(width, height) / 500 // ~1.0 at 500px, <1 on mobile, >1 on TV

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id)
        .distance(d => d._isChild ? 45 * s + 15 : 80 * s + 30)
        .strength(d => d._isChild ? 0.7 : 0.4))
      .force('charge', d3.forceManyBody().strength(d => d._isChild ? -80 * s - 40 : -250 * s - 100))
      .force('center', d3.forceCenter(width / 2, height / 2).strength(0.05))
      .force('collision', d3.forceCollide().radius(d => d._isChild ? 20 * s + 8 : 28 * s + 10))
      .force('x', d3.forceX(width / 2).strength(0.03))
      .force('y', d3.forceY(height / 2).strength(0.03))
      .alphaDecay(0.02)
      .velocityDecay(0.35)

    simulation.on('tick', () => {
      // Save positions
      const posMap = {}
      nodes.forEach(n => {
        posMap[n.id] = { x: n.x, y: n.y, vx: n.vx, vy: n.vy }
      })
      posMapRef.current = posMap

      setGraphState({
        nodes: nodes.map(n => ({ ...n })),
        links: links.map(l => ({
          source: { x: l.source.x, y: l.source.y, id: l.source.id },
          target: { x: l.target.x, y: l.target.y, id: l.target.id },
          dashed: l.dashed,
          _isChild: l._isChild,
        })),
      })
    })

    // Heat it up a bit for nice animation
    simulation.alpha(0.8).restart()
    simRef.current = simulation

    return () => simulation.stop()
  }, [expanded, width, height])

  // Zoom & pan
  useEffect(() => {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)
    const g = svg.select('#graph-root')

    const zoom = d3.zoom()
      .scaleExtent([0.3, 4])
      .wheelDelta((event) => -event.deltaY * 0.001)
      .filter((event) => {
        // Ctrl+wheel for zoom
        if (event.type === 'wheel') return event.ctrlKey
        // Touch pinch
        if (event.type === 'touchstart') return event.touches.length >= 2
        // Mouse drag for panning — but NOT when a node is being dragged
        if (event.type === 'mousedown') {
          // Check if we're clicking on a node (g.cursor-pointer ancestor)
          const target = event.target
          const isNode = target.closest?.('.node-group')
          if (isNode) return false // let node drag handler take over
          return !event.button
        }
        return false
      })
      .on('zoom', (e) => {
        g.attr('transform', e.transform)
      })

    svg.call(zoom)

    // Double-click resets zoom
    svg.on('dblclick.zoom', () => {
      svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity)
    })

    return () => svg.on('.zoom', null)
  }, [])

  // Drag handler — moves one node, others follow elastically via simulation
  const handleDragStart = useCallback((e, nodeId) => {
    e.stopPropagation()
    if (!simRef.current) return

    const sim = simRef.current
    const node = sim.nodes().find(n => n.id === nodeId)
    if (!node) return

    draggingNodeRef.current = nodeId

    // High alpha so linked nodes follow elastically
    sim.alphaTarget(0.5).restart()
    node.fx = node.x
    node.fy = node.y

    const svgEl = svgRef.current
    const gEl = svgEl.querySelector('#graph-root')

    // Gentle random nudge for organic feel
    const nudgeOthers = () => {
      sim.nodes().forEach(n => {
        if (n.id === nodeId || n.fx != null) return
        n.vx += (Math.random() - 0.5) * 2
        n.vy += (Math.random() - 0.5) * 2
      })
    }

    const onMove = (ev) => {
      const point = svgEl.createSVGPoint()
      point.x = ev.clientX
      point.y = ev.clientY
      const ctm = gEl.getScreenCTM().inverse()
      const svgPoint = point.matrixTransform(ctm)
      node.fx = svgPoint.x
      node.fy = svgPoint.y
      // Keep sim hot so others elastically follow
      sim.alpha(Math.max(sim.alpha(), 0.4)).restart()
      nudgeOthers()
    }

    const onUp = () => {
      draggingNodeRef.current = null
      sim.alphaTarget(0)
      node.fx = null
      node.fy = null
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', touchMove)
      window.removeEventListener('touchend', onUp)
    }

    const touchMove = (ev) => {
      ev.preventDefault()
      const touch = ev.touches[0]
      const point = svgEl.createSVGPoint()
      point.x = touch.clientX
      point.y = touch.clientY
      const ctm = gEl.getScreenCTM().inverse()
      const svgPoint = point.matrixTransform(ctm)
      node.fx = svgPoint.x
      node.fy = svgPoint.y
      sim.alpha(Math.max(sim.alpha(), 0.4)).restart()
      nudgeOthers()
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', touchMove, { passive: false })
    window.addEventListener('touchend', onUp)
  }, [])

  return (
    <svg ref={svgRef} width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full cursor-grab active:cursor-grabbing" style={{ touchAction: 'none' }}>
      {(() => {
        // Responsive scale factor for node sizes
        const ns = Math.max(0.6, Math.min(1.3, Math.min(width, height) / 500))
        return (
          <>
      <defs>
        {/* Glow filter */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Arrow marker */}
        <marker id="arrow" viewBox="0 0 10 6" refX="10" refY="3" markerWidth="8" markerHeight="6" orient="auto">
          <path d="M0,0 L10,3 L0,6" className="fill-border" />
        </marker>
        {/* Dot grid pattern */}
        <pattern id="dotGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" className="fill-border" opacity="0.35" />
        </pattern>
        {/* Subtle grid lines */}
        <pattern id="gridLines" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <line x1="60" y1="0" x2="60" y2="60" className="stroke-border" strokeWidth="0.5" opacity="0.12" />
          <line x1="0" y1="60" x2="60" y2="60" className="stroke-border" strokeWidth="0.5" opacity="0.12" />
        </pattern>
      </defs>

      {/* Background patterns inside graph-root so they pan/zoom together */}
      <g id="graph-root">
        <rect width={width * 6} height={height * 6} x={-width * 2.5} y={-height * 2.5} fill="url(#gridLines)" className="pointer-events-none" />
        <rect width={width * 6} height={height * 6} x={-width * 2.5} y={-height * 2.5} fill="url(#dotGrid)" className="pointer-events-none" />

        {/* Links */}
        {graphState.links.map((link, i) => {
          const isHl = hovered === link.source.id || hovered === link.target.id
          return (
            <line key={`link-${i}`}
              x1={link.source.x} y1={link.source.y}
              x2={link.target.x} y2={link.target.y}
              className="transition-all duration-200"
              stroke={isHl ? 'hsl(var(--primary))' : 'hsl(var(--border))'}
              strokeWidth={link._isChild ? 1.5 : (isHl ? 2.5 : 2)}
              strokeDasharray={link.dashed ? '6 4' : 'none'}
              strokeLinecap="round"
              opacity={isHl ? 1 : (link._isChild ? 0.6 : 0.5)}
            />
          )
        })}

        {/* Nodes */}
        {graphState.nodes.map(node => {
          const isHov = hovered === node.id
          const isExp = expanded.includes(node.id)
          const r = Math.round((node._isChild ? 20 : (node.group === 'infra' ? 22 : 28)) * ns)
          const iconSize = Math.round((node._isChild ? 18 : (node.group === 'infra' ? 20 : 24)) * ns)

          return (
            <g key={node.id} className="node-group cursor-pointer select-none"
              transform={`translate(${node.x ?? 0}, ${node.y ?? 0})`}
              onMouseDown={(e) => handleDragStart(e, node.id)}
              onTouchStart={(e) => {
                e.stopPropagation()
                const touch = e.touches[0]
                handleDragStart({ stopPropagation: () => {}, clientX: touch.clientX, clientY: touch.clientY }, node.id)
              }}
              onMouseEnter={() => onHover(node.id)}
              onMouseLeave={() => onHover(null)}
              onClick={(e) => {
                e.stopPropagation()
                if (node.expandable) onToggle(node.id)
              }}
            >
              {/* Hover glow */}
              {isHov && (
                <circle cx={0} cy={0} r={r + 8} fill="none" stroke={node.color}
                  strokeWidth={2} opacity={0.3} filter="url(#glow)" />
              )}

              {/* Pulse ring for expanded servers */}
              {isExp && (
                <circle cx={0} cy={0} r={r + 6} fill="none" stroke={node.color}
                  strokeWidth={1.5} opacity={0.4}
                  style={{ animation: 'pingRing 2s ease-out infinite' }} />
              )}

              {/* Main circle */}
              <circle cx={0} cy={0} r={r}
                className={isHov ? 'fill-secondary' : 'fill-card'}
                stroke={isHov || isExp ? node.color : 'hsl(var(--border))'}
                strokeWidth={isHov || isExp ? 2.5 : 1.5}
                style={{ transition: 'fill 0.2s, stroke 0.2s, stroke-width 0.2s' }}
              />

              {/* Expand badge */}
              {node.expandable && !isExp && (
                <g>
                  <circle cx={r - 3} cy={-(r - 3)} r={6} fill={node.color} opacity={0.85} />
                  <text x={r - 3} y={-(r - 3) + 1} textAnchor="middle" dominantBaseline="central"
                    fill="white" style={{ fontSize: 8, fontWeight: 700 }} className="pointer-events-none">+</text>
                </g>
              )}
              {/* Collapse badge */}
              {isExp && (
                <g>
                  <circle cx={r - 3} cy={-(r - 3)} r={6} fill={node.color} opacity={0.85} />
                  <text x={r - 3} y={-(r - 3) + 0.5} textAnchor="middle" dominantBaseline="central"
                    fill="white" style={{ fontSize: 10, fontWeight: 700 }} className="pointer-events-none">−</text>
                </g>
              )}

              {/* VM/CT type badge */}
              {node.type && (
                <g>
                  <rect x={-10} y={-(r + 14)} width={20} height={11} rx={4}
                    fill={node.type === 'VM' ? '#6366f1' : '#10b981'} opacity={0.9} />
                  <text x={0} y={-(r + 8)} textAnchor="middle" dominantBaseline="central"
                    fill="white" style={{ fontSize: 7, fontWeight: 600 }} className="pointer-events-none">
                    {node.type}
                  </text>
                </g>
              )}

              {/* SVG icon */}
              {ICONS[node.icon] && (
                <path
                  d={ICONS[node.icon]}
                  transform={`translate(${-iconSize/2}, ${-iconSize/2}) scale(${iconSize/24})`}
                  className="fill-foreground pointer-events-none"
                  opacity={0.85}
                />
              )}

              {/* Label */}
              <text x={0} y={r + Math.round(12 * ns)} textAnchor="middle"
                className="fill-foreground font-medium pointer-events-none"
                style={{ fontSize: Math.max(7, Math.round(9 * ns)), opacity: isHov ? 1 : 0.7, transition: 'opacity 0.2s' }}>
                {node.label}
              </text>
            </g>
          )
        })}
      </g>
      </>
      )})()}
    </svg>
  )
}

/* ═══════════════════════════════════════
   Page
   ═══════════════════════════════════════ */
export default function Netzwerk() {
  const [expanded, setExpanded] = useState([])
  const [hovered, setHovered] = useState(null)
  const containerRef = useRef(null)
  const [dims, setDims] = useState({ w: 900, h: 650 })
  const [isMobile, setIsMobile] = useState(false)

  // Responsive size — adapts from phone to TV
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const vw = window.innerWidth
      const mobile = vw < 768
      setIsMobile(mobile)

      let h
      if (vw < 480) {
        // Phone: nearly square, compact
        h = Math.max(rect.width * 0.9, 280)
      } else if (vw < 768) {
        // Tablet portrait
        h = Math.max(rect.width * 0.8, 350)
      } else if (vw < 1280) {
        // Desktop / tablet landscape
        h = Math.min(rect.width * 0.65, 700)
      } else {
        // Large desktop / TV
        h = Math.min(rect.width * 0.6, 900)
      }
      setDims({ w: Math.max(rect.width, 280), h: Math.max(h, 280) })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const toggleExpand = useCallback((nodeId) => {
    setExpanded(prev =>
      prev.includes(nodeId) ? prev.filter(id => id !== nodeId) : [...prev, nodeId]
    )
  }, [])

  const hoveredNode = hovered
    ? BASE_NODES.find(n => n.id === hovered)
      || BASE_NODES.flatMap(n => n.children || []).find(c => c.id === hovered)
    : null

  return (
    <section className="mx-auto max-w-7xl px-3 sm:px-6 py-12 sm:py-20 lg:py-28">
      <style>{`
        @keyframes pingRing {
          0% { r: 34; opacity: 0.4; }
          100% { r: 50; opacity: 0; }
        }
      `}</style>

      <FadeIn>
        <div className="mb-6 sm:mb-10">
          <Button variant="ghost" size="sm" asChild className="mb-4 sm:mb-6 -ml-3 text-muted-foreground">
            <Link to="/specs"><ArrowLeft className="mr-1 h-4 w-4" /> Specs</Link>
          </Button>
          <Badge variant="secondary" className="mb-3 sm:mb-4">Netzwerk</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Topologie
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-muted-foreground max-w-2xl">
            Interaktive Netzwerk-Topologie. {isMobile ? 'Tippe' : 'Klicke'} auf Server zum Aufklappen.{!isMobile && ' Ziehe Nodes und zoome mit Ctrl + Mausrad.'}
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_260px] gap-4 sm:gap-6">
          {/* Graph canvas */}
          <Card className="overflow-hidden" ref={containerRef} style={{ height: dims.h + 2 }}>
            <CardContent className="p-0 h-full">
              <ForceGraph
                width={dims.w} height={dims.h}
                expanded={expanded}
                onToggle={toggleExpand}
                hovered={hovered}
                onHover={setHovered}
              />
            </CardContent>
          </Card>

          {/* Side panel — scrollable on desktop, stacked on mobile */}
          <div className="space-y-3 sm:space-y-4 lg:overflow-y-auto lg:pr-1" style={{ maxHeight: isMobile ? undefined : dims.h + 2 }}>
            {/* Hover info */}
            <div className="hidden lg:block">
              {hoveredNode ? (
                <InfoPanel node={hoveredNode} />
              ) : (
                <Card className="border-dashed">
                  <CardContent className="p-4 text-center text-xs text-muted-foreground">
                    Hover über einen Node für Details.
                    <br />Klicke auf Server zum Aufklappen.
                    <br /><span className="text-muted-foreground/60">Ziehen &amp; Ctrl+Mausrad zum Bewegen.</span>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Expanded server summaries */}
            {expanded.map(id => {
              const server = baseNodeMap[id]
              if (!server?.children) return null
              return (
                <Card key={id} className="animate-in fade-in-0 slide-in-from-bottom-2">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <NodeIcon icon={server.icon} size={14} /> {server.label}
                      </p>
                      <button onClick={() => toggleExpand(id)}
                        className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                        Zuklappen
                      </button>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{server.detail}</p>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="rounded-lg bg-secondary/50 p-2 text-center">
                        <p className="text-xs text-muted-foreground">VMs</p>
                        <p className="text-sm font-semibold text-foreground">
                          {server.children.filter(c => c.type === 'VM').length}
                        </p>
                      </div>
                      <div className="rounded-lg bg-secondary/50 p-2 text-center">
                        <p className="text-xs text-muted-foreground">CTs</p>
                        <p className="text-sm font-semibold text-foreground">
                          {server.children.filter(c => c.type === 'CT').length}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1 pt-1">
                      {server.children.map(c => (
                        <div
                          key={c.id}
                          className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors cursor-pointer ${
                            hovered === c.id ? 'bg-secondary' : 'hover:bg-secondary/50'
                          }`}
                          onMouseEnter={() => setHovered(c.id)}
                          onMouseLeave={() => setHovered(null)}
                        >
                          <NodeIcon icon={c.icon} size={14} />
                          <span className="font-medium text-foreground">{c.label}</span>
                          <Badge variant={c.type === 'VM' ? 'default' : 'outline'} className="text-[9px] ml-auto px-1 py-0">
                            {c.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {/* Legend */}
            <Card>
              <CardContent className="p-4 space-y-2.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Legende</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <svg width="24" height="2"><line x1="0" y1="1" x2="24" y2="1" className="stroke-border" strokeWidth="2" /></svg>
                  Direkte Verbindung
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <svg width="24" height="2"><line x1="0" y1="1" x2="24" y2="1" className="stroke-border" strokeWidth="1.5" strokeDasharray="4 3" /></svg>
                  Interne Kommunikation
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-block h-3 w-3 rounded-full border-2" style={{ borderColor: '#6366f1' }} />
                  Server (klickbar)
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: '#10b981' }} />
                  CT (Container)
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: '#6366f1' }} />
                  VM (Virtual Machine)
                </div>
              </CardContent>
            </Card>

            {/* Quick stats */}
            <Card>
              <CardContent className="p-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Übersicht</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Server', value: '3' },
                    { label: 'VMs / CTs', value: '16' },
                    { label: 'OS', value: 'Proxmox' },
                    { label: 'VPN', value: 'WireGuard' },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-lg bg-secondary/50 p-2 text-center">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-semibold text-foreground">{value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mobile info — tapped node */}
            <div className="lg:hidden">
              {hoveredNode && <InfoPanel node={hoveredNode} />}
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
