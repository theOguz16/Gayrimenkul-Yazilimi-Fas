<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>
<template>
  <div>
    <div class="container flex bg-white mt-14 p-0 max-sm:flex-col">
      <div id="image-container" class="w-[50%] max-sm:mb-8 max-sm:w-full">
        <img src="image/fasimg.png" alt="login-image" />
      </div>
      <div id="form-container" class="my-auto mx-auto">
        <form @submit.prevent="login" class="flex flex-col gap-4">
          <div>
            <h2 class="text-site-color-green text-center mb-4">Giriş Yap</h2>
          </div>
          <div>
            <InputText
              placeholder="Kullanıcı Adı"
              type="text"
              required
              v-model="username"
            ></InputText>
          </div>
          <div>
            <InputText
              placeholder="Şifre"
              type="password"
              required
              v-model="password"
            ></InputText>
          </div>
          <div class="flex justify-center">
            <InputButton
              class="bg-site-color-green w-full"
              type="submit"
              text="Giriş Yap"
            ></InputButton>
          </div>
          <div id="register" class="mt-2">
            <p class="text-sm">
              Henüz kayıt olmadın mı ?
              <router-link class="text-site-color-green" to="/register"
                >Kayıt Ol!</router-link
              >
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
