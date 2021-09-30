<template>
  <div class="pagination" v-if="overallNumberPages">
    <nav class="pagination__nav" v-if="overallNumberPages > 1">
      <button
        class="pagination__btn"
        :disabled="currentPage === 1"
        @click="switchPage(false)"
      >
        Prev
      </button>
      <button
        class="pagination__btn"
        :disabled="currentPage === overallNumberPages"
        @click="switchPage(true)"
      >
        Next
      </button>
    </nav>
    <small class="pagination__page-display"
      >{{ currentPage }} of {{ overallNumberPages }}</small
    >
  </div>
</template>

<script>
export default {
  props: {
    switchPage: Function,
    overallNumberPages: Number,
    currentPage: Number,
  },
};
</script>

<style scoped lang="scss">
@import "./../../styles/_module.scss";
.pagination {
  &__nav {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    justify-content: center;
  }
  &__btn {
    color: $green-color;
    border-radius: 5px;
    font-size: 1.7rem;
    padding: 0.5rem 2rem;
    border: 1px solid $green-color;
    font-weight: 200;
    transition: all 0.3s;
    @include media(xs) {
      font-size: 1.5rem;
      padding: 0.5rem 1rem;
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    &:not(:disabled):hover {
      background: $green-color;
      color: $primary-color;
    }
  }
  &__page-display {
    padding: 1rem 0;
    display: block;
    font-size: 1.5rem;
    text-align: center;
    color: rgba($primary-color, 0.7);
    @include media(xs) {
      font-size: 1.2rem;
    }
  }
}
</style>
