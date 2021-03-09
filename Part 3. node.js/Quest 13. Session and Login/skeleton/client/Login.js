class Login{
    #dom
    #id
    #pw
    #login
    #initData
    constructor(dom) {
        this.#dom = dom;
        this.#id = this.#dom.querySelector('.login-id');
        this.#pw = this.#dom.querySelector('.login-pw');
        this.#login = this.#dom.querySelector('.submit');
        this.loginResult();
    }

    getID(){
        console.log(this.#id.value);
        return this.#id.value;
    }

    getPW(){
        console.log(this.#pw.value);
        return this.#pw.value;
    }

    loginResult(){
        this.loginRequest(function(result){
            if(result === 'False'){
                alert("아이디와 패스워드가 일치하지 않습니다.");
            }else{
                alert(`${result}님 환영합니다.`);
                location.href = "Notepad.html";
            }
        });
    }

    loginRequest(callback){
        this.#login.addEventListener('click', async ()=>{
            const data = {
                id:this.getID(),
                pw:this.getPW()
            }
            const response = await fetch("http://localhost:8080/login",{
               method:"POST",
               headers:{'Content-Type' : 'application/json'},
               body: JSON.stringify(data)
            });
            if(response.status === 200){
                const result = await response.text();
                callback(result);

            }
        });
    }
}