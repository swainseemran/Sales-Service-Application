document.addEventListener('DOMContentLoaded', function () {
    let data = [];

    const statusFilter = document.getElementById('statusFilter');
    const listFilter = document.getElementById('listFilter');
    const tableBody = document.getElementById('tableBody');
    const salesTable = document.getElementById('salesTable');
    const addItemButton = document.getElementById('addItemButton');

    addItemButton.addEventListener('click', function () {
        openAddItemFile();
    });

    fetch('salesData.json')
        .then(response => response.json())
        .then(data => {
            renderTable(data);

            statusFilter.addEventListener('change', function () {
                const selectedStatus = statusFilter.value;
                const selectedList = listFilter.value;
                filterData(selectedStatus, selectedList, data);
            });

            listFilter.addEventListener('change', function () {
                const selectedStatus = statusFilter.value;
                const selectedList = listFilter.value;
                filterData(selectedStatus, selectedList, data);
            });
        })
        .catch(error => console.error('Error fetching sales data:', error));

    function renderTable(data) {
        tableBody.innerHTML = '';

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.startDate}</td>
                <td>${item.endDate}</td>
                <td>${item.category}</td>
                <td>${item.ownerName}</td>
                <td>${item.status}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    function filterData(status, list, data) {
        let filteredData = data;

        if (status !== 'all') {
            filteredData = filteredData.filter(item => item.status === status);
        }

        if (list === 'my-list') {
            const currentUser = 'Seemran';
            filteredData = filteredData.filter(item => item.ownerName === currentUser);
        } else if (list === 'all-list') {
            const currentUser = ['Shiv Reddy', 'Rahul kumar', 'Manish Sahu'];
            filteredData = filteredData.filter(item => item.ownerName !== currentUser);
        }

        renderTable(filteredData);
    }

    // function openAddItemFile() {
    //     const id = prompt("Enter ID:");
    //     const name = prompt("Enter Name:");
    //     const startDate = prompt("Enter Start Date:");
    //     const endDate = prompt("Enter End Date:");
    //     const category = prompt("Enter Category:");
    //     const ownerName = prompt("Enter Owner Name:");
    //     const status = prompt("Enter Status:");
    
    //     if (id && name && startDate && endDate && category && ownerName && status) {
    //         const newItem = {
    //             id: id,
    //             name: name,
    //             startDate: startDate,
    //             endDate: endDate,
    //             category: category,
    //             ownerName: ownerName,
    //             status: status
    //         };
    
    //         appendItemToTable(newItem);
    //     } else {
    //         alert("Please fill in all fields.");
    //     }
    // }
    
    // function appendItemToTable(item) {
    //     const tableBody = document.getElementById('tableBody');
    //     const row = document.createElement('tr');
    //     row.innerHTML = `
    //         <td>${item.id}</td>
    //         <td>${item.name}</td>
    //         <td>${item.startDate}</td>
    //         <td>${item.endDate}</td>
    //         <td>${item.category}</td>
    //         <td>${item.ownerName}</td>
    //         <td>${item.status}</td>
    //     `;
    //     tableBody.appendChild(row);
    // }
    


    function openAddItemFile() {
        const id = prompt("Enter ID:");
        const name = prompt("Enter Name:");
        const startDate = prompt("Enter Start Date:");
        const endDate = prompt("Enter End Date:");
        const category = prompt("Enter Category:");
        const ownerName = prompt("Enter Owner Name:");
        const status = prompt("Enter Status:");

        if (id && name && startDate && endDate && category && ownerName && status) {
            const newItem = {
                id: id,
                name: name,
                startDate: startDate,
                endDate: endDate,
                category: category,
                ownerName: ownerName,
                status: status
            };
            data.push(newItem);
            renderTable(data);
        } else {
            alert("Please fill in all fields.");
        }
    }
});