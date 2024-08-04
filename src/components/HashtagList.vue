<script setup lang="ts">
import { useFeedbackItems } from "../composables/useFeedbackItems"

const { hashtags, handleSelectCompany } = useFeedbackItems()
</script>

<template>
  <ul class="hashtags">
    <li>
      <button @click="handleSelectCompany('All')">Show All</button>
    </li>
    <li v-for="hashtag of hashtags" :key="hashtag">
      <button @click="handleSelectCompany(hashtag)">#{{ hashtag }}</button>
    </li>
  </ul>
</template>

<style scoped></style>
