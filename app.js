const flags = new Map();
flags["AfricanUnion"] = "flags/AfricanUnion.png";

// Set up map
var map = L.map('map', {
    center: [20, 120],
    zoom: 5,
    doubleClickZoom: false,
    zoomDelta: 0.5,
    zoomControl: false,
    maxBounds: [[-60, -30], [75, 330]],
    maxZoom: 9,
    minZoom: 3.5,
});
L.tileLayer('https://api.maptiler.com/maps/streets-v2-dark/{z}/{x}/{y}.png?key=pdMuFnctsVyQQHO4O2Nx', {
    maxZoom: 19,
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);

// Set up controls
var country_data = L.control();

country_data.onAdd = function () {
    this._div = L.DomUtil.create('div', 'country_data');
    this.update();
    return this._div;
};

country_data.update = function (props) {
    this._div.innerHTML = '<h4>Country Name</h4>' + (props ?
        '<b>' + props.NAME_EN + '</b><br />' : 'Select a country'
    ) + '<h4>Country Leader</h4>' + (props ?
        '<b>' + props.LEADER + '</b><br />' : 'Select a country')
};

country_data.addTo(map);

var flag_selector = L.control();

flag_selector.onAdd = function() {
    this._div = L.DomUtil.create('div', 'flag_selector');
    this.update();
    return this._div;
}

flag_selector.update = function() {
    this._div.innerHTML = '<div class="dropdown">' +
    '<button class="dropbtn">Flag Selector</button>' +
    '<div class="dropdown-content">' +
    '<a href="#" onclick="setFlag("AfricanUnion")">African Union</a>' +
    '</div></div>';
}

flag_selector.addTo(map);

// Handlers
function style(team) {
    // taiwan and allies
    if (team === 1) {
        return {
            fillColor: '#0096FF',
            color: '#0096FF',
            fillOpacity: 0.25,
            weight: 2,
        }
    }
    // china and allies
    if (team === 2) {
        return {
            fillColor: '#EE4B2B',
            color: '#D2042D',
            fillOpacity: 0.25,
            weight: 2,
        }
    }
    // neutral
    if (team === 0) {
        return {
            fillColor: '#BF40BF',
            color: '#800080',
            fillOpacity: 0.25,
            weight: 2,
        }
    }
}

function setFlag(country) {
    
}

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 4,
        fillOpacity: 0.5,
    });
    layer.bringToFront();
    country_data.update(layer.feature.properties);
}

function resetHighlight(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 2,
        fillOpacity: 0.25,
    });
    layer.bringToFront();
    country_data.update();
}

function changeTeam(e) {
    const oldTeam = e.target.feature.properties.TEAM;
    const newTeam = (oldTeam + 1) % 3;
    console.log(newTeam)
    e.target.feature.properties.TEAM = newTeam;
    e.target.setStyle(style(newTeam));
}

function onEachFeature(feature, layer) {
    layer.on({
        contextmenu: changeTeam,
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}

let markersLayer = L.featureGroup().addTo(map);

markersLayer.on('dblclick', function (e) {
    markersLayer.removeLayer(e.sourceTarget)
});

map.on('dblclick', function (e) {
    markersLayer.addLayer(L.marker(e.latlng, { draggable: true }))
});

// Add countries to the map https://cartographyvectors.com/
fetch('./countries/argentina-detailed-boundary_850.geojson').then(res => res.json()).then(
     argentina => L.geoJson(argentina, { style: style(0), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/australia-detailed-boundary_853.geojson').then(res => res.json()).then(
    australia => L.geoJson(australia, { style: style(1), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/brazil-detailed-boundary_869.geojson').then(res => res.json()).then(
    brazil => L.geoJson(brazil, { style: style(0), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/canada-detailed-boundary_877.geojson').then(res => res.json()).then(
    canada => L.geoJson(canada, { style: style(1), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/china-detailed-boundary_883.geojson').then(res => res.json()).then(
    china => L.geoJson(china, { style: style(2), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/france-detailed-boundary_911.geojson').then(res => res.json()).then(
    france => L.geoJson(france, { style: style(1), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/germany-detailed-boundary_917.geojson').then(res => res.json()).then(
    germany => L.geoJson(germany, { style: style(1), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/india-detailed-boundary_936.geojson').then(res => res.json()).then(
    india => L.geoJson(india, { style: style(0), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/indonesia-detailed-boundary_937.geojson').then(res => res.json()).then(
    indonesia => L.geoJson(indonesia, { style: style(0), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/italy-detailed-boundary_943.geojson').then(res => res.json()).then(
    italy => L.geoJson(italy, { style: style(1), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/japan-detailed-boundary_945.geojson').then(res => res.json()).then(
    japan => L.geoJson(japan, { style: style(1), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/mexico-detailed-boundary_974.geojson').then(res => res.json()).then(
    mexico => L.geoJson(mexico, { style: style(0), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/russia-detailed-boundary_1012.geojson').then(res => res.json()).then(
    russia => L.geoJson(russia, { style: style(2), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/saudi-arabia-outline_634.geojson').then(res => res.json()).then(
    saudi_arabia => L.geoJson(saudi_arabia, { style: style(0), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/south-africa-detailed-boundary_1035.geojson').then(res => res.json()).then(
    south_africa => L.geoJson(south_africa, { style: style(0), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/south-korea-detailed-boundary_952.geojson').then(res => res.json()).then(
    south_korea => L.geoJson(south_korea, { style: style(1), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/turkey-detailed-boundary_1054.geojson').then(res => res.json()).then(
    turkey => L.geoJson(turkey, { style: style(0), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/united-kingdom-detailed-boundary_1061.geojson').then(res => res.json()).then(
    united_kingdom => L.geoJson(united_kingdom, { style: style(1), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/united-states-detailed-boundary_1062 (1).geojson').then(res => res.json()).then(
    united_states => L.geoJson(united_states, { style: style(1), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/africa-outline-with-countries_6 (1).geojson').then(res => res.json()).then(
    african_union => L.geoJson(african_union, { style: style(0), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/europe_.geojson').then(res => res.json()).then(
    european_union => L.geoJson(european_union, { style: style(0), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/brunei-darussalam-detailed-boundary_871.geojson').then(res => res.json()).then(
    brunei => L.geoJson(brunei, { style: style(0), onEachFeature: onEachFeature }).addTo(map)
);
// fetch('./countries/cambodia-detailed-boundary_875.geojson').then(res => res.json()).then(
//     cambodia => L.geoJson(cambodia, { style: style(0), onEachFeature: onEachFeature }).addTo(map)
// );
// fetch('./countries/lao-detailed-boundary_955.geojson').then(res => res.json()).then(
//     laos => L.geoJson(laos, { style: style(0), onEachFeature: onEachFeature }).addTo(map)
// );
fetch('./countries/malaysia-detailed-boundary_967.geojson').then(res => res.json()).then(
    malaysia => L.geoJson(malaysia, { style: style(0), onEachFeature: onEachFeature }).addTo(map)
);
// fetch('./countries/myanmar-detailed-boundary_983.geojson').then(res => res.json()).then(
//     myanmar => L.geoJson(myanmar, { style: style(0), onEachFeature: onEachFeature }).addTo(map)
// );
fetch('./countries/philippines-detailed-boundary_1004.geojson').then(res => res.json()).then(
    philippines => L.geoJson(philippines, { style: style(1), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/singapore-detailed-boundary_1029.geojson').then(res => res.json()).then(
    singapore => L.geoJson(singapore, { style: style(0), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/thailand-detailed-boundary_1048.geojson').then(res => res.json()).then(
    thailand => L.geoJson(thailand, { style: style(0), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/vietnam-detailed-boundary_1068.geojson').then(res => res.json()).then(
    vietnam => L.geoJson(vietnam, { style: style(0), onEachFeature: onEachFeature }).addTo(map)
);
// fetch('./countries/iran-detailed-boundary_938.geojson').then(res => res.json()).then(
//     iran => L.geoJson(iran, { style: style(0), onEachFeature: onEachFeature }).addTo(map)
// );
fetch('./countries/north-korea-detailed-boundary_951.geojson').then(res => res.json()).then(
    north_korea => L.geoJson(north_korea, { style: style(2), onEachFeature: onEachFeature }).addTo(map)
);
fetch('./countries/taiwan-detailed-boundary_1045.geojson').then(res => res.json()).then(
    taiwan => L.geoJson(taiwan, { style: style(1), onEachFeature: onEachFeature }).addTo(map)
);