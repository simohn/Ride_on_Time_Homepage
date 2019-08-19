<template>
    <div class="rankingPage">
        <div class="image-wrapper">
            <b-img class="header-image" :src="require('../assets/koenigsberg.jpg')"></b-img>
        </div>
        <b-table striped hover :items="items" :fields="fields" />
    </div>
</template>

<script>
export default {
    data() {
      return {
            fields: ['first_name', 'last_name', 'age'],
            items: [
            { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
            { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
            { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
            { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    }
  }
</script>

<style scoped>
.rankingPage {
    min-height: calc(100vh - 104px);
    margin-top: 80px;
}

.image-wrapper {
    height: 300px;
    width: 80vw;
    position: relative;
    overflow: hidden;
    margin-top: 30px;
    margin-left: 10vw;
    margin-bottom: 30px;
}

.header-image {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 100vw;
}
</style>
