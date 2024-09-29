<script setup>
import axiosInstance from "@/lib/axios";
import box from "@/store/box.js";
import Header from "@/components/global/Header.vue";
</script>
<template>
  <Header></Header>
  <div
    class="container mt-6 flex gap-8 items-start justify-center flex-row max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center"
  >
    <div
      class="max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center"
    >
      <div class="flex items-center gap-3">
        <p class="text-lg">Hoşgeldiniz</p>
        <span class="text-black font-bold"
          >{{ user.name }} {{ user.surname }}</span
        >
      </div>
      <div class="flex items-center gap-3">
        <p class="text-lg">Bina Adı:</p>
        <span class="text-black font-bold">{{ user.buildName }}</span>
      </div>
      <div
        id="odeme-tarih"
        class="flex items-center justify-center gap-[835px] mt-12 mb-12 max-sm:flex-col max-sm:gap-4 max-lg:gap-[272px] max-2xl:gap-[541px]"
      >
        <div id="odeme">
          <div class="flex items-center gap-3">
            <p class="text-lg">Kira Miktarı:</p>
            <span class="text-black font-bold"
              >{{ user.kiraMiktari }} <fai icon="turkish-lira-sign"></fai
            ></span>
          </div>
          <div class="flex items-center gap-3">
            <p class="text-lg">Aidat Miktarı:</p>
            <span class="text-black font-bold"
              >{{ user.aidatMiktari }} <fai icon="turkish-lira-sign"></fai
            ></span>
          </div>
        </div>
        <div id="tarih">
          <div class="flex items-center gap-3">
            <p class="text-lg">Kira Ödeme Tarihi:</p>
            <span class="text-black font-bold">{{
              formatTarih(user.kiraTarihi)
            }}</span>
          </div>
          <div class="flex items-center gap-3">
            <p class="text-lg">Aidat Ödeme Tarihi:</p>
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
          >Ödeme Yap</RouterLink
        >
        <RouterLink
          to="/contact"
          class="bg-[#D70040] text-white rounded-md py-2 px-3"
          >İletişime Geç</RouterLink
        >
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
      const response = await axiosInstance.get("http://localhost:3000/profile");

      // Gelen kullanıcı bilgilerini state'e atıyoruz
      this.user = response.data.user;
      console.log(this.user.role);
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
