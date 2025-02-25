import { create } from "zustand";

interface ReportModalStore {
    isReportModalOpen: boolean,
    setIsReportModalOpen: (isOpen: boolean) => void,
}

export const useReportStore = create<ReportModalStore>(
    (set) => ({
        isReportModalOpen: false,
        setIsReportModalOpen: (state) => set({isReportModalOpen: state}),
    })
)