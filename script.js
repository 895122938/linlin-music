// 歌曲数据
const songs = [
    {
        title: "梦里水乡",
        artist: "江珊",
        type: "chinese",
        tag: "国语",
        plays: 32,
        isHot: false
    },
    {
        title: "牧羊曲",
        artist: "郑绪兰",
        type: "chinese",
        tag: "热门",
        plays: 45,
        isHot: true
    },
    {
        title: "囚鸟",
        artist: "张惠妹",
        type: "chinese",
        tag: "国语",
        plays: 28,
        isHot: false
    },
    {
        title: "左手指月",
        artist: "萨顶顶",
        type: "chinese",
        tag: "热门",
        plays: 56,
        isHot: true
    },
    {
        title: "群青",
        artist: "YOASOBI",
        type: "japanese",
        tag: "日语",
        plays: 68,
        isHot: true
    },
    {
        title: "アイドル",
        artist: "YOASOBI",
        type: "japanese",
        tag: "日语",
        plays: 42,
        isHot: false
    }
];

// 创建歌曲卡片的函数
function createSongCard(song) {
    return `
        <div class="song-card" data-type="${song.type}" data-hot="${song.isHot}">
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-meta">
                    <span class="song-artist">原唱：${song.artist}</span>
                    <span class="tag">${song.tag}</span>
                </div>
                <span class="plays-count">演唱次数：${song.plays}次</span>
            </div>
        </div>
    `;
}

// 渲染所有歌曲
function renderSongs(filteredSongs = songs) {
    const songGrid = document.getElementById('songGrid');
    songGrid.innerHTML = filteredSongs.map(createSongCard).join('');
}

// 搜索功能
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredSongs = songs.filter(song => 
        song.title.toLowerCase().includes(searchTerm) || 
        song.artist.toLowerCase().includes(searchTerm)
    );
    renderSongs(filteredSongs);
});

// 筛选功能
document.querySelector('.filter-buttons').addEventListener('click', (e) => {
    if (!e.target.classList.contains('filter-btn')) return;

    // 更新按钮状态
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    const filterType = e.target.dataset.type;
    let filteredSongs;

    switch(filterType) {
        case 'hot':
            filteredSongs = songs.filter(song => song.isHot);
            break;
        case 'chinese':
            filteredSongs = songs.filter(song => song.type === 'chinese');
            break;
        case 'japanese':
            filteredSongs = songs.filter(song => song.type === 'japanese');
            break;
        case 'english':
            filteredSongs = songs.filter(song => song.type === 'english');
            break;
        default:
            filteredSongs = songs;
    }

    renderSongs(filteredSongs);
});

// 初始渲染
renderSongs();