export default {
    data() {
        return {
            url: "https://vue3-course-api.hexschool.io/v2",
            path: "hexschoolforhenrywu",
            user: {},
            loginSwitch: false
        }
    },
    emits:['login-data'],
    methods: {
        changeSwitch() {
            this.loginSwitch = !this.loginSwitch
        },
        //登入
        login() {
            const data = {
                'user': this.user
            }
            this.$emit('login-data',data)
            this.$refs.form.resetForm()
            this.changeSwitch()
        }
    },
    template: `   
    <div v-if='loginSwitch'>
        <div class="bg"></div>
        
        <div class="form-page">
            <h2>使用者登入</h2>
            <v-form v-slot="{ errors }" ref='form' @submit = 'login'>
                <div class="input-box">
                    <label for="email" >信箱</label>
                    <v-field id="email" name="信箱" type="email" placeholder="請輸入信箱" rules="email|required"
                        v-model="user.email"></v-field>
                    <error-message name="信箱"></error-message>
                </div>
                <div class="input-box">
                    <label for="fullName">姓名</label>
                    <v-field id="fullName" name="姓名" type="text" placeholder="請輸入姓名" rules="required"
                        v-model="user.name"></v-field>
                    <error-message name="姓名"></error-message>
                </div>
                <div class="input-box">
                    <label for="cellphone">電話</label>
                    <v-field id="cellphone" name="電話" type="tel" placeholder="請輸入電話"
                        rules="min:8|required|max:12" v-model="user.tel"></v-field>
                    <error-message name="電話"></error-message>
                </div>
                <div class="input-box">
                    <label for="address">住址</label>
                    <v-field id="address" name="住址" type="text" placeholder="請輸入住址" rules="required"
                        v-model="user.address"></v-field>
                    <error-message name="住址"></error-message>
                </div>

                <div class="input-box">
                    <label for="message">留言</label>
                    <textarea id="message" cols="48" rows="10"></textarea>
                    
                </div>
                <div class="input-box">
                    <button type="button" @click='changeSwitch'>取消</button>
                    <button type="submit">送出</button>
                </div>
                
            </v-form>
        </div>

    </div>
    `

}