<template>
  <div class="accordion" :class="{ opened: isCollapsed }">
    <header @click="toggle">
      <span class="accordion__heading">
        <slot name="head"></slot>
      </span>
    </header>
    <section class="accordion__body" ref="body">
      <slot name="body"></slot>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false,
    };
  },
  watch: {
    isCollapsed() {
      this.$refs.body.style.height = this.isCollapsed
        ? `${this.$refs.body.scrollHeight}px`
        : "";
    },
  },
  methods: {
    toggle() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../styles/_module.scss";

.accordion {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  &__heading {
    position: relative;
    text-transform: capitalize;
    &::after {
      content: "\276F";
      margin-left: 1rem;
      display: inline-block;
      font-weight: 500;
      transition: all 0.3s ease-in;
    }
  }
  &.opened &__heading::after {
    transform: rotate(90deg);
    opacity: .7;
  }
  &__body {
    transition: all 0.2s;
    height: 0;
    overflow: hidden;
  }
}
</style>
