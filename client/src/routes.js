import LandingPage from './pages/LandingPage.vue';
import Bestenliste from './pages/Bestenliste.vue';
import Userbereich from './pages/Userbereich.vue';

export default [
    { path: '/', component: LandingPage},
    { path: '/bestenliste', component: Bestenliste},
    { path: '/userbereich', component: Userbereich},
    { path: '*', component: LandingPage}
]
