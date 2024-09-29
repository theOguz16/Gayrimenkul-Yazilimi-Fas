<script setup>
import binaListesi from "@/data/binaListesi.json";
</script>

<template>
  <div class="flex flex-col bg-white rounded-[5px] w-full">
    <span
      class="font-bold text-md text-site-color-dark border-b-2 text-center py-6 block"
      >Bina Listesi
    </span>
    <ul class="flex flex-col bg-white rounded-[5px] w-full">
      <li
        :class="getBackgroundClass(item.name)"
        v-for="item in binaListesi"
        class="border-b-2 px-6 py-6"
      >
        <RouterLink
          :key="item.name"
          :to="`/binalar/${item.name}`"
          class="font-bold text-sm text-site-color-dark transition-all"
          >{{ item.name }}</RouterLink
        >
      </li>
    </ul>
  </div>
</template>
<script>
import axiosInstance from "@/lib/axios";

export default {
  data() {
    return {
      user: {},
      kiraCheckbox: false,
      aidatCheckbox: false,
      currentBuildingName: "",
      binaDurumlari: [],
    };
  },
  methods: {
    getBackgroundClass(binaName) {
      const binaDurumu = this.binaDurumlari[binaName];

      if (binaDurumu) {
        if (binaDurumu.kiraCheckbox && binaDurumu.aidatCheckbox) {
          return "bg-green-500";
        } else if (binaDurumu.kiraCheckbox || binaDurumu.aidatCheckbox) {
          return "bg-yellow-500";
        } else {
          return "bg-red-500";
        }
      }
      return ""; // Veri yoksa varsayılan renk boş kalsın
    },
    async fetchBinaDurumlari() {
      try {
        const response = await axiosInstance.get(
          "http://localhost:3000/binalar"
        );

        this.binaDurumlari = response.data.reduce((acc, bina) => {
          acc[bina.buildName] = {
            kiraCheckbox: bina.kiraCheckbox,
            aidatCheckbox: bina.aidatCheckbox,
          };

          return acc;
        }, {});
      } catch (error) {
        console.error("Bina bilgileri alınamadı:", error);
      }
    },
    async updateCheckboxes() {
      const response = await axiosInstance.get(
        `http://localhost:3000/binalar/${this.currentBuildingName}`
      );

      // Gelen veriler ile kira ve aidat checkboxlarını güncelle.
      this.kiraCheckbox = response.data.user.kiraCheckbox || false;
      this.aidatCheckbox = response.data.user.aidatCheckbox || false;
    },
  },

  async mounted() {
    try {
      // Route parametrelerini al
      const { bina } = this.$route.params; // destructuring ile bina değerini alıyoruz
      this.currentBuildingName = bina; // bina değerini state'e atıyoruz
      await this.fetchBinaDurumlari();

      // Backend'deki /binalar endpoint'ine istek at
      const response = await axiosInstance.get(
        `http://localhost:3000/binalar/${bina}`
      );

      // Gelen kullanıcı bilgilerini state'e atıyoruz
      this.user = response.data.user;

      // Kullanıcı bilgileri var mı kontrol et
      if (this.user) {
        this.kiraCheckbox = this.user.kiraCheckbox || false; // varsa değerini ata, yoksa false
        this.aidatCheckbox = this.user.aidatCheckbox || false; // varsa değerini ata, yoksa false
      } else {
        console.warn("Kullanıcı bilgileri bulunamadı.");
      }
      setInterval(this.updateCheckboxes, 5000);
      setInterval(this.fetchBinaDurumlari, 5000);

      // URL değiştiğinde sayfayı yenile
      this.$watch(
        () => this.$route.params,
        () => {
          window.location.reload();
        }
      );

      //NOT TUĞBERK ABININ YAPTIGI BOXLARDAN KOYARSAN SUPER OLUR
    } catch (error) {
      console.error("Kullanıcı bilgileri alınamadı:", error);
    }
  },
};
</script>
