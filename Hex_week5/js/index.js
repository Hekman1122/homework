import banner from './banner.js';
import cards from './cards.js';
import login from './login.js';
import detail from './detail.js';
import carts from './shoppingCarts.js'


const emitter = mitt()

Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
        VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
});

VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'),
    validateOnInput: true, // 調整為輸入字元立即進行驗證
});

const vm = Vue.createApp({
    data(){
        return{
            filter:'',
            page:'cards',
            user:{}
        }
    },
    components:{
        banner:banner,
        cards:{...cards,
            methods: {
                getProducts(){
                    axios.get(`${this.url}/api/${this.path}/products/all`)
                        .then(res => {
                            //將回傳資料指定給Vue元件的products變數
                            this.products = res.data.products;
                        })
                        .catch(err => {
                            console.dir(err)
                        })
                },
                //傳送開啟產品細節頁面
                toggle(id){
                    emitter.emit('toggle' , id)
                }, 
                //加入購物車
                addToCart(e,id, qty = 1){
                    const data = {
                        product_id: id,
                        qty:qty
                      };
                    e.target.classList.add('disable')
                    axios.post(`${this.url}/api/${this.path}/cart`,{ data })
                      .then(res=>{
                        console.log(res)
                        e.target.classList.remove('disable')
                      })
                      .catch(err=>{
                          console.dir(err)
                      })
                }
            }
        },
        login:login,
        detail:{
            ...detail,
            mounted() {
                 emitter.on('toggle',(id) =>{
                    this.customerGetProduct(id)
                })
            }},
        carts:carts
    },
    mounted(){
        this.addSpinner()
    },
    methods:{
        addSpinner(){
            let loader = this.$loading.show({
                // Optional parameters
                container: this.fullPage ? null : this.$refs.formContainer,
                canCancel: true,
                onCancel: this.onCancel,
            });
            setTimeout(() => {
                loader.hide()
            }, 1500)
        }, 
        changeSwitchLogin() {
            this.$refs.login.loginSwitch = !this.$refs.login.loginSwitch
        }, 
        receiveData(userData){
            this.user = {...userData}
            console.log(this.user)
        }
        
    }   
})


vm.use(VueLoading.Plugin);

vm.component('VForm', VeeValidate.Form);
vm.component('VField', VeeValidate.Field);
vm.component('ErrorMessage', VeeValidate.ErrorMessage);


vm.mount('#app')