import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "react-router";

import "./app.css";
import { Loader } from "lucide-react";
export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }) {
  let navigation = useNavigation();
  let loading = navigation.state !== "idle";
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {loading && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm"
            role="status"
            aria-live="polite"
            aria-busy="true"
          >
            <div className="flex flex-col items-center gap-4 p-6 rounded-xl shadow-lg bg-white border border-gray-200">
              <Loader className="animate-spin w-10 h-10 text-yellow-500" />
              <p className="text-gray-800 font-medium text-lg">
                Fetching data...
              </p>
            </div>
          </div>
        )}

        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }) {
  let message = "Oops! Something went wrong.";
  let details = "An unexpected error occurred. Please try again later.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404 - Page Not Found" : "Error";
    details =
      error.status === 404
        ? "Sorry, the page you are looking for does not exist."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-yellow-100 px-4">
      <div className="max-w-2xl w-full text-center p-10 bg-white shadow-2xl rounded-3xl border border-yellow-200 animate-fade-in">
        <h1 className="text-7xl font-extrabold text-yellow-500 mb-4 drop-shadow-sm">
          {message}
        </h1>

        <p className="text-gray-700 text-lg mb-6 italic">{details}</p>

        {stack && (
          <details className="text-left bg-yellow-50 rounded-xl p-4 overflow-auto max-h-60 text-sm text-yellow-900 border border-yellow-200 mb-4">
            <summary className="cursor-pointer font-semibold mb-2 hover:text-yellow-600 transition-all">
              Stack Trace (dev only)
            </summary>
            <pre className="whitespace-pre-wrap">
              <code>{stack}</code>
            </pre>
          </details>
        )}

        <a
          href="/"
          className="mt-6 inline-flex items-center gap-2 bg-yellow-400 text-black hover:bg-black hover:text-yellow-100 transition-colors px-6 py-2 rounded-full font-medium shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </a>
      </div>
    </main>
  );
}
