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
const csrftoken = getCookie('csrftoken');

const likeUnlikePosts=()=>{
    const likeUnlineforms=[...document.getElementsByClassName("like-unlike-form")];
    likeUnlineforms.forEach(form=> form.addEventListener('submit',e=>{
        e.preventDefault();
        const clickedId=e.target.getAttribute("data-form-id");
        const clickedBtn=document.getElementById("like-unlike-"+clickedId);

        $.ajax({
            type:'POST',
            url:'/like-unlike/',
            data:{
                "csrfmiddlewaretoken":csrftoken,
                "pk":clickedId
            },
            success:function(response){
                clickedBtn.textContent=response.liked ? `Unlike (${response.count})`:`Like (${response.count})`;
            },
            error:function(error){
                console.log(error);
            }
        });
    }));

}
const getData=()=>{

    $.ajax({
        type:"GET",
        url:`/data/${visible}`,
        success:function(response){
     