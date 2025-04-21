import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  return (
    <pre
      className={cn(
        "bg-gray-850 p-4 rounded-lg overflow-auto text-sm",
        className
      )}
    >
      <code className="text-gray-100">{children}</code>
    </pre>
  );
}