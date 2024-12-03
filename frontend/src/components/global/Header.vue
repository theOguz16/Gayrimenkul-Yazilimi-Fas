<template>
  <header class="bg-site-color-green flex items-center p-1 h-[70px] mb-20">
    <div class="container">
      <div class="flex items-center justify-between">
        <div>
          <RouterLink to="/">
            <img
              class="w-[3.5rem]"
              src="../../../public/image/fas-logo.png"
              alt="Logo"
            />
          </RouterLink>
        </div>
        <div>
          <div class="flex gap-12 items-center">
            <div
              v-if="user?.role !== 'User'"
              class="m-1 relative cursor-pointer inline-flex group ml-16"
            >
              <button
                id="hs-dropdown-hover-event"
                type="button"
                class="py-3 px-4 flex justify-center items-center gap-x-4 text-sm font-medium border-b-2 border-b-white text-white shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Dropdown"
              >
                <span> {{ t("menu.admin_panel") }} </span>
                <svg
                  class=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <div
                class="absolute z-50 opacity-0 invisible transition-opacity duration-300 transform scale-95 min-w-60 bg-site-color-green shadow-md rounded-lg p-1 mt-2 group-hover:opacity-100 group-hover:visible group-hover:scale-100 top-[42px]"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="hs-dropdown-hover-event"
              >
                <RouterLink
                  class="flex items-center w-[165px] gap-x-3.5 py-2 px-3 text-sm text-white border-b-2 border-white transition-all hover:border-none"
                  to="/admin-panel"
                >
                  {{ t("menu.admin_panel") }}
                </RouterLink>
                <RouterLink
                  class="flex items-center w-[165px] gap-x-3.5 py-2 px-3 text-sm text-white border-b-2 border-white transition-all hover:border-none"
                  to="/announcement"
                >
                  {{ t("menu.announcement") }}
                </RouterLink>
                <RouterLink
                  class="flex items-center w-[165px] gap-x-3.5 py-2 px-3 text-sm text-white border-b-2 border-white transition-all hover:border-none"
                  to="/register"
                >
                  {{ t("menu.register") }}
                </RouterLink>
                <RouterLink
                  class="flex items-center w-[165px] gap-x-3.5 py-2 px-3 text-sm text-white border-b-2 border-white transition-all hover:border-none"
                  to="/login"
                >
                  {{ t("menu.login") }}
                </RouterLink>
                <RouterLink
                  @click="logout"
                  class="flex items-center w-[165px] gap-x-3.5 py-2 px-3 text-sm text-white border-b-2 border-white transition-all hover:border-none"
                  to="/login"
                >
                  {{ t("menu.logout") }}
                </RouterLink>
              </div>
            </div>
            <div
              v-if="user?.role !== 'Admin'"
              class="m-1 relative cursor-pointer inline-flex group"
            >
              <button
                id="hs-dropdown-hover-event"
                type="button"
                class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium border-b-2 border-b-white text-white shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Dropdown"
              >
                <span>{{ t("menu.user_panel") }}</span>

                <svg
                  class=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <div
                class="absolute z-50 opacity-0 invisible transition-opacity duration-300 transform scale-95 min-w-120 bg-site-color-green shadow-md rounded-lg p-2 mt-2 group-hover:opacity-100 group-hover:visible group-hover:scale-100 top-[42px]"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="hs-dropdown-hover-event"
              >
                <RouterLink
                  class="flex items-center w-[165px] gap-x-3.5 py-2 px-3 text-sm text-white border-b-2 border-white transition-all hover:border-none"
                  to="/kira-panel"
                >
                  {{ t("menu.rent_panel") }}
                </RouterLink>
                <RouterLink
                  class="flex items-center w-[165px] gap-x-3.5 py-2 px-3 text-sm text-white border-b-2 border-white transition-all hover:border-none"
                  to="/payment"
                >
                  {{ t("menu.payment") }}
                </RouterLink>
                <RouterLink
                  class="flex items-center w-[165px] gap-x-3.5 py-2 px-3 text-sm text-white border-b-2 border-white transition-all hover:border-none"
                  to="/contact"
                >
                  {{ t("menu.contact") }}
                </RouterLink>
                <RouterLink
                  class="flex items-center w-[165px] gap-x-3.5 py-2 px-3 text-sm text-white border-b-2 border-white transition-all hover:border-none"
                  to="/login"
                >
                  {{ t("menu.login") }}
                </RouterLink>
                <RouterLink
                  @click="logout"
                  class="flex items-center w-[165px] gap-x-3.5 py-2 px-3 text-sm text-white border-b-2 border-white transition-all hover:border-none"
                  to="/login"
                >
                  {{ t("menu.logout") }}
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import axiosInstance from "../../lib/axios.js";
import box from "../../store/box.js";
import { useI18n } from "vue-i18n";

export default {
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
    async logout() {
      // Token'ı yerel depodan sil
      localStorage.removeItem("token");

      // Sunucuya çıkış isteği gönder (isteğe bağlı)
      try {
        const response = await axiosInstance.post("/api/logout");

        if (response.status === 200) {
          // Çıkış başarılı
          console.log("Çıkış başarılı.");
          box.addSuccess(this.t("success.congrats"), this.t("success.logout"));
        } else {
          console.error("Çıkış sırasında bir hata oluştu.");
          box.addError(this.t("errors.sorry"), this.t("errors.general"));
        }
      } catch (error) {
        console.error("Çıkış sırasında bir hata oluştu:", error);
        box.addError(this.t("errors.sorry"), this.t("errors.general"));
      }
    },
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
};
</script>
