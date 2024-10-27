// 解析CSV数据
async function loadSongsFromCSV() {
    try {
        const response = await fetch('songs.csv');
        const data = await response.text();
        const lines = data.split('\n').map(line => line.trim()).filter(line => line);
        
        // 第一行是歌手名
        const artists = lines[0].split(',').map(artist => artist.trim());
        const songs = [];
        
        // 从第二行开始是歌曲名
        for (let i = 1; i < lines.length; i++) {
            const songTitles = lines[i].split(',').map(title => title.trim());
            
            // 将每个位置的歌曲匹配到对应位置的歌手
            songTitles.forEach((title, index) => {
                if (title && artists[index] && title !== '') {
                    const type = detectLanguage(title);
                    songs.push({
                        title: title,
                        artist: artists[index],
                        type: type,
                        tag: getTag(type),
                        isHot: false
                    });
                }
            });
        }

        return songs.filter(song => song.title && song.artist); // 过滤掉空值
    } catch (error) {
        console.error('Error loading songs:', error);
        return [];
    }
}

// 语言检测函数改进
function detectLanguage(title) {
    if (/[\u3040-\u30ff]/.test(title)) return 'japanese';     // 日文歌曲
    if (/^[A-Za-z\s\-\'\"]+$/.test(title)) return 'english';  // 英文歌曲
    return 'chinese';  // 默认为中文歌曲
}

// 初始化函数
document.addEventListener('DOMContentLoaded', async () => {
    songs = await loadSongsFromCSV();
    filteredSongs = [...songs];
    updateArtistFilter();
    updateStatistics();
    renderSongs();
    
    // 输出加载的歌曲数量，用于调试
    console.log(`Loaded ${songs.length} songs`);
});
