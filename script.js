document.addEventListener('DOMContentLoaded', function () {
    const statusFilter = document.getElementById('statusFilter');
    const listFilter = document.getElementById('listFilter');
    const tableBody = document.getElementById('tableBody');
    const salesTable = document.getElementById('salesTable');

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
});