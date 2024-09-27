<script setup>
import binaListesi from "@/data/binaListesi.json";

const genderList = {
  male: {
    gender: "Erkek",
    value: 0,
  },
  female: {
    gender: "Kadın",
    value: 1,
  },
  other: {
    gender: "Diğer",
    value: 2,
  },
};
</script>
<template>
  <div
    class="container flex mx-auto mt-14 bg-white p-0 gap-4 max-sm:flex-col max-lg:flex-col"
  >
    <div id="image-container" class="flex items-center">
      <img src="image/fasimg.png" alt="login-image" />
    </div>
    <div
      id="register"
      class="max-w-[560px] mx-auto border-slate-100 rounded-md border p-6 bg-white"
    >
      <h3 class="mb-5 text-site-color-green text-center">Kayıt Ol</h3>
      <form
        @submit.prevent="createUsers"
        class="grid grid-rows-3 gap-5 max-sm:flex max-sm:flex-col"
      >
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

        <div class="flex gap-5">
          <InputDate
            type="date"
            value="gg.aa.yyyy"
            label="Doğum Tarihi"
            v-model="formData.dateOfBirth"
            required
          />
        </div>
        <div class="flex gap-5 max-sm:flex-col">
          <InputSelect
            :items="binaListesi"
            itemKey="buildName"
            itemValue="name"
            label="Seçiniz(Bina)"
            defaultOptions="Lütfen bir bina seçiniz"
            v-model="formData.buildName"
            required
          ></InputSelect>
          <InputSelect
            :items="genderList"
            itemKey="value"
            itemValue="gender"
            defaultOptions="Lütfen bir cinsiyet seçiniz"
            label="Seçiniz(Cinsiyetiniz)"
            v-model="formData.gender"
            required
          >
          </InputSelect>
        </div>
        <div>
          <InputText
            label="E-Posta Adresi"
            type="email"
            placeholder="E-Posta Adresi"
            required
            v-model="formData.emailAddres"
          />
        </div>
        <div>
          <InputText
            label="Telefon Numarası"
            type="tel"
            placeholder="Telefon Numarası"
            required
            v-model="formData.telNo"
          />
        </div>
        <div>
          <InputText
            label="Şifre"
            type="password"
            placeholder="Şifre"
            field="password"
            v-model="formData.password"
            required
          />
        </div>
        <div class="flex gap-5 max-sm:flex-col">
          <InputText
            type="number"
            label="Kira Miktarı"
            placeholder="Kira Miktarı"
            v-model="formData.kiraMiktari"
            required
          ></InputText>
          <InputText
            type="number"
            label="Aidat Miktarı"
            placeholder="Aidat Miktarı"
            v-model="formData.aidatMiktari"
            required
          ></InputText>
        </div>
        <div class="flex gap-5 max-sm:flex-col">
          <InputDate
            type="date"
            value="gg.aa.yyyy"
            label="Kira Tarihi"
            v-model="formData.kiraTarihi"
            required
          />
          <InputDate
            type="date"
            value="gg.aa.yyyy"
            label="Aidat Tarihi"
            v-model="formData.aidatTarihi"
            required
          />
        </div>
        <div class="mt-5">
          <InputButton
            class="w-full bg-site-color-green"
            type="submit"
            text="Kayıt Ol!"
          />
        </div>
        <div id="register" class="mt-2">
          <p class="text-sm max-sm:text-center">
            Bir hesabın var mı ?
            <router-link class="text-site-color-green" to="/login"
              >Giriş Yap!</router-link
            >
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { eventBus } from "@/main.js";
import axios from "axios";
import box from "@/store/box.js";

export default {
  data() {
    return {
      users: [],
      formData: {
        name: "",
        surname: "",
        dateOfBirth: "",
        gender: "",
        buildName: null,
        emailAddres: "",
        telNo: "",
        password: "",
        dirty: false,
        error: {},
      },
    };
  },

  methods: {
    userOlustur() {
      if (this.formData.buildName !== null) {
        eventBus.$emit("userEklendi", this.formData);
      }
    },

    async createUsers() {
      try {
        const response = await axios.post("http://localhost:3000/register", {
          buildName: this.formData.buildName,
          name: this.formData.name,
          surname: this.formData.surname,
          dateOfBirth: this.formData.dateOfBirth,
          gender: this.formData.gender,
          district: this.formData.district,
          emailAddres: this.formData.emailAddres,
          telNo: this.formData.telNo,
          password: this.formData.password,
          kiraMiktari: this.formData.kiraMiktari,
          aidatMiktari: this.formData.aidatMiktari,
          kiraTarihi: this.formData.kiraTarihi,
          aidatTarihi: this.formData.aidatTarihi,
        });

        this.users.push(response.data);

        localStorage.setItem("token", response.data.token);

        box.addSuccess("Tebrikler", "Kayıt Olma Başarılı!");

        this.$router.push("/kira-panel");
        // this.reset();
      } catch (error) {
        box.addError("Üzgünüm", "Bir Hata Oluştu!");
        console.error(error);
      }
    },
    async fetchQuestions() {
      try {
        const response = await axios.get("http://localhost:3000/register");
        this.users = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.fetchQuestions();
  },
};
</script>
