export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-pretty text-white">&copy; {new Date().getFullYear()} Zwitter. All rights reserved.</p>
          <nav aria-label="Footer" className="text-white">
            <ul className="flex flex-wrap items-center gap-4">
              <li>
                <a href="#" className="hover:text-foreground">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Help
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
