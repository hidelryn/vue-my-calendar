<template>
  <div>
    <Header></Header>
    <Calendar v-on:yearAndMonth="getYearMonth"></Calendar>
    <TodoList
      v-bind:year="year"
      v-bind:month="month"
      v-bind:list="list"
    ></TodoList>
  </div>
</template>

<script>
import axios from 'axios';
import Header from './Header';
import Calendar from './Calendar';
import TodoList from './TodoList';
import eventBus from '../../middleware/eventbus';

export default {
  name: 'Main',
  components: {
    Header,
    Calendar,
    TodoList,
  },
  data() {
    return {
      year: 0,
      month: 0,
      list: null,
    };
  },
  created() {
    eventBus.$on('addList', (payload) => {
      if (this.list.length === 0) {
        this.list.push([payload]);
      } else if (this.list[this.list.length - 1].length > 4) {
        this.list.push([payload]);
      } else {
        this.list[this.list.length - 1].push(payload);
      }
    });
    eventBus.$on('removeList', (payload) => {
      this.list[payload.idx].splice(payload.subIdx, 1);
    });
  },
  methods: {
    getYearMonth(event) {
      [this.year, this.month] = event;
      this.getData();
    },
    getData() {
      axios
        .get(`http://localhost:3000/find?year=${this.year}&month=${this.month}`)
        .then((result) => {
          const list = [];
          if (result.data.length > 0) {
            let datas = [];
            result.data.forEach((item, idx) => {
              if (idx > 0 && idx % 4 === 0) {
                list.push(datas);
                datas = [];
              }
              datas.push(item);
            });
            if (datas.length > 0) list.push(datas);
          }
          this.list = list;
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log('e', e);
        });
    },
  },
};
</script>
