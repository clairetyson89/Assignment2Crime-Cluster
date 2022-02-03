var map = L.map('map').setView([37.76423006921716, -122.42960396594103], 14);

var Stamen_Terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map);


$.getJSON("https://raw.githubusercontent.com/gbrunner/adv-programming-for-gis-and-rs/master/Web%20Development%20Module/Unit%201%20-%20GitHub%20and%20Leaflet/sf_crime.geojson",function(data){
    var bodyIcon = L.icon({
      iconUrl: 'https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/012/474/original/victim_5514707.png',
      iconSize: [60,60]
    });
    var crime = L.geoJson(data,{
      pointToLayer: function(feature,latlng){
        var marker = L.marker(latlng,{icon: bodyIcon});
        marker.bindPopup(feature.properties.Location + '<br/>' + feature.properties.OPEN_DT + '<br/>' + feature.properties.SUBJECT);
        return marker;
      }
    });
    var clusters = L.markerClusterGroup();
    clusters.addLayer(crime);
    map.addLayer(clusters);
});
