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
        <Grid base_url_ajax="template_preset/" />

        <notifications group="common" />
    </div>
</template>

<script>
    //console.log(process.env.VUE_APP_FOO)
    import Grid from './components/Grid.vue';

    export default {
        name: 'app',
        components: {
            Grid
        }
    }
</script>