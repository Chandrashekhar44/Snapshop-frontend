import { create } from "zustand";

interface NotificationStore {
  notificationsEnabled: boolean;
  checked: boolean;

  setNotificationsEnabled: (value:boolean)=>void;
  setChecked: (value:boolean)=>void;
}


export const useNotificationStore = create<NotificationStore>((set)=>({
  notificationsEnabled:false,
  checked:false,

  setNotificationsEnabled:(value)=>
    set({
      notificationsEnabled:value
    }),

  setChecked:(value)=>
    set({
      checked:value
    })
}));