import { Link, useLocation } from '@remix-run/react';
import Logo from './Logo';
import {
    Bolt,
    BotMessageSquare,
    LayoutDashboard,
    LucideIcon,
} from 'lucide-react';

export default function Sidebar() {
    return (
        <aside
            className="
            flex flex-col items-center justify-between overflow-hidden
            h-full w-fit left-0 top-0 border border-grey/20 py-3 px-2 rounded-xl
            "
        >
            <div className="border-b border-b-grey/20 p-2">
                <Logo />
            </div>
            <div className="flex flex-col gap-4">
                <SidebarItem href="/" name="Dashboard" Icon={LayoutDashboard} />
                <SidebarItem href="/chat" name="Chat" Icon={BotMessageSquare} />
                <SidebarItem href="/settings" name="Settings" Icon={Bolt} />
            </div>
            <div />
        </aside>
    );
}

function SidebarItem({
    href,
    name,
    Icon,
    className,
}: {
    name: string;
    href: string;
    className?: string;
    Icon: LucideIcon;
}) {
    const pathname = useLocation().pathname.split('/')[1]
    console.log(pathname)
    return (
        <Link
            to={href}
            className={`text-lg rounded-xl p-4 flex gap-2 items-center bg-transparent ${className} motion-preset-blur-right-md motion-duration-2000 
            hover:bg-white/10 transition-all duration-200 text-nowrap border border-transparent hover:border-grey/20
            ${
                pathname === href.split('/')[1]
                    ? 'bg-white/5 border-b-accent border-t-grey/20 border-x-grey/5 shadow-primary/20 shadow-xl text-primary hover:shadow-2xl hover:shadow-primary/20'
                    : ''
            }`}
        >
            <Icon size={24} />
            <p>{name}</p>
        </Link>
    );
}
