<script setup lang="ts">
import L from 'leaflet'
import { onMounted, ref } from 'vue'
import '../../node_modules/leaflet/dist/leaflet.css'
import axios from 'axios'

const groundMap = 'https://imgs.ali213.net/picfile/eldenring/{z}/{x}/{y}.jpg'

const initZoom = 3
const initLat = 40
const initLng = -40
// 全局唯一指定 map 对象
let map: L.Map
let groundLayer: L.Layer
const drawer = ref(false)
let newMarker: L.Marker<any>
const handleCloseDrawer = () => {
	newMarker.removeFrom(map)
}

const newMarkerName = ref('')
const newMarkerDesc = ref('')

onMounted(() => {
	map = L.map('map', {
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

	map.on('click', (e) => {
		newMarker = L.marker([e.latlng.lat, e.latlng.lng])
		newMarker.addTo(map)
		const { lat: locx, lng: locy } = e.latlng
		// console.log(locx, locy)
		drawer.value = true
		// axios.post('/api/demo', {
		// 	x: e.containerPoint.x,
		// 	y: e.containerPoint.y,
		// })
	})
})
</script>

<template>
	<div id="map"></div>
	<el-drawer v-model="drawer" @close="handleCloseDrawer">
		<template #header>
			<h2>添加地标详细信息</h2>
		</template>

		<el-input v-model="newMarkerName" placeholder="Please input Name" />
		<el-input
			v-model="newMarkerDesc"
			placeholder="Please input Desciption"
		/>
		<el-button>提交</el-button>
	</el-drawer>
</template>

<style scoped>
#map {
	width: 100vw;
	height: 100vh;
	background-color: rgb(0, 0, 0);
}
</style>
