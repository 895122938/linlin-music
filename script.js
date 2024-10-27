// 配置
const SONGS_PER_PAGE = 12;
let currentPage = 1;
let currentSort = { field: null, ascending: true };
let songs = [];
let filteredSongs = [];
let favorites = new Set(JSON.parse(localStorage.getItem('favorites') || '[]'));

// 从CSV加载歌曲数据
async function loadSongsFromCSV() {
    try {
        const response = await fetch('songs.csv');
        const data = await response.text();
        songs = parseCSV(data);
        filteredSongs = [...songs];
        updateArtistFilter();
        updateStatistics();
        renderSongs();
    } catch (error) {
        console.error('Error loading songs:', error);
    }
}

//
// 解析CSV数据
function parseCSV(csv) {
    const lines = csv.split('\n');
    return lines.slice(1)
        .map(line => {
            const [artist, title] = line.split(',').map(item => item.trim());
            if (!artist || !title) return null;
            const type = detectLanguage(title);
            return {
                title,
                artist,
                type,
                tag: getTag(type),
                isHot: false
            };
        })
        .filter(Boolean);
}

// 检测语言类型
function detectLanguage(title) {
    if (/[\u3040-\u30ff]/.test(title)) return 'japanese';
    if (/^[A-Za-z\s]+$/.test(title)) return 'english';
    return 'chinese';
}

// 获取标签文本
function getTag(type) {
    return {
        'chinese': '国语',
        'japanese': '日语',
        'english': '英语'
    }[type];
}

// 更新统计信息
function updateStatistics() {
    document.getElementById('totalSongs').textContent = songs.length;
    document.getElementById('chineseSongs').textContent = songs.filter(s => s.type === 'chinese').length;
    document.getElementById('japaneseSongs').textContent = songs.filter(s => s.type === 'japanese').length;
    document.getElementById('englishSongs').textContent = songs.filter(s => s.type === 'english').length;
}

// 更新歌手筛选器
function updateArtistFilter() {
    const artistSelect = document.getElementById('artistFilter');
    const artists = [...new Set(songs.map(s => s.artist))].sort();
    artistSelect.innerHTML = '<option value="">所有歌手</option>' +
        artists.map(artist => `<option value="${artist}">${artist}</option>`).join('');
}

// 创建歌曲卡片
function createSongCard(song) {
    const isFavorite = favorites.has(song.title);
    return `
        <div class="song-card" data-type="${song.type}" data-hot="${song.isHot}">
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-meta">
                    <span class="song-artist">原唱：${song.artist}</span>
                    <span class="tag">${song.tag}</span>
                </div>
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                        onclick="toggleFavorite('${song.title}')">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    `;
}

// 渲染歌曲列表
function renderSongs() {
    const startIndex = (currentPage - 1) * SONGS_PER_PAGE;
    const endIndex = startIndex + SONGS_PER_PAGE;
    const pageItems = filteredSongs.slice(startIndex, endIndex);
    
    document.getElementById('songGrid').innerHTML = pageItems.map(createSongCard).join('');
    renderPagination();
}

// 渲染分页控件
function renderPagination() {
    const totalPages = Math.ceil(filteredSongs.length / SONGS_PER_PAGE);
    document.getElementById('pagination').innerHTML = `
        <button class="page-btn" onclick="changePage('prev')" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i> 上一页
        </button>
        <span class="page-info">第 ${currentPage}/${totalPages} 页</span>
        <button class="page-btn" onclick="changePage('next')" ${currentPage === totalPages ? 'disabled' : ''}>
            下一页 <i class="fas fa-chevron-right"></i>
        </button>
    `;
}

// 切换页码
function changePage(direction) {
    const totalPages = Math.ceil(filteredSongs.length / SONGS_PER_PAGE);
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    }
    renderSongs();
}

// 切换收藏状态
function toggleFavorite(title) {
    if (favorites.has(title)) {
        favorites.delete(title);
    } else {
        favorites.add(title);
    }
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
    renderSongs();
}

// 排序功能
function sortSongs(field) {
    if (currentSort.field === field) {
        currentSort.ascending = !currentSort.ascending;
    } else {
        currentSort.field = field;
        currentSort.ascending = true;
    }

    filteredSongs.sort((a, b) => {
        const aValue = a[field].toLowerCase();
        const bValue = b[field].toLowerCase();
        const comparison = aValue.localeCompare(bValue);
        return currentSort.ascending ? comparison : -comparison;
    });

    currentPage = 1;
    renderSongs();
}

// 搜索功能
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

const handleSearch = debounce((searchTerm) => {
    searchTerm = searchTerm.toLowerCase();
    filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(searchTerm) ||
        song.artist.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    renderSongs();
}, 300);

// 事件监听器
document.addEventListener('DOMContentLoaded', () => {
    // 加载歌曲数据
    loadSongsFromCSV();

    // 搜索输入监听
    document.getElementById('searchInput').addEventListener('input', (e) => {
        handleSearch(e.target.value);
    });

    // 歌手筛选监听
    document.getElementById('artistFilter').addEventListener('change', (e) => {
        const artist = e.target.value;
        filteredSongs = artist ? songs.filter(s => s.artist === artist) : [...songs];
        currentPage = 1;
        renderSongs();
    });

    // 排序按钮监听
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            sortSongs(btn.dataset.sort);
        });
    });

    // 筛选按钮监听
    document.querySelector('.filter-buttons').addEventListener('click', (e) => {
        if (!e.target.classList.contains('filter-btn')) return;

        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const filterType = e.target.dataset.type;
        
        if (filterType === 'favorite') {
            filteredSongs = songs.filter(song => favorites.has(song.title));
        } else if (filterType === 'hot') {
            filteredSongs = songs.filter(song => song.isHot);
        } else if (filterType === 'all') {
            filteredSongs = [...songs];
        } else {
            filteredSongs = songs.filter(song => song.type === filterType);
        }

        currentPage = 1;
        renderSongs();
    });

    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') return;

        switch(e.key) {
            case 'ArrowLeft':
                changePage('prev');
                break;
            case 'ArrowRight':
                changePage('next');
                break;
            case '/':
                e.preventDefault();
                document.getElementById('searchInput').focus();
                break;
        }
    });
});
