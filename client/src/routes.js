import LandingPage from './pages/LandingPage.vue';
import Bestenliste from './pages/Bestenliste.vue';

export default [
    { path: '/', component: LandingPage},
    { path: '/bestenliste', component: Bestenliste},
    { path: '*', component: LandingPage}
]
