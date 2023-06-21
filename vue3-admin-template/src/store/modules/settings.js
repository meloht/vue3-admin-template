import defaultSettings from "@/settings";
import { defineStore } from "pinia";
const { showSettings,tagsView, fixedHeader, sidebarLogo } = defaultSettings;

const useSettingStore = defineStore("setting", {
  state: () => {
    return {
      showSettings: showSettings,
      fixedHeader: fixedHeader,
      tagsView: tagsView,
      sidebarLogo: sidebarLogo,
    };
  },
  actions: {
    changeSetting({ key, value }) {
      switch (key) {
        case "showSettings":
          this.showSettings = value;
          break;
        case "fixedHeader":
          this.fixedHeader = value;
          break;
        case "sidebarLogo":
          this.sidebarLogo = value;
          break;
        default:
          break;
      }
    },
  },
});

export default useSettingStore;
