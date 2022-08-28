<script setup lang="ts">
import L from 'leaflet'
import { onMounted } from 'vue'
import '../../node_modules/leaflet/dist/leaflet.css'
import axios from 'axios'
const groundMap = 'https://imgs.ali213.net/picfile/eldenring/{z}/{x}/{y}.jpg'

let initZoom = 3
let initLat = 40
let initLng = -40
let groundLayer: L.Layer

const handleClickMap = (e: L.LeafletMouseEvent) => {
	console.log(e.containerPoint)
	axios.post('/api/demo', {
		x: e.containerPoint.x,
		y: e.containerPoint.y,
	})
}

onMounted(() => {
	let map = L.map('map', {
		attributionControl: false,
		zoomControl: false,
		maxBounds: L.latLngBounds(L.latLng(-100, -200), L.latLng(100, 100)),
	}).setView([initLat, initLng], initZoom)

	groundLayer = L.tileLayer(groundMap, {
		maxZoom: 7,
		minZoom: 2,
		tileSize: 200,
		zoomOffset: 0,
	}).addTo(map)

	map.on('click', handleClickMap)
})
</script>

<template>
	<div id="map"></div>
</template>

<style scoped>
#map {
	width: 800px;
	height: 800px;
	background-color: aqua;
}
</style>
