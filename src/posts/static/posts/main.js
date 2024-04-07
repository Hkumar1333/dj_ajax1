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
        
            setTimeout(()=>{
                spinnerBox.classList.add("not-visible");
                const data=response.data;
                data.forEach(el=>{
                    postsDiv.innerHTML+=`
    
                    <div class="card mb-2">
                      
                        <div class="card-body">
                            <h5 class="card-title">${el.title}</h5>
                            <p class="card-text">${el.body}</p>
                            <div class="card-footer">
                                <div class="row">
                                    <div class="col-2">
                                        <a href="#" class="btn btn-primary">details</a>
                                    </div>
    
                                    <div class="col-2">
                                        <form class="like-unlike-form" data-form-id="${el.id}">
                                            <button href="#" class="btn btn-primary" id="like-unlike-${el.id}">${el.liked ? `Unlike (${el.count})`:`Like (${el.count})`}</button>
                                        </form>
                                    </div>
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                         
                
                    `
                })
                likeUnlikePosts();
            },100);

            if(response.size==0){
                endBox.innerHTML="no posts added yet";
            }
            if(response.size<=visible){
                loadBtn.classList.add("not-visible");
                endBox.innerHTML="no more posts to load";
            }
            
        },
        error:function(error){
            console.log(error)
        }
    
    
    })
}


loadBtn.addEventListener('click',()=>{
    spinnerBox.classList.remove("not-visble");
    visible+=3;
    getData()
})
