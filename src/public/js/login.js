const form = document.getElementById('loginForm');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    try {
        data.forEach((value,key)=>obj[key]=value);
        fetch('/api/jwt/login',{
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(result=>{
            if(result.status===401 || result.status===400){
                window.alert("Credenciales invalidas!");
            }
            if(result.status===200){
                window.location.replace('/products');
            }
        }).catch( (error) => {
            window.alert("Error: " + error);
        })
    } catch (error) {
        window.alert("Error: " + error);
    }
})