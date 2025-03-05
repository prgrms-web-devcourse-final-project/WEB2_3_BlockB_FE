import { create } from 'zustand';

interface ReportModalState {
  isOpen: boolean;
  targetNickname: string;
  targetUserId: number | null;
  targetType: 'PROFILE' | 'CHAT';
  roomId: number | null;
  openModal: (data: Omit<ReportModalState, 'isOpen' | 'openModal' | 'closeModal'>) => void;
  closeModal: () => void;
}

export const useReportModalStore = create<ReportModalState>((set) => ({
  isOpen: false,
  targetNickname: '',
  targetUserId: null,
  targetType: 'CHAT',
  roomId: null,
  openModal: (data) => set({ ...data, isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
