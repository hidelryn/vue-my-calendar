<template>
  <div>
    <Header></Header>
    <Calendar></Calendar>
  </div>
</template>

<script>
import Header from './Header';
import Calendar from './Calendar';

export default {
  name: 'Main',
  components: {
    Header,
    Calendar,
  },
};
</script>
