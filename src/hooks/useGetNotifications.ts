import { useInfiniteQuery } from "@tanstack/react-query";
import { notificationAPI } from "../api/notificaion";

const useGetNotifications = (userId: number) => {
  return useInfiniteQuery({
    queryKey: ["notifications", userId],
    queryFn: ({ pageParam = 1 }) => {
      return notificationAPI.getNotifications(userId, pageParam);
    },
    getNextPageParam: (last) => {
      const currentPage = last.data.notifications.pageable.pageNumber + 1;
      const totalPages = last.data.notifications.totalPages;
      if (currentPage < totalPages) {
        return currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

export default useGetNotifications;
