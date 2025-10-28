<template>
  <div class="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-lg mt-10">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Patientenliste</h2>

    <table class="min-w-full table-auto border-collapse">
      <thead>
        <tr class="bg-blue-200 text-left">
          <th class="p-2 border-b">Vorname</th>
          <th class="p-2 border-b">Nachname</th>
          <th class="p-2 border-b">Geburtsdatum</th>
          <th class="p-2 border-b">Geschlecht</th>
          <th class="p-2 border-b text-center">Aktionen</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="patient in patients"
          :key="patient.id"
          class="hover:bg-blue-50"
        >
          <td class="p-2 border-b">{{ patient.firstName }}</td>
          <td class="p-2 border-b">{{ patient.lastName }}</td>
          <td class="p-2 border-b">{{ patient.birthDate }}</td>
          <td class="p-2 border-b">{{ patient.gender }}</td>
          <td class="p-2 border-b text-center space-x-2">
            <router-link
              :to="`/patients/${patient.id}`"
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Details
            </router-link>
            <button
              class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              @click="editPatient(patient.id)"
            >
              Bearbeiten
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
}

const patients = ref<Patient[]>([]);

async function loadPatients() {
  const res = await fetch('http://localhost:3000/patients');
  patients.value = await res.json();
}

function editPatient(id: number) {
  alert(`Patient mit ID ${id} bearbeiten (in Bearbeitung)`);
}

onMounted(() => loadPatients());
</script>
