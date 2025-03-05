import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  message: string;
  onConfirm?: () => void;
  openModal: (message: string, onConfirm?: () => void, btnType?: "ONE" | "TWO") => void;
  closeModal: () => void;
  btnType?: "ONE" | "TWO";
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  message: '',
  onConfirm: undefined,
  btnType: "TWO",
  openModal: (message, onConfirm, btnType = "TWO") => set({ 
    isOpen: true, 
    message, 
    onConfirm: onConfirm ? onConfirm : () => set({ isOpen: false, message: '', onConfirm: undefined, btnType: "TWO" }), 
    btnType 
  }),
  closeModal: () => set({ isOpen: false, message: '', onConfirm: undefined, btnType: "TWO" }),
}));