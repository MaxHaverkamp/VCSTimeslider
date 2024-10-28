# Timeslider
> Part of the [VC Map Project](https://github.com/virtualcitySYSTEMS/map-ui)

Ein simples Zeitrafferplugin für VC Map Version 5.

![image](https://github.com/user-attachments/assets/9709cc08-d6aa-4eea-b4c9-2202fc7ba788)

Das Plugin ist (bisher) ohne Config-Editor, daher müssen die Attribut und Layernamen im Plugin selbst angepasst werden:

    1. In Timeslider.vue
      - im Slider selbst den min und max Wert auf den eigenen Wunschwert stellen
      - ebenfalls im Skript-Part das Start- und Endjahr angeben

    2. In TimeLayerLoader.js
      - Attributnamen des Baujahres und des Abrissjahres
      - Layername


      
