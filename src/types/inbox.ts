export interface OrderItem {
  name: string;
  price: number;
}

export interface OrderRequest {
  items: OrderItem[];
  total: number;
}

export interface Message {
  id: string;
  senderId: number;
  text: string;
  time: string;
  orderRequest?: OrderRequest;
}

export interface Thread {
  id: number;

  name: string;

  isGroup: boolean;

  members: {
    id: number;
    username: string;
  }[];

  initials: string;

  online: boolean;

  unread: number;

  distance: number;
  distanceLabel: string;

  preview: string;

  time: string;

  messages: Message[];
}

