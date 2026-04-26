type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Marquee({ children, className }: Props) {
  return (
    <div className={`overflow-hidden ${className ?? ''}`}>
      <div className="flex w-max animate-marquee gap-0">
        {children}
        {children}
      </div>
    </div>
  );
}
