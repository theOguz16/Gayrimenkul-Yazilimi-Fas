<script setup>
import Header from "@/components/global/Header.vue";
</script>
<template>
  <Header></Header>
  <div
    class="container mt-6 flex gap-8 items-start justify-center flex-row max-sm:p-4 max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:text-center max-lg:flex-col"
  ></div>
</template>
<script>
const router = useRouter();
import { useRouter } from "vue-router";
import axiosInstance from "@/lib/axios";
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {},
  async mounted() {
    try {
      const response = await axiosInstance.get("/api/profile");
      this.user = response.data.user;

      // Rolüne göre yönlendirme
      if (this.user.role == "Admin") {
        this.$router.push("/admin-panel"); // Adminse admin-panel sayfasına yönlendir
      } else if (this.user.role == "User") {
        this.$router.push("/kira-panel"); // User ise kira-panel sayfasına yönlendir
      }
    } catch (error) {
      console.error("Kullanıcı bilgileri alınamadı:", error);
    }
  },
};
</script>
