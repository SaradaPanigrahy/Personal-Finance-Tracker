let transactions=JSON.parse(localStorage.getItem("transactions"))||[];
updateTable();
function AddTransaction(){
    let desc=document.getElementById("Desc").value;
     let amount = Number(document.getElementById("amount").value);
    let date = document.getElementById("date").value;
    let category = document.getElementById("category").value;
     if(desc === "" || amount === "" || date === ""){
        alert("Fill all fields");
        return;
    }

     let type = category.toLowerCase() === "salary" ? "income" : "expense";
     
    let transaction = {desc, amount, date, category, type};
    transactions.push(transaction);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTable();
}
function updateTable(){

    let tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    transactions.map(t => {

        let row = `<tr class="${getCategoryColor(t.category)}">
            <td>${t.desc}</td>
            <td>${t.amount}</td>
            <td>${t.date}</td>
            <td>${t.category}</td>
        </tr>`;

        tbody.innerHTML += row;
    });

    calculateTotal();
}

function calculateTotal(){

    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
        if(t.type === "income") income += t.amount;
        else expense += t.amount;
    });

    document.getElementById("balance").innerText = income - expense;

    let savingPercent = ((income-expense)/income)*100 || 0;
    document.getElementById("savingProgress").value = savingPercent;

    let expensePercent = (expense/income)*100 || 0;
    document.getElementById("expenseMeter").value = expensePercent;
}

function getCategoryColor(cat){

    switch(cat){
        case "food": return "food";
        case "travel": return "travel";
        case "shopping": return "shop";
        default: return "";
    }
}