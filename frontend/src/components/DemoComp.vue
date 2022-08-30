<script setup lang="ts">
import { useMarkerType } from '@/stores/markerType'

const MarkerType = useMarkerType()
</script>

<template>
	<div>{{ MarkerType.markerTypeArray }}</div>
</template>

<style scoped></style>
