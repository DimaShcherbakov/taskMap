    var listOfCities = [
        "“Nashville, TN”, 36.17, -86.78",
        "“New York, NY”, 40.71, -74.00",
        "“Atlanta, GA”, 33.75, -84.39",
        "“Denver, CO”, 39.74, -104.98",
        "“Seattle, WA”, 47.61, -122.33",
        "“Los Angeles, CA”, 34.05, -118.24",
        "“Memphis, TN”, 35.15, -90.05"];
    class Globe{
        constructor(listOfCities){
            for(let g = 0; g < listOfCities.length;g++){
                listOfCities[g] = listOfCities[g].replace(/\s/g, '').replace( "“", '').replace( "”", '');
            }
            this.listOfCities = listOfCities;
        }
        theMostDistanceCity(request){
            const dataArray = [];
            let lattitudes = [];
            let longitudes = [];
            let cityName = "";
            this.listOfCities.forEach(item => {
                dataArray.push(item.split(/,/));
                lattitudes.push(parseFloat(item.split(/,/)[2]));
                longitudes.push(parseFloat(item.split(/,/)[3]));
            })
            let outermostCity = (array, index, position) => {
                array = array.sort((a, b) => a - b);
                dataArray.forEach(item => item.findIndex(currentValue => currentValue == array[index].toFixed(2).toString())===position?cityName = item[0]:false); 
            } 
            switch(request){
                case "northernmost":
                    outermostCity(lattitudes, lattitudes.length - 1, 2);
                    return cityName;
                case "easternmost": 
                    outermostCity(longitudes, longitudes.length - 1, 3);
                    return cityName;
                case "southernmost":
                    outermostCity(lattitudes, 0, 2);
                    return cityName;
                case "westernmost":
                    outermostCity(longitudes, 0, 3);
                    return cityName;
            }
        }
        nearestTown(lat,long){
            const dataArray = [];
            let coord = [];
            let firstSide;
            let secondSide;
            let length = 0;
            let distance = [];
            let coordCity = [];
            let indexOfCity;
            this.listOfCities.forEach(item => {
                dataArray.push(item.split(/,/));
                coordCity.push(parseFloat(item.split(/,/)[2]));
                coordCity.push(parseFloat(item.split(/,/)[3]));
                coord.push(coordCity);
                coordCity = [];
            });
            coord.forEach(item => {
                firstSide = item[0] - lat;
                secondSide = item[1] - long;
                length = Math.sqrt(Math.pow(firstSide,2) + Math.pow(secondSide,2));
                distance.push(length);
            });
            indexOfCity = distance.indexOf(Math.min.apply(Math, distance ));
            return dataArray[indexOfCity][0]; 
        }
        abbreviations(){
            let array =[];
            let uniqueArray = [];
            this.listOfCities.forEach(item => array.push(item.split(/,/)[1]));
            uniqueArray = array.filter((item, pos, self) => self.indexOf(item) == pos); 
            return uniqueArray.join("");
        }
    }
    let map = new Globe(listOfCities);
    map.theMostDistanceCity("northernmost");
    map.theMostDistanceCity("easternmost");
    map.theMostDistanceCity("southernmost");
    map.theMostDistanceCity("westernmost");
    map.nearestTown(41,-130);
    map.abbreviations();
