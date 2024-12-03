<template>
  <div v-if="this.user.role === 'Admin'">
    <Header></Header>
    <div
      class="container mt-6 flex gap-8 items-start justify-center flex-row max-sm:flex-col max-sm:text-center max-sm:items-center max-sm:justify-center"
    >
      <div class="w-[30%] max-sm:w-full max-sm:p-8 max-lg:w-[50%]">
        <Binalar></Binalar>
      </div>
      <div
        class="w-[70%] max-sm:w-full max-sm:text-center max-sm:flex max-sm:flex-col max-sm:items-center"
      >
        <div class="flex items-center gap-3">
          <p class="text-lg">{{ t("messages.welcome") }}</p>
          <span class="text-black font-bold"
            >{{ user.name }} {{ user.surname }}</span
          >
        </div>
        <div class="flex items-center gap-3">
          <p class="text-lg">{{ t("messages.total_money") }}</p>
          <span class="text-black font-bold">
            {{ toplamPara }}
            <fai icon="turkish-lira-sign"></fai
          ></span>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="container">
      <div class="flex justify-center gap-8 my-16 lg:flex-row sm:flex-col">
        <div>
          <h1 class="text-7xl text-site-color-dark">Oops!</h1>
          <p class="w-[100%] font-medium text-2xl my-6 text-site-color-green">
            {{ t("errors.not_find") }}
          </p>
          <ul class="flex flex-col gap-6">
            <span class="text-lg text-site-color-dark">{{
              t("errors.help_links")
            }}</span>
            <li>
              <router-link
                class="text-base bg-dark-purple p-3 rounded-md transition-all text-site-color-green"
                to="/"
                >{{ t("menu.main_page") }}</router-link
              >
            </li>
          </ul>
        </div>
        <div class="w-[50%]">
          <img src="/image/fasimg.png" alt="404-img" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Binalar from "@/components/sidebar/Binalar.vue";
import axiosInstance from "@/lib/axios";
import { useI18n } from "vue-i18n";

export default {
  components: {
    Binalar,
  },
  setup() {
    const { t } = useI18n(); // i18n fonksiyonuna useI18n ile erişiyoruz

    return { t }; // t fonksiyonunu template içinde kullanılmak üzere döndürüyoruz
  },
  data() {
    return {
      user: {},
      toplamPara: 0,
    };
  },
  async mounted() {
    try {
      // Backend'deki /profile endpoint'ine istek at
      const response = await axiosInstance.get("/api/profile");

      // Gelen kullanıcı bilgilerini state'e atıyoruz
      this.user = response.data.user;
    } catch (error) {
      console.error("Kullanıcı bilgileri alınamadı:", error);
    }
  },
  async mounted() {
    try {
      // Backend'deki /profile endpoint'ine istek at
      const profileResponse = await axiosInstance.get("/api/profile");
      // Gelen kullanıcı bilgilerini state'e atıyoruz
      this.user = profileResponse.data.user;

      // Backend'deki /toplam-aidat endpoint'ine istek at
      const aidatResponse = await axiosInstance.get("/api/toplam-aidat");
      // Gelen toplam aidat bilgilerini state'e atıyoruz
      this.toplamPara = aidatResponse.data.toplamAidat;
    } catch (error) {
      console.error("Bilgiler alınamadı:", error);
    }
  },
};
</script>
