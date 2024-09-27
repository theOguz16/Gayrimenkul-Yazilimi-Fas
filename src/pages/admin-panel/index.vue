<script setup>
import axiosInstance from "@/lib/axios";
import Header from "@/components/global/Header.vue";
</script>
<template>
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
        <p class="text-lg">Hoşgeldiniz:</p>
        <span class="text-black font-bold"
          >{{ user.name }} {{ user.surname }}</span
        >
      </div>
      <div class="flex items-center gap-3">
        <p class="text-lg">Kasadaki Para:</p>
        <span class="text-black font-bold">
          {{ toplamPara }}
          <fai icon="turkish-lira-sign"></fai
        ></span>
      </div>
    </div>
  </div>
</template>
<script>
import Binalar from "@/components/sidebar/Binalar.vue";

export default {
  components: {
    Binalar,
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
      const response = await axiosInstance.get("http://localhost:3000/profile");

      // Gelen kullanıcı bilgilerini state'e atıyoruz
      this.user = response.data.user;
      console.log(this.user);
    } catch (error) {
      console.error("Kullanıcı bilgileri alınamadı:", error);
    }
  },
  async mounted() {
    try {
      // Backend'deki /profile endpoint'ine istek at
      const profileResponse = await axiosInstance.get(
        "http://localhost:3000/profile"
      );
      // Gelen kullanıcı bilgilerini state'e atıyoruz
      this.user = profileResponse.data.user;

      // Backend'deki /toplam-aidat endpoint'ine istek at
      const aidatResponse = await axiosInstance.get(
        "http://localhost:3000/toplam-aidat"
      );
      // Gelen toplam aidat bilgilerini state'e atıyoruz
      this.toplamPara = aidatResponse.data.toplamAidat;
    } catch (error) {
      console.error("Bilgiler alınamadı:", error);
    }
  },
};
</script>
