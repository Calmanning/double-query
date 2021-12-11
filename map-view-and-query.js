console.log("establishing map view.")

require([
         "esri/config",
         "esri/Map",
         "esri/views/MapView",
         "esri/layers/FeatureLayer",
         "esri/WebMap"
], (esriConfig, Map, MapView, FeatureLayer, WebMap) => {

    esriConfig.apiKey = "AAPK115d19ab66264ef1b7cdbdd54b6804f4whm-2t82h02UCQQ1zigAlbT-GPsbqzkH4Cd1xDjXtPoshgyibnsGBM4zg-eklxut" 

        const map = new Map ({
            basemap: "arcgis-topographic"
        });

        const webMap = new WebMap ({
            portalItem: {
                id: "e0c5522ec20b49948d129bce35556188"
            }
        });

        const view = new MapView ({
            container: "viewDiv",
            map: webMap,
            center:[-88.80543, 40.03000],
            zoom: 7
        });

        const sqlStateExp = ["Select a state", "AK", "CA", "CO", "CT", "OH", "PA", "NY", "WA"]
        
        const sqlStateSelect = document.createElement("select", "");
            sqlStateSelect.setAttribute("class", "esri-widget")
            sqlStateSelect.setAttribute("style", "width: 200px; font-family: 'Avenir-Next'; font-size: 1em");

            sqlStateExp.forEach(((state) => {
                let stateSelectEntry = document.createElement("option");
                stateSelectEntry.innerHTML = state;
                stateSelectEntry.value = state;
                sqlStateSelect.appendChild(stateSelectEntry);
            }));
            view.ui.add(sqlStateSelect, "top-right")

})