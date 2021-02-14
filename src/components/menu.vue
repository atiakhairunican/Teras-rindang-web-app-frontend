<template>
    <div class="container-fluit">
		<aside class="menu-bar" v-show="!showMenu">
            <div class="container-menu">
                <ul>
                    <li>
                        <a href="#">
                            <div class="img">
                                <img src="../assets/menu.png" alt="Menu">
                            </div>
                        </a>
                    </li>
                    <li>
                        <router-link to="/" v-if="CoffeeShop.Login.users.role == 'admin'">
                            <div class="img">
                                <img src="../assets/fork.png" alt="Fork">
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/history" v-if="CoffeeShop.Login.users.role == 'admin'">
                            <div class="img">
                                <img src="../assets/clipboard.png" alt="Clipboard">
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <div class="img" v-if="CoffeeShop.Login.users.role == 'admin'" @click="showAdd()">
                            <img src="../assets/add.png" alt="Add">
                        </div>
                    </li>
                    <li>
                        <div class="img" v-if="CoffeeShop.Login.users.role == 'admin'" @click="showUpdate()">
                            <img src="../assets/edit.png" alt="Add">
                        </div>
                    </li>
                    <li>
                        <div class="img" v-if="CoffeeShop.Login.users.role == 'admin'" @click="showDelete()">
                            <img src="../assets/delete.png" alt="Add">
                        </div>
                    </li>
                    <li>
                        <div class="img" @click="logout()">
                            <img src="../assets/logout.png" alt="Logout">
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
        <div class="overlayAdd" v-show="show">
            <div class="containerAdd">
                <h2>Add Item</h2>
                <div>
                    <label for="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        v-model="form.name_product"
                        required
                    ><br>
                    <label for="image">Image</label>
                    <input
                        type="file"
                        name="image"
                        id="file"
                        ref="file"
                        required
                    ><br>
                    <label for="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        v-model="form.price_product"
                        required
                    ><br>
                    <label >Category</label>
                    <select name="category" v-model="form.id_category" required>
                        <option value="Category" disabled>Category</option>
                        <option value="1">Food</option>
                        <option value="2">Drink</option>
                    </select>
                    <div class="btn">
                        <button class="checkout" @click="hideAdd()">Cancel</button>
                        <button class="cancel" @click="addData(form)">Add</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="overlayAdd" v-show="showDel">
            <div class="containerDel">
                <h2>Delete Item</h2>
                <div>
                    <label for="name">Name</label>
                    <input
                        type="text"
                        id="nameDel"
                        v-model="nameForDel"
                        required
                    >
                    <div class="btn">
                        <button class="checkout" @click="hideDel()">Cancel</button>
                        <button class="cancel" @click="delData()">Delete</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="overlayAdd" v-show="showUp">
            <div class="containerUp">
                <h2>Update Item</h2>
                <div>
                    <label for="name">Old Name</label>
                    <input
                        type="text"
                        name="oldName"
                        id="oldName"
                        v-model="formUpdate.old_name_product"
                        required
                    ><br>
                    <label for="name">Name</label>
                    <input
                        type="text"
                        name="nameUpdate"
                        id="nameUpdate"
                        v-model="formUpdate.name_product"
                        required
                    ><br>
                    <label for="image">Image</label>
                    <input
                        type="file"
                        name="imageUpdate"
                        id="imageUpdate"
                        ref="fileUpdate"
                        required
                    ><br>
                    <label for="price">Price</label>
                    <input
                        type="number"
                        name="priceUpdate"
                        id="priceUpdate"
                        v-model="formUpdate.price_product"
                        required
                    ><br>
                    <label >Category</label>
                    <select name="categoryUpdate" v-model="formUpdate.id_category" required>
                        <option value="Category" disabled>Category</option>
                        <option value="1">Food</option>
                        <option value="2">Drink</option>
                    </select>
                    <div class="btn">
                        <button class="checkout" @click="hideUp()">Cancel</button>
                        <button class="cancel" @click="updateData(formUpdate)">Update</button>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
    name : "menu-page",
    data() {
        return {
            show : false,
            showDel : false,
            showUp : false,
            showMenu : false,
            updateSubmit : false,
            CoffeeShop : JSON.parse(localStorage.getItem('CoffeShop')),
            nameForDel : "",
            form : {
                name_product : null,
                price_product : null,
                id_category : null,
            },
            formUpdate : {
                old_name_product : null,
                name_product : null,
                price_product : null,
                id_category : null,
            },
        }
    },
    methods : {
        showAdd() {
            this.show = true
        },
        showDelete() {
            this.showDel = true
        },
        showUpdate() {
            this.showUp = true
        },
        hideAdd() {
            this.show = false
        },
        hideDel() {
            this.showDel = false
        },
        hideUp() {
            this.showUp = false
        },
        logout() {
            this.$store.dispatch("logout")
                .then(() => {
                    this.$router.push({ path: "/login"}).catch((err) => {err})
                    location.reload()
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        addData(data) {
            let formData = new FormData()
            formData.append('name', data.name_product)
            formData.append('price', data.price_product)
            formData.append('image', this.$refs.file.files[0])
            formData.append('idCategory', data.id_category)

            axios
            .post(`${process.env.VUE_APP_URL}product`, formData, {
                headers : {
                    "Content-type" : `multipart/form-data; boundary=${formData._boundary}`,
                    authtoken: this.CoffeeShop.Login.users.token,
                },
            })
            .then((res) => {
                alert(res.data.description);
                location.reload()
                this.form.name_product=null
                this.form.price_product=null
                this.$refs.file.value=null
                this.form.id_category=null
            }).catch((err) => {
                console.log(err)
            });
        },
        delData() {
            let name = this.nameForDel
            axios({
                method : "delete",
                url : `${process.env.VUE_APP_URL}product/del?name=${name}`,
                headers : {
                    authtoken: this.CoffeeShop.Login.users.token,
                },
            })
            .then((res) => {
                alert(res.data.description);
                location.reload()
            }).catch((err) => {
                console.log(err)
            });
        },
        updateData(data) {
            let formData = new FormData()
            formData.append('oldName', data.old_name_product)
            formData.append('name', data.name_product)
            formData.append('price', data.price_product)
            formData.append('image', this.$refs.fileUpdate.files[0])
            formData.append('idCategory', data.id_category)

            axios
            .put(`${process.env.VUE_APP_URL}product`, formData, {
                headers : {
                    "Content-type" : `multipart/form-data; boundary=${formData._boundary}`,
                    authtoken: this.CoffeeShop.Login.users.token,
                },
            })
            .then((res) => {
                alert(res.data.description);
                location.reload()
            }).catch((err) => {
                console.log(err)
            });
        },
    },
}

</script>

<style scope>
    #file, #imageUpdate {
        width: 69%;
        box-shadow: none;
        border: none;
        padding-left: 0;
        background-color: white;
    }
    
    .menu-bar {
        width: 60px;
        position: fixed;
        top: 0;
        z-index: 4;
        height: 100%;
        background-color:#f8f8f8;
        /* background-color: rgb(19, 27, 38); */
    }
    .container-menu {
        padding: 12px 12px 12px 14px;
    }
    .container-menu .img {
        width: 100%;
        margin-bottom: 8vh;
        cursor: pointer;
    }
    .menu-bar .img img {
        width: 80%;
    }
    ul {
        list-style-type: none;
    }

    .overlayAdd {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .5);
        position: fixed;
        z-index: 5;
    }
    .containerAdd {
        width: 350px;
        background-color: white;
        margin: auto;
        height: 400px;
        margin-top: 100px;
        padding: 20px;
        border-radius: 10px;
        background-color: white;
        font-weight: bold;
        line-height: 18px;
        border: 2px solid rgb(66, 175, 243);
    }
    .containerAdd h2, .containerDel h2, .containerUp h2 {
        font-size: 22px;
        margin-bottom: 25px;
    }
    .containerAdd input, select, .containerDel input, .containerUp input {
        width: 210px;
        border: none;
        border-bottom: 1px solid #ddd;
        color: #333;
        padding: 5px 15px;
        background-color: aliceblue;
        margin: 14px;
        box-shadow: 0 .1vw .5vw 0 rgba(0, 0, 0, .2);
    }
    .containerAdd input, .containerDel input, .containerUp input {
        font-size: 14px;
    }
    .containerAdd input:focus, select:focus, .containerDel input:focus, .containerUp input:focus {
        outline: none;
    }
    .containerAdd label, .containerDel label, .containerUp label {
        width: 20%;
        font-size: 14px;
        display: inline-block;
    }
    .containerAdd button, .containerDel button, .containerUp button {
        width: 90px;
        margin-right: 10px;
        border: none;
        padding: 7px;
        border-radius: 5px;
        color: white;
    }
    .containerDel {
        width: 350px;
        background-color: white;
        margin: auto;
        height: 230px;
        margin-top: 100px;
        padding: 20px;
        border-radius: 10px;
        background-color: white;
        font-weight: bold;
        line-height: 18px;
        border: 2px solid rgb(66, 175, 243);
    }
    .containerUp {
        width: 350px;
        background-color: white;
        margin: auto;
        height: 450px;
        margin-top: 100px;
        padding: 20px;
        border-radius: 10px;
        background-color: white;
        font-weight: bold;
        line-height: 18px;
        border: 2px solid rgb(66, 175, 243);
    }
    .btn {
        width: 100%;
        margin: 15px;
        margin: 50px 0 30px 100px;
    }
    .cancel {
        background-color: rgb(255, 64, 89);
        cursor: pointer;
    }
    .cancel:focus, .checkout:focus {
        outline: none;
    }
    .checkout {
        background-color: rgb(66, 175, 243);
        cursor: pointer;
    }
</style>