<template>
    <div>
        <div class="bg-image"></div>
        <h1>404 Error</h1>
        <div class="content">
            <div class="error">
                <p>4</p>
                <img src="../assets/o.png" alt="">
                <p>4</p>
            </div>
            <div class="desc">
                <p>Whoops, nothing delicious to find here.</p>
                <p>The requested URL was not found on this server.</p>
                <p>That's all we know.</p>
            </div>
            <router-link to="/">
                <button>Go Home</button>
            </router-link>
        </div>
        
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .bg-image {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: -1;
        background-image: url('../assets/7.jpeg');
        background-position: center;
        background-size: cover;
    }
    h1 {
        text-indent: -1000px;
    }
    .content {
        width: 100%;
        text-align: center;
        background-color: rgba(0, 0, 0, .7);
        z-index: 1;
    }
    .error {
        width: 100%;
        position: static;
        justify-content: center;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        margin: 120px 0 30px 0;
    }
    .error p {
        font-size: 120px;
        margin-top: 130px;
        font-weight: bold;
        color: orangered;
    }
    .desc {
        width: 270px;
        margin: auto;
        color: #aaa;
        font-size: 12px;
        line-height: 16px;
    }
    img {
        width: 100px;
        margin-top: 90px;
        margin-right: 8px;
    }
    button {
        width: 270px;
        background-color: orangered;
        color: white;
        border: none;
        padding: 8px;
        margin: 20px 0 50px 0;
        cursor: pointer;
    }
</style>