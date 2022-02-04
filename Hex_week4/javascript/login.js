const url = 'https://vue3-course-api.hexschool.io/v2'; // 加入站點
const path = 'hexschoolforhenrywu'; // 加入個人 API Path 'hexschoolforhenrywu'

const vm = Vue.createApp({
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        login() {
            let username = this.username,
                password = this.password;

            const user = {
                username,
                password
            };
            if (this.username || this.password) {
                axios.post(`${url}/admin/signin`, user)
                    .then(res => {
                        const {
                            token,
                            expired
                        } = res.data;
                        document.cookie = `hexSchool=${token}; expires=${new Date(expired)}`;
                        window.location = 'products.html';
                    })
                    .catch(err => {
                        console.dir(err);
                        this.username = '';
                        this.password = ''
                        alert('帳號或密碼錯誤，請重新輸入!!')
                        
                    })
            } else {
                alert('請輸入帳號和密碼')
            }



        },
    }
});

vm.mount('#app')