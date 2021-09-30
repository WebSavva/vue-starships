<template>
  <space-background></space-background>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import SpaceBackground from "@/components/UI/SpaceBackground.vue";

export default {
  components: {
    SpaceBackground,
  },
};
</script>
<style lang="scss">
@import "./styles/index.scss";

#app {
  width: 100%;
  min-height: 100vh;
  position: relative;
  z-index: 100;
  overflow-x: hidden;
  @include centered;
}

$duration: 0.2s;
$timing-function: linear;

.slide-in-enter-active {
  animation: slideIn $duration $timing-function;
}

.slide-in-leave-active {
  animation: slideAway $duration $timing-function;
}

.slide-away-enter-active {
  animation: slideAway $duration $timing-function reverse;
}

.slide-away-leave-active {
  animation: slideIn $duration $timing-function reverse;
}
</style>
