import { create } from 'zustand';
import { useUserStore } from './userStore'; // Import the user store

export const useChatStore = create((set, get) => ({
  chatId: null,
  user: null,
  isCurrent: true,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;

    // User blocked
    if (user.blocked.includes(currentUser.id)) {
      return set({
        chatId: null,
        user: null,
        isCurrent: true,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }

    // Receiver blocked
    if (currentUser.blocked.includes(user.id)) {
      return set({
        chatId,
        user: user,
        isCurrent: true,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    }

    // If neither are blocked
    set({
      chatId,
      user: user,
      isCurrent: true,
      isCurrentUserBlocked: false,
      isReceiverBlocked: false,
    });
  },
  changeBlock: () => {
    set((state) => ({
      ...state,
      isReceiverBlocked: !state.isReceiverBlocked,
    }));
  },
}));
