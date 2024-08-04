import { ref, computed } from "vue"
import { TFeedbackItems } from "../types"

interface FeedbackResponse {
  feedbacks: TFeedbackItems[]
}

// Singleton pattern
const feedbackItems = ref<TFeedbackItems[]>([])
const isLoading = ref(false)
const errorMessage = ref("")
const selectedCompany = ref("")

const filteredFeedbackItems = computed(() => {
  return selectedCompany.value
    ? feedbackItems.value.filter(
        (item) => item.company === selectedCompany.value
      )
    : feedbackItems.value
})

const handleSelectCompany = (company: string) => {
  company === "All"
    ? (selectedCompany.value = "")
    : (selectedCompany.value = company)
}

const hashtags = computed(() => {
  const allHashtags = feedbackItems.value.flatMap((item) => item.company)
  return Array.from(new Set(allHashtags))
})

const fetchFeedbackItems = async () => {
  isLoading.value = true
  try {
    const response = await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
    )
    if (!response.ok) {
      throw new Error("Failed to fetch feedback items")
    }
    const items: FeedbackResponse = await response.json()
    feedbackItems.value = items.feedbacks
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = "An unknown error occurred"
    }
  } finally {
    isLoading.value = false
  }
}

const postFeedbackItem = async (feedbackItem: TFeedbackItems) => {
  try {
    const response = await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackItem),
      }
    )
    if (!response.ok) {
      throw new Error("Failed to post feedback item")
    }
    feedbackItems.value.push(feedbackItem)
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = "An unknown error occurred"
    }
  }
}

export const useFeedbackItems = () => {
  return {
    feedbackItems,
    filteredFeedbackItems,
    isLoading,
    errorMessage,
    fetchFeedbackItems,
    postFeedbackItem,
    hashtags,
    handleSelectCompany,
  }
}
