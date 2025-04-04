import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: 'martin_masevski2_gmail_com' as string | null,
    name: 'asd' as string | null,
  }),
  actions: {
    setUser(data: { userId: string; name: string }) {
      this.userId = data.userId;
      this.name = data.name;
    },
    logout() {
      this.userId = null;
      this.name = null;
    },
  },
  persist: true, // Keep user logged in across page reloads
});
