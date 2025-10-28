<template>
  <div>
    <router-link to="/patients/new">➕ Neuer Patient</router-link>
    <hr />
    <div v-if="loading">Lade...</div>
    <ul v-else>
      <li v-for="p in patients" :key="p.id">
        <router-link :to="`/patients/${p.id}`">{{ p.firstName }} {{ p.lastName }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const patients = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  const res = await axios.get('http://localhost:3000/patients')
  patients.value = res.data
  loading.value = false
})
</script>
