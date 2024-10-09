<template>
  <div>
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
          <h2 class="max-2xl:text-center max-2xl:mb-4">
            {{ t("buildpanel.build_info_panel") }}
          </h2>
          <div
            class="flex items-center gap-3 max-2xl:text-center max-2xl:justify-center"
          >
            <p class="text-lg max-2xl:text-center">
              {{ t("buildpanel.build_name") }}:
            </p>
            <span class="text-black font-bold max-2xl:text-center">{{
              user.buildName
            }}</span>
          </div>

          <div
            class="flex items-center gap-3 max-2xl:text-center max-2xl:justify-center"
          >
            <p class="text-lg max-2xl:text-center">
              {{ t("buildpanel.build_owner") }}:
            </p>
            <span class="text-black font-bold max-2xl:text-center"
              >{{ user.name }} {{ user.surname }}</span
            >
          </div>
        </div>
        <div
          id="odeme-tarih"
          class="flex items-center justify-between mb-12 max-sm:w-full max-sm:text-center max-sm:flex-col l max-sm:items-center max-2xl:w-full max-2xl:text-center max-2xl:items-center max-2xl:flex-col"
        >
          <div id="odeme">
            <div class="flex items-center gap-3 max-sm:mb-1 max-2xl:mb-2">
              <p class="text-lg">{{ t("user.rent_amount") }}:</p>
              <span class="text-black font-bold"
                >{{ user.kiraMiktari }} <fai icon="turkish-lira-sign"></fai
              ></span>
            </div>
            <div class="flex items-center gap-3 max-sm:mb-1 max-2xl:mb-2">
              <p class="text-lg">{{ t("user.dues_amount") }}:</p>
              <span class="text-black font-bold"
                >{{ user.aidatMiktari }} <fai icon="turkish-lira-sign"></fai
              ></span>
            </div>
          </div>
          <div id="tarih">
            <div class="flex items-center gap-3 max-sm:mb-1 max-2xl:mb-2">
              <p class="text-lg">{{ t("user.rent_date") }} :</p>
              <span class="text-black font-bold">{{
                formatTarih(user.kiraTarihi)
              }}</span>
            </div>
            <div class="flex items-center gap-3 max-sm:mb-1 max-2xl:mb-2">
              <p class="text-lg">{{ t("user.dues_date") }} :</p>
              <span class="text-black font-bold">{{
                formatTarih(user.aidatTarihi)
              }}</span>
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
            <div @click="sendKiraSMS" class="cursor-pointer">
              <div class="flex items-center gap-2">
                <p class="text-lg max-sm:text-[16px]">
                  <span class="font-semibold">{{ user.buildName }},</span>
                  {{ t("buildpanel.sms_rent_msg") }}
                </p>
                <fai class="text-lg max-sm:text-[16px]" icon="message"></fai>
              </div>
            </div>
            <div @click="sendKiraEmail" class="cursor-pointer">
              <div class="flex items-center gap-2">
                <p class="text-lg max-sm:text-[16px]">
                  <span class="font-semibold">{{ user.buildName }},</span>
                  {{ t("buildpanel.mail_rent_msg") }}
                </p>
                <fai class="text-lg max-sm:text-[16px]" icon="envelope"></fai>
              </div>
            </div>
            <div @click="sendAidatSMS" class="cursor-pointer">
              <div class="flex items-center gap-2">
                <p class="text-lg max-sm:text-[16px]">
                  <span class="font-semibold">{{ user.buildName }},</span>
                  {{ t("buildpanel.sms_dues_msg") }}
                </p>
                <fai class="text-lg max-sm:text-[16px]" icon="message"></fai>
              </div>
            </div>
            <div @click="sendAidatEmail" class="cursor-pointer">
              <div class="flex items-center gap-2">
                <p class="text-lg max-sm:text-[16px]">
                  <span class="font-semibold">{{ user.buildName }},</span>
                  {{ t("buildpanel.mail_dues_msg") }}
                </p>
                <fai class="text-lg max-sm:text-[16px]" icon="envelope"></fai>
              </div>
            </div>
          </div>
          <div
            id="odeme-kontrol"
            class="border-2 border-gray-200 p-4 flex flex-col gap-4 max-sm:items-center max-sm:justify-center max-sm:mt-12 max-2xl:items-center max-2xl:justify-center max-2xl:mt-12"
          >
            <h3 class="text-center">{{ t("buildpanel.payment_control") }}</h3>
            <div class="flex items-center gap-3">
              <p class="text-lg">{{ t("buildpanel.rent_check") }}</p>
              <input
                v-model="kiraCheckbox"
                @change="updateKiraCheckbox"
                id="kira-checkbox"
                type="checkbox"
                class="h-4 w-4 text-site-color-green bg-gray-100 border-gray-300 rounded focus:ring-site-color-green checked:bg-site-color-green checked:text-site-color-green"
              />
            </div>
            <div class="flex items-center gap-3">
              <p class="text-lg">{{ t("buildpanel.dues_check") }}</p>
              <input
                v-model="aidatCheckbox"
                @change="updateAidatCheckbox"
                id="aidat-checkbox"
                type="checkbox"
                class="h-4 w-4 text-site-color-green bg-gray-100 border-gray-300 rounded focus:ring-site-color-green checked:bg-site-color-green checked:text-site-color-green indeterminate:bg-site-color-green default:bg-site-color-green"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Binalar from "@/components/sidebar/Binalar.vue";
import axiosInstance from "@/lib/axios";
import { useRouter } from "vue-router"; // Vue Router'ı kullanıyoruz
import box from "@/store/box.js";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { t } = useI18n(); // i18n fonksiyonuna useI18n ile erişiyoruz

    return { t }; // t fonksiyonunu template içinde kullanılmak üzere döndürüyoruz
  },
  components: {
    Binalar,
  },
  data() {
    return {
      user: {},
      kiraCheckbox: false,
      aidatCheckbox: false,
      role: "",
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
    async sendKiraEmail() {
      try {
        const emailData = {
          email: this.user.emailAddres, // Kullanıcının mail adresi
          subject: "Kira Ödemesi Hatırlatma", // Konu
          message: `Merhaba, ${this.user.buildName} binası için kira ödemesi yapılmamıştır. Lütfen en kısa sürede ödeme yapın.`, // Mesaj
        };

        await axiosInstance.post("http://localhost:3000/send-email", emailData);
        box.addSuccess(
          this.t("success.congrats"),
          this.t("messages.rent_message")
        );
      } catch (error) {
        box.addError(this.t("errors.sorry"), this.t("errors.general"));
        console.error("Mail gönderme hatası:", error);
      }
    },
    async sendAidatEmail() {
      try {
        const emailData = {
          email: this.user.emailAddres, // Kullanıcının mail adresi
          subject: "Aidat Ödemesi Hatırlatma", // Konu
          message: `Merhaba, ${this.user.buildName} binası için aidat ödemesi yapılmamıştır. Lütfen en kısa sürede ödeme yapın.`, // Mesaj
        };

        await axiosInstance.post("http://localhost:3000/send-email", emailData);
        box.addSuccess(
          this.t("success.congrats"),
          this.t("messages.dues_message")
        );
      } catch (error) {
        box.addError(this.t("errors.sorry"), this.t("errors.general"));
        console.error("Mail gönderme hatası:", error);
      }
    },
    async sendKiraSMS() {
      try {
        const smsData = {
          phoneNumber: this.user.telNo,
          message: `Merhaba, ${this.user.buildName} binası için kira ödemesi yapılmamıştır. Lütfen en kısa sürede ödeme yapın.`,
        };

        await axiosInstance.post(
          "http://localhost:3000/send-kira-sms",
          smsData
        );
        box.addSuccess(this.t("success.congrats"), this.t("messages.sms_rent"));
      } catch (error) {
        box.addError(this.t("errors.sorry"), this.t("errors.general"));
        console.error("SMS gönderme hatası:", error);
      }
    },
    async sendAidatSMS() {
      try {
        const smsData = {
          phoneNumber: this.user.telNo,
          message: `Merhaba, ${this.user.buildName} binası için aidat ödemesi yapılmamıştır. Lütfen en kısa sürede ödeme yapın.`,
        };

        await axiosInstance.post(
          "http://localhost:3000/send-aidat-sms",
          smsData
        );
        box.addSuccess(this.t("success.congrats"), this.t("messages.sms_dues"));
      } catch (error) {
        box.addError(this.t("errors.sorry"), this.t("errors.general"));
        console.error("SMS gönderme hatası:", error);
      }
    },
    async updateKiraCheckbox() {
      try {
        const buildName = this.$route.params;
        const response = await axiosInstance.post(
          `http://localhost:3000/binalar/${buildName.bina}/kiraCheckbox`,
          { kiraCheckbox: this.kiraCheckbox }
        );
        box.addSuccess(
          this.t("success.congrats"),
          this.t("messages.change_color")
        );
        this.kiraCheckbox = response.data.user.kiraCheckbox; // Backend'den gelen veriyi güncelle
        this.user = response.data.user;
      } catch (error) {
        box.addError(this.t("errors.sorry"), this.t("errors.general"));
        console.error("Kullanıcı bilgileri alınamadı:", error);
      }
    },

    async updateAidatCheckbox() {
      try {
        const buildName = this.$route.params;
        const response = await axiosInstance.post(
          `http://localhost:3000/binalar/${buildName.bina}/aidatCheckbox`,
          { aidatCheckbox: this.aidatCheckbox }
        );
        box.addSuccess(
          this.t("success.congrats"),
          this.t("messages.change_color")
        );
        this.aidatCheckbox = response.data.user.aidatCheckbox; // Backend'den gelen veriyi güncelle
        this.user = response.data.user;
      } catch (error) {
        box.addError(this.t("errors.sorry"), this.t("errors.general"));
        console.error("Kullanıcı bilgileri alınamadı:", error);
      }
    },
  },
  async mounted() {
    const buildName = this.$route.params; // Route parametresini al
    const router = useRouter(); // Router'ı al

    try {
      // Backend'deki /binalar endpoint'ine istek at
      const response = await axiosInstance.get(
        `http://localhost:3000/binalar/${buildName.bina}`
      );

      // Gelen kullanıcı bilgilerini state'e atıyoruz
      this.user = response.data.user;
      this.kiraCheckbox = response.data.user.kiraCheckbox;
      this.aidatCheckbox = response.data.user.aidatCheckbox;
      this.role = response.data.user.role;
    } catch (error) {
      console.error("Kullanıcı bilgileri alınamadı:", error);
    }
  },
};
</script>
