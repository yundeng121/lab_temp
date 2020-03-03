<template>
    <div>
        <Carousel autoplay v-model="value" dots="outside"  loop>
            <CarouselItem>
                <div class="demo-carousel">
                    <img src="@/assets/c1.png">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <img src="@/assets/c2.png">
                </div>
            </CarouselItem>
        </Carousel>
    </div>
</template>
<script>
    import { Carousel,CarouselItem } from 'view-design'
    export default {
        name:"home",
        data(){
            return{
                value:0
            }
        },
        components: {
            Carousel,
            CarouselItem
        },
    }
</script>
<style>
</style>