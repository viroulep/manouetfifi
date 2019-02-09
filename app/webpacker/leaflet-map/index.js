import 'leaflet/dist/leaflet.css';

import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  Circle,
  Popup,
  Icon,
} from 'leaflet';

// Leaflet and webpacker are not good friend, we need to require the images for
// the assets to be properly setup.
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const tileProvider = {
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
}

window.manouetfifi = window.manouetfifi || {};

window.manouetfifi.createLeafletMap = (elementId, center = [0, 0]) => {
  let map = new LeafletMap(elementId, {
    zoom: 2,
    center: center,
    scrollWheelZoom: false,
  });
  let layer = new TileLayer(tileProvider.url, {
    maxZoom: 19,
    attribution: tileProvider.attribution,
  });
  layer.addTo(map);
  return map;
}

const icons = {
  "default": new Icon.Default(),
  "mairie": new Icon({
    iconUrl: require('leaflet-map/cursors/mairie.png'),
    iconSize: [80, 40],
    iconAnchor: [40, 40],
    popupAnchor: [0, -30],
  }),
  "maison": new Icon({
    iconUrl: require('leaflet-map/cursors/maison.png'),
    iconSize: [60, 40],
    iconAnchor: [30, 20],
    popupAnchor: [0, -10],
  }),
  "salle": new Icon({
    iconUrl: require('leaflet-map/cursors/salle.png'),
    iconSize: [60, 40],
    iconAnchor: [30, 20],
    popupAnchor: [0, -10],
  }),
}

window.manouetfifi.placeMarker = (map, position, name, description, iconName="default", anchor=null) => {
  let popupName = anchor ? `<a class="font-weight-bold" href="#${anchor}">${name}</a>` : `<b>${name}</b>`
  let desc = `${popupName}<br/>${description}`;
  let marker = new Marker(position, {
    title: name,
    icon: icons[iconName],
  }).addTo(map).bindPopup(desc);
}
