# Timeslider
> Part of the [VC Map Project](https://github.com/virtualcitySYSTEMS/map-ui)

A simplistic timeslider plugin to be used in VC Map Version 5.

![image](https://github.com/user-attachments/assets/364528e8-c591-494e-af2a-0ee074d7c39d)


There is no config-editor implemented so far, so attribute and layer names have to be manually adjusted in the code:

    1. In ../src/Timeslider.vue
        - in template:
              - adjust min (starting year) and max (end year) values in v-slider
        - in script:
              - adjust min and max values (start and end year again) as well as selectedYear (starting/current value)      

    2. In ../src/TimeLayerLoader.js
        - in setStyle()
              - attributes.ABRJ and attributes.BAUJ to your corresponding attributes 
                  ABRJ=demolition daten
                  BAUJ=building date
              - layername of AGB to your layername (which contains all buildings)


If you have any questions regarding the plugin, feel free to contact me at MHaverkamp@GEOCONSULT-GmbH.de     
