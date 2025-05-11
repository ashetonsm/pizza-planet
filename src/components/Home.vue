<script lang="ts">
import carouselBG1 from '../assets/images/carouselBG1.jpg'
import carouselBG2 from '../assets/images/carouselBG2.jpg'
import carouselBG3 from '../assets/images/carouselBG3.jpg'
export default {
    name: "Home",
    methods: {
        goToMenu() {
            this.$router.push({ name: 'menu' });
        }
    },
    data() {
        return {
            items: [
                { header: 'Feeling hungry?', bodyText: 'Our new galaxy pizza is out of this world!', src: carouselBG1 },
                { header: 'More than meets the pie!', bodyText: 'Check out our revamped sides!', src: carouselBG2 },
                { header: 'Celebrating our 30th year!', bodyText: 'Three decades of deep dish awaits!', src: carouselBG3 }
            ]
        }
    },
}
</script>
<template>
    <v-carousel hide-delimiters>
        <v-carousel-item v-for="(item, i) in items" :key="i" :value="i" :src=item.src cover>
            <v-card class="d-flex mx-auto mt-16" max-width="fit-content">
                <v-card-item class="align-items-center justify-center">
                    <div class="text-center">
                        <div class="text-h6 mb-1 text-center">
                            {{ item.header }}
                        </div>
                        <div class="text-caption text-center">{{ item.bodyText }}</div>
                    </div>
                </v-card-item>

                <v-card-actions class="align-items-center justify-center">
                    <v-btn @click="goToMenu">
                        Let's Order!
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-carousel-item>
    </v-carousel>
</template>