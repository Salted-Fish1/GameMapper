<script setup lang="ts">
import L from 'leaflet'
import { onMounted, ref } from 'vue'
import { useMarkerType } from '@/stores/markerType'
import '../../node_modules/leaflet/dist/leaflet.css'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

const groundMap = 'https://imgs.ali213.net/picfile/eldenring/{z}/{x}/{y}.jpg'

const initZoom = 3
const initLat = 40
const initLng = -40
// 全局唯一指定 map 对象
let map: L.Map
let groundLayer: L.Layer
const drawer = ref(false)
let newMarker: L.Marker<any>
let newMarkerX: number
let newMarkerY: number
const newMarkerName = ref('')
const newMarkerDesc = ref('')
const markerTypeRadio = ref()
const markerMap = new Map()
let editMode = false
const dialogVisible = ref(false)
let choosedMarker = ref()

const changeEditMode = () => {
	console.log('old mode ' + editMode)
	editMode = !editMode
}

const handleClosedDrawer = () => {
	// newMarker.removeFrom(map)
}
const handleClose = (done: any) => {
	console.log('handleclose')
	console.log('x: ' + newMarkerX)
	console.log('y: ' + newMarkerY)

	uploadMarker(
		newMarkerX,
		newMarkerY,
		newMarkerName.value,
		newMarkerDesc.value,
		markerTypeRadio.value,
	)
	done()
}
const uploadMarker = (
	x: number,
	y: number,
	name: string,
	desc: string,
	type: number,
) => {
	const tem = {
		name: name ?? '失败的上传',
		desc: desc ?? '失败的描述',
		type_id: type ?? 1,
		x: x ?? 0,
		y: y ?? 0,
	}
	console.log(tem)

	axios({
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'post',
		url: '/api/message',
		data: tem,
	})
}

const markerTypeStore = useMarkerType()
markerTypeStore.$patch((state) => {
	axios.get('/api/type').then((res) => {
		state.markerTypeArray = res.data
		// console.log(state.markerTypeArray)
	})
})

const democheck = () => {
	console.log(markerTypeRadio.value)
}

const openMarkerBox = (marker: L.Marker<any>) => {
	choosedMarker.value = markerMap[marker['_leaflet_id']]
	console.log(choosedMarker.value)
	dialogVisible.value = true
	// console.log(markerMap[marker['_leaflet_id']])

	// console.log(marker)
}

const delMarker = (id: number) => {
	console.log('del: ' + id)
	axios.delete('/api/message/' + id).then((res) => console.log(res))
}

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

	axios.get('/api/message').then((res) => {
		const items = res.data
		for (const item of items) {
			const tempMarker = L.marker([item.x, item.y])
			tempMarker.addTo(map)
			// tempMarker.
			tempMarker.on('click', (e) => {
				openMarkerBox(tempMarker)
			})
			const tempMarkerId: number = tempMarker['_leaflet_id']
			markerMap[tempMarkerId] = item
		}
		// console.log(markerMap)
	})

	map.on('click', (e) => {
		if (editMode === true) {
			newMarker = L.marker([e.latlng.lat, e.latlng.lng])
			newMarker.addTo(map)
			newMarkerX = e.latlng.lat
			newMarkerY = e.latlng.lng
			drawer.value = true
			markerSet.add(newMarker)
			// console.log(markerSet)
		}
	})
})
</script>

<template>
	<div id="map">
		<el-button @click="changeEditMode">测试用</el-button>
	</div>

	<el-dialog v-model="dialogVisible" :title="choosedMarker?.name">
		<div>{{ choosedMarker?.desc }}</div>
		<el-button @click="delMarker(choosedMarker?.id)">删除</el-button>
		<el-button>修改</el-button>
		<el-button>好评: {{ choosedMarker?.pos_num }}</el-button>
		<el-button>恶评: {{ choosedMarker?.neg_num }}</el-button>
	</el-dialog>

	<el-drawer
		v-model="drawer"
		@close="handleClosedDrawer"
		:before-close="handleClose"
	>
		<template #header>
			<h2>添加地标详细信息</h2>
		</template>
		<el-radio-group v-model="markerTypeRadio">
			<template
				v-for="item in markerTypeStore.markerTypeArray"
				:key="item.id"
			>
				<el-radio-button :label="item.id">
					{{ item.name }}
				</el-radio-button>
			</template>
		</el-radio-group>
		<el-input v-model="newMarkerName" placeholder="Please input Name" />
		<el-input
			v-model="newMarkerDesc"
			placeholder="Please input Desciption"
			type="textarea"
		/>
		<el-button>提交</el-button>
		<el-button @click="democheck">查看选中</el-button>
	</el-drawer>
</template>

<style scoped>
#map {
	width: 100vw;
	height: 100vh;
	background-color: rgb(0, 0, 0);
}
</style>
