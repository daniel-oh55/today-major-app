interface MobileShellProps {
  children: React.ReactNode;
}

export function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="min-h-screen bg-gray-50 max-w-[430px] mx-auto flex flex-col">
      {children}
    </div>
  );
}
