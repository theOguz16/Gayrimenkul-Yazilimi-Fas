<template>
  <!-- mobil tasarım hatasını düzelt -->
  <!-- şikayetlere tıklayınca çok büyük çıkıyor düzelt -->

  <Header></Header>
  <div class="container flex mt-14 bg-white p-0 gap-4 max-lg:flex-col">
    <div
      id="image-container"
      class="max-2xl:flex max-2xl:items-center ax-sm:mb-8 max-sm:w-full"
    >
      <img src="/image/fasimg.png" alt="login-image" />
    </div>
    <div
      id="contact"
      class="max-w-[560px] mx-auto border-slate-50 rounded-md border p-6 bg-white my-auto"
    >
      <h3 class="mb-5 text-site-color-green text-center">
        {{ t("menu.contact") }}
      </h3>
      <form @submit.prevent="contactUs" class="grid grid-rows-3 gap-5">
        <div class="flex gap-5 max-sm:flex-col">
          <InputText
            :label="t('user.name')"
            type="text"
            :placeholder="t('user.name')"
            required
            v-model="name"
          />

          <InputText
            :label="t('user.surname')"
            type="text"
            :placeholder="t('user.surname')"
            required
            v-model="surname"
          />
        </div>
        <div class="flex gap-5 max-sm:flex-col">
          <InputText
            :label="t('user.mail_address')"
            type="email"
            :placeholder="t('user.mail_address')"
            required
            v-model="emailAddres"
          />
          <InputText
            :label="t('user.phone_number')"
            type="tel"
            :placeholder="t('user.phone_number')"
            required
            v-model="telNo"
          />
        </div>
        <div class="flex gap-5 max-sm:flex-col">
          <InputSelect
            :items="Object.values(helpList)"
            itemKey="key"
            itemValue="key"
            :defaultOptions="t('user.select_subject')"
            :label="t('user.select_subject')"
            required
            v-model="subject"
          >
          </InputSelect>
          <InputSelect
            :items="binaListesi"
            itemKey="buildName"
            itemValue="name"
            :label="t('user.select_building')"
            :defaultOptions="t('user.please_select_build')"
            required
            v-model="buildName"
          ></InputSelect>
        </div>
        <div>
          <InputTextarea
            rows="4"
            cols="50"
            required
            :label="t('user.msg')"
            :placeholder="t('user.msg')"
            v-model="message"
          ></InputTextarea>
        </div>
        <div class="mt-5">
          <InputButton
            class="w-full bg-site-color-green"
            type="submit"
            :text="t('contact.contact_button')"
          />
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

const helpListData = {
  istek: {
    key: "İstek Bildir",
  },
  sikayet: {
    key: "Şikayet Bildir",
  },
  odeme: {
    key: "Ödeme Hakkında Yardım Al",
  },
  yardim: {
    key: "FAS Hakkında Yardım Al",
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
      helpList: [],
      message: "",
      buildName: "",
      name: "",
      surname: "",
      subject: "",
      telNo: "",
      emailAddres: "",
    };
  },
  created() {
    this.binaListesi = binaListesiData;
    this.helpList = helpListData;
  },
  methods: {
    async contactUs() {
      try {
        await axiosInstance.post("/api/contact-email", {
          name: this.name,
          surname: this.surname,
          emailAddres: this.emailAddres,
          telNo: this.telNo,
          subject: this.subject,
          buildName: this.buildName,
          message: this.message,
        });
        box.addSuccess(
          this.t("success.congrats"),
          this.t("contact.contact_congrats")
        );
      } catch (error) {
        box.addError(this.t("errors.sorry"), this.t("errors.general"));
        console.error(error);
      } finally {
        this.name = "";
        this.surname = "";
        this.emailAddres = "";
        this.subject = "";
        this.telNo = "";
        this.buildName = "";
        this.message = "";
      }
    },
  },
};
</script>
