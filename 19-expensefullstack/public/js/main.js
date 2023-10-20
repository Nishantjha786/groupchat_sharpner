/* <a href="/user/appointments/?id=${ele.id}&edit=true" class="btn btn-outline-success m-2 e-btn" >Edit</a> */
const placeholder = document.querySelector('#placeholder');
const useramount = document.querySelector('#amount');
const userdescription = document.querySelector('#description');
const usercategory = document.querySelector('#category');


placeholder.addEventListener('click',onclick);


function showOutput(response){
    placeholder.innerHTML="";
    response.data.forEach((ele,index)=>{
        const htmlText = `
        <tr>
            <td>${ele.amount} &#8377</td>
            <td>${ele.description}</td>
            <td>${ele.category}</td>
            <td>
                <button class="btn btn-success edit-btn ms-2" id=${ele.id} type="submit">Edit </button>
            </td>
            <td>
                <button class="btn btn-danger del-btn ms-2" id=${ele.id} type="submit">Delete </button>
            </td>
         </tr>`;
    placeholder.innerHTML+=htmlText;
    })
}
async function onclick(e){
    e.preventDefault();
    if(e.target && e.target.classList.contains("del-btn")){
        const dID = e.target.id;
        try{
            await axios.get(`http://192.168.29.221:8080/user/tracker/delete/${dID}`);
            refresh();
        }catch(err){
            console.log(err);
        }
    }
    else if (e.target && e.target.classList.contains('edit-btn')) {
        e.preventDefault();
        const eID = e.target.id;
        try{
           const response=  await axios.get(`http://192.168.29.221:8080/user/tracker/edit/${eID}`);
          const {amount} = response.data;
          useramount.value = amount;
          await axios.get(`http://192.168.29.221:8080/user/tracker/delete/${eID}`);
          refresh();
        }catch(err){
            console.log(err);
        }
    }
}

async function refresh(){
    try {
        const response = await axios.get('http://192.168.29.221:8080/user/tracker/data');
        showOutput(response);
        
    } catch (error) {
        console.log(error);
    }
}
refresh();

