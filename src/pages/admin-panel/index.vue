<script setup>
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
        <p class="text-lg">Hoşgeldiniz</p>
        <span class="text-black font-bold">{Yönetici}</span>
      </div>
      <div class="flex items-center gap-3">
        <p class="text-lg">Kasadaki Para:</p>
        <span class="text-black font-bold"
          >{100 <fai icon="turkish-lira-sign"></fai>}</span
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
