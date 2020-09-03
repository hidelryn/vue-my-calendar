<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{ title }}
        </h1>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: '나만의 캘린더 앱',
    };
  },
};
</script>
