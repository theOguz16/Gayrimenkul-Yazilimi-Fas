<script setup>
const helpList = {
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
            v-model="name"
          />

          <InputText
            label="Soyad"
            type="text"
            placeholder="Soyadı"
            required
            v-model="surname"
          />
        </div>
        <div class="flex gap-5 max-sm:flex-col">
          <InputText
            label="E-Posta Adresi"
            type="email"
            placeholder="E-Posta Adresi"
            required
            v-model="emailAddres"
          />
          <InputText
            label="Telefon Numarası"
            type="tel"
            placeholder="Telefon Numarası"
            required
            v-model="telNo"
          />
        </div>
        <div class="flex gap-5 max-sm:flex-col">
          <InputSelect
            :items="Object.values(helpList)"
            itemKey="key"
            itemValue="key"
            defaultOptions="Lütfen konu seçiniz"
            label="Seçiniz(Konu)"
            required
            v-model="subject"
          >
          </InputSelect>
          <InputSelect
            :items="binaListesi"
            itemKey="buildName"
            itemValue="name"
            label="Seçiniz(Bina)"
            defaultOptions="Lütfen bir bina seçiniz"
            required
            v-model="buildName"
          ></InputSelect>
        </div>
        <div>
          <InputTextarea
            rows="4"
            cols="50"
            required
            label="Mesajınız Yazın"
            v-model="message"
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
import axiosInstance from "@/lib/axios";
import box from "@/store/box.js";
import binaListesi from "@/data/binaListesi.json";

export default {
  data() {
    return {
      message: "",
      buildName: "",
      name: "",
      surname: "",
      subject: "",
      telNo: "",
      emailAddres: "",
    };
  },

  methods: {
    async contactUs() {
      try {
        await axiosInstance.post("http://localhost:3000/contact-email", {
          name: this.name,
          surname: this.surname,
          emailAddres: this.emailAddres,
          telNo: this.telNo,
          subject: this.subject,
          buildName: this.buildName,
          message: this.message,
        });
        box.addSuccess("Tebrikler!", "İletişim Formu Başarıyla İletildi");
      } catch (error) {
        box.addError("Üzgünüm", "Bir Hata Oluştu!");
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
