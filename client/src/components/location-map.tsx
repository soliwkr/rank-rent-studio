import { MapPin } from "lucide-react";

interface LocationMapProps {
  city?: string;
  className?: string;
}

export function LocationMap({ city, className }: LocationMapProps) {
  return (
    <div className={`bg-muted rounded-lg flex items-center justify-center ${className || 'h-64'}`} data-testid="location-map">
      <div className="text-center text-muted-foreground">
        <MapPin className="w-8 h-8 mx-auto mb-2" />
        <p className="text-sm">{city ? `${city} Area` : 'Service Area Map'}</p>
      </div>
    </div>
  );
}

export default LocationMap;
