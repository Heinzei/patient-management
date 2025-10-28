<template>
  <div>
    <h2>{{ isEdit ? 'Patient bearbeiten' : 'Neuer Patient' }}</h2>
    <form @submit.prevent="submit">
      <div>
        <label>Vorname</label>
        <input v-model="form.firstName" required />
      </div>
      <div>
        <label>Nachname</label>
        <input v-model="form.lastName" required />
      </div>
      <div>
        <label>Geburtsdatum</label>
        <input type="date" v-model="form.birthDate" required />
      </div>
      <div>
        <label>Geschlecht</label>
        <select v-model="form.gender" required>
          <option value="male">männlich</option>
          <option value="female">weiblich</option>
          <option value="other">divers</option>
        </select>
      </div>
      <div>
        <label>Notizen</label>
        <textarea v-model="form.notes"></textarea>
      </div>
      <button type="submit">Speichern</button>
      <router-link to="/">Abbrechen</router-link>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { createPatient, fetchPatient, updatePatient } from '../services/api';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isEdit = !!route.params.id;
    const form = ref({
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: 'other',
      notes: ''
    });

    onMounted(async () => {
      if (isEdit) {
        const data = await fetchPatient(route.params.id as string);
        form.value = {
          firstName: data.firstName,
          lastName: data.lastName,
          birthDate: data.birthDate,
          gender: data.gender,
          notes: data.notes || ''
        };
      }
    });

    const submit = async () => {
      if (isEdit) {
        await updatePatient(route.params.id as string, form.value);
        router.push(`/patients/${route.params.id}`);
      } else {
        const created = await createPatient(form.value);
        router.push(`/patients/${created.id}`);
      }
    };

    return { form, submit, isEdit };
  }
};
</script>
