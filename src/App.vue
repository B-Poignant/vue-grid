<style scoped>
    #content {
        width: 100%;
        margin-top: 10px;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

</style>

<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">

        <Grid base_url_ajax="" model="eco_product" />

        {{ $t('message') }}
        {{ $t('test') }}

        <notifications group="foo" />
    </div>
</template>

<script>
    import Grid from './components/Grid.vue';

    export default {
        name: 'app',
        components: {
            Grid
        }
    }
</script>