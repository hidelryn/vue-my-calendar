<template>
  <body>
    <section class="section">
      <div class="container">
        <h2 class="subtitle has-text-centered">
          {{ title }}
        </h2>
      </div>
    </section>
  </body>
</template>

<script>
export default {
  data() {
    return {
      title: '내가 등록한 일정 리스트',
    };
  },
};
</script>
