import { create } from 'zustand'
export type ModalType = 'EditProfile' | 'Communities' | "SearchChat"|'ThreeDotes' |"Contact info"|"";

interface ModalStore {
  isOpen: boolean;
  type: ModalType;
  data:any;
  onOpen: (type: ModalType,data?:any) => void;
  onClose: () => void;
  Toggole: (Toggole:boolean,type:ModalType)=>void;
  SelectedId?:String
  Selected:any

}

export const useOpenModels = create<ModalStore>((set) => ({
  isOpen: false,
  type: '',
  data:"",
  SelectedId:"",
  Selected:(value:String)=>set({SelectedId:value}),
  onOpen: (type,data) => set({ isOpen: true, type,data }),
  onClose: () => set({ isOpen: false }),
  Toggole:(Toggole,type)=>set({isOpen:Toggole,type})
}));
