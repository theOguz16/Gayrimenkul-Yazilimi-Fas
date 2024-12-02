<template>
  <div
    class="container flex mx-auto mt-14 bg-white p-0 gap-4 max-sm:flex-col max-lg:flex-col"
  >
    <div id="image-container" class="flex items-center">
      <img src="/image/fasimg.png" alt="login-image" />
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
            :label="t('user.name')"
            type="text"
            :placeholder="t('user.name')"
            required
            v-model="formData.name"
          />

          <InputText
            :label="t('user.surname')"
            type="text"
            :placeholder="t('user.surname')"
            required
            v-model="formData.surname"
          />
        </div>

        <div class="flex gap-5">
          <InputDate
            type="date"
            :value="t('user.date_type')"
            :label="t('user.bd')"
            v-model="formData.dateOfBirth"
            required
          />
        </div>
        <div class="flex gap-5 max-sm:flex-col">
          <InputSelect
            :items="binaListesi"
            itemKey="buildName"
            itemValue="name"
            :label="t('user.select_building')"
            :defaultOptions="t('user.please_select_build')"
            v-model="formData.buildName"
            required
          ></InputSelect>
          <InputSelect
            :items="genderList"
            itemKey="value"
            itemValue="gender"
            :please_select_gender="t('user.please_select_gender')"
            :label="t('user.select_gender')"
            v-model="formData.gender"
            required
          >
          </InputSelect>
        </div>
        <div>
          <InputText
            :placeholder="t('user.mail_address')"
            type="email"
            :label="t('user.mail_address')"
            required
            v-model="formData.emailAddres"
          />
        </div>
        <div>
          <InputText
            :placeholder="t('user.phone_number')"
            type="tel"
            :label="t('user.phone_number')"
            required
            v-model="formData.telNo"
          />
        </div>
        <div>
          <InputText
            :label="t('user.password')"
            type="password"
            :placeholder="t('user.password')"
            field="password"
            v-model="formData.password"
            required
          />
        </div>
        <div class="flex gap-5 max-sm:flex-col">
          <InputText
            type="number"
            :label="t('user.rent_amount')"
            :placeholder="t('user.rent_amount')"
            v-model="formData.kiraMiktari"
            required
          ></InputText>
          <InputText
            type="number"
            :label="t('user.dues_amount')"
            :placeholder="t('user.dues_amount')"
            v-model="formData.aidatMiktari"
            required
          ></InputText>
        </div>
        <div class="flex gap-5 max-sm:flex-col">
          <InputDate
            type="date"
            :value="t('user.date_type')"
            :label="t('user.rent_date')"
            v-model="formData.kiraTarihi"
            required
          />
          <InputDate
            type="date"
            :value="t('user.date_type')"
            :label="t('user.dues_date')"
            v-model="formData.aidatTarihi"
            required
          />
        </div>
        <div class="mt-5">
          <InputButton
            class="w-full bg-site-color-green"
            type="submit"
            :text="t('user.register')"
          />
        </div>
        <div id="register" class="mt-2">
          <p class="text-sm max-sm:text-center">
            {{ t("user.login_text") }}
            <router-link class="text-site-color-green" to="/login">{{
              t("user.login")
            }}</router-link>
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
import binaListesiData from "@/data/binaListesi.json";
import { useI18n } from "vue-i18n";

const genderListData = {
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

export default {
  setup() {
    const { t } = useI18n(); // i18n fonksiyonuna useI18n ile erişiyoruz

    return { t }; // t fonksiyonunu template içinde kullanılmak üzere döndürüyoruz
  },
  data() {
    return {
      binaListesi: [],
      genderList: [],
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
        const response = await axios.post("/api/register", {
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

        box.addSuccess(this.t("success.register"), this.t("success.welcome"));

        this.$router.push("/kira-panel");
        // this.reset();
      } catch (error) {
        box.addError(this.t("errors.sorry"), this.t("errors.general"));
        console.error(error);
      }
    },
    async fetchQuestions() {
      try {
        const response = await axios.get("https://faspanel.com/register");
        this.users = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.fetchQuestions();
    this.binaListesi = binaListesiData;
    this.genderList = genderListData;
  },
};
</script>
