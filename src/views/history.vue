<template>
    <div>
        <header>
            <div class="container-head">
                <h3>History</h3>
            </div>
        </header>

        <main>
            <aside>
                <Menu/>
            </aside>

            <section class="container-main">
                <div class="main">
                    <div class="income">
                        <div class="todaysIncome">
                            <p>Today's Income</p>
                            <h1>Rp. 1.000.000</h1>
                            <p>+2% Yesterday</p>
                            <div class="img">
                                <img class="pic1" src="../assets/Ellipse p.png" alt="Icon">
                            </div>
                            <div class="img">
                                <img class="pic2" src="../assets/Ellipse p.png" alt="Icon">
                            </div>
                            <div class="img">
                                <img class="pic3" src="../assets/Ellipse p.png" alt="Icon">
                            </div>
                        </div>
                        <div class="orders">
                            <p>Orders</p>
                            <h1>3.270</h1>
                            <p>+5% Last Week</p>
                            <img class="pic1" src="../assets/Ellipse b.png" alt="Icon">
                            <img class="pic2" src="../assets/Ellipse b.png" alt="Icon">
                            <img class="pic3" src="../assets/Ellipse b.png" alt="Icon">
                        </div>
                        <div class="yearsIncome">
                            <p>This Year's Income</p>
                            <h1>Rp. 100.000.000.000</h1>
                            <p>+10% Last Year</p>
                            <img class="pic1" src="../assets/Ellipse v.png" alt="Icon">
                            <img class="pic2" src="../assets/Ellipse v.png" alt="Icon">
                            <img class="pic3" src="../assets/Ellipse v.png" alt="Icon">
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="revenue">
                        <h1>Revenue</h1>
                        <button class="month">Month</button>
                        <div class="clear"></div>
                        <p class="x">50k</p><hr><div class="clear"></div>
                        <p class="x">40k</p><hr><div class="clear"></div>
                        <p class="x">30k</p><hr><div class="clear"></div>
                        <p class="x">20k</p><hr><div class="clear"></div>
                        <p class="x">10k</p><hr><div class="clear"></div>
                        <p class="x">0</p><hr><div class="clear"></div>
                        <div class="diagram">
                            <img class="blue" src="../assets/Vector 1.png" alt="Icon">
                            <img class="pink" src="../assets/Vector 2.png" alt="Icon">
                        </div>
                        <div class="inform">
                            <span class="this"></span><p class="thisP">This Month</p>
                            <span class="last"></span><p>Last Month</p>
                            <div class="clear"></div>
                        </div>
                    </div>
                    <div class="revenue">
                        <h1>Recent Order</h1>
                        <button class="month">Today</button>
                        <div class="clear"></div>
                        <div class="recent">
                            <table border="1" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th width="10%">INVOICE</th>
                                        <th width="10%">CASHIER</th>
                                        <th width="15%">DATE</th>
                                        <th width="50%">ORDERS</th>
                                        <th width="15%">AMOUNT</th>
                                    </tr>
                                </thead>
                                <tbody v-for="order in getHistory" :key="order.id">
                                    <tr>
                                        <td>#{{maketextnumber(3)}}</td>
                                        <td>{{order.cashier}}</td>
                                        <td>{{order.date}}</td>
                                        <td style="text-align: left;">{{order.orders}}</td>
                                        <td>Rp. {{order.amount}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        
        
    </div>
</template>

<script>
import Menu from '../components/menu'
import {mapGetters, mapActions} from 'vuex'

    export default {
        name : "history",
        components : {
            Menu,
        },
        methods: {
            ...mapActions(["feching"]),
            maketextnumber(n) {
                let randomtextnumber = ""
                for (let r = ["A", "B", "C", "D", "E", "F", "G", "H", "I",  "J", "K", "L",
                            "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
                            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            e = n, t = new Array, a = 0; a <= e - 1; a++)
                            {
                                t[a] = r[parseInt(Math.random() * r.length)];
                                let nt = t;
                                randomtextnumber += nt.join("")
                            }
                return randomtextnumber
            }
        },
        computed : {
            ...mapGetters(["getHistory"]),
        },
        mounted() {
            this.feching()
        },
    }
</script>

<style scoped>
    table {
        width: 100%;
        text-align: center;
    }
    th {
        padding: 5px;
        color: black;
        background-color: #29dfff;
    }
    td {
        padding: 3px 10px;
    }
    .container-head {
        height: 60px;
        position: fixed;
        left: 0;
        line-height: 60px;
        z-index: 3;
        right: 0;
        padding: 0 20px 0 80px;
        background-color: #f8f8f8;
        box-shadow: .1vw .1vw .7vw 0 rgba(0, 0, 0, .1);
    }
    .container-head h3 {
        font-size: 24px;
        text-align: center;
        color: #aaa;
    }
    .container-main {
        width: 100%;
        height: 100%;
        left: 0;
        right: 0;
        padding: 60px 0 0 60px;
        position: relative;
    }
    .main {
        width: 100%;
        height: 100%;
        padding: 2vw;
        box-shadow: inset .1vw .1vw .7vw 0 rgba(0, 0, 0, .1);
    }
    .income {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
    }
    .todaysIncome, .orders, .yearsIncome {
        width: 30%;
        padding: 4vw 3vw;
        float: left;
        margin: 1vw;
        line-height: 2.2vw;
        border-radius: 1vw;
        position: relative;
        font-size: 1.1vw;
        font-weight: bold;
    }
    .todaysIncome {
        background-image: url('../assets/Rectangle p.png');
        box-shadow: .6vw .6vw 1vw 0 rgba(255, 0, 127, .15);
    }
    .orders {
        background-image: url('../assets/Rectangle b.png');
        box-shadow: .6vw .6vw 1vw 0 rgba(0, 255, 255, .2);
    }
    .yearsIncome {
        background-image: url('../assets/Rectangle v.png');
        box-shadow: .6vw .6vw 1vw 0 rgba(191, 0, 255, .15);
    }
    .container-main .income img {
        position: absolute;
    }
    .img {
        width: 100%;
    }
    .pic1, .pic2, .pic3 {
        width: 28%;
    }
    .pic1 {
        margin: -10vw 0 0 15.5vw;
    }
    .pic2 {
        margin: -9vw 0 0 13vw;
    }
    .pic3 {
        margin: -7.5vw 0 0 9.5vw;
    }
    .clear {
        clear: left;
    }
    .revenue {
        width: 94%;
        margin: 3vw 0 0 3%;
        box-shadow: .5vw .5vw .6vw .4vw rgba(0, 0, 0, .15);
        padding: 3vw;
    }
    .revenue h1 {
        float: left;
        margin-bottom: 3vw;
    }
    .revenue button {
        float: right;
        font-size: 1vw;
    }
    .revenue select {
        float: right;
        cursor: pointer;
        width: 10%;
        font-size: 1vw;
        margin-top: -8px;
    }
    .inform {
        width: 100%;
        font-size: .8vw;
        font-weight: bold;
        justify-content: center;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    .this, .last {
        display: inline-block;
        width: .8vw;
        height: .8vw;
        background-color: cyan;
        border-radius: 50%;
    }
    .inform span {
        margin: .4vw .4vw 0 0;
    }
    .inform .thisP {
        margin-right: 2vw;
    }
    .inform .last {
        background-color: lightpink;
    }
    /* #month {
        font-size: 1vw;
        width: fit-content;
    } */
    .diagram {
        width: 100%;
        position: relative;
    }
    .diagram img {
        width: 96%;
        position: absolute;
    }
    .x {
        color: #ccc;
        font-weight: bold;
        float: left;
        font-size: 1vw;
    }
    hr {
        border: 0;
        height: 2px;
        background-color: #eee;
        margin: .7vw 0 2.7vw 3vw;
        width: 96%;
    }
    .blue {
        margin: -20vw 0 0 3vw;
    }
    .pink {
        margin: -19.9vw 0 0 3vw;
    }
    .recent li {
        display: inline-block;
        width: 20%;
        font-weight: bold;
        text-align: center;
    }
    .recent hr {
        width: 100%;
        margin: .3vw 0 1vw 0;
    }
    .table li {
        color: #ccc;
        font-weight: 500;
        margin-top: -15vw;
    }

    @media (max-width: 900px) {
        .pic1 {
            margin: -9vw 0 0 14vw;
        }
        .pic2 {
            margin: -8vw 0 0 11.5vw;
        }
        .pic3 {
            margin: -6.5vw 0 0 8vw;
        }
    }
    @media (max-width: 500px) {
        .pic1 {
            margin: -9vw 0 0 13vw;
        }
        .pic2 {
            margin: -8vw 0 0 10.5vw;
        }
        .pic3 {
            margin: -6.5vw 0 0 7vw;
        }
    }
</style>