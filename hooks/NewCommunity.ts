import { create } from 'zustand'


interface ModalStore {
  isOpen: boolean;
  data:any
  onOpenNewCommunity: (data:any) => void;
  onClose: () => void;
}

export const NewCommunityModel = create<ModalStore>((set) => ({
  isOpen: false,
  type: '',
  data:"",
  onOpenNewCommunity: (data:any) => set({ isOpen: true,data }),
  onClose: () => set({ isOpen: false }),
}));
