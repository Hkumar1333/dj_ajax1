const postsDiv=document.getElementById("posts-box");
const spinnerBox=document.getElementById("spinner-box");
const loadBtn=document.getElementById("load-btn");
const endBox=document.getElementById("end-box");

let visible=3;


const getCookie= (name) =>{
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}