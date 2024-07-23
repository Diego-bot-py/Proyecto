document.addEventListener('DOMContentLoaded', function() {
    fetch('http://127.0.0.1:5000/user-stats')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('userStatsChart').getContext('2d');
            const userStatsChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.roles,
                    datasets: [{
                        label: 'Número de Usuarios',
                        data: data.counts,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching user stats:', error));
});