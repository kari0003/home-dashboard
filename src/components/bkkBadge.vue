<template>
  <span class="badge">
    <span class="badge-content time">{{ time }}</span>
    <span class="badge-content route">{{ route }}</span>
  </span>
</template>

<script>
export default {
  name: 'bkkBadge',
  props: ['time', 'route'],
};
</script>

<style>
.badge {
  color: white;
  font-size: 0;
  padding: 9px;
}
.badge-content {
  padding: 7px;
  font-size: 32px;
}
.time {
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  background: dodgerblue;
}
.route {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  background: #1e60ff;
  border-left: 2px solid #1e40ff;
}
</style>
