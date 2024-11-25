<template>
  <Header></Header>
  <div
    class="container mt-6 flex gap-8 items-start justify-center flex-row max-sm:p-4 max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:text-center"
  >
    <div class="bg-white">
      <div class="cursor-pointer" id="duyuru-header">
        <h1 class="p-4 text-center text-site-color-green max-sm:w-full">
          {{ t("ann.title") }}
        </h1>
      </div>
      <form @submit.prevent="duyuruOlustur">
        <div
          id="duyuru-olustur"
          class="flex flex-col gap-4 py-8 p-24 max-sm:p-8"
        >
          <div>
            <InputText
              v-model="duyuruBasligi"
              :placeholder="t('ann.header')"
              :label="t('ann.header')"
              type="text"
              required
              field="title"
            ></InputText>
          </div>
          <div>
            <InputTextarea
              v-model="duyuruAciklamasi"
              :placeholder="t('ann.explain')"
              :label="t('ann.explain')"
              type="text"
            ></InputTextarea>
          </div>
          <div>
            <InputSelect
              v-model="uyariTuruSecim"
              :items="Object.values(uyariTuru)"
              itemKey="key"
              itemValue="key"
              :label="t('ann.type')"
              :defaultOptions="t('ann.type')"
              required
            ></InputSelect>
          </div>
          <div>
            <span
              class="text-site-color-dark font-semibold flex justify-center"
              >{{ t("ann.members") }}</span
            >
            <li
              v-for="item in binaListesi"
              :key="item.name"
              class="border-b-2 px-6 py-6 flex items-center gap-3"
            >
              <span
                class="font-bold text-sm text-site-color-dark transition-all"
                >{{ item.name }}</span
              >
              <input
                @change="uyariGonder(item.name, $event.target.checked)"
                id="uyari-checkbox"
                type="checkbox"
                class="h-4 w-4 text-site-color-green bg-gray-100 border-gray-300 rounded focus:ring-site-color-green checked:bg-site-color-green checked:text-site-color-green"
              />
            </li>
          </div>
          <div class="flex justify-center">
            <InputButton
              class="bg-site-color-green text-white w-full outline-none"
              type="submit"
              :text="t('ann.create')"
            ></InputButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axiosInstance from "@/lib/axios";
import box from "@/store/box.js";
import binaListesiData from "@/data/binaListesi.json";
import { useI18n } from "vue-i18n";

const uyariTuruData = {
  sikayet: {
    key: "E-Posta ile Uyar",
  },
};

export default {
  setup() {
    const { t } = useI18n(); // i18n fonksiyonuna useI18n ile erişiyoruz

    return { t }; // t fonksiyonunu template içinde kullanılmak üzere döndürüyoruz
  },
  data() {
    return {
      binaListesi: [],
      uyariTuru: [],
      selectedBuildings: [], // Seçilen bina isimleri
      selectedUsers: [],
      duyuruBasligi: "",
      duyuruAciklamasi: "",
      uyariTuruSecim: "",
    };
  },
  created() {
    this.binaListesi = binaListesiData;
    this.uyariTuru = uyariTuruData;
  },
  methods: {
    uyariGonder(buildingName, isChecked) {
      if (isChecked) {
        this.selectedBuildings.push(buildingName); // Seçilen bina adını ekle
      } else {
        this.selectedBuildings = this.selectedBuildings.filter(
          (name) => name !== buildingName
        ); // Bina adını kaldır
      }
    },
    async duyuruOlustur() {
      try {
        // Seçilen bina isimleri ile e-posta adreslerini almak için backend'e istek at
        const response = await axiosInstance.post(
          "https://faspanel.com/get-emails",
          {
            buildings: this.selectedBuildings,
          }
        );

        this.selectedUsers = response.data.emails; // Backend'den alınan e-posta adreslerini sakla
        if (this.uyariTuruSecim === "E-Posta ile Uyar") {
          // E-posta ile uyarı gönderme işlemi
          for (const email of this.selectedUsers) {
            await axiosInstance.post("https://faspanel.com/duyuru-email", {
              email: [email],
              subject: this.duyuruBasligi,
              message: this.duyuruAciklamasi,
            });
          }
          box.addSuccess(
            this.t("success.congrats"),
            this.t("ann.congrats_mail")
          );
        }
      } catch (error) {
        console.error("E-posta gönderilirken bir hata oluştu:", error);
        box.addError(this.t("errors.sorry"), this.t("errors.general"));
      } finally {
        // Sayfayı yenile
        location.reload();
      }
    },
  },
  async mounted() {},
};
</script>
