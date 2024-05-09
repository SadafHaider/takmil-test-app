<template>
  <section class="bg-gray-50">
    <div
      class="px-6 py-8 mx-auto md:px-0 md:py-0 md:h-screen lg:max-w-screen-lg lg:max-h-screen-lg lg:mx-auto xl:max-w-screen-xl"
    >
      <!-- Calendar widget -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 py-6">
        <div class="bg-white p-4 rounded-md shadow-md pb-40">
          <label
            for="date"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Date</label
          >
          <input
            type="date"
            v-model="selectedDate"
            @change="fetchFeedbackData"
            class="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 sm:text-sm border rounded-md"
          />
        </div>
        <div class="bg-gray-400"></div>
      </div>

      <div class="pb-6">
        <h1 class="text-gray-600 text-semibold font-normal">Schools</h1>
      </div>

      <!-- Display four numbers -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="flex flex-col bg-white px-6 py-10 rounded-md shadow-md">
          <div class="text-gray-500">Total</div>
          <div>{{ totalSchools }}</div>
        </div>
        <div class="flex flex-col bg-white px-6 py-10 rounded-md shadow-md">
          <div class="text-gray-500">Functional</div>
          <div>{{ FunctionalSchools }}</div>
        </div>
        <div class="flex flex-col bg-white px-6 py-10 rounded-md shadow-md">
          <div class="text-gray-500">Open</div>
          <div>{{ onSchools }}</div>
        </div>
        <div class="flex flex-col bg-white px-6 py-10 rounded-md shadow-md">
          <div class="text-gray-500">Closed</div>
          <div>{{ offSchools }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useDashboardStore } from "../store/Dashboard";

export default defineComponent({
  setup() {
    const dashboardStore = useDashboardStore();
    const selectedDate = ref(new Date().toISOString().slice(0, 10));

    // Fetch feedback data based on the selected date
    const fetchFeedbackData = () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (token) {
        dashboardStore.fetchSchoolData(token);

        const date = new Date(selectedDate.value);
        dashboardStore.fetchFeedbackDataByDate(token, date);
      } else {
        console.error("Token not found. User is not authenticated.");
        // Handle authentication error
      }
    };
    onMounted(fetchFeedbackData);

    // Define computed properties to access data from the store
    const totalSchools = computed(() => dashboardStore.totalSchools);
    const onSchools = computed(() => dashboardStore.onSchools);
    const offSchools = computed(() => dashboardStore.offSchools);
    const FunctionalSchools = computed(() => dashboardStore.FunctionalSchools);

    return {
      selectedDate,
      fetchFeedbackData,
      totalSchools,
      onSchools,
      offSchools,
      FunctionalSchools,
    };
  },
});
</script>
