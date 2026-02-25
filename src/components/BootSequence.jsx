import { useState, useEffect, useRef, useCallback } from 'react'

/* ═══════════════════════════════════════
   Fake Proxmox / BIOS Boot Sequence
   Plays once per session, skippable
   ═══════════════════════════════════════ */

const BOOT_LINES = [
  { text: 'Real BIOS (C) 2001 Swedish Ultracore, Inc.', delay: 0, color: '#aaa' },
  { text: 'Intel(R) Core(TM) i3-6700 CPU @ 3.10GHz', delay: 80, color: '#ccc' },
  { text: 'Memory Test: 131072 MB OK', delay: 200, color: '#ccc' },
  { text: '', delay: 350 },
  { text: 'Detecting drives...', delay: 500, color: '#888' },
  { text: '  SATA0: Samsung SSD 990 EVO 8TB', delay: 750, color: '#ccc' },
  { text: '', delay: 900 },
  { text: 'Boot device: Samsung SSD 990 EVO 8TB', delay: 1000, color: '#888' },
  { text: '', delay: 1200 },
  { text: 'Proxmox VE 9.3.2 (kernel 6.8.12-5-pve)', delay: 1400, color: '#e5a00d' },
  { text: '', delay: 1550 },
  { text: '[  OK  ] Started pve-cluster.service', delay: 1700, ok: true },
  { text: '[  OK  ] Started pvedaemon.service', delay: 1800, ok: true },
  { text: '[  OK  ] Started pveproxy.service', delay: 1950, ok: true },
  { text: '', delay: 2100 },
  { text: 'Starting LXC containers...', delay: 2200, color: '#888' },
  { text: '  [CT 100] nginx-proxy        ... started', delay: 2350, ct: true },
  { text: '  [CT 103] jellyfin           ... started', delay: 2450, ct: true },
  { text: '  [CT 108] nzbget             ... started', delay: 2550, ct: true },
  { text: '  [CT 112] docker-stack       ... started', delay: 2700, ct: true },
  { text: '', delay: 2850 },
  { text: 'Starting QEMU/KVM virtual machines...', delay: 2950, color: '#888' },
  { text: '  [VM 200] wireguard-vpn      ... started', delay: 3150, vm: true },
  { text: '  [VM 201] ollama-comfyui     ... started (GPU passthrough)', delay: 3400, vm: true },
  { text: '', delay: 3600 },
  { text: '[  OK  ] All containers and VMs running', delay: 3750, ok: true },
  { text: '', delay: 3950 },
  // Login & password use typing animation
  { text: 'login: ', delay: 4100, color: '#d4d4d8', typeText: 'root', typeColor: '#10b981', typeSpeed: 80 },
  { text: 'Password: ', delay: 4700, color: '#d4d4d8', typeText: '********', typeColor: '#10b981', typeSpeed: 60 },
  { text: '', delay: 5500 },
  { text: 'Loading portfolio...', delay: 5700, color: '#10b981' },
]

const TOTAL_DURATION = 6200

function TypeLine({ prefix, prefixColor, text, textColor, speed = 80 }) {
  const [typed, setTyped] = useState('')
  const idxRef = useRef(0)

  useEffect(() => {
    const iv = setInterval(() => {
      idxRef.current++
      if (idxRef.current <= text.length) {
        setTyped(text.slice(0, idxRef.current))
      } else {
        clearInterval(iv)
      }
    }, speed)
    return () => clearInterval(iv)
  }, [text, speed])

  return (
    <div>
      <span style={{ color: prefixColor }}>{prefix}</span>
      <span style={{ color: textColor }}>{typed}</span>
      {typed.length < text.length && (
        <span className="inline-block w-2 h-3.5 bg-green-500 animate-pulse ml-0.5 align-middle" />
      )}
    </div>
  )
}

function BootLine({ line }) {
  if (!line.text && !line.typeText) return <div className="h-3" />

  if (line.typeText) {
    return (
      <TypeLine
        prefix={line.text}
        prefixColor={line.color || '#d4d4d8'}
        text={line.typeText}
        textColor={line.typeColor || '#10b981'}
        speed={line.typeSpeed || 80}
      />
    )
  }

  if (line.ok) {
    return (
      <div>
        <span style={{ color: '#10b981' }}>[  OK  ] </span>
        <span style={{ color: '#d4d4d8' }}>{line.text.replace('[  OK  ] ', '')}</span>
      </div>
    )
  }

  if (line.ct) {
    const parts = line.text.match(/^(\s*\[CT \d+\])(.+?)(\.{3}\s*started.*)$/)
    if (parts) {
      return (
        <div>
          <span style={{ color: '#6366f1' }}>{parts[1]}</span>
          <span style={{ color: '#d4d4d8' }}>{parts[2]}</span>
          <span style={{ color: '#10b981' }}>{parts[3]}</span>
        </div>
      )
    }
  }

  if (line.vm) {
    const parts = line.text.match(/^(\s*\[VM \d+\])(.+?)(\.{3}\s*started.*)$/)
    if (parts) {
      return (
        <div>
          <span style={{ color: '#f59e0b' }}>{parts[1]}</span>
          <span style={{ color: '#d4d4d8' }}>{parts[2]}</span>
          <span style={{ color: '#10b981' }}>{parts[3]}</span>
        </div>
      )
    }
  }

  return <div style={{ color: line.color || '#d4d4d8' }}>{line.text}</div>
}

export default function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [fadeOut, setFadeOut] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const timersRef = useRef([])
  const containerRef = useRef(null)
  const completedRef = useRef(false)

  const finish = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true
    timersRef.current.forEach(clearTimeout)
    setFadeOut(true)
    setTimeout(() => {
      setHidden(true)
      sessionStorage.setItem('boot-done', '1')
      onComplete()
    }, 600)
  }, [onComplete])

  useEffect(() => {
    // Schedule each line
    BOOT_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, { ...line, idx: i }])
      }, line.delay)
      timersRef.current.push(t)
    })

    // Show 'click to continue' prompt after all lines
    const promptTimer = setTimeout(() => setShowPrompt(true), TOTAL_DURATION)
    timersRef.current.push(promptTimer)

    // Auto-finish after 20s timeout
    const endTimer = setTimeout(finish, TOTAL_DURATION + 20000)
    timersRef.current.push(endTimer)

    return () => timersRef.current.forEach(clearTimeout)
  }, [finish])

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [visibleLines])

  // Once prompt is visible, any click/key finishes
  useEffect(() => {
    if (!showPrompt) return
    const skip = () => finish()
    window.addEventListener('keydown', skip)
    window.addEventListener('click', skip)
    return () => {
      window.removeEventListener('keydown', skip)
      window.removeEventListener('click', skip)
    }
  }, [showPrompt, finish])

  if (hidden) return null

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#0c0c0c] flex flex-col transition-opacity duration-500"
      style={{ opacity: fadeOut ? 0 : 1 }}
    >
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 sm:p-8 font-mono text-[11px] sm:text-[13px] leading-5 sm:leading-6 select-none"
        style={{ scrollBehavior: 'smooth' }}
      >
        {visibleLines.map((line, i) => (
          <BootLine key={i} line={line} />
        ))}
        {/* Blinking cursor while lines are still appearing */}
        {!fadeOut && !showPrompt && (
          <span className="inline-block w-2 h-4 bg-green-500 animate-pulse ml-0.5 align-middle" />
        )}
        {/* Click to continue prompt */}
        {showPrompt && !fadeOut && (
          <div className="mt-4 animate-pulse">
            <span style={{ color: '#10b981' }}>root@proxmox:~# </span>
            <span style={{ color: '#d4d4d8' }}>Click to continue...</span>
            <span className="inline-block w-2 h-4 bg-green-500 animate-pulse ml-1 align-middle" />
          </div>
        )}
      </div>
    </div>
  )
}
