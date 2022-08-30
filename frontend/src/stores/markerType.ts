import { defineStore } from 'pinia'

export const useMarkerType = defineStore({
	id: 'markerType',
	state: () => ({
		markerTypeArray: [],
	}),
})
