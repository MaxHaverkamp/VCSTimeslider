import { WindowSlot } from '@vcmap/ui';
import { ButtonLocation } from '@vcmap/ui';
import { name, version, mapVersion } from '../package.json';
import TimeSlider, { windowId } from './TimeSlider.vue';

/**
 * @typedef {Object} PluginState
 * @property {any} prop
 */

/**
 * Implementation of VcsPlugin interface. This function should not throw! Put exceptions in initialize instead.
 * @param {T} config - the configuration of this plugin instance, passed in from the app.
 * @param {string} baseUrl - the absolute URL from which the plugin was loaded (without filename, ending on /)
 * @returns {import("@vcmap/ui/src/vcsUiApp").VcsPlugin<T, PluginState>}
 * @template {Object} T
 */
export default function plugin(config, baseUrl) {
  // eslint-disable-next-line no-console
  console.log(config, baseUrl);
  return {
    get name() {
      return name;
    },
    get version() {
      return version;
    },
    get mapVersion() {
      return mapVersion;
    },
    /**
     * @param {import("@vcmap/ui").VcsUiApp} vcsUiApp
     * @param {PluginState=} state
     * @returns {Promise<void>}
     */
    initialize: async (vcsUiApp, state) => {
		
		
		  vcsUiApp.navbarManager.add(
        {
          action: {
            name: 'Timeslider',
            title: 'Timeslider',
            icon: 'mdi-database-clock',
            /**
             * @returns {Promise<void>}
             */
            async callback() {
              
				if (vcsUiApp.windowManager.has(windowId)) {
            
            vcsUiApp.windowManager.remove(windowId);
          } else {
				vcsUiApp.windowManager.add(
				{
					id: windowId,
					component: TimeSlider,
					state: {
						headerTitle: 'timeslider.timeslider',
						headerIcon: 'mdi-database-clock',
						
					},
					WindowSlot: WindowSlot.DYNAMIC_RIGHT,
					
            
				},
				name,
				);
     
		  }
              
            },
          },
        },
        name,
        ButtonLocation.TOOL,
      );
		
		
		
		
      // eslint-disable-next-line no-console
      console.log(
        'Called before loading the rest of the current context. Passed in the containing Vcs UI App ',
        vcsUiApp,
        state,
      );
    },
    /**
     * @param {import("@vcmap/ui").VcsUiApp} vcsUiApp
     * @returns {Promise<void>}
     */
    onVcsAppMounted: async (vcsUiApp) => {
      // eslint-disable-next-line no-console
      console.log(
        'Called when the root UI component is mounted and managers are ready to accept components',
        vcsUiApp,
      );
    },
    /**
     * should return all default values of the configuration
     * @returns {T}
     */
    getDefaultOptions() {
      return {};
    },
    /**
     * should return the plugin's serialization excluding all default values
     * @returns {T}
     */
    toJSON() {
      // eslint-disable-next-line no-console
      console.log('Called when serializing this plugin instance');
      return {};
    },
    /**
     * should return the plugins state
     * @param {boolean} forUrl
     * @returns {PluginState}
     */
    getState(forUrl) {
      // eslint-disable-next-line no-console
      console.log('Called when collecting state, e.g. for create link', forUrl);
      return {
        prop: '*',
      };
    },
    /**
     * components for configuring the plugin and/ or custom items defined by the plugin
     * @returns {Array<import("@vcmap/ui").PluginConfigEditor>}
     */
    getConfigEditors() {
      return [];
    },
	i18n: {
      en: {
        timeslider: {
		  
          timeslider: 'Timeslider',
          close: 'Close',
          
        },
      },
      de: {
        timeslider: {
          timeslider: 'Zeitraffer',
          close: 'Schließen',
          
        },
      },
    },
    destroy() {
      // eslint-disable-next-line no-console
      console.log('hook to cleanup');
    },
  };
}
