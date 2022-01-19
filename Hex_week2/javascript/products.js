
const url = 'https://vue3-course-api.hexschool.io/v2'; // 加入站點
const path = 'hexschoolforhenrywu'; // 加入個人 API Path 'hexschoolforhenrywu'


const vm = Vue.createApp({
    data() {
        return {
            isShow: true,
            username: '',
            password: '',
            products: [],
            temp: {}
        }
    },
    methods: {
        checkLogin: function () {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexSchool\s*\=\s*([^;]*).*$)|^.*$/,
                "$1");
            axios.defaults.headers.common['Authorization'] = token;

            axios.post(`${url}/api/user/check`)
                .then((res) => {
                    console.log(res.data)
                })
                .catch((error) => {
                    console.dir(error)
                })
        },
        //取得產品列表
        getProducts: function () {
            //取得token
            this.checkLogin();

            axios.get(`${url}/api/${path}/admin/products`)
                .then(res => {
                    //將回傳資料指定給Vue元件的products變數
                    this.products = res.data.products;
                })
                .catch(err => {
                    console.dir(err)
                })
        },

        //取得單一產品資訊 無需驗證
        getSingleProduct: function (id) {
            axios.get(`${url}/api/${path}/product/${id}`)
                .then(res => {
                    //將回傳資料指定給Vue元件的temp變數
                    this.temp = res.data.product;
                })
                .catch(err => {
                    console.dir(err)
                })
        },

        //刪除產品
        deleteProducts: function (id) {
           this.checkLogin();

            let confirmText = prompt('Are you sure you want to delete this product?', 'yes / no');
            if (confirmText.toLowerCase === 'yes') {
                axios.delete(`${url}/api/${path}/admin/product/${id}`)
                    .then(res => {
                        this.getProducts()
                    })
                    .catch(err => {
                        console.dir(err)
                    })
            }

        }
    },
    mounted() {
       this.getProducts()
    }
})

vm.mount('#mainPage')