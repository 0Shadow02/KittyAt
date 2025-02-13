import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Notifications = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">

    <Card className="p-8 border-dashed border-2 border-muted/20 hover:border-primary/30 transition-all">
      <div className="flex flex-col items-center justify-center text-center space-y-6 py-16">
        <div className="relative w-72 h-48">
          <img
            src="/output-cat.gif"
            alt="Notifications Preview"
            className="rounded-lg object-cover w-full h-full"
            />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
            Notifications System Coming Soon!
          </h3>
          <p className="text-muted-foreground">
            Stay informed with real-time alerts, customizable notification preferences,
            and priority tagging for important updates.
          </p>
        </div>

        <Button variant="outline" className="mt-4 group">
          <span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
            Notify me
          </span>
          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            🔔
          </span>
        </Button>
      </div>
    </Card>
            </div>
  );
};