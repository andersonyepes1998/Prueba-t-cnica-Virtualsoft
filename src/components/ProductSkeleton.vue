<template>
  <div class="skeleton-card">
    <div class="skeleton image"></div>
    <div class="skeleton title"></div>
    <div class="skeleton price"></div>
    <div class="skeleton button"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.skeleton-card {
  background: #ffffff;
  border-radius: 18px;
  padding: 14px;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.06);
}

.skeleton {
  border-radius: 10px;
  background: linear-gradient(
    90deg,
    #f1f5f9 25%,
    #e2e8f0 50%,
    #f1f5f9 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite linear;
}

.image {
  width: 100%;
  height: 150px;
  margin-bottom: 14px;
}

.title {
  width: 100%;
  height: 16px;
  margin-bottom: 10px;
}

.price {
  width: 55%;
  height: 16px;
  margin-bottom: 14px;
}

.button {
  width: 100%;
  height: 38px;
  border-radius: 12px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
</style>