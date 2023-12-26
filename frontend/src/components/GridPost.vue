<script setup>
import { onMounted, defineProps, ref } from 'vue';
import FormattedDate from '../components/FormattedDate.vue';
import Pagination from '../components/Pagination.vue';
import fetchApi from '../lib/strapi';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const props = defineProps(['items'])

const posts = ref([]); //lista de registros
const perPage = ref(4); //registros por pagina
const currentPage = ref(1); //nro de pagina actual
const totalRecords = ref(1); //total de registros
const totalPages = ref(1); //total de paginas

async function getPosts() {
    const resp = await fetchApi({
        endpoint: 'posts', wrappedByKey: 'data,meta',
        query: { 
            'populate': '*',
            'pagination[pageSize]': perPage.value,
            'pagination[page]': currentPage.value
        }
    });
    const { PUBLIC_STRAPI_ASSETS_URL, PUBLIC_DEFAULT_IMAGE } = import.meta.env;
    const { data, meta: { pagination: {
        page, total, pageCount
    } } } = resp;
    currentPage.value = page
    totalRecords.value = total
    totalPages.value = pageCount
    posts.value = data.map(post => {
        const {
            id, attributes: { title, slug, image, content, updatedAt }
        } = post
        const document = {
            nodeType: 'document',
            content: content.map(el => {
                return {
                    nodeType: el.type,
                    content: el.children.map(e => {
                        return {
                            nodeType: e.type,
                            value: e.text,
                            marks: []
                        }
                    })
                }
            })
        }
        const imageUrl = image?.data ? 
            `${PUBLIC_STRAPI_ASSETS_URL}${image.data.attributes.url}` : PUBLIC_DEFAULT_IMAGE;
        return {
            id, title, slug, imageUrl, content: documentToHtmlString(document).slice(0, 80) + '...', updatedAt
        }
    })
}

async function onPageChange(e) {
    if (e >= 1 && e <= totalPages.value) {
        currentPage.value = e
        getPosts()
    }
}

onMounted(() => {
    getPosts();
})

</script>

<template>
    <div>
        <div class="grid mb-8 rounded-sm md:mb-12 md:grid-cols-2 dark:bg-gray">
            <a v-for="post in posts" :key="post.id" :href="`/blog/${post.slug}`">
                <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" :src="post.imageUrl" alt="">
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{post.title}}</h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400" v-html="post.content"></p>
                    <small class="date">
                        <FormattedDate :date="post.updatedAt" />
                    </small>
                </div>
            </a>
        </div>
        <Pagination 
            :page="currentPage"
            :total="totalRecords"
            :perPage="perPage"
            :totalPages="totalPages"
            @next-page="onPageChange"
            @prev-page="onPageChange"
        />
    </div>
</template>

<style scoped>
</style>