const trackerFrom = document.getElementById('tracker-form');
const amount = document.getElementById('amount');
const description = document.getElementById('description');
const category = document.getElementById('category');
const expenseItems = document.getElementById('expense-items');
const expansionDiv = document.getElementById('expansion');


trackerFrom.addEventListener('submit', async(e) => {
    e.preventDefault();
    console.log('********frontend:************ ',amount.value, description.value, category.value);
console.log("<<<<<<<<<add expense clicked!!!>>>>>")
    try {   
        await axios.post(`http://localhost:4000/expense/add-expense`, {
            amount: amount.value,
            description: description.value,
            category: category.value
        },
        {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
    
        const response = await fetchExpensesFromBackend(1);

        showExpensesOnFrontend(response.expenses1);

    } catch (error) {
        console.log("<<<<<<<<<FAILED ADDExpensesFromBackend Fn with below error>>>>>>");
        console.log(error);
    }
});

window.addEventListener('DOMContentLoaded', async () => {

    console.log("<<<<<<<<<Entered DOM content reloaded Fn>>>>>>");
   checkForPremium();

    // const url = window.location.search;
    // const page = url.replace('?', '');

    // console.log('page->', page);
    
    const response = await fetchExpensesFromBackend(1);
    console.log("<<<<<<<response from fetch expense from backend Fn>>>>>",response);
    
    const expenses = response.expenses;

    showExpensesOnFrontend(expenses);

    addPagination(response);
});

expenseItems.addEventListener('click', async (e) => {
    // console.log('event target: ', e.target.parentElement.id);
    const id = e.target.parentElement.id;
    console.log("id of clicked delete item is",id);
    try {
        const token =   localStorage.getItem('token');
        await axios.delete(`http://localhost:4000/expense/delete-expense/${id}`, {
            headers: {
                'Authorization': token
            }
        });

        expenseItems.removeChild(document.getElementById(`${id}`));
        
    } catch (error) {
        console.log(error);
    }

});

function showExpensesOnFrontend(expenses) {
    console.log("<<<<Entered show expesne from backend>>>>>>>>>>");
    console.log('expenses: ', expenses);

    expenseItems.innerHTML = '';

    for(let i = 0; i < expenses.length; i ++){
        // console.log(expenses[i]);
        const expense = expenses[i];
        expenseItems.innerHTML += `
            <li id="${expense.id}">
                ${expense.amount}-${expense.description}-${expense.category}
                <button>Delete</button>
            </li>
        `;
    }    
    console.log("<<<<Exit show expesne from backend>>>>>>>>>>");
};

async function fetchExpensesFromBackend(pageNo) {
    try {
        console.log("<<<<<<<<<Entered fetchExpensesFromBackend Fn>>>>>>");
        let rows = localStorage.getItem('rows');
        if(!rows) {
            rows = 5;
        }
       
        // const response = await axios.get(`http://localhost:4000/expense/get-expense`, {
        //     headers: {
        //         'Authorization': localStorage.getItem('token')
        //     }
        // });
const token =   localStorage.getItem('token');
console.log("<<<<<<<token in local storage in tracker js file is>>>>>>>", token);
//const addresponse = await axios.post("expenses/addexpense", data,{headers:{"Authorization":token}});
        const response = await axios.get(`http://localhost:4000/expense/get-expense/?page=${pageNo}`,{headers:{"Authorization":token, 'rows': rows}});
        console.log("<<<<<<<<<response from /expense/getexpense>>>>>>");
        console.log(response);
 
        const expenses = response.data;
        console.log("<<<<<<<<<Exit fetchExpensesFromBackend Fn>>>>>>");
        return expenses;
      
    } catch (error) {
        console.log("<<<<<<<<<FAILED fetchExpensesFromBackend Fn with below error>>>>>>");
        console.log(error);
    }
}

document.getElementById('rzp-button1').onclick = async function (e) {
    // console.log('token: ', token);
    
    try {
        let token = localStorage.getItem('token');

        let response = await axios.post(`http://localhost:4000/user/purchase-premium`, {}, {
            headers: {
                'Authorization': token
            }
        });

        // console.log('order response: ',response );
        var options = {
            "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
            "name": "Test Company",
            "order_id": response.data.order.id, // For one time payment
            "prefill": {
                "name": "Test User",
                "email": "test.user@example.com",
                "contact": "7003442036"
                },
            "theme": {
                "color": "#3399cc"
                },
            // This handler function will handle the success payment
            "handler": function (response) {
                console.log(response);
                axios.post(`http://localhost:4000/user/purchase-premium/update-transaction-status`,
                    {
                        order_id: options.order_id,
                        payment_id: response.razorpay_payment_id,
                    }, 
                    {   
                        headers: {"Authorization" : token} 
                    })
                    .then(() => {
                        alert('You are a Premium User Now');
                        checkForPremium();
                    }).catch(() => {
                        alert('Something went wrong. Try Again!!!');
                    })
            }
        };

        const rzp = new Razorpay(options);
        rzp.open();
        e.preventDefault();

        rzp.on('payment.failed', function (response){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        
    } catch (error) {
        console.log(error);
    }
};

function applyDarkTheme() {
    const body = document.body;
    body.classList.add('light-mode');
}

async function checkForPremium() {

    console.log('<<<<<,Entered check for permeium Fn>>');
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://localhost:4000/user/check-membership`, {}, {
            headers: {
                'Authorization': token
            }
        });

        if (response.status === 200) {
            applyDarkTheme();
            addLeaderboard();
            showPreviousDownloads();
            document.getElementById('downloadexpense').style.display = "block";
            document.getElementById('prevDownloads-div').style.display = "block";
        }
        console.log('<<<<<Exit check for permeium Fn>>');
    } catch (error) {
        console.log(error);
    }
}

async function addLeaderboard() {
    try {
        console.log('<<<<<<<<<<Entered addLeaderboard Fn in /view/js file>>>>>>> :');
        document.getElementById('leaderboard-div').style.display = "block";
        const leaderboard = document.getElementById('leaderboard');
        const response = await axios.get(`http://localhost:4000/expense/get-leaderboard`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        
        console.log('<<<<<<<<<<leaderboard data>>>>>>> :', response.data);
        leaderboard.innerHTML = '';
var i = 1;
        response.data.forEach(userData => {
            console.log("<<<<<<<<leaderboard count is>>>>>>>",i++);
             console.log("<<<<<<<<user data in for each loop>>>>>>>",userData);

            // let totalExpense = 0;
            // const user = userData.user;
            // const expenseList = userData.expenses;

            // expenseList.forEach(expense => {
            //     totalExpense += expense.amount;
            // });

            console.log(userData.totalExpenses);

            leaderboard.innerHTML += `
                <li id="${userData.id}">${userData.name}-${userData.totalExpenses}<button>View Details</button></li>
            `;
        });
        console.log('<<<<<<<<<<Exit addLeaderboard Fn in /view/js file>>>>>>> :');
    } catch (error) {
        console.log(error);
    }
}

async function showPreviousDownloads() {
    try {
        const downloads = document.getElementById('downloads');
        const response = await axios.get(`http://localhost:4000/user/get-downloads`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        console.log('response---->',response);
        downloads.innerHTML = '';

        response.data.downloads.forEach(download => {
            downloads.innerHTML += `<li>
                <a href="${download.fileUrl}">${download.date}</a>
            </li>`;
        });

    } catch (error) {
        console.log(error);
    }
}

document.getElementById('leaderboard').onclick = (e) => {
    e.preventDefault();

    // console.log(e.target.parentElement.id);
    const userId = e.target.parentElement.id;

    expandExpense(userId);

    expansionDiv.classList.add('active');
}

document.getElementById('close-list-btn').onclick = (e) => {
    e.preventDefault();
    expansionDiv.classList.remove('active');  
}

async function expandExpense(id) {
    try {
        let response = await axios.get(`http://localhost:4000/user/get-expansion/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        // console.log(response.data.expenses);
        const expenses = response.data.expenses;
        
        let expense_ul = document.querySelector('.expense-items');
        // console.log(expense_ul);
        expense_ul.innerHTML = '';
        expenses.forEach(expense => {
            expense_ul.innerHTML += `
                <li>${expense.description}-${expense.category}-${expense.amount}</li>
            `;
        });

    } catch (error) {
        console.log(error);
    }
}

function download(){
    axios.get(`http://localhost:4000/user/download`, 
        { 
            headers: {"Authorization" : localStorage.getItem('token')} 
        }
    )
    .then((response) => {
        if(response.status === 201){
            //the bcakend is essentially sending a download link
            //  which if we open in browser, the file would download
            var a = document.createElement("a");
            a.href = response.data.fileUrl;
            a.download = 'myexpense.csv';
            a.click();
        } else {
            throw new Error(response.data.message)
        }

    })
    .catch((err) => {
        logErrorToUser(err);  
    });
}

function logErrorToUser(error) {
    const err = document.getElementById('error-text');
    err.innerHTML = error.message;
};

function addPagination(response) {
    const paginationDiv = document.querySelector('.pagination');
    paginationDiv.innerHTML = '';

    if(response.previousPage!==1 && response.currentPage!==1){
        paginationDiv.innerHTML += `
            <button>${1}</button>
        `;
        paginationDiv.innerHTML += '<<';
    }

    if(response.hasPreviousPage) {
        paginationDiv.innerHTML += `
            <button>${response.previousPage}</button>
        `;
    }

    paginationDiv.innerHTML += `
        <button class="active">${response.currentPage}</button>
    `;

    if(response.hasNextPage) {
        paginationDiv.innerHTML += `
            <button>${response.nextPage}</button>
        `;
    }

    if(response.currentPage !== response.lastPage && response.nextPage!==response.lastPage) {
        paginationDiv.innerHTML += '>>';
        paginationDiv.innerHTML += `
            <button>${response.lastPage}</button>
        `;
    }
}

document.querySelector('.pagination').onclick = async (e) => {
    e.preventDefault();

    const page = e.target.innerHTML;

    const response = await fetchExpensesFromBackend(page);
    console.log(response);
    
    const expenses = response.expenses;

    showExpensesOnFrontend(expenses);

    addPagination(response);
}

document.getElementById('row-selector').onchange = (e) => {
    
    e.preventDefault();
    
    localStorage.setItem('rows', e.target.value);

    window.location.reload();
}
