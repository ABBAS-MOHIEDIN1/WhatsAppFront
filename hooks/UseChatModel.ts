import { create } from 'zustand'
export type ModalType = 'uploadimg' | "SearchMessage"| "Contactinfo"|  "RelpyInput" |  "";

interface ModalStore {
  isOpen: boolean;
  type: ModalType;
  data:any;
  onOpen: (type: ModalType,data?:any) => void;
  onClose: () => void;
  Toggole: (Toggole:boolean,type:ModalType)=>void;
  


}

export const useChatModel = create<ModalStore>((set) => ({
  isOpen: false,
  type: '',
  data:"",
  onOpen: (type,data) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false }),
  Toggole:(Toggole,type)=>set({isOpen:Toggole,type})
}));
