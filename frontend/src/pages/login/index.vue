<script>
import binaListesiData from "@/data/binaListesi.json";
import axios from "axios";
import box from "@/store/box.js";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { t } = useI18n(); // i18n fonksiyonuna useI18n ile erişiyoruz

    return { t }; // t fonksiyonunu template içinde kullanılmak üzere döndürüyoruz
  },
  data() {
    return {
      binaListesi: [],
      buildName: "",
      password: "",
      user: {},
    };
  },
  created() {
    this.binaListesi = binaListesiData; // JSON verisini burada atıyoruz
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("https://faspanel.com/login", {
          buildName: this.buildName,
          password: this.password,
        });

        if (response.status === 200) {
          box.addSuccess(this.t("success.login"), this.t("success.welcome"));
          const token = response.data.token;
          localStorage.setItem("token", token);
          this.$router.push("/kira-panel");
        } else {
          box.addError(this.t("errors.sorry"), this.t("errors.general"));
          console.error(
            "Kimlik doğrulama başarısız. Sunucu cevabı: ",
            response.data.message
          );
        }
      } catch (error) {
        box.addError(this.t("errors.sorry"), this.t("errors.general"));
        console.error("Bir hata oluştu:", error);
      }
    },
  },
};
</script>

<template>
  <div>
    <div class="container flex bg-white mt-14 p-0 max-sm:flex-col">
      <div id="image-container" class="w-[50%] max-sm:mb-8 max-sm:w-full">
        <img src="/image/fasimg.png" alt="login-image" />
      </div>
      <div id="form-container" class="my-auto mx-auto">
        <form @submit.prevent="login" class="flex flex-col gap-4">
          <div>
            <h2 class="text-site-color-green text-center mb-4">
              {{ t("user.login") }}
            </h2>
          </div>
          <div>
            <InputSelect
              :items="binaListesi"
              itemKey="buildName"
              itemValue="name"
              :label="t('user.select_building')"
              :defaultOptions="t('user.please_select_build')"
              v-model="buildName"
              required
            ></InputSelect>
          </div>
          <div>
            <InputText
              :placeholder="t('user.password')"
              type="password"
              required
              :label="t('user.password')"
              v-model="password"
            ></InputText>
          </div>
          <div class="flex justify-center">
            <InputButton
              class="bg-site-color-green w-full"
              type="submit"
              :text="t('user.login')"
            >
              ></InputButton
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
