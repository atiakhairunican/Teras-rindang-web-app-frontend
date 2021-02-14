<template>
    <div class="slider">
        <div class="slideImage" :style="setBackgroundImage"></div>
        <div class="slideImage" :style="setBackgroundImage2"></div>
        <div class="slideImage" :style="setBackgroundImage3"></div>
        <div class="slideImage" :style="setBackgroundImage4"></div>
    </div>
</template>

<script>
    export default {
        name: "slide",
        props: ["image", "image2", "image3", "image4"],
        computed: {
            setBackgroundImage() {
                return {
                    backgroundImage: "url("+this.image.url+")"
                }
            },
            setBackgroundImage2() {
                return {
                    backgroundImage: "url("+this.image2.url+")"
                }
            },
            setBackgroundImage3() {
                return {
                    backgroundImage: "url("+this.image3.url+")"
                }
            },
            setBackgroundImage4() {
                return {
                    backgroundImage: "url("+this.image4.url+")"
                }
            }
        }
    }
</script>

<style scoped>
    .slideImage {
        width: 80px;
        height: 10vh;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .slideImage {
        display: inline-block;
        margin-right: 8px;
    }
</style>