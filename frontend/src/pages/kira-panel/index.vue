<template>
  <Header></Header>
  <div
    class="container mt-6 flex gap-8 items-start justify-center flex-row max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center"
  >
    <div
      class="max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center"
    >
      <div class="flex items-center gap-3">
        <p class="text-lg">{{ t("success.welcome") }}:</p>
        <span class="text-black font-bold"
          >{{ user.name }} {{ user.surname }}</span
        >
      </div>
      <div class="flex items-center gap-3">
        <p class="text-lg">{{ t("buildpanel.build_name") }}:</p>
        <span class="text-black font-bold">{{ user.buildName }}</span>
      </div>
      <div
        id="odeme-tarih"
        class="flex items-center justify-center gap-[835px] mt-12 mb-12 max-sm:flex-col max-sm:gap-4 max-lg:gap-[272px] max-2xl:gap-[541px]"
      >
        <div id="odeme">
          <div class="flex items-center gap-3">
            <p class="text-lg">{{ t("user.rent_amount") }}:</p>
            <span class="text-black font-bold"
              >{{ user.kiraMiktari }} <fai icon="turkish-lira-sign"></fai
            ></span>
          </div>
          <div class="flex items-center gap-3">
            <p class="text-lg">{{ t("user.dues_amount") }}:</p>
            <span class="text-black font-bold"
              >{{ user.aidatMiktari }} <fai icon="turkish-lira-sign"></fai
            ></span>
          </div>
        </div>
        <div id="tarih">
          <div class="flex items-center gap-3">
            <p class="text-lg">{{ t("user.rent_date") }}:</p>
            <span class="text-black font-bold">{{
              formatTarih(user.kiraTarihi)
            }}</span>
          </div>
          <div class="flex items-center gap-3">
            <p class="text-lg">{{ t("user.dues_date") }}:</p>
            <span class="text-black font-bold">{{
              formatTarih(user.aidatTarihi)
            }}</span>
          </div>
        </div>
      </div>
      <div id="butonlar" class="flex gap-3 items-center">
        <RouterLink
          to="/payment"
          class="bg-site-color-green text-white rounded-md py-2 px-3"
          >{{ t("menu.payment") }}</RouterLink
        >
        <RouterLink
          to="/contact"
          class="bg-[#D70040] text-white rounded-md py-2 px-3"
          >{{ t("menu.contact") }}</RouterLink
        >
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
    };
  },
  methods: {
    formatTarih(tarih) {
      const date = new Date(tarih);
      return date.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
  async mounted() {
    try {
      // Backend'deki /profile endpoint'ine istek at
      const response = await axiosInstance.get("https://faspanel.com/profile");

      // Gelen kullanıcı bilgilerini state'e atıyoruz
      this.user = response.data.user;
      // Kullanıcı rolünü kontrol et
      if (this.user.role === "Admin") {
        this.$router.push("/admin-panel");
      }
    } catch (error) {
      console.error("Kullanıcı bilgileri alınamadı:", error);
    }
  },
};
</script>
