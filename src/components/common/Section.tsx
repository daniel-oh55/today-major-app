interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, children, className = "" }: SectionProps) {
  return (
    <section className={`px-4 py-3 ${className}`}>
      {title && <h2 className="text-sm font-semibold text-gray-700 mb-2">{title}</h2>}
      {children}
    </section>
  );
}
