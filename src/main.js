import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createI18n } from "vue-i18n";

// CSS
import "./assets/style.css";

// Diller
import * as en from "../language/en.yaml";
import * as tr from "../language/tr.yaml";

// Vue i18n kurulum
const i18n = createI18n({
  locale: "tr",
  messages: {
    en: en.default,
    tr: tr.default,
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
