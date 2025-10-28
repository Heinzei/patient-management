import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import PatientList from './components/PatientList.vue';
import PatientForm from './components/PatientForm.vue';
import PatientDetail from './components/PatientDetail.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/patients', component: PatientList },
  { path: '/new', component: PatientForm },
  { path: '/patients/:id', component: PatientDetail, props: true },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
