<script setup>
//Components
import { Footer, Navbar } from '../components';

</script>

<template>
    <Navbar />
    <main>
        <router-view />
    </main>
    <Footer/>
</template>