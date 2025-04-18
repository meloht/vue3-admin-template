import { loginApi, logoutApi, getInfoApi } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router/";
import { defineStore } from "pinia";

const useUserStore = defineStore("user",{
  state: () => {
    return {
      token: getToken() || "",
      name: "",
      avatar: "",
    }
  },
  actions: {
    async RESET_STATE() {
      this.$reset();
    },

    async login(userInfo) {
      const { username, password } = userInfo;
      let result = await loginApi({
        username: username.trim(),
        password: password,
      });

      if (result.code === 20000) {
        //pinia存储token

        this.token = result.data.token;

        //本地持久化存储token
        setToken(result.data.token);
        let tkk = getToken();

        return "ok";
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
    getUserInfo() {

      return new Promise((resolve, reject) => {

        getInfoApi(this.token)
          .then((response) => {
            const { data } = response;
            if (!data) {
              return reject("Verification failed, please Login again.");
            }

            const { name, avatar } = data;

            this.name = name;
            this.avatar = avatar;

            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    logout() {
      return new Promise((resolve, reject) => {
        logoutApi(this.token)
          .then(() => {
            removeToken(); // must remove  token  first
            resetRouter();
            this.RESET_STATE();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getTokenValue() {
      if (this.token) {
        return this.token;
      } else {
        const token = getToken();
        return token;
      }
    },

    resetToken() {
      return new Promise((resolve) => {

        removeToken(); // must remove  token  first
        this.RESET_STATE();
        resolve();
      });
    },
  },
});

export default useUserStore;
