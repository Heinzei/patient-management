<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
  firstName: '',
  lastName: '',
  birthDate: '',
  gender: '',
  street: '',
  houseNumber: '',
  zip: '',
  city: '',
  country: '',
});

async function savePatient() {
  await fetch('http://localhost:3000/patients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
  alert('Patient erfolgreich gespeichert!');
  router.push('/patients');
}
</script>
