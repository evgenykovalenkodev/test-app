<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <users />
    </v-col>
  </v-row>
</template>

<script>
import users from '../components/users.vue';

export default {
    name: 'index',
    components: { users }
};
</script>
