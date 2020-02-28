<template>
    <div>
        <Carousel autoplay v-model="value2" dots="outside"  loop>
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
    import { Carousel } from 'view-design'
    export default {
        name:"home",
        components: {
            Carousel
        },
    }
</script>
<style>
</style>