export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  imageUrl?: string;
  rating?: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface MapMarkerItem {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
}
