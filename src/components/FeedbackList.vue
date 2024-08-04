<script setup lang="ts">
import { onMounted } from "vue"
import FeedbackItem from "./FeedbackItem.vue"
import Spinner from "./Spinner.vue"
import { useFeedbackItems } from "../composables/useFeedbackItems"

const { isLoading, filteredFeedbackItems, fetchFeedbackItems, errorMessage } =
  useFeedbackItems()

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
      v-for="item of filteredFeedbackItems"
      :key="item.id"
      :item="item"
    />
  </ol>
</template>

<style scoped></style>
