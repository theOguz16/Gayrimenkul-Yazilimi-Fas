<script setup>
import Header from "@/components/global/Header.vue";

const helpList = {
  istek: {
    key: "İstek Bildir",
    value: 0,
  },
  sikayet: {
    key: "Şikayet Bildir",
    value: 1,
  },
  odeme: {
    key: "Ödeme Hakkında Yardım Al",
    value: 2,
  },
  yardim: {
    key: "FAS Hakkında Yardım Al",
    value: 3,
  },
};
</script>
<template>
  <!-- mobil tasarım hatasını düzelt -->
  <!-- şikayetlere tıklayınca çok büyük çıkıyor düzelt -->

  <Header></Header>
  <div class="container flex mt-14 bg-white p-0 gap-4 max-lg:flex-col">
    <div
      id="image-container"
      class="max-2xl:flex max-2xl:items-center ax-sm:mb-8 max-sm:w-full"
    >
      <img src="image/fasimg.png" alt="login-image" />
    </div>
    <div
      id="contact"
      class="max-w-[560px] mx-auto border-slate-50 rounded-md border p-6 bg-white my-auto"
    >
      <h3 class="mb-5 text-site-color-green text-center">İletişime Geç</h3>
      <form @submit.prevent="contactUs" class="grid grid-rows-3 gap-5">
        <div class="flex gap-5 max-sm:flex-col">
          <InputText
            label="Ad"
            type="text"
            placeholder="Ad"
            required
            v-model="formData.name"
          />

          <InputText
            label="Soyad"
            type="text"
            placeholder="Soyadı"
            required
            v-model="formData.surname"
          />
        </div>
        <div class="flex gap-5 max-sm:flex-col">
          <InputText
            label="E-Posta Adresi"
            type="email"
            placeholder="E-Posta Adresi"
            required
            v-model="formData.emailAddres"
          />
          <InputText
            label="Telefon Numarası"
            type="tel"
            placeholder="Telefon Numarası"
            required
            v-model="formData.telNo"
          />
        </div>
        <div class="flex gap-5 max-sm:flex-col">
          <InputSelect
            :items="helpList"
            itemKey="value"
            itemValue="key"
            defaultOptions="Lütfen konu seçiniz"
            label="Seçiniz(Konu)"
            required
            v-model="formdata.subject"
          >
          </InputSelect>
          <InputSelect
            :items="binaListesi"
            itemKey="buildName"
            itemValue="name"
            label="Seçiniz(Bina)"
            defaultOptions="Lütfen bir bina seçiniz"
            v-model="formData.buildName"
            required
          ></InputSelect>
        </div>
        <div>
          <InputTextarea
            rows="4"
            cols="50"
            required
            label="Mesajınız Yazın"
            v-model="formdata.message"
          ></InputTextarea>
        </div>
        <div class="mt-5">
          <InputButton
            class="w-full bg-site-color-green"
            type="submit"
            text="İletişime Geç!"
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { eventBus } from "@/main.js";
import axiosInstance from "@/lib/axios";
import box from "@/store/box.js";

export default {
  data() {
    return {
      formData: {
        buildName: "",
        name: "",
        surname: "",
        message: "",
        subject: "",
        emailAddres: "",
        telNo: "",
        dirty: false,
        error: {},
      },
    };
  },

  methods: {},
};
</script>
