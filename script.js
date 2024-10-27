// ��������
const songs = [
    {
        title: "����ˮ��",
        artist: "��ɺ",
        type: "chinese",
        tag: "����",
        plays: 32,
        isHot: false
    },
    {
        title: "������",
        artist: "֣����",
        type: "chinese",
        tag: "����",
        plays: 45,
        isHot: true
    },
    {
        title: "����",
        artist: "�Ż���",
        type: "chinese",
        tag: "����",
        plays: 28,
        isHot: false
    },
    {
        title: "����ָ��",
        artist: "������",
        type: "chinese",
        tag: "����",
        plays: 56,
        isHot: true
    },
    {
        title: "Ⱥ��",
        artist: "YOASOBI",
        type: "japanese",
        tag: "����",
        plays: 68,
        isHot: true
    },
    {
        title: "�����ɥ�",
        artist: "YOASOBI",
        type: "japanese",
        tag: "����",
        plays: 42,
        isHot: false
    }
];

// ����������Ƭ�ĺ���
function createSongCard(song) {
    return `
        <div class="song-card" data-type="${song.type}" data-hot="${song.isHot}">
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-meta">
                    <span class="song-artist">ԭ����${song.artist}</span>
                    <span class="tag">${song.tag}</span>
                </div>
                <span class="plays-count">�ݳ�������${song.plays}��</span>
            </div>
        </div>
    `;
}

// ��Ⱦ���и���
function renderSongs(filteredSongs = songs) {
    const songGrid = document.getElementById('songGrid');
    songGrid.innerHTML = filteredSongs.map(createSongCard).join('');
}

// ��������
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredSongs = songs.filter(song => 
        song.title.toLowerCase().includes(searchTerm) || 
        song.artist.toLowerCase().includes(searchTerm)
    );
    renderSongs(filteredSongs);
});

// ɸѡ����
document.querySelector('.filter-buttons').addEventListener('click', (e) => {
    if (!e.target.classList.contains('filter-btn')) return;

    // ���°�ť״̬
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

// ��ʼ��Ⱦ
renderSongs();