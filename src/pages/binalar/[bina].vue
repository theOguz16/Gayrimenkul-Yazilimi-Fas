<script setup>
import Header from "@/components/global/Header.vue";
</script>
<template>
  <Header></Header>
  <div
    class="container mt-6 flex gap-8 items-start justify-center flex-row max-sm:p-4 max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:text-center max-lg:flex-col"
  >
    <div class="w-[30%]">
      <Binalar></Binalar>
    </div>
    <div class="w-[70%]">
      <div class="mb-8">
        <h2>Bina Bilgi Paneli</h2>
        <div class="flex items-center gap-3">
          <p class="text-lg">Bina Adı:</p>
          <span class="text-black font-bold">{Kapodokya}</span>
        </div>
        <div class="flex items-center gap-3">
          <p class="text-lg">Bina Sahibi:</p>
          <span class="text-black font-bold">{Ali Kuşçu}</span>
        </div>
      </div>
      <div id="odeme-tarih" class="flex items-center justify-between mb-12">
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
      <div class="flex justify-between">
        <div id="bilgilendirme" class="flex flex-col gap-2 justify-center">
          <RouterLink to="/">
            <div class="flex items-center gap-2">
              <span class="text-black font-bold">{Kapodokya}</span>
              <p class="text-lg">binasını</p>
              <span class="text-black font-bold">{Kira}</span>
              <p class="text-lg">için E-posta ile uyar</p>
              <fai class="text-lg" icon="envelope"></fai>
            </div>
          </RouterLink>
          <RouterLink to="/">
            <div class="flex items-center gap-2">
              <span class="text-black font-bold">{Kapodokya}</span>
              <p class="text-lg">binasını</p>
              <span class="text-black font-bold">{Kira}</span>
              <p class="text-lg">için SMS ile uyar</p>
              <fai class="text-lg" icon="message"></fai>
            </div>
          </RouterLink>
          <RouterLink to="/">
            <div class="flex items-center gap-2">
              <span class="text-black font-bold">{Kapodokya}</span>
              <p class="text-lg">binasını</p>
              <span class="text-black font-bold">{Aidat}</span>
              <p class="text-lg">için E-Posta ile uyar</p>
              <fai class="text-lg" icon="envelope"></fai>
            </div>
          </RouterLink>
          <RouterLink to="/">
            <div class="flex items-center gap-2">
              <span class="text-black font-bold">{Kapodokya}</span>
              <p class="text-lg">binasını</p>
              <span class="text-black font-bold">{Aidat}</span>
              <p class="text-lg">için SMS ile uyar</p>
              <fai class="text-lg" icon="message"></fai>
            </div>
          </RouterLink>
        </div>
        <div
          id="odeme-kontrol"
          class="border-2 border-gray-200 p-4 flex flex-col gap-4"
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
