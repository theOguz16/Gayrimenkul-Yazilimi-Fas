<script setup>
import binaListesi from "@/data/binaListesi.json";
</script>

<template>
  <div class="flex flex-col bg-white rounded-[5px] w-full">
    <span
      class="font-bold text-md text-theme-primary border-b-2 text-center py-6 block"
      >Bina Listesi
    </span>
    <ul class="flex flex-col bg-white rounded-[5px] w-full">
      <li v-for="item in binaListesi" class="border-b-2 px-6 py-6">
        <RouterLink
          class="font-bold text-sm text-theme-primary transition-all hover:text-site-color-green"
          :to="`/binalar/${item.name}`"
          >{{ item.name }}</RouterLink
        >
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
