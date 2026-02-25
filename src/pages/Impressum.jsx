import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { FadeIn } from '@/components/FadeIn'
import { ArrowLeft, Mail } from 'lucide-react'

export default function Impressum() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
      <FadeIn>
        <Button variant="ghost" size="sm" asChild className="mb-6 -ml-3 text-muted-foreground">
          <Link to="/">
            <ArrowLeft className="mr-1 h-4 w-4" /> Zurück
          </Link>
        </Button>

        <Badge variant="secondary" className="mb-4">Rechtliches</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-10">
          Impressum
        </h1>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
          <div>
            <h2 className="text-base font-semibold text-foreground mb-2">Kontakt</h2>
            <p>Pascal Hocher</p>
            <p>Schweiz</p>
            <p className="mt-2">
              E-Mail:{' '}
              <a href="mailto:mail@pascalhocher.ch" className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors">
                mail@pascalhocher.ch
              </a>
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-base font-semibold text-foreground mb-2">Haftungsausschluss</h2>
            <p>
              Die Inhalte dieser Website werden mit grösstmöglicher Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch
              keine Gewähr übernommen werden.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-base font-semibold text-foreground mb-2">Urheberrecht</h2>
            <p>
              Die Inhalte und Werke auf dieser Website unterliegen dem schweizerischen Urheberrecht.
              Jede Verwertung ausserhalb der Grenzen des Urheberrechts bedarf der Zustimmung des Autors.
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
