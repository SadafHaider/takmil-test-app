// Dashboard.ts
import { defineStore } from "pinia";
import { SchoolType, SchoolFeedbackType } from "./types";
import axios from "../axios";

export const useDashboardStore = defineStore({
  id: "dashboard",
  state: () => ({
    schoolData: [] as SchoolType[],
    feedbackData: [] as SchoolFeedbackType[],
  }),
  actions: {
    async fetchSchoolData(token: string) {
      try {
        const response = await fetch(
          "https://funcapp-takmilplatform-dev.azurewebsites.net/api/dashboard/query/viewSchoolWithNames",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log("Fetched Schools with names:", data); // Log the fetched data

        this.setSchoolData(data);
      } catch (error) {
        console.error("Error fetching school data:", error);
      }
    },
    async fetchFeedbackDataByDate(token: string, date: Date) {
      try {
        const formattedDate = date.toISOString().slice(0, 10);
        const response = await fetch(
          `https://funcapp-takmilplatform-dev.azurewebsites.net/api/dashboard/query/querySchoolFeedbackByDate?today=${formattedDate}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log("Fetched feedback data:", data); // Log the fetched data

        this.setFeedbackData(data);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    },
    setSchoolData(data: SchoolType[]) {
      this.schoolData = data;
    },
    setFeedbackData(data: SchoolFeedbackType[]) {
      this.feedbackData = data;
    },
  },
  getters: {
    totalSchools: (state) => state.schoolData.length,
    onSchools: (state) =>
      state.feedbackData.filter((feedback) => feedback.schoolStatus === "On")
        .length,
    offSchools: (state) =>
      state.feedbackData.filter((feedback) => feedback.schoolStatus === "Off")
        .length,
    FunctionalSchools: (state) =>
      state.schoolData.filter((school) => school.status === "Functional")
        .length,
  },
});
