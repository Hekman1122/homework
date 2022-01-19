

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
        login: function () {
            let username = this.username,
                password = this.password;

            const user = {
                username,
                password
            };

            //串接登入用API 並將資訊加入cookie
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
                    alert('登入失敗!!')
                })

        },
    }
});

vm.mount('#app')