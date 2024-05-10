<template>
  <section class="bg-gray-50">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl"
          >
            TAKMIL Dashboard
          </h1>
          <h6 class="text-center text-gray-500">Sign in to Continue</h6>
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleLogin">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Username</label
              >
              <input
                type="text"
                v-model="username"
                id="username"
                autocomplete="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="username"
                required
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                type="password"
                v-model="password"
                id="password"
                autocomplete="current-password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    required
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500"
                    >Remember me</label
                  >
                </div>
              </div>
              <a
                href="#"
                class="text-sm font-medium text-emerald-400 hover:underline"
                >Forgot password?</a
              >
            </div>
            <button
              type="submit"
              class="w-full text-white bg-emerald-400 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "../axios";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const username = ref(""); // Define reactive ref for username
    const password = ref(""); // Define reactive ref for password

    const login = async () => {
      try {
        const response = await axios.post("/people/auth/login", {
          username: username.value,
          password: password.value,
        });
        const token = response.data?.accessToken;
        // Save the token for further use
        localStorage.setItem("token", token); // Store token in local storage
        return token;
      } catch (error) {
        console.error("Login failed:", error);
        return null;
      }
    };

    const handleLogin = async () => {
      const token = await login();
      if (token) {
        // Navigate to the dashboard or any other route after successful login
        router.push("/dashboard");
      } else {
        // Handle login failure
      }
    };

    return {
      handleLogin,
      username, // Provide access to username in the template
      password, // Provide access to password in the template
    };
  },
});
</script>
