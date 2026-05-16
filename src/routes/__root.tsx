import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter } from "@tanstack/react-router";
import { IntroSplash } from "@/components/site/IntroSplash";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-electric">404</p>
        <h1 className="mt-4 text-5xl font-display font-bold uppercase tracking-tighter text-navy">
          Page not found
        </h1>
        <p className="mt-4 text-sm text-navy/60">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-navy px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-electric"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-display font-bold uppercase tracking-tight text-navy">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-navy/60">
          Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="bg-navy px-5 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-electric"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-navy/15 px-5 py-3 text-xs font-bold uppercase tracking-widest text-navy hover:bg-navy hover:text-white transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}