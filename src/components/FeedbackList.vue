<script setup lang="ts">
import { onMounted, ref } from "vue"
import { TFeedbackItems } from "../types"
import FeedbackItem from "./FeedbackItem.vue"
import Spinner from "./Spinner.vue"

const feedbackItems = ref<TFeedbackItems[]>([])
const isLoading = ref(false)
const errorMessage = ref("")

const fetchFeedbackItems = async () => {
  isLoading.value = true
  try {
    const response = await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
    )
    if (!response.ok) {
      throw new Error("Failed to fetch feedback items")
    }
    const items = await response.json()
    feedbackItems.value = items.feedbacks
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = "An unknown error occurred"
    }
  }
  isLoading.value = false
}

onMounted(() => {
  fetchFeedbackItems()
})
</script>

<template>
  <ol class="feedback-list">
    <Spinner v-if="isLoading" />
    <p v-else-if="errorMessage">{{ errorMessage }}</p>
    <FeedbackItem
      v-else
      v-for="item of feedbackItems"
      :key="item.id"
      :item="item"
    />
  </ol>
</template>

<style scoped></style>
