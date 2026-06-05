import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#F3F2EF" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "mobile-web-app-capable", content: "yes" },
      { title: "Ansh Dwivedi" },
      { name: "description", content: "A modern, dark-mode personal website showcasing Ansh Dwivedi's projects and journey." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Ansh Dwivedi" },
      { property: "og:description", content: "A modern, dark-mode personal website showcasing Ansh Dwivedi's projects and journey." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Ansh Dwivedi" },
      { name: "twitter:description", content: "A modern, dark-mode personal website showcasing Ansh Dwivedi's projects and journey." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2e70e0ce-afcd-4bd5-b22f-c144e9cb9cf3/id-preview-ed9b00a3--c1a3aac4-85dc-4c22-934a-e8374df95bfd.lovable.app-1780223427121.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2e70e0ce-afcd-4bd5-b22f-c144e9cb9cf3/id-preview-ed9b00a3--c1a3aac4-85dc-4c22-934a-e8374df95bfd.lovable.app-1780223427121.png" },
    ],
    links: [
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/icons/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/icons/favicon-16.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/icons/icon-192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/icons/icon-512.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/icons/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteLayout>
        <Outlet />
      </SiteLayout>
    </QueryClientProvider>
  );
}

const TABS = [
  { to: "/", label: "home" },
  { to: "/about", label: "about" },
  { to: "/work", label: "work" },
  { to: "/building", label: "building" },
  { to: "/quests", label: "side quests" },
  { to: "/contact", label: "contact" },
] as const;

function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grain relative flex min-h-screen flex-col">
      <header
        className="sticky top-0 z-40 backdrop-blur-xl border-b"
        style={{
          borderColor: "color-mix(in oklab, var(--eclipse-foreground) 10%, transparent)",
          background: "color-mix(in oklab, var(--eclipse-deep) 78%, transparent)",
        }}
      >
        <nav className="container mx-auto px-5 md:px-8 h-14 md:h-16 flex items-center justify-between gap-6">
          <Link
            to="/"
            className="text-[13px] md:text-sm font-semibold tracking-tight text-[var(--eclipse-foreground)] hover:text-[var(--eclipse-accent)] transition-colors lowercase"
          >
            ansh dwivedi<span className="text-[var(--eclipse-accent)]">.</span>
          </Link>
          <ul className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar">
            {TABS.map((t) => (
              <li key={t.to}>
                <Link
                  to={t.to}
                  activeOptions={{ exact: true }}
                  className="px-3 py-1.5 rounded-full text-[12px] md:text-[13px] font-medium tracking-tight text-[color:var(--eclipse-foreground)]/65 hover:text-[var(--eclipse-foreground)] hover:bg-[color:var(--eclipse-foreground)]/5 transition-colors data-[status=active]:text-[var(--eclipse-surface)] data-[status=active]:bg-[var(--eclipse-foreground)] lowercase whitespace-nowrap"
                >
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="relative z-10 flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

function SiteFooter() {
  return (
    <footer
      className="relative border-t"
      style={{ borderColor: "color-mix(in oklab, var(--eclipse-foreground) 10%, transparent)" }}
    >
      <div className="container mx-auto px-5 md:px-8 py-8 flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-[color:var(--eclipse-muted)] lowercase">
        <div>© 2026 ansh dwivedi · built with stubborn optimism.</div>
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[var(--eclipse-accent)] animate-pulse-glow" />
          bengaluru, india
        </div>
      </div>
    </footer>
  );
}
