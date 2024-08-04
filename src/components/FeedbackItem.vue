<script setup lang="ts">
import { defineProps, ref } from "vue"
import { TFeedbackItems } from "../types"

const props = defineProps<{
  item: TFeedbackItems
}>()

const isUpvoted = ref(false)

const upvoteCount = ref(props.item.upvoteCount)

const handleUpvote = () => {
  upvoteCount.value++
  isUpvoted.value = true
}
</script>

<template>
  <li class="feedback">
    <button @click="handleUpvote" :disabled="isUpvoted" aria-label="Upvote">
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path>
      </svg>
      <span>{{ upvoteCount }}</span>
    </button>
    <div>
      <p>{{ item.badgeLetter }}</p>
    </div>
    <div>
      <p>{{ item.company }}</p>
      <p>
        {{ item.text }}
      </p>
    </div>

    <p v-if="item.daysAgo === 0">NEW</p>
    <p v-else>{{ item.daysAgo }}d</p>
  </li>
</template>

<style scoped></style>
