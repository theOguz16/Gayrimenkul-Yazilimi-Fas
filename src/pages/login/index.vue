<script setup>
import binaListesi from "@/data/binaListesi.json";
</script>
<script>
import axios from "axios";
import box from "@/store/box.js";

export default {
  data() {
    return {
      buildName: "",
      password: "",
      user: {},
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          buildName: this.buildName,
          password: this.password,
        });

        if (response.status === 200) {
          box.addSuccess("Tebrikler", "Giriş Başarılı!");
          const token = response.data.token;
          localStorage.setItem("token", token);
          this.$router.push("/kira-panel");
        } else {
          box.addError("Üzgünüm", "Bir Hata Oluştu!");

          console.error(
            "Kimlik doğrulama başarısız. Sunucu cevabı: ",
            response.data.message
          );
        }
      } catch (error) {
        box.addError("Üzgünüm", "Bir Hata Oluştu!");

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
        <img src="image/fasimg.png" alt="login-image" />
      </div>
      <div id="form-container" class="my-auto mx-auto">
        <form @submit.prevent="login" class="flex flex-col gap-4">
          <div>
            <h2 class="text-site-color-green text-center mb-4">Giriş Yap</h2>
          </div>
          <div>
            <InputSelect
              :items="binaListesi"
              itemKey="buildName"
              itemValue="name"
              label="Seçiniz(Bina)"
              defaultOptions="Lütfen bir bina seçiniz"
              v-model="buildName"
              required
            ></InputSelect>
          </div>
          <div>
            <InputText
              placeholder="Şifre"
              type="password"
              required
              v-model="password"
            ></InputText>
          </div>
          <div class="flex justify-center">
            <InputButton
              class="bg-site-color-green w-full"
              type="submit"
              text="Giriş Yap"
            ></InputButton>
          </div>
          <div id="register" class="mt-2">
            <p class="text-sm">
              Henüz kayıt olmadın mı ?
              <router-link class="text-site-color-green" to="/register"
                >Kayıt Ol!</router-link
              >
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
