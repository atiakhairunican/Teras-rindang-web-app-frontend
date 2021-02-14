<template>
    <div class="container-fluit">
<!-- --------------------------------------------------Header-------------------------------------------------- -->
        <header>
            <div class="container-head">
                <h3>Food Items</h3>
                <div class="search">
                    <div class="menu">
                        <ul>
                            <li class="dropdown"><a href="#">{{sortby}}</a>
                                <ul class="list-dropdown">
                                    <li @click="sortName()"><a href="#">Name</a></li>
                                    <li @click="sortPrice()"><a href="#">Price</a></li>
                                    <li @click="sortCategory()"><a href="#">Category</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <input id="search" type="text" placeholder="Search" v-model="getSearch">
                    <label for="search">
                    </label>
                    <div class="clear"></div>
                </div>
                <div class="clear"></div>
                <div class="search-small">
                    <div class="menu">
                        <ul>
                            <li class="dropdown">
                                <div class="img">
                                    <img src="../assets/sort.png" alt="SortBy">
                                </div>
                                <ul class="list-dropdown">
                                    <li @click="sortName()"><a href="#">Name</a></li>
                                    <li @click="sortPrice()"><a href="#">Price</a></li>
                                    <li @click="sortCategory()"><a href="#">Category</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div class="search-img">
                        <img src="../assets/magnifying-glass.png" alt="Search image" @click="hideInput()">
                    </div>
                    <div class="search-input" v-show="showInput">
                        <input id="search2" type="text" placeholder="Search" v-model="getSearch">
                        <label for="search2">
                        </label>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
        </header>

<!-- ---------------------------------------------------Main--------------------------------------------------- -->
        <main>
            <aside>
                <Menu/>
            </aside>
<!-- --------------------------------------------------Payment-------------------------------------------------- -->
            <div class="container-popup" v-if="showPop == true">
                <div class="popup">
                    <h2 style="float: left; font-size: 22px">Checkout</h2>
                    <h4 style="float: right; font-size: 14px">Receipt no: #010410919</h4>
                    <div class="clear"></div>
                    <p style="margin-bottom: 15px; font-size: 13px">Cashier : {{form.cashier}}</p>
                    <div class="listscroll">
                        <ul v-for="list in chart" :key="list.product.id_product">
                            <li>{{list.product.name_product}} {{list.count}}x</li>
                            <div class="right">
                                <span class="rp">Rp. </span>
                                <span class="res">{{list.product.price_product * list.count}}</span>
                            </div>
                            <div class="clear"></div>
                        </ul>
                        <p style="float: left; font-size: 14px">Ppn 10%</p>
                        <div class="right">
                            <span class="rp">Rp. </span>
                            <span class="res">{{ppn}}</span>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="payment" style="position: relative;">
                        <p style="float: left; margin-top: 20px; font-size: 14px">Total :</p>
                        <div class="right" style="margin-top: 20px">
                            <div>
                                <span class="rp">Rp. </span>
                                <span class="res">{{amounted}}</span>
                            </div>
                        </div>
                        <div class="clear"></div>

                        <p style="margin-bottom: 20px; font-size: 14px">Payment : Cash</p>
                        <button class="checkout" @click="history()">Pay</button>
                        <p style="text-align: center; margin: -15px 0 -5px 0; font-size: 12px">Or</p>
                        <button class="cancel" @click="showPop = false">Cancel</button>
                    </div>

                </div>
            </div>

<!-- -------------------------------------------Cart in layout small------------------------------------------- -->
            <div class="overlayImg" @click="showUpCart()">
                <p>{{quantity}}</p>
                <div class="img">
                    <img src="../assets/cart.png" alt="Cart">
                </div>
            </div>
            <div class="container-overlayside" v-show="showCart">
                <aside class="overlayside">
                    <div class="xSmall" @click="showDownCart()">x</div>
                    <h3>Cart <span>{{quantity}}</span></h3>
                    <div class="container-sidebar" v-show="show || chart.length == 0">
                        <div class="img">
                            <img src="../assets/food-and-restaurant.png" alt="Icon">
                        </div>
                        <h4>Your cart is empty</h4>
                        <p>Please add some items from the menu</p>
                    </div>
                    <div v-if="chart.length > 0" class="pay" v-show="!show">
                        <div class="container-thumb">
                            <div v-for="(thumb, index) in chart" :key="thumb.product.id_product">
                                <div>
                                    <Thumb
                                        :images = "thumb.product.image_product"
                                        :name = "thumb.product.name_product"
                                        :price = "Number(thumb.product.price_product) * thumb.count"
                                    />
                                </div>
                                <div class="addThumb">
                                    <p class="minus" @click = "minusProd(index)">-</p>
                                    <p class="count">{{ thumb.count }}</p>
                                    <p class="plus" @click = "plusProd(index)">+</p>
                                    <div v-if="chart.length > 0" class="x" @click = "deleteChart(index)">x</div>
                                </div>
                            </div>
                        </div>
                        <div class="payment">
                            <div style="width: 275px">
                                <p class="total" style="float: left">Total: </p>
                                <p class="total" style="float: right">Rp. {{calculated}}*</p>
                            </div>
                            <div class="clear"></div>
                            <p class="ppn">*Belum termasuk ppn</p>
                            <button class="checkout" @click="showPopup()">Checkout</button>
                            <button class="cancel" @click="clear()">Cancel</button>
                        </div>
                    </div>
                </aside>
            </div>
            
<!-- -------------------------------------------Cart in layout large------------------------------------------- -->
            <aside class="sidebar">
                <h3>Cart <span>{{quantity}}</span></h3>
                <div class="container-sidebar" v-show="show || chart.length == 0">
                    <div class="img">
                        <img src="../assets/food-and-restaurant.png" alt="Icon">
                    </div>
                    <h4>Your cart is empty</h4>
                    <p>Please add some items from the menu</p>
                </div>
                <div v-if="chart.length > 0" class="pay" v-show="!show">
                    <div class="container-thumb">
                        <div v-for="(thumb, index) in chart" :key="thumb.product.id_product">
                            <div>
                                <Thumb
                                    :images = "thumb.product.image_product"
                                    :name = "thumb.product.name_product"
                                    :price = "Number(thumb.product.price_product) * thumb.count"
                                />
                            </div>
                            <div class="addThumb">
                                <p class="minus" @click = "minusProd(index)">-</p>
                                <p class="count">{{ thumb.count }}</p>
                                <p class="plus" @click = "plusProd(index)">+</p>
                                <div v-if="chart.length > 0" class="x" @click = "deleteChart(index)">x</div>
                            </div>
                        </div>
                    </div>
                    <div class="payment">
                        <div style="width: 275px">
                            <p class="total" style="float: left">Total: </p>
                            <p class="total" style="float: right">Rp. {{calculated}}*</p>
                        </div>
                        <div class="clear"></div>
                        <p class="ppn">*Belum termasuk ppn</p>
                        <button class="checkout" @click="showPopup()">Checkout</button>
                        <button class="cancel" @click="clear()">Cancel</button>
                    </div>
                </div>
            </aside>

<!-- -------------------------------------------------Card Main------------------------------------------------ -->
            <section>
                <div class="container-main">
                    <div class="main">
                        <div class="loop" v-for="card in getProd" :key="card.id_product">
                            <div class="if" 
                            v-if="String(card.name_product).toLowerCase().includes(getSearch) 
                            || Number(getSearch) >= card.price_product"
                            >
                            <div class="card">
                                <Card
                                    :images = "card.image_product"
                                    :name = "card.name_product"
                                    :price = "Number(card.price_product)"
                                    :Data = "card"
                                    @addProd = "add"
                                />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import Card from '../components/card'
import Menu from '../components/menu'
import Thumb from '../components/thumb'
import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'

export default {
    name : "product",
    components : {
        Card,
        Menu,
        Thumb
    },
    data() {
        return {
            CoffeeShop : JSON.parse(localStorage.getItem('CoffeShop')),
            getSearch : "",
            chart : [],
            show : true,
            showOverlay : false,
            showPop : false,
            showCart : false,
            showInput : false,
            sortby : "Sort BY",
            count : 1,
            form : {
                cashier : "#atiacan",
                date : "",
                orders : "",
                amount : 0
            }
        }
    },
    methods : {
        ...mapActions(["faching", "sortName", "sortPrice", "sortCategory"]),
        history() {
            this.form.cashier = "#atiacan"
            let date = new Date()
            let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August",
            "September", "October", "November", "December"]
            this.form.date = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
            let order = []
            this.chart.forEach((value) => {
                order.push(value.product.name_product);
            });
            
            this.form.orders = order.join(", ").toString()
            this.form.amount = this.amounted
            
            let getHistory = {
                invoice : this.form.invoice,
                cashier : this.form.cashier,
                date : this.form.date,
                orders : this.form.orders,
                amount : this.form.amount
            }
            
            axios({
                method : "post",
                url : process.env.VUE_APP_URL + "history",
                headers : {
                    "Content-type" : "application/json"
                },
                data : getHistory
            })
            .then((res) => {
                alert(res.data.description);
                location.reload()
            }).catch((err) => {
                console.log(err)
            });
        },
        add(prod) {
            let indexItem
            let isExist = this.chart.filter((item, index) => {
                if(item.product.id_product == Number(prod.id_product)) {
                    indexItem = index
                    return true
                }
                else {
                    return false
                }
            })
            if (isExist.length) {
                this.chart[indexItem].count++
            }
            else {
                this.show = false
                this.showOverlay = false
                this.chart.push({product: prod, count: 1})
            }
        },
        minusProd(idx) {
            if (this.chart[idx].count > 1) {
                this.chart[idx].count--
            }
            else {
                this.chart[idx].splice(idx, 1)
            }
        },
        plusProd(idx) {
            this.chart[idx].count++
        },
        showPopup() {
            this.showPop = true
            this.showCart = false
        },
        hidePopup() {
            this.showPop = true
        },
        deleteChart(idx) {
            this.chart.splice(idx, 1)
        },
        clear() {
            this.chart = []
            this.show = true
            this.showPop = false
        },
        showUpCart() {
            this.showCart = true
        },
        showDownCart() {
            this.showCart = false
        },
        hideInput() {
            this.showInput = !this.showInput
        }
    },
    computed : {
        ...mapGetters(["getProd", "getForm"]),
        calculated() {
            let price = 0
            for (const key in this.chart) {
                price += Number(this.chart[key].product.price_product) * this.chart[key].count
            }
            return price
        },
        quantity() {
            let count = 0
            for (const key in this.chart) {
                count += this.chart[key].count
            }
            return count
        },
        amounted() {
            let totalpayment = this.calculated + (this.calculated * (10/100))
            return totalpayment
        },
        ppn() {
            let ppn = this.calculated * (10/100)
            return ppn
        },
    },
    mounted() {
        this.faching()
    },
}
</script>

<style scoped>
/* --------------------------------------------------Header-------------------------------------------------- */
    .container-head {
        height: 60px;
        position: fixed;
        left: 0;
        line-height: 60px;
        z-index: 3;
        right: 0;
        padding: 0 330px 0 80px;
        background-color: #f8f8f8;
    }
    .container-head h3 {
        float: left;
        font-size: 24px;
        text-align: center;
        background-color: #f8f8f8;
        color: #aaa;
        margin-left: 0;
        margin-right: 0;
    }
    .search-small {
        display: none;
    }
    .search {
        line-height: 60px;
        justify-content: center;
        background-color: #f8f8f8;
        width: 250px;
        float: right;
    }
    .search input {
        float: left;
        width: 150px;
        height: 25px;
        border: none;
        border-bottom: 1px solid #ddd;
        color: #333;
        margin-top: 18px;
        font-size: 14px;
        padding: 0 16px;
    }
    .search input:focus {
        outline: none;
    }
    .search .img img {
        width: 22px;
        margin: 20px 0 0 -25px;
    }
    
    .menu{
        float: left;
        font-size: 14px;
	}
	.menu ul {
		list-style-type: none;
		overflow: hidden;
	}
	.menu li a {
		display: inline-block;
        color: #333;
		text-align: center;
        width: 85px;
		text-decoration: none;
	}
	li.dropdown {
		display: inline-block;
	}
	.dropdown:hover .list-dropdown {
		display: block;
	}
	.list-dropdown a:hover {
		color: #fff !important;
	}
	.list-dropdown {
		position: absolute;
		display: none;
		box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
		z-index: 1;
		background-color: #f9f9f9;
	}
	.list-dropdown a {
		color: #3c3c3c !important;
        width: 80px;
	}
	.list-dropdown a:hover {
		color: #232323 !important;
		background: #f3f3f3 !important;
	}

/* --------------------------------------------------Payment------------------------------------------------- */
    .container-popup, .container-overlayside {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .5);
        position: fixed;
        z-index: 6;
    }
    .popup {
        width: 350px;
        background-color: white;
        margin: auto;
        height: 500px;
        margin-top: 80px;
        padding: 25px;
        border-radius: 10px;
        background-color: white;
        font-weight: bold;
        line-height: 32px;
        border: 2px solid rgb(66, 175, 243);
    }
    .popup ul li {
        float: left;
        font-size: 14px;
    }
    .popup .right {
        float: right;
        width: 80px;
        font-size: 14px;
    }
    .popup .rp {
        display: block;
        width: 25px;
        float: left;
    }
    .popup .res {
        display: block;
        text-align: right;
        float: right;
    }
    .checkout {
        background-color:  rgb(255, 64, 89);
    }
    .cancel {
        background-color: rgb(66, 175, 243);
    }
    button {
        width: 295px;
        padding: 8px;
        border: none;
        margin-bottom: 10px;
        border-radius: 5px;
        color: white;
        font-size: 14px;
    }
    .listscroll {
        height: 180px;
        overflow: auto;
    }

/* ---------------------------------------------------Main--------------------------------------------------- */
    .container-main {
        height: 100%;
        background-color: #ececec;
        left: 0;
        right: 0;
        padding: 60px 330px 0 60px;
        position: relative;
    }
    .main {
        height: 100%;
        padding-top: 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        box-shadow: inset .1vw .1vw .7vw 0 rgba(0, 0, 0, .1);
    }

/* ---------------------------------------------------Cart--------------------------------------------------- */
    .sidebar {
        z-index: 4;
    }
    .sidebar, .overlayside {
        width: 330px;
        right: 0;
        top: 0;
        position: fixed;
        height: 100%;
        background-color:#f8f8f8;
        box-shadow: 0 .1vw .5vw 0 rgba(0, 0, 0, .1);
    }
    .sidebar h3, .sidebar h4, .sidebar .img, .overlayside h3, .overlayside h4, .overlayside .img {
        width: 100%;
        font-weight: bold;
    }
    .sidebar h3, .overlayside h3 {
        font-size: 24px;
        text-align: center;
        line-height: 60px;
        background-color:#f8f8f8;
        border-bottom: 2px solid rgba(0, 0, 0, .1);
    }
    .sidebar h4, .overlayside h4 {
        font-size: 22px;
        text-align: center;
    }
    .sidebar .img, .overlayside .img {
        margin-top: 30px;
        text-align: center;
    }
    .sidebar .img img, .overlayside .img img {
        width: 50%;
    }
    .sidebar span, .overlayside span {
        padding: 0 5px;
        border-radius: 50%;
        background-color: cyan;
        color: white;
        text-align: center;
    }
    .container-sidebar p {
        color: #ccc;
        text-align: center;
        margin-top: 10px;
        font-size: 13px;
    }
    .pay {
        margin-left: 10%;
    }
    .pay p {
        padding: 5px;
        margin-left: 6px;
        font-size: 13px;
    }
    .pay button {
        width: 100%;
        border: none;
        padding: 5px;
        margin-bottom: 5px;
        border-radius: 5px;
        color: white;
    }
    .ppn {
        font-size: 14px;
    }
    .total {
        font-weight: bold;
        margin-top: 20px;
        font-size: 14px;
    }
    .cancel {
        background-color: rgb(255, 64, 89);
    }
    .checkout {
        background-color: rgb(66, 175, 243);
    }
    .container-thumb {
        width: 100%;
        height: 450px;
        overflow: auto;
    }
    .payment {
        position: absolute;
        bottom: 10px;
    }
    .clear {
        clear: both;
    }
    
    .addThumb {
        position: relative;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        text-align: center;
        line-height: 8px;
        margin: -30px 0 0 64px;
    }
    .minus, .count, .plus {
        width: 20px;
        height: 20px;
        color: rgb(88, 248, 82);
        border: 1px solid rgb(119, 255, 119);
    }
    .minus, .plus {
        background-color: rgb(212, 255, 195);
        cursor: pointer;
    }
    .x, .xSmall {
        width: 20px;
        height: 20px;
        font-size: 16px;
        color:white;
        text-align: center;
        line-height: 20px;
        cursor: pointer;
        margin-left: 5px;
        background-color: rgb(222, 75, 81);
    }
    .xSmall {
        position: absolute;
        margin-top: 0;
        top: 0;
        margin-left: 0;
    }

    .overlayImg {
        display: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: fixed;
        z-index: 6;
        right: 0;
        margin: 50px 20px 0 0;
        cursor: pointer;
        background-color: cyan;
        box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, .3);
    }
    .overlayImg .img {
        border-radius: 50%;
        width: 90%;
        margin-left: 12px;
    }
    .overlayImg img {
        margin-top: 16px;
        width: 50%;
    }
    .overlayImg p {
        position: absolute;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        font-weight: bold;
        border-radius: 50%;
        color: white;
        display: block;
        right: 5px;
        font-size: 16px;
        background-color: red;
    }
    .overlayside {
        position: fixed;
        z-index: 5;
    }

/* ------------------------------------------------Media Query----------------------------------------------- */
    @media (max-width: 800px) {
        .sidebar {
            display: none;
        }
        .container-main {
        padding: 60px 50px 0 60px;
        }
        
        .container-head {
            padding: 0 60px 0 80px;
        }
        .overlayImg {
            display: block;
        }
    }
    @media (max-width: 518px) {
        .search {
            display: none;
        }
        .search-small {
            display: block;
            position: absolute;
            top: 8px;
            left: 230px;
            width: 80px;
        }
        .search-small .img, .search-img {
            width: 18px;
        }
        .search-small .img img, .search-img img {
            width: 100%;
        }
        .search-img {
            position: absolute;
            top: 4px;
            left: 40px;
        }
        .search-input {
            width: 200px;
            height: 30px;
            position: fixed;
            left: 20%;
        }
        .search-input input {
            padding: 6px;
            width: 180px;
        }
    }
</style>