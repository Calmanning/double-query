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

        const featureLayer = new FeatureLayer ({
            url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Major_Cities/FeatureServer",
            outfields: ["*"],
            definitionExpression: ""
        });

        const view = new MapView ({
            container: "viewDiv",
            map: map,
            center:[-88.80543, 40.03000],
            zoom: 7
        });
        view.map.add(featureLayer)

        const sqlStateExp = ["Select a state", "All states", "AK", "CA", "CO", "CT", "OH", "PA", "NY", "WA"]
        
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

        function setDefinitionExpression(newSqlExp){
            featureLayer.definitionExpression = newSqlExp
        }

        sqlStateSelect.addEventListener("change", (event) => {
            if(populationSelect.value === "Choose a population threshold"){
                if(sqlStateSelect.value === "All states"){
                 setDefinitionExpression("")   
                    }else{
                    setDefinitionExpression(`ST = '${event.target.value}'`)
                    }
                } else {
                if(sqlStateSelect.value === "All states"){
                    setDefinitionExpression(`${populationSelect.value}`)
                }else{
                    setDefinitionExpression(`ST = '${event.target.value}' AND ${populationSelect.value}`)
                    }
                }
        })

        sqlPopulationExp = ["Choose a population threshold", "POPULATION > 10000", "POPULATION > 100000", "POPULATION > 500000", "POPULATION > 1000000"]
        
        const populationSelect = document.createElement("select")
            populationSelect.setAttribute("class", "esri-widget");
            populationSelect.setAttribute("style", "width: 200px; font-family: 'Avenir-Next'; font-size: 1em");

        sqlPopulationExp.forEach(((populationThreshold) => {
            let popThresholdEntry = document.createElement("option");
            popThresholdEntry.innerHTML = populationThreshold;
            popThresholdEntry.value = populationThreshold;
            populationSelect.appendChild(popThresholdEntry)            
        }))
        view.ui.add(populationSelect, "top-right")

        populationSelect.addEventListener("change", (e) => {
            if(sqlStateSelect.value.length === 2){
                setDefinitionExpression(`ST = '${sqlStateSelect.value}' AND ${e.target.value}`)
            } else {
                setDefinitionExpression(e.target.value)            }
        })

})