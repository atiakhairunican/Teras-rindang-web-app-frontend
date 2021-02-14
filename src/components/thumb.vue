<template>
    <div class="container-fluit">
        <div class="main-card">
            <div class="card">
                <div class="pic">
                    <img :src="images" :alt="name">
                </div>
                <div class="content">
                    <p class="name">{{ name }}</p>
                </div>
                <p class="price">Rp. {{ price }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "thumb",
    props : {
        images : {
            type : String,
            required : true
        },
        name : {
            type : String,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
    },
    data() {
        return {
            count : 1
        }
    },
}
</script>

<style scoped>
    .main-card {
        width: 280px;
        margin-top: 12px;
    }
    .card {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    .pic {
        width: 20%;
        margin-right: 15px;
    }
    .pic img {
        width: 100%;
    }
    .content {
        width: 45%;
        font-weight: bolder;
        font-size: 12px;
    }
    .name {
        width: 120px;
        height: 16px;
        margin-bottom: 5px;
        line-height: 14px;
        overflow: hidden;
    }
    .price {
        font-weight: bolder;
        font-size: 12px;
        margin-top: 20px;
        margin-left: 10px;
    }
</style>