<template>
  <div>
    <div v-if="loading">Lade...</div>
    <div v-else-if="patient">
      <h2>{{ patient.firstName }} {{ patient.lastName }}</h2>
      <p>Geburtsdatum: {{ patient.birthDate }}</p>
      <p>Geschlecht: {{ patient.gender }}</p>
      <p>Notizen: {{ patient.notes }}</p>
      <router-link :to="`/patients/${patient.id}/edit`">Bearbeiten</router-link>
      |
      <button @click="remove">Löschen</button>
      <br /><br />
      <router-link to="/">Zurück zur Liste</router-link>
    </div>
    <div v-else>Patient nicht gefunden</div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { fetchPatient, deletePatient } from '../services/api';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const patient = ref<any | null>(null);
    const loading = ref(true);

    onMounted(async () => {
      try {
        patient.value = await fetchPatient(route.params.id as string);
      } catch {
        patient.value = null;
      } finally {
        loading.value = false;
      }
    });

    const remove = async () => {
      if (!patient.value) return;
      await deletePatient(patient.value.id);
      router.push('/');
    };

    return { patient, loading, remove };
  }
};
</script>
