<script setup>
const props = defineProps(['date'])
</script>

<template>
    <time :datetime="new Date(date).toISOString()">
        {{
            new Date(date).toLocaleDateString('es-ve', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            })
        }}
    </time>
</template>

<style scoped>
</style>