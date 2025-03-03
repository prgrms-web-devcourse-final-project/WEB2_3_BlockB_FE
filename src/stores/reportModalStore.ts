import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  targetNickname: string;
  targetUserId: number | null;
  targetType: 'PROFILE' | 'CHAT';
  roomId: number | null;
  openModal: (data: Omit<ModalState, 'isOpen' | 'openModal' | 'closeModal'>) => void;
  closeModal: () => void;
}

export const useReportModalStore = create<ModalState>((set) => ({
  isOpen: false,
  targetNickname: '',
  targetUserId: null,
  targetType: 'CHAT',
  roomId: null,
  openModal: (data) => set({ ...data, isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
