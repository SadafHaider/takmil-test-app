<template>
  <section class="bg-gray-50">
    <div
      class="px-6 py-8 mx-auto md:px-0 md:py-0 md:h-screen lg:h-screen lg:max-w-screen-lg lg:mx-auto xl:max-w-screen-xl"
    >
      <!-- Calendar widget -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 py-6">
        <div class="bg-white p-4 rounded-md shadow-md pb-40">
          <label for="date" class="block mb-2 text-sm font-medium text-gray-900"
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
        <div
          class="flex flex-row justify-between bg-white px-6 py-10 rounded-md shadow-md"
        >
          <div class="flex flex-col">
            <div class="text-gray-500">Total</div>
            <div>{{ totalSchools }}</div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="14"
            width="17.5"
            viewBox="0 0 640 512"
          >
            <path
              d="M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96H48C21.5 96 0 117.5 0 144V464c0 26.5 21.5 48 48 48H256V416c0-35.3 28.7-64 64-64s64 28.7 64 64v96H592c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48H473.7L337.8 5.4zM96 192h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V208c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V208zM96 320h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V336zM232 176a88 88 0 1 1 176 0 88 88 0 1 1 -176 0zm88-48c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H336V144c0-8.8-7.2-16-16-16z"
            />
          </svg>
        </div>

        <div
          class="flex flex-row justify-between bg-white px-6 py-10 rounded-md shadow-md"
        >
          <div class="flex flex-col">
            <div class="text-gray-500">Functional</div>
            <div>{{ FunctionalSchools }}</div>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="14"
            width="17.5"
            viewBox="0 0 640 512"
          >
            <path
              d="M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96H48C21.5 96 0 117.5 0 144V464c0 26.5 21.5 48 48 48H256V416c0-35.3 28.7-64 64-64s64 28.7 64 64v96H592c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48H473.7L337.8 5.4zM96 192h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V208c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V208zM96 320h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V336zM232 176a88 88 0 1 1 176 0 88 88 0 1 1 -176 0zm88-48c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H336V144c0-8.8-7.2-16-16-16z"
            />
          </svg>
        </div>

        <div
          class="flex flex-row justify-between bg-white px-6 py-10 rounded-md shadow-md"
        >
          <div class="flex flex-col">
            <div class="text-gray-500">Open</div>
            <div>{{ onSchools }}</div>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="14"
            width="17.5"
            viewBox="0 0 640 512"
          >
            <path
              d="M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96H48C21.5 96 0 117.5 0 144V464c0 26.5 21.5 48 48 48H256V416c0-35.3 28.7-64 64-64s64 28.7 64 64v96H592c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48H473.7L337.8 5.4zM96 192h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V208c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V208zM96 320h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V336zM232 176a88 88 0 1 1 176 0 88 88 0 1 1 -176 0zm88-48c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H336V144c0-8.8-7.2-16-16-16z"
            />
          </svg>
        </div>

        <div
          class="flex flex-row justify-between bg-white px-6 py-10 rounded-md shadow-md"
        >
          <div class="flex flex-col">
            <div class="text-gray-500">Closed</div>
            <div>{{ offSchools }}</div>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="14"
            width="17.5"
            viewBox="0 0 640 512"
          >
            <path
              d="M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96H48C21.5 96 0 117.5 0 144V464c0 26.5 21.5 48 48 48H256V416c0-35.3 28.7-64 64-64s64 28.7 64 64v96H592c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48H473.7L337.8 5.4zM96 192h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V208c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V208zM96 320h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V336zM232 176a88 88 0 1 1 176 0 88 88 0 1 1 -176 0zm88-48c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H336V144c0-8.8-7.2-16-16-16z"
            />
          </svg>
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
