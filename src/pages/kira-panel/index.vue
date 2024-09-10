<script setup>
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
        <span class="text-black font-bold">{Ali Kuşçu}</span>
      </div>
      <div
        id="odeme-tarih"
        class="flex items-center justify-center gap-[850px] mt-12 mb-12 max-sm:flex-col max-sm:gap-4 max-lg:gap-[272px] max-2xl:gap-[541px]"
      >
        <div id="odeme">
          <div class="flex items-center gap-3">
            <p class="text-lg">Kira Miktarı:</p>
            <span class="text-black font-bold"
              >1500 <fai icon="turkish-lira-sign"></fai
            ></span>
          </div>
          <div class="flex items-center gap-3">
            <p class="text-lg">Aidat Miktarı:</p>
            <span class="text-black font-bold"
              >150 <fai icon="turkish-lira-sign"></fai
            ></span>
          </div>
        </div>
        <div id="tarih">
          <div class="flex items-center gap-3">
            <p class="text-lg">Kira Ödeme Tarihi:</p>
            <span class="text-black font-bold">27.08.2024</span>
          </div>
          <div class="flex items-center gap-3">
            <p class="text-lg">Aidat Ödeme Tarihi:</p>
            <span class="text-black font-bold">17.08.2024</span>
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
    return {};
  },
};
</script>
