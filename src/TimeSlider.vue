<template>
  <div>

  &nbsp;  <ContentTitle><center><strong>{{ $t('i18n_slider_title') }}</strong></center></ContentTitle>
  
        <template v-if="loading">
          <Loader />
        </template>
        <template v-else>    
		<br>
		<br>
	
		 <v-slider
            v-model="selectedYear"
            :max="3000" 
            :min="-3000"
            :step="1"
            thumb-label="always"
            @change="setStyle"
            style="margin-left: 20px; margin-right: 20px;"
          ></v-slider>

	
	<v-row justify="center">
		<v-col cols="auto">
			
			
			
			<VcsButton          
          icon="mdi-chevron-right"
          @click="slowdown"
           :tooltip="$t('i18n_slider_slow')"
          class="pl-1"
        />
			
			
			
		  &nbsp;
		  
			<VcsButton @click="toggleSliderMovement">
				<v-icon>{{ isMoving ? 'mdi-pause-circle' : '$vcsPlayCircle' }}</v-icon>
			</VcsButton>
		  
		  &nbsp;
						
			<VcsButton          
          icon="mdi-chevron-double-right"
          @click="speedup"
           :tooltip="$t('i18n_slider_speed')"
          class="pl-1"
        />
			
			
		</v-col>
	</v-row>
		  
	
	<v-row justify="center">
		<v-col cols="auto">
	<div class="newB-checkbox">
        <input type="checkbox" id="checkbox" v-model="newB" @change="setStyle">
        <label for="checkbox"> {{ $t('i18n_slider_newB') }}</label>	
		  </v-col>
	</v-row>
	
		  
        </template>
   </div>

</template>
   



<script type="text/babel">
   import { inject } from 'vue';
  import { VcsSlider,VcsButton} from '@vcmap/ui';
  import vcsLayerName from '@vcmap/core';
  import { VSlider, VCol,VRow,VBtn,VIcon } from 'vuetify/lib';
  import { name } from '../package.json';
  import TimeLayerLoader from './timeLayerLoader';
  export const windowId = 'timeslider_window_id';

  export default {
    i18n: {
      messages: {
        de: {
          i18n_slider_title: 'Wähle ein Jahr aus um die zu dem Zeitpunkt existierenden Gebäude zu sehen:',  
		  i18n_slider_play: 'Starte automatisches Abspielen',
		  i18n_slider_pause: 'Stop automatisches Abspielen',		  
		  i18n_slider_newB: 'Neue Gebäude hervorheben',			  
		  i18n_slider_slow: 'Verlangsamt die Abspielgeschwindigkeit',		 
		  i18n_slider_speed: 'Erhöht die Abspielgeschwindigkeit',		  
        
        },
        en: {
          i18n_slider_title: 'Choose a year to see current buildings:',  
		  i18n_slider_play: 'Start automatic play',
		  i18n_slider_pause: 'Stop automatic play',		  
		  i18n_slider_newB: 'Highlight new buildings',		  
		  i18n_slider_slow: 'Slow the year change',		
		  i18n_slider_slow: 'Speed the year change up',			  
          
        },
      },
    },
    components: {
	  VSlider,	
      VcsSlider,
	  VBtn,
	  VIcon,
	  VCol,
	  VRow,
	  VcsButton,
	  
	  
    },
    setup() {
      const app = inject('vcsApp');
      

      return {
        closeSelf() {
          app.windowManager.remove(windowId);
        },
        
        
      };
    },
	
	created() {
      const timeLayerLoader = TimeLayerLoader.getInstance();
      this.layerNames = timeLayerLoader.layerNames;
      this.selectedYear = -3000;
	  this.min=-3000;
	  this.max=3000;
	  this.step=1;
	  this.speed=1000;
	  this.setStyle();
	  this.isMoving=false;
      
      
    },
    data() {
      return {
        uiConfig: {
          contentPosition: 'left',
          contentPositionFixed: true,
        },
        layerNames: [],
             
       
        isMoving: false,
        selectedLayer: '',        
        selectedYear: -3000,
		min:-3000,
		max:3000,
		step:1,
		speed: 1000,
		plan: false,
		newB: false,
        
        loading: false,
        downloadBtn: false,
      };
    },
	methods: {
		setStyle() {
			const timeLayerLoader = TimeLayerLoader.getInstance();
		
			timeLayerLoader.setStyle({selectedYear: this.selectedYear, plan: this.plan, newB: this.newB});
		
       
      },
	  
	  toggleSliderMovement() {
		  
      if (this.isMoving) {
        
        clearInterval(this.sliderInterval);
        this.isMoving = false;
      } else {
        
        this.sliderInterval = setInterval(() => {
			
          if (this.selectedYear < this.max) {
            this.selectedYear += this.step; 
			this.setStyle();
          } else {
            clearInterval(this.sliderInterval); 
            this.isMoving = false; 
          }
        }, this.speed);
        this.isMoving = true;
      }
	  },
	  
	  slowdown() {
			this.toggleSliderMovement()
			this.speed +=125;		
			this.toggleSliderMovement()
      },
	  speedup() {
			this.toggleSliderMovement()
			this.speed +=-125;		
			this.toggleSliderMovement()
      },
	  
	  
	  
	
	  },
	
  };

</script>
