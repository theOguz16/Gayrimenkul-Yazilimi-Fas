<script setup>
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
    <div id="image-container" class="">
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
          <InputText label="Ad" type="text" placeholder="Ad" required />

          <InputText label="Soyad" type="text" placeholder="Soyadı" required />
        </div>

        <div class="flex gap-5">
          <InputDate
            type="date"
            value="gg.aa.yyyy"
            label="Doğum Tarihi"
            required
          />
        </div>
        <div class="flex gap-5 max-sm:flex-col">
          <InputSelect
            :items="cities"
            itemKey="il"
            itemValue="il"
            label="Seçiniz(İl)"
            defaultOptions="Lütfen bir şehir seçiniz"
            required
          ></InputSelect>
          <InputSelect
            :items="genderList"
            itemKey="value"
            itemValue="gender"
            defaultOptions="Lütfen bir cinsiyet seçiniz"
            label="Seçiniz(Cinsiyetiniz)"
            required
          >
          </InputSelect>
        </div>

        <div>
          <InputText
            label="Kullanıcı Ad"
            type="text"
            placeholder="Kullanıcı Adı"
            required
          />
        </div>
        <div>
          <InputText
            label="E-Posta Adresi"
            type="email"
            placeholder="E-Posta Adresi"
            required
          />
        </div>
        <div>
          <InputText
            label="Şifre"
            type="password"
            placeholder="Şifre"
            field="password"
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
export default {
  data() {
    return {};
  },

  methods: {},
};
</script>
