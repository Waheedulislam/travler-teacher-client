// components/Container.tsx
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div className={`max-w-[1400px] w-full mx-auto px-4 py-4 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
