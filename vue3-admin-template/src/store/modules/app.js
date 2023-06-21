import Cookies from "js-cookie";
import { defineStore } from 'pinia'

const useAppStore = defineStore("app", {
  state: () => {
    return {
      device: "desktop",
      sidebar: {
        opened: Cookies.get("sidebarStatus")
          ? !!+Cookies.get("sidebarStatus")
          : true,
        withoutAnimation: false,
      },
    };
  },
  actions: {
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        Cookies.set("sidebarStatus", 1);
      } else {
        Cookies.set("sidebarStatus", 0);
      }
    },
    closeSideBar(withoutAnimation) {
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;

      Cookies.set("sidebarStatus", 0);
    },
    toggleDevice(device) {
      this.device = device;
    },
  },
});

export default useAppStore;
