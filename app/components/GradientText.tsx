export function GradientText({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <span
            className={`w-fit bg-clip-text text-transparent bg-gradient-to-t from-secondary to-primary ${className}`}
        >
            {children}
        </span>
    );
}
