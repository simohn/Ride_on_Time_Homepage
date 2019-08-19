import LandingPage from './pages/LandingPage.vue';
import KoenigsbergPage from './pages/KoenigsbergPage.vue';
import ForsteralmPage from './pages/ForsteralmPage.vue';

export default [
    { path: '/', component: LandingPage},
    { path: '/koenigsberg', component: KoenigsbergPage},
    { path: '/forsteralm', component: ForsteralmPage},
    { path: '*', component: LandingPage}
]
