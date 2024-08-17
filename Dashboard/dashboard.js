document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pageId = button.getAttribute('data-page');
            showPage(pageId);
        });
    });

    // Logout
    const logoutBtn = document.querySelector('.logout-btn');
    logoutBtn.addEventListener('click', () => {
        // Implement logout logic here
        window.location.href = 'Home.html';
    });

    // Load dashboard data
    loadDashboardData();
});

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    const navButtons = document.querySelectorAll('.nav-btn');

    pages.forEach(page => page.classList.remove('active'));
    navButtons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(pageId).classList.add('active');
    document.querySelector(`[data-page="${pageId}"]`).classList.add('active');

    if (pageId === 'analytics') {
        loadAnalyticsData();
    }
}

function loadDashboardData() {
    // In a real application, this data would come from an API
    const dashboardData = {
        quizCount: 12,
        questionCount: 110,
        impressionCount: 1400,
        trendingQuizzes: [
            { name: 'Quiz 1', impressions: 667, date: '04 Sep, 2023' },
            { name: 'Quiz 2', impressions: 667, date: '04 Sep, 2023' },
            { name: 'Quiz 3', impressions: 667, date: '04 Sep, 2023' },
            { name: 'Quiz 4', impressions: 667, date: '04 Sep, 2023' },
            { name: 'Quiz 5', impressions: 667, date: '04 Sep, 2023' },
            { name: 'Quiz 6', impressions: 667, date: '04 Sep, 2023' },
            { name: 'Quiz 7', impressions: 667, date: '04 Sep, 2023' },
            { name: 'Quiz 8', impressions: 667, date: '04 Sep, 2023' },
            { name: 'Quiz 9', impressions: 667, date: '04 Sep, 2023' },
            { name: 'Quiz 10', impressions: 667, date: '04 Sep, 2023' },
            { name: 'Quiz 11', impressions: 667, date: '04 Sep, 2023' },
            { name: 'Quiz 12', impressions: 667, date: '04 Sep, 2023' },
        ]
    };

    // Update stats
    document.getElementById('quizCount').textContent = dashboardData.quizCount;
    document.getElementById('questionCount').textContent = dashboardData.questionCount;
    document.getElementById('impressionCount').textContent = formatNumber(dashboardData.impressionCount);

    // Populate trending quizzes
    const quizGrid = document.getElementById('trendingQuizzes');
    quizGrid.innerHTML = ''; // Clear existing content
    dashboardData.trendingQuizzes.forEach(quiz => {
        const quizCard = document.createElement('div');
        quizCard.className = 'quiz-card';
        quizCard.innerHTML = `
            <h4>${quiz.name}</h4>
            <p>${quiz.impressions} 👁️</p>
            <p>Created on: ${quiz.date}</p>
        `;
        quizGrid.appendChild(quizCard);
    });
}

// Mock data for analytics
let quizData = [
    { id: 1, name: 'Quiz 1', createdOn: '01 Sep, 2023', impressions: 345 },
    { id: 2, name: 'Quiz 2', createdOn: '04 Sep, 2023', impressions: 667 },
    { id: 3, name: 'Quiz 3', createdOn: '06 Sep, 2023', impressions: 1600 },
    { id: 4, name: 'Quiz 4', createdOn: '09 Sep, 2023', impressions: 789 },
    { id: 5, name: 'Quiz 5', createdOn: '11 Sep, 2023', impressions: 995 },
    { id: 6, name: 'Quiz 6', createdOn: '13 Sep, 2023', impressions: 2500 },
    { id: 7, name: 'Quiz 7', createdOn: '14 Sep, 2023', impressions: 231 },
    { id: 8, name: 'Quiz 8', createdOn: '17 Sep, 2023', impressions: 1300 }
];

function loadAnalyticsData() {
    const tableBody = document.querySelector('#quiz-analysis-table tbody');
    tableBody.innerHTML = '';

    quizData.forEach((quiz, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${quiz.name}</td>
            <td>${quiz.createdOn}</td>
            <td>${formatNumber(quiz.impressions)}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editQuiz(${quiz.id})">Edit</button>
                <button class="action-btn delete-btn" onclick="showDeleteModal(${quiz.id})">Delete</button>
                <button class="action-btn share-btn" onclick="shareQuiz(${quiz.id})">Share</button>
                <a href="#" onclick="showQuestionWiseAnalysis(${quiz.id})">Question Wise Analysis</a>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editQuiz(id) {
    // Implement edit functionality
    console.log(`Editing quiz ${id}`);
}

function showDeleteModal(id) {
    const modal = document.getElementById('delete-modal');
    modal.style.display = 'block';

    const confirmBtn = document.getElementById('confirm-delete');
    const cancelBtn = document.getElementById('cancel-delete');

    confirmBtn.onclick = () => {
        deleteQuiz(id);
        modal.style.display = 'none';
    };

    cancelBtn.onclick = () => {
        modal.style.display = 'none';
    };
}

function deleteQuiz(id) {
    quizData = quizData.filter(quiz => quiz.id !== id);
    loadAnalyticsData();
}

function shareQuiz(id) {
    // In a real app, you'd generate a sharing link here
    const shareLink = `https://quizzie.com/share/${id}`;
    navigator.clipboard.writeText(shareLink).then(() => {
        showToast();
    });
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.className = 'toast show';
    setTimeout(() => { toast.className = toast.className.replace('show', ''); }, 3000);
}

function showQuestionWiseAnalysis(id) {
    // Implement question-wise analysis functionality
    console.log(`Showing question-wise analysis for quiz ${id}`);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}