import { Card, CardContent } from "../ui/card";

export function ContactCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="animate-pulse flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-foreground"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-foreground rounded w-3/4"></div>
            <div className="h-3 bg-foreground rounded w-1/4"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
