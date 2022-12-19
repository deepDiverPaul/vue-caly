import type {App, Plugin} from 'vue'
import VueCaly from "./VueCaly.vue";
import type {VueCalyPluginOptions} from "@/plugin/VueCaly";

const VueCalyPlugin: Plugin = {
    install: (Vue: App, options: VueCalyPluginOptions) => {
        Vue.component("vue-caly", VueCaly);
    }
};

// Automatic installation if Vue has been added to the global scope.
// @ts-ignore
if (typeof window !== 'undefined' && window.Vue) {
    // @ts-ignore
    window.Vue.use(VueCaly);
}

export default VueCalyPlugin;

export {VueCaly}