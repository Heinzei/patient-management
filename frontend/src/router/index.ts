import { createRouter, createWebHistory } from 'vue-router'
import PatientList from '../components/PatientList.vue'
import PatientForm from '../components/PatientForm.vue'
import PatientDetail from '../components/PatientDetail.vue'

const routes = [
  { path: '/', component: PatientList },
  { path: '/patients/new', component: PatientForm },
  { path: '/patients/:id', component: PatientDetail },
  { path: '/patients/:id/edit', component: PatientForm }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
