const balance = document.getElementById('balance');
const moneydeb = document.getElementById('money-deb');
const moneycrd = document.getElementById('money-crd');

const getform = document.getElementById('form');
const gettranstatuses = document.querySelectorAll('.form-check-input');
const getamount = document.getElementById('amount');
const getdate = document.getElementById('date');
const getremark = document.getElementById('remark');

const openbtn = document.getElementById('open-btn');
const gethisbox = document.querySelector('.history-box');
const getlistgroup = document.getElementById('list-group');

const dummydatas = [
    { id: 1, transtatus: true, remark: 'Petty Cash', amount: 1000, date: "2023-01-20" },
    { id: 2, transtatus: false, remark: 'Pen', amount: -20, date: "2023-01-20" },
    { id:3,transtatus: true,remark:'Other Income',amount:300, date:"2023-01-20"},
    { id:4,transtatus: false,remark:'Book',amount:-10, date:"2023-01-20"},
    { id:5,transtatus: false,remark:'Water',amount:-150, date:"2023-01-20"},
    { id:6,transtatus: false,remark:'Petty Cash',amount:-100, date:"2023-01-20"},
];

const getlsdatas = JSON.parse(localStorage.getItem('transactions'));
let gethistories = localStorage.getItem('transactions') !== null ? getlsdatas : [];

//initial app
function init(){
    getlistgroup.innerHTML = '';
    //Method 1
    // dummydatas.forEach(function(dummydata){
    //     addtoui(dummydata);
    // });

    // Method 2
    // dummydatas.forEach(dummydata => addtoui(dummydata));

    // Method 3
    // dummydatas.forEach(addtoui);

    gethistories.forEach(addtoui);



    totalvalue();
}
init();

// create li to ul 
function addtoui(transaction){
    const newli = document.createElement('li');
    newli.innerHTML = `${transaction.remark}<span>${Math.abs(transaction.amount)}</span> <span>${transaction.date}</span> <button
    type="button" class="delete-btn" onclick="removetransaction(${transaction.id})>&times;</button>`;

    newli.className = 'list-group-item';

    newli.classList.add(transaction.transtatus === "+" ? 'inc' : 'dec');

    getlistgroup.appendChild(newli);
}

var sign = '-';
//get Sign
gettranstatuses.forEach(function (gettranstatus) {
    gettranstatus.addEventListener('change', function () {
        if (this.value === 'debit') {
            sign = '+';
        } else if (this.value === 'credit') {
            sign = '-';
        }
    });
});

getform.addEventListener('submit', newtransition);

function newtransition(e) {
    if (isNaN(getamount.value) || getamount.value.trim() === '' || getdate.value.trim() === '' || getremark.value.trim() === '') {
        alert('ohh!! Some data are missing');
    } else {
        const transaction = {
            id: generateid(),
            transtatus: sign,
            amount: sign === '-' ? Number(-getamount.value) : Number(getamount.value),
            date: getdate.value,
            remark: getremark.value
            
        };


        gethistories.push(transaction);
        addtoui(transaction);
        totalvalue();

        updatelocalstorage();
        getamount.value = '';
        getdate.value = '';
        getremark.value = '';

        getamount.focus();
    }

    e.preventDefault();
}


//Update local storage
function updatelocalstorage(){
    localStorage.setItem('transactions',JSON.stringify(gethistories));
}

function generateidx(){
    return Math.floor(Math.random() *100000);
}

function totalvalue(){
    const amounts = gethistories.map(gethistory => gethistory.amount);
    // 
    //Method1 
    // const result = amounts.reduce(function(total,curvalue){
    //     total += curvalue;
    //     return total;
    // },0).toFixed(2);

    //Method2
    const totalresult = amounts.reduce((total,curvalue)=>(total += curvalue),0).toFixed(2);

    const debitresult = amounts.filter(amount=>amount >0).reduce((total,curvalue)=>(total += curvalue),0).toFixed(2);

    const creditresult = (amounts.filter(amount => amount <0).reduce((total,curvalue)=>(total += curvalue),0)* -1).toFixed(2);
    
    balance.innerText = `${totalresult}`;
    moneydeb.innerText = `${debitresult}`;
    moneycrd.innerText = `${creditresult}`;

}

totalvalue();

function removetransaction(tranid){
    gethistories = gethistories.filter(gethistory=>gethistory.id !== tranid);

    init();
    
    updatelocalstorage();
}

openbtn.addEventListener('click', function () {
    gethisbox.classList.toggle('show');
});








// var myarrs = [10,20,30,40,50,60,70,80,90,100];

// // Array.reduce(function(total,currentValue,currentIndex,array){},initialValue) ;

// var result = myarrs.reduce(function(total,curvalue,curidx,arr){
//     // console.log('this is total = ',total); // 0 underfined // if we use 1 peremeter 10  underfined
//     // console.log('thsi is curvalue = ',curvalue);    // 10 to 100 by numbe4r // if we use 1 paremeter 20 to 100 by number
//     // console.log('this is curidx = ',curidx); // 0 to 9 inex number // if we use 1 peremeter 1 to 9 index number 
//     total += curvalue;
//     return total;
// },0);

// console.log(result);