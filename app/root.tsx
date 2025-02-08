import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';

import './tailwind.css';
import Sidebar from './components/Sidebar';
import LightRay from './components/LightRay';

export const links: LinksFunction = () => [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
    },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Gugi&display=swap"
                    rel="stylesheet"
                />

                <Meta />
                <Links />
            </head>
            <body className="font-[Fredoka] p-7 overflow-x-hidden">
                <LightRay className="absolute -right-10 -top-5 rotate-45" />
                <LightRay className="absolute right-40 -top-40 rotate-45" />
                <div className="h-screen flex justify-between gap-4">
                    <Sidebar />
                    <main className="w-full border border-grey/20 p-8 rounded-xl flex-1 overflow-auto">
                        {children}
                    </main>
                </div>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}
