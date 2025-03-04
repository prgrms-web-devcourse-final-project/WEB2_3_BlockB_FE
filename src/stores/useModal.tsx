import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  openModal: (message: string, onConfirm: () => void) => void;
  closeModal: () => void;
}



export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  message: '',
  onConfirm: () => {},
  openModal: (message, onConfirm) => set({ isOpen: true, message, onConfirm }),
  closeModal: () => set({ isOpen: false, message: '', onConfirm: () => {} }),
}));
