<template>
  <div>
    <div v-for="item in upcoming" :key="item.id">
      <bkkBadge v-bind="item"/>
    </div>
  </div>
</template>

<script>
import { getFutarDataForStop } from '@/lib/FutarRequest';
import bkkBadge from './bkkBadge';

export default {
  name: 'bkkUpcoming',
  components: { bkkBadge },
  data() {
    const data = {
      upcoming: [
        { id: 0, time: 123, route: 91 },
        { id: 1, time: 244, route: 291 },
      ],
    };
    getFutarDataForStop('F00220')
      .then((res) => {
        console.log(res);
        data.upcoming[1].time = 777;
      })
      .catch(err => console.log('ERROR', err));
    return data;
  },
};
</script>

