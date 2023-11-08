export type Incident = {
  id: string;
  createdAt: Date;
  importance: string;
  equipment: string;
  message: string;
  responsible: string;
  isRead: boolean;
};

export type IncidentsState = {
  incidents: Incident[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
};
