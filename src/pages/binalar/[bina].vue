<script setup>
import Header from "@/components/global/Header.vue";
</script>
<template>
  <Header></Header>
  <div
    class="container mt-6 flex gap-8 items-start justify-center flex-row max-sm:p-4 max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:text-center"
  >
    <div class="w-[30%] max-sm:w-full max-sm:p-8">
      <Binalar></Binalar>
    </div>
    <div
      class="w-[70%] max-sm:w-full max-sm:text-center max-sm:flex max-sm:flex-col max-sm:items-center"
    >
      <div class="mb-8">
        <h2 class="max-2xl:text-center max-2xl:mb-4">Bina Bilgi Paneli</h2>
        <div
          class="flex items-center gap-3 max-2xl:text-center max-2xl:justify-center"
        >
          <p class="text-lg max-2xl:text-center">Bina Adı:</p>
          <span class="text-black font-bold max-2xl:text-center"
            >{Kapodokya}</span
          >
        </div>
        <div
          class="flex items-center gap-3 max-2xl:text-center max-2xl:justify-center"
        >
          <p class="text-lg max-2xl:text-center">Bina Sahibi:</p>
          <span class="text-black font-bold max-2xl:text-center"
            >{Ali Kuşçu}</span
          >
        </div>
      </div>
      <div
        id="odeme-tarih"
        class="flex items-center justify-between mb-12 max-sm:w-full max-sm:text-center max-sm:flex-col l max-sm:items-center max-2xl:w-full max-2xl:text-center max-2xl:items-center max-2xl:flex-col"
      >
        <div id="odeme">
          <div class="flex items-center gap-3 max-sm:mb-1 max-2xl:mb-2">
            <p class="text-lg">Kira Miktarı:</p>
            <span class="text-black font-bold"
              >1500 <fai icon="turkish-lira-sign"></fai
            ></span>
          </div>
          <div class="flex items-center gap-3 max-sm:mb-1 max-2xl:mb-2">
            <p class="text-lg">Aidat Miktarı:</p>
            <span class="text-black font-bold"
              >150 <fai icon="turkish-lira-sign"></fai
            ></span>
          </div>
        </div>
        <div id="tarih">
          <div class="flex items-center gap-3 max-sm:mb-1 max-2xl:mb-2">
            <p class="text-lg">Kira Ödeme Tarihi:</p>
            <span class="text-black font-bold">27.08.2024</span>
          </div>
          <div class="flex items-center gap-3 max-sm:mb-1 max-2xl:mb-2">
            <p class="text-lg">Aidat Ödeme Tarihi:</p>
            <span class="text-black font-bold">17.08.2024</span>
          </div>
        </div>
      </div>
      <div
        class="flex justify-between max-sm:flex-col max-lg:flex-col max-2xl:flex-col"
      >
        <div
          id="bilgilendirme"
          class="flex flex-col gap-2 justify-center max-sm:w-full max-sm:text-center max-sm:items-center max-2xl:w-full max-2xl:text-center max-2xl:items-center"
        >
          <RouterLink to="/">
            <div class="flex items-center gap-2">
              <p class="text-lg max-sm:text-[16px]">
                <span class="font-semibold">{Kapodokya}</span> binasını
                <span class="font-semibold">{Kira}</span> için SMS ile uyar
              </p>
              <fai class="text-lg max-sm:text-[16px]" icon="message"></fai>
            </div>
          </RouterLink>
          <RouterLink to="/">
            <div class="flex items-center gap-2">
              <p class="text-lg max-sm:text-[16px]">
                <span class="font-semibold">{Kapodokya}</span> binasını
                <span class="font-semibold">{Kira}</span> için Mail ile uyar
              </p>
              <fai class="text-lg max-sm:text-[16px]" icon="envelope"></fai>
            </div>
          </RouterLink>
          <RouterLink to="/">
            <div class="flex items-center gap-2">
              <p class="text-lg max-sm:text-[16px]">
                <span class="font-semibold">{Kapodokya}</span> binasını
                <span class="font-semibold">{Aidat}</span> için SMS ile uyar
              </p>
              <fai class="text-lg max-sm:text-[16px]" icon="message"></fai>
            </div>
          </RouterLink>
          <RouterLink to="/">
            <div class="flex items-center gap-2">
              <p class="text-lg max-sm:text-[16px]">
                <span class="font-semibold">{Kapodokya}</span> binasını
                <span class="font-semibold">{Aidat}</span> için Mail ile uyar
              </p>
              <fai class="text-lg max-sm:text-[16px]" icon="envelope"></fai>
            </div>
          </RouterLink>
        </div>
        <div
          id="odeme-kontrol"
          class="border-2 border-gray-200 p-4 flex flex-col gap-4 max-sm:items-center max-sm:justify-center max-sm:mt-12 max-2xl:items-center max-2xl:justify-center max-2xl:mt-12"
        >
          <h3 class="text-center">Ödeme Kontrolleri</h3>
          <div class="flex items-center gap-3">
            <p class="text-lg">Kira Ödemesi Yapıldı Mı ?</p>
            <input
              id="custom-checkbox"
              type="checkbox"
              class="h-4 w-4 text-site-color-green bg-gray-100 border-gray-300 rounded focus:ring-site-color-green checked:bg-site-color-green checked:text-site-color-green"
            />
          </div>
          <div class="flex items-center gap-3">
            <p class="text-lg">Aidat Ödemesi Yapıldı Mı ?</p>
            <input
              id="custom-checkbox"
              type="checkbox"
              class="h-4 w-4 text-site-color-green bg-gray-100 border-gray-300 rounded focus:ring-site-color-green checked:bg-site-color-green checked:text-site-color-green indeterminate:bg-site-color-green default:bg-site-color-green"
            />
          </div>
        </div>
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
