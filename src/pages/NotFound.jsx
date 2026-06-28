import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import Button from "../components/ui/Button.jsx"

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-6 text-center">
      <Helmet>
        <title>Page Not Found — Mom Magic Masala</title>
      </Helmet>
      <p className="font-serif text-7xl font-bold text-primary">404</p>
      <h1 className="font-serif text-2xl font-bold">Oops! This recipe couldn't be found.</h1>
      <p className="max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s take you back to explore our delicious homemade masalas and authentic spice blends. call@7094429166
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">
          Back to home
        </Button>
      </Link>
    </div>
  )
}
