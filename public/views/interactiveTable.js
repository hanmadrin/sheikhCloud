import style from "../styles/style.js";
const interactiveTable = ({data,interaction})=>{
    const neoTable = document.createElement('table');
    neoTable.className = style.neoTable.main.join(' ');
    if(data.length===0){
        const noDataHolder = document.createElement('div');
        const noData = document.createElement('h2');
        noData.className = style.neoTable.noData.join(' ');
        noData.innerText = 'No data found for this query';
        neoTable.appendChild(noData);
    }else{
        const thead = document.createElement('thead');
        thead.className = style.neoTable.thead.join(' ');
        const thr = document.createElement('tr');
        const thValues = Object.keys(data[0]);
        thValues.forEach(thValue=>{
            const th = document.createElement('th');
            th.className = style.neoTable.th.join(' ');
            th.innerText = thValue.replace('invoice_',' ');
            thr.appendChild(th);
        });
        thead.appendChild(thr);
        const tbody = document.createElement('tbody');
        data.forEach(row=>{
            const tr = document.createElement('tr');
            const tdValues = Object.values(row);
            tdValues.forEach(tdValue=>{
                const td = document.createElement('td');
                // td.className = style.neoTable.td.join(' ');
                td.innerText = tdValue;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        neoTable.append(thead,tbody);
    }
    return neoTable;
};
export default interactiveTable;