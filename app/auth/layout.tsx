import { AuroraBackground } from "@/components/ui/aurora-background";

const AuthLayout = ({ 
  children
}: { 
  children: React.ReactNode
}) => {
  return (
    <div className="relative h-screen flex items-center justify-center">
      <AuroraBackground className="absolute inset-0 z-0"/>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;