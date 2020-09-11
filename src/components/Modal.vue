<template>
  <div class="modal" :class="{'is-active': modalOpen}">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ year }}년 {{ month }}월 {{ clickDay }}일</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <textarea class="textarea" :placeholder="placeholder"
        @input="typing" :value="message"></textarea>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" @click="save">{{ buttonMessage[0] }}</button>
        <button class="button" @click="closeModal">{{ buttonMessage[1] }}</button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import eventBus from '../../middleware/eventbus';

export default {
  name: 'Modal',
  props: ['modalOpen', 'year', 'month', 'clickDay'],
  data() {
    return {
      placeholder: '오늘 할 일 또는 한 일을 적어주세요',
      buttonMessage: ['저장', '취소'],
      message: '',
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModal', false);
    },
    typing(event) {
      this.message = event.target.value;
    },
    save() {
      axios.post('http://localhost:3000/save', {
        message: this.message,
        year: this.year,
        month: this.month,
        day: this.clickDay,
      }).then(() => {
        const data = {
          year: this.year,
          month: this.month,
          day: this.clickDay,
          message: this.message,
        };
        eventBus.$emit('addList', data);
        this.$emit('closeModal', false);
      }).catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        // eslint-disable-next-line no-alert
        alert('등록 불가');
      });
    },
  },
};
</script>
