<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Patientendetails</h2>

    <div class="space-y-2 text-left">
      <p><strong>Vorname:</strong> {{ patient.firstName }}</p>
      <p><strong>Nachname:</strong> {{ patient.lastName }}</p>
      <p><strong>Geburtsdatum:</strong> {{ patient.birthDate }}</p>
      <p><strong>Geschlecht:</strong> {{ patient.gender }}</p>
      <p><strong>Straße:</strong> {{ patient.street }}</p>
      <p><strong>Hausnummer:</strong> {{ patient.houseNumber }}</p>
      <p><strong>PLZ:</strong> {{ patient.zip }}</p>
      <p><strong>Wohnort:</strong> {{ patient.city }}</p>
      <p><strong>Land:</strong> {{ patient.country }}</p>
    </div>

    <router-link
      to="/"
      class="block mt-6 bg-blue-600 text-white text-center px-6 py-2 rounded-xl hover:bg-blue-700"
    >
      Zurück zur Liste
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  street?: string;
  houseNumber?: string;
  zip?: string;
  city?: string;
  country?: string;
}

defineProps<{ id: string }>();

const patient: Patient = {
  id: 1,
  firstName: 'Anna',
  lastName: 'Müller',
  birthDate: '1990-05-12',
  gender: 'weiblich',
  street: 'Hauptstraße',
  houseNumber: '12A',
  zip: '12345',
  city: 'Berlin',
  country: 'Deutschland',
};
</script>
