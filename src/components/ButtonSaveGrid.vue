<template>
  <div>
    <button @click="clickToJson" type="button">{{ msg }}</button>
  </div>
</template>

<script>
export default {
  name: 'ButtonSaveGrid',
  props: {
    msg: String,
    layout: Array
  },
    methods: {
        clickToJson: function() {
            function keepIXYWHentry(obj) {
                var temp = {};
                temp.i = obj.i;
                temp.w = obj.w;
                temp.x = obj.x;
                temp.y = obj.y;
                temp.h = obj.h;

                return temp;
            }

            var out = this.layout.map(keepIXYWHentry);

            console.log(JSON.stringify(out))
        }
    }
}
</script>

<style scoped>
button {
  margin: 40px;
}
</style>
