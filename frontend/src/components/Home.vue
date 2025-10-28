<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-200"
  >
    <div class="bg-white p-12 rounded-2xl shadow-lg text-center">
      <h1 class="text-5xl font-extrabold text-blue-700 mb-16">
        🏥 Patientenverwaltungssystem
      </h1>

      <div class="flex justify-center space-x-24">
        <router-link
          to="/patients"
          class="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg shadow-md hover:bg-blue-700 transition"
        >
          Patientenliste anzeigen
        </router-link>

        <router-link
          to="/new"
          class="bg-green-600 text-white px-8 py-4 rounded-xl text-lg shadow-md hover:bg-green-700 transition"
        >
          Patienten erstellen
        </router-link>
      </div>
    </div>
  </div>
</template>
