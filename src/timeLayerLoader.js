import {DeclarativeStyleItem} from '@vcmap/core';
import defaultOptions from '../config.json';
import { inject } from 'vue';

/**
 * @type {vcs.vcm.plugins.declarativeStyler.DynamicStyler}
 */
let instance;


/**
 * @typedef {Object} ColorOption
 * @property {string} text
 * @property {string[]} value
 */

/**
 * @typedef {Object} AttributeStats
 * @property {number} minRange
 * @property {number} maxRange
 * @property {number} steps
 */

/**
 * @class
 * @memberOf vcs.vcm.plugins.declarativeStyler
 */
class TimeLayerLoader {
  constructor(options) {
    /**
     * @type {string[]}
     */
    this.layerTypes = options.layerTypes || [];
    
    /**
     * @type {string[]}
     */
    this.layerNames = options.layerNames || [];
    
    
    
    /**
     * @type {vcs.vcm.layer.FeatureLayer|null}
     */
    this.layer = null;
    
    /**
     * @type {Object}
     */
    this.properties = {};
    
    
    
    /**
     * @type {vcs.vcm.util.style.DeclarativeStyleItem}
     */
    this.styleItem = null;
    
    /**
     * @type {boolean}
     */
    this.downloadBtn = options.downloadBtn || false;
	
	this.app = inject('vcsApp');
  }
  
  /**
   * Singleton
   * @param {Object} [options] config
   * @returns {vcs.vcm.plugins.declarativeStyler.DynamicStyler} instance of DynamicStyler
   */
  static getInstance(options) {
    if (instance) {
      return instance;
    }
    instance = new TimeLayerLoader(Object.assign(defaultOptions, options));
    return instance;
  }
  


  
  /**
   * set style on active layer
   * @param {{invert: boolean, color: Array<ColorOption>, selectedAttr: string, attr: AttributeStats}} options
   */
  setStyle(options) {
    
	
	const currYear = options.selectedYear;
    
    let hex;
	
	let conditions = [];
    let styles;
    let i;
	// Change "ABRJ" to your attribute for date of demolition and "BAUJ" for building date
	conditions.push([		
		`Number(\${attributes.ABRJ}) <= ${currYear}||Number(\${attributes.BAUJ}) > ${currYear} `,
		`color('white', 0)`,
		]);
		
	if(options.newB===true){
		conditions.push([		
		`Number(\${attributes.BAUJ}) === ${currYear}`,
		`color("#3BD323")`,
		]);
	}
	
	
	
	
	
	
   styles = new DeclarativeStyleItem({
		name: 'userStyle',
		declarativeStyle: {
		show: 'true',
		color: {
			conditions: conditions,
		},
		},
	legend: [],
	});
	
	
	//Change "AGB" to your Layername of shown buildings
	const layer = this.app.maps.layerCollection.getByKey('AGB');
	
    if (!layer) {
      throw new Error(`Could not load layer '${layerName}'. Please adapt the plugins config.`);
    }
    
    this.layer = layer;
	
	
	
    this.layer.activate();
    this.layer.setStyle(styles);
	
	
	
	
  }
  
  
  /**
   * clear style on active layer
   */
  clear() {
    if (this.layer) {
      this.layer.clearStyle();
    }
  }
}

export default TimeLayerLoader;
