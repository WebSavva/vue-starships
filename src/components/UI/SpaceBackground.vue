<template>
  <div class="stars"></div>
  <div class="twinkling"></div>
</template>


<style lang="scss" scoped>
@keyframes move-twink-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}

@keyframes move-clouds-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 10000px 0;
  }
}

.stars,
.twinkling {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width:100%;
  height:100%;
}

.stars {
  background: #000 url("../../assets/stars.png") repeat top center;
}

.twinkling {
  background: transparent url("../../assets/twinkling.png") repeat top center;
  animation: move-twink-back 250s linear infinite;
}
</style>
