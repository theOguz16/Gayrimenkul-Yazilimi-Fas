import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createI18n } from "vue-i18n";

export const eventBus = new Vue();

// CSS
import "./assets/style.css";

// Diller
import en from "../language/en.json";
import tr from "../language/tr.json";

// Tarayıcı dilini algıla
const getBrowserLanguage = () => {
  const lang = navigator.language || navigator.userLanguage; // Tarayıcı dilini al
  return lang.startsWith("tr") ? "tr" : "en"; // Türkçe ise 'tr', değilse 'en' döner
};

// Vue i18n kurulum
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getBrowserLanguage(),
  messages: {
    en,
    tr,
  },
});

// Bileşenler
import InputText from "./components/forms/InputText.vue";
import InputButton from "./components/forms/InputButton.vue";
import InputDate from "./components/forms/InputDate.vue";
import InputSelect from "./components/forms/InputSelect.vue";
import InputTextarea from "./components/forms/InputTextarea.vue";
import InputFile from "./components/forms/InputFile.vue";
import Header from "./components/global/Header.vue";

// Font Awesome
import "@/lib/fontAwesome";
import "@/lib/fontAwesomeRegular";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);

app
  .use(i18n)
  .use(router)
  .component("fai", FontAwesomeIcon)
  .component("InputText", InputText)
  .component("InputFile", InputFile)
  .component("InputButton", InputButton)
  .component("InputDate", InputDate)
  .component("InputSelect", InputSelect)
  .component("InputTextarea", InputTextarea)
  .component("Header", Header)
  .mount("#app");
