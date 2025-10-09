<script setup>
//Components
import { Footer, Navbar } from '../components';

</script>

<template>
    <Navbar />
    <main>
        <router-view v-slot="{ Component }">
            <KeepAlive :include="['Home' , 'Products']" :exclude="[]">
                <component :is="Component" />
                
            </KeepAlive>
        </router-view>
    </main>
    <Footer />
</template>