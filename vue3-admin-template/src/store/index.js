import useAppStore from './modules/app'
import useSettingStore from './modules/settings'
import useUserStore from './modules/user'
import useTagsViewStore from './modules/tagsView';

const useStore = () => ({
    user: useUserStore(),
    app: useAppStore(),
    setting: useSettingStore(),
    tagsView: useTagsViewStore()
  });
  
  export default useStore;