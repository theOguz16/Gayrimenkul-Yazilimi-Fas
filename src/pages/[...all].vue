<script>
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { t } = useI18n(); // i18n fonksiyonuna useI18n ile erişiyoruz

    return { t }; // t fonksiyonunu template içinde kullanılmak üzere döndürüyoruz
  },
};
</script>
<template>
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
        <img src="public/image/fasimg.png" alt="404-img" />
      </div>
    </div>
  </div>
</template>
