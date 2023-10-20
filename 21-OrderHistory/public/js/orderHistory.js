const placeholder = document.querySelector('#placeholder');

function showOutput(response){
    let html = placeholder.innerHTML;

    response.data.forEach((ele,index)=>{
        const{id} = ele;
        const createdAt = new Date(ele.createdAt);
const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "numeric",
  minute: "2-digit",
  hour12: true 
};
const formattedDate = createdAt.toLocaleString("en-US", options);

        let htmlstart = `<div class="card my-3">
        <div class="card-header d-flex justify-content-between">
            <div class="ms-2">
                <h5>Order No #${id}</h5>
            </div>
            <div class="me-5">
                <h5>Date & Time: ${formattedDate}</h5>
            </div>
        </div>
        <div class="card-body">
        <table class="table">
            <thead >
                <tr>
                    <th class="col-1">#</th>
                    <th class="col-5">Item Name</th>
                    <th class="col-4">Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody >
        `;
        let htmlMiddle="";
        let totalPrice = 0;
        ele.Products.forEach((ele,index)=>{
            
            const{pName,pPrice} = ele;
            const{quantity} =ele.OrderItem; 
            totalPrice+=pPrice*quantity
            htmlMiddle += `<tr>
            <td>${index+1}</td>
            <td>${pName}</td>
            <td>&#8377;${pPrice}</td>
            <td>${quantity}</td>
        </tr>
            `
        })
        let totalTax =((totalPrice*2.5)/100).toFixed(2);
        let netAmount = (Number(totalPrice)+Number(totalTax))
        let htmlEnd = `</tbody >
        </table>
        <div class="mt-2 d-flex justify-content-center " >
          <ul class="list-unstyled">
            <li><b>Total Amount:</b>&nbsp;&nbsp;&#8377; ${totalPrice}</li>
            <li><b>Tax(2.5%):</b>&nbsp;&nbsp;&#8377; ${totalTax}</li>
            <li><b>Net Amount:</b>&nbsp;&nbsp;&#8377; ${netAmount}</li>

          </ul>

      </div>
    </div>
</div>
        `
        html+=htmlstart+htmlMiddle+htmlEnd

    })
    placeholder.innerHTML= html;
}

async function refresh(){
try {
    let url = 'http://192.168.29.221:3001/user/order-data';
    const response = await axios.get(url);
    showOutput(response)
    
} catch (error) {
    console.log(error);
}
}
refresh();