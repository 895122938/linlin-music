// 配置常量
const CONFIG = {
    SONGS_PER_PAGE: 30,
    HOT_SONG_RATIO: 0.1, // 10%的歌曲会被标记为热门
    DEFAULT_VOLUME: 0.3,
    STORAGE_KEYS: {
        FAVORITES: 'songFavorites',
        VOLUME: 'backgroundMusicVolume',
        LAST_PLAYED: 'lastPlayedState'
    }
};

// 所有歌曲数据（这里是示例数据，实际使用时替换为原来的完整歌曲数组）
const songs = [{"title": "天使的指纹", "artist": "孙燕姿"}, {"title": "我很愉快", "artist": "孙燕姿"},
               {"title": " 我怀念的", "artist": "孙燕姿"}, {"title": "遇见", "artist": "孙燕姿"}, 
               {"title": "开始懂了", "artist": "孙燕姿"}, {"title": "天黑黑", "artist": "孙燕姿"}, 
               {"title": "慢慢喜欢你", "artist": "莫文蔚"}, {"title": "他不爱我", "artist": "莫文蔚"},
               {"title": "当你老了", "artist": "莫文蔚"}, {"title": "这世界那么多人", "artist": "莫文蔚"}, 
               {"title": "雪落下的声音", "artist": "郁可唯"}, {"title": "问明月", "artist": "郁可唯"}, 
               {"title": "指望", "artist": "郁可唯"}, {"title": "独家记忆", "artist": "郁可唯"},
               {"title": "知否知否", "artist": "郁可唯"}, {"title": "时间煮雨", "artist": "郁可唯"}, 
               {"title": "滚滚红尘", "artist": "郁可唯"}, {"title": "影子", "artist": "郁可唯"}, 
               {"title": "凉凉", "artist": "张碧晨"}, {"title": "你给我听好", "artist": "张碧晨"}, 
               {"title": "红玫瑰", "artist": "张碧晨"}, {"title": "字字句句", "artist": "张碧晨"}, 
               {"title": "面壁者", "artist": "邓紫棋"}, {"title": "囚鸟", "artist": "邓紫棋"}, 
               {"title": "画", "artist": "邓紫棋"}, {"title": "你不是第一个离开的人", "artist": "邓紫棋"}, 
               {"title": "你不是真正的快乐", "artist": "邓紫棋"}, {"title": "泡沫", "artist": "邓紫棋"},
               {"title": "回忆的阁楼", "artist": "郭静"}, {"title": "你的香气", "artist": "郭静"}, {"title": "心墙", "artist": "郭静"}, 
               {"title": "下一个天亮", "artist": "郭静"}, {"title": "在树上唱歌", "artist": "郭静"}, {"title": "匿名的好友", "artist": "杨丞琳"},
               {"title": "雨爱", "artist": "杨丞琳"}, {"title": "带我走", "artist": "杨丞琳"}, {"title": "左边", "artist": "杨丞琳"}, {"title": "Da Da Da", "artist": "王心凌"}, {"title": "第一次爱的人", "artist": "王心凌"},
               {"title": "彩虹的微笑", "artist": "王心凌"}, {"title": "我会好好的", "artist": "王心凌"}, {"title": "还是好朋友", "artist": "王心凌"}, {"title": "爱你", "artist": "王心凌"}, {"title": "月光", "artist": "王心凌"},
               {"title": "匿名的安慰", "artist": "王心凌"}, {"title": "黄昏晓", "artist": "王心凌"}, {"title": "花的嫁纱", "artist": "王心凌"}, {"title": "当你", "artist": "王心凌"}, {"title": "睫毛弯弯", "artist": "王心凌"}, 
               {"title": "那年夏天宁静的海", "artist": "王心凌"}, {"title": "带我离开", "artist": "BY2"}, {"title": "爱上你", "artist": "BY2"}, {"title": "不是故意", "artist": "BY2"}, {"title": "勇敢", "artist": "BY2"}, 
               {"title": "任由爱", "artist": "BY2"}, {"title": "有没有", "artist": "BY2"}, {"title": "不哭了", "artist": "BY2"}, {"title": "我知道", "artist": "BY2"}, {"title": "爱的双重魔力", "artist": "BY2"}, {"title": "不够成熟", "artist": "BY2"}, 
               {"title": "有点甜", "artist": "BY2"}, {"title": "你并不懂我", "artist": "BY2"}, {"title": "一样爱着你", "artist": "BY2"}, {"title": "三吋日光", "artist": "梁静茹"}, {"title": "慢冷", "artist": "梁静茹"}, 
               {"title": "无条件为你", "artist": "梁静茹"}, {"title": "爱你不是两三天", "artist": "梁静茹"}, {"title": "可惜不是你", "artist": "梁静茹"}, {"title": "情歌", "artist": "梁静茹"}, {"title": "勇气", "artist": "梁静茹"},
               {"title": "会呼吸的痛", "artist": "梁静茹"}, {"title": "情歌", "artist": "梁静茹"}, {"title": "暖暖", "artist": "梁静茹"}, {"title": "宁夏", "artist": "梁静茹"}, {"title": "小手拉大手", "artist": "梁静茹"},
               {"title": "崇拜", "artist": "梁静茹"}, {"title": "飘洋过海来看你", "artist": "梁静茹"}, {"title": "星より先に見つけてあける", "artist": "森口博子"}, {"title": "最后一页", "artist": "王赫野"},
               {"title": "白龙马", "artist": "樊竹青"}, {"title": "相思垢", "artist": "金莎"}, {"title": "爱的魔法", "artist": "金莎"}, {"title": "星月神话", "artist": "金莎"}, {"title": "画中仙", "artist": "金莎"}, 
               {"title": "梦千年之恋", "artist": "金莎"}, {"title": "被风吹过的夏天", "artist": "金莎"}, {"title": "天边的眷恋", "artist": "金莎"}, {"title": "光るなら", "artist": "Goose house"}, {"title": "今日天气好晴朗", "artist": "方琼"}, 
               {"title": "画皮", "artist": "纸砚zyan"}, {"title": "好想好想 ", "artist": "陈洁丽"}, {"title": "心如刀割", "artist": "陈洁丽"}, {"title": "つぐない", "artist": "邓丽君"}, {"title": "一帘幽梦", "artist": "邓丽君"}, 
               {"title": "小城故事", "artist": "邓丽君"}, {"title": "甜蜜蜜", "artist": "邓丽君"}, {"title": "在水一方", "artist": "邓丽君"}, {"title": "我只在乎你", "artist": "邓丽君"}, {"title": "月亮代表我的心", "artist": "邓丽君"},
               {"title": "つぐない ", "artist": "テレサテン"}, {"title": "想你时风起", "artist": "单依纯"}, {"title": "你的珍藏", "artist": "单依纯"}, {"title": "永不失联的爱", "artist": "单依纯"}, {"title": "故梦", "artist": "冯心怡"},
               {"title": "有形的翅膀", "artist": "张韶涵"}, {"title": "梦里花", "artist": "张韶涵"}, {"title": "寓言[蜜意]", "artist": "张韶涵"}, {"title": "遗失的美好", "artist": "张韶涵"}, {"title": "如果的事", "artist": "张韶涵"}, 
               {"title": "不想懂得", "artist": "张韶涵"}, {"title": "亲爱的，那不是爱情", "artist": "张韶涵"}, {"title": "隐形的翅膀", "artist": "张韶涵"}, {"title": "欧若拉", "artist": "张韶涵"}, {"title": "破茧", "artist": "张韶涵"}, 
               {"title": "看得最远的地方", "artist": "张韶涵"}, {"title": "很爱很爱你", "artist": "刘若英"}, {"title": "同桌的你", "artist": "刘若英"}, {"title": "为爱痴狂", "artist": "刘若英"}, {"title": "后来", "artist": "刘若英"}, 
               {"title": "哪里有不平哪有我", "artist": "何纪光"}, {"title": "不惜时光", "artist": "张靓颖"}, {"title": "画心", "artist": "张靓颖"}, {"title": "不灭的心 ", "artist": "孙楠"}, {"title": "美丽的神话", "artist": "孙楠"}, 
               {"title": "如果爱忘了", "artist": "戚薇"}, {"title": "我要你", "artist": "任素汐"}, {"title": "赤伶", "artist": "HITA"}, {"title": "风于九天", "artist": "HITA"}, {"title": "天命风流", "artist": "HITA"}, 
               {"title": "待我长发及腰", "artist": "尚雯婕"}, {"title": "挥不走的萤火", "artist": "赫赫Kazuki"}, {"title": "半城烟沙", "artist": "许嵩"}, {"title": "有你的快乐", "artist": "王若琳"}, {"title": "迷宫", "artist": "王若琳"}, 
               {"title": "第一次", "artist": "光良"}, {"title": "童话", "artist": "光良"}, {"title": "灰色空间", "artist": "罗志祥"}, {"title": "多情种", "artist": "胡杨林"}, {"title": "好久不见", "artist": "陈奕迅"}, {"title": "红玫瑰", "artist": "陈奕迅"}, 
               {"title": "左手指月", "artist": "黄霄云"}, {"title": "还可以爱吗", "artist": "黄霄云"}, {"title": "像我这样的人", "artist": "毛不易"}, {"title": "姻缘", "artist": "李仙姬"}, {"title": "张三的歌", "artist": "蔡琴"},
               {"title": "夜来香", "artist": "蔡琴"}, {"title": "你的眼神", "artist": "蔡琴"}, {"title": "掐死你的温柔", "artist": "蔡琴"}, {"title": "亲密爱人", "artist": "蔡琴"}, {"title": "笑红尘", "artist": "董真"}, 
               {"title": "剑起苍澜", "artist": "董真"}, {"title": "回梦游仙-寻仙", "artist": "董真"}, {"title": "相思引", "artist": "董真"}, {"title": "朱砂泪", "artist": "董真"}, {"title": "金缕衣", "artist": "董真"}, 
               {"title": "醉梦仙霖", "artist": "董真"}, {"title": "雕花笼", "artist": "董真"}, {"title": "下雨天", "artist": "南拳妈妈"}, {"title": "橘子汽水", "artist": "南拳妈妈"}, {"title": "无人之岛", "artist": "任然"}, 
               {"title": "花雨落", "artist": "任然"}, {"title": "飞鸟和蝉", "artist": "任然"}, {"title": "山外小楼夜听雨", "artist": "任然"}, {"title": "火烧的寂寞", "artist": "何洁"}, {"title": "逃脱", "artist": "何洁"}, 
               {"title": "把你藏在歌里面", "artist": "何洁"}, {"title": "请不要对我说sorry", "artist": "何洁"}, {"title": "你一定要幸福", "artist": "何洁"}, {"title": "想你笑", "artist": "黄雅莉"}, {"title": "蝴蝶泉边", "artist": "黄雅莉"}, 
               {"title": "谁", "artist": "王贰浪"}, {"title": "像鱼", "artist": "王贰浪"}, {"title": "遥远的歌", "artist": "刘惜君"}, {"title": "怎么唱情歌", "artist": "刘惜君"}, {"title": "菩提偈", "artist": "刘惜君"}, 
               {"title": "红颜劫", "artist": "姚贝娜"}, {"title": "菩萨蛮", "artist": "姚贝娜"}, {"title": "红颜旧", "artist": "崔子格"}, {"title": "可念不可说", "artist": "崔子格"}, {"title": "风吹麦浪", "artist": "孙俪"},
               {"title": "爱如空气", "artist": "孙俪"}, {"title": "一个像夏天一个像秋天", "artist": "范玮琪"}, {"title": "最初的梦想", "artist": "范玮琪"}, {"title": "到不了", "artist": "范玮琪"}, {"title": "最重要的决定", "artist": "范玮琪"}, 
               {"title": "是非题", "artist": "范玮琪"}, {"title": "如果的事", "artist": "范玮琪"}, {"title": "红妆", "artist": "徐良"}, {"title": "客官不可以", "artist": "徐良"}, {"title": "和平分手", "artist": "徐良"}, 
               {"title": "坏女孩", "artist": "徐良"}, {"title": "月亮之上", "artist": "凤凰传奇"}, {"title": "自由飞翔", "artist": "凤凰传奇"}, {"title": "最炫民族风", "artist": "凤凰传奇"}, {"title": "套马杆", "artist": "乌兰图雅"}, {"title": "女人花", "artist": "梅艳芳"}, 
               {"title": "上海滩", "artist": "叶丽仪"}, {"title": "相见恨晚", "artist": "彭佳慧"}, {"title": "囚鸟", "artist": "彭羚"}, {"title": "情深深雨蒙蒙", "artist": "孙露"}, {"title": "风云", "artist": "屠洪刚"}, {"title": "真爱你的云", "artist": "黄国俊"}, 
               {"title": "永远永远", "artist": "李翊君"}, {"title": "哭砂", "artist": "张惠妹"}, {"title": "别在伤口撒盐", "artist": "张惠妹"}, {"title": "听海", "artist": "张惠妹"}, {"title": "告白气球", "artist": "周杰伦"}, {"title": "烟花易冷", "artist": "周杰伦"}, 
               {"title": "花海", "artist": "周杰伦"}, {"title": "小酒窝", "artist": "林俊杰"}, {"title": "江南", "artist": "林俊杰"}, {"title": "一千年以后", "artist": "林俊杰"}, {"title": "当你", "artist": "林俊杰"}, {"title": "夏天的风", "artist": "温岚"}, 
               {"title": "同手同脚", "artist": "温岚"}, {"title": "你", "artist": "林依晨"}, {"title": "心愿便利贴", "artist": "元若蓝"}, {"title": "半情歌", "artist": "元若蓝"}, {"title": "99次我爱他", "artist": "元若蓝"}, {"title": "特务J", "artist": "蔡依林"}, 
               {"title": "今天你要嫁给我", "artist": "蔡依林"}, {"title": "舞娘", "artist": "蔡依林"}, {"title": "日不落", "artist": "蔡依林"}, {"title": "我知道你很难过", "artist": "蔡依林"}, {"title": "妥协", "artist": "蔡依林"}, {"title": "繁星", "artist": "至上励合"},
               {"title": "棉花糖", "artist": "至上励合"}, {"title": "只对你有感觉", "artist": "飞轮海"}, {"title": "小情歌", "artist": "苏打绿"}, {"title": "无与伦比的美丽", "artist": "苏打绿"}, {"title": "突然好想你", "artist": "五月天"}, {"title": "你不是真正的快乐", "artist": "五月天"}, 
               {"title": "温柔", "artist": "五月天"}, {"title": "不想长大", "artist": "SHE"}, {"title": "一眼万年", "artist": "SHE"}, {"title": "波斯猫", "artist": "SHE"}, {"title": "Super Star", "artist": "SHE"}, {"title": "孤单心事", "artist": "蓝又时"},
               {"title": "一个人想着一个人", "artist": "曾沛慈"}, {"title": "锁麟囊", "artist": "戏曲"}, {"title": "红娘", "artist": "戏曲"}, {"title": "女驸马", "artist": "戏曲"}, {"title": "梨花颂", "artist": "戏曲"}, {"title": "新贵妃醉酒", "artist": "戏曲"}, 
               {"title": "小河淌水", "artist": "龚琳娜"}, {"title": "枉凝眉", "artist": "陈力"}, {"title": "葬花吟", "artist": "冯珊珊"}, {"title": "相思", "artist": "毛阿敏"}, {"title": "女儿情", "artist": "吴静"}, {"title": "何必西天万里遥", "artist": "吴静"}, 
               {"title": "敢问路在何方", "artist": "蒋大为"}, {"title": "Lydia", "artist": "飞儿乐团"}, {"title": "我们的爱", "artist": "飞儿乐团"}, {"title": "月半弯", "artist": "飞儿乐团"}, {"title": "千年之恋", "artist": "飞儿乐团"}, {"title": "海底", "artist": "一只榴莲"},
               {"title": "云与海", "artist": "阿YueYue"}, {"title": "听见下雨的声音", "artist": "A-Lin"}];

// 状态管理
let state = {
    filteredSongs: [],
    currentPage: 1,
    currentSort: { field: null, ascending: true },
    favoriteSongs: new Set(JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.FAVORITES) || '[]'))
};

// 语言检测函数
function detectLanguage(title) {
    // 检查是否包含中文字符
    if (/[\u4e00-\u9fff]/.test(title)) return 'chinese';
    // 检查是否包含日文字符（包括假名和汉字）
    if (/[\u3040-\u30ff\u31f0-\u31ff\u3400-\u4dbf\u4e00-\u9fff]/.test(title)) return 'japanese';
    // 检查是否为纯英文字符
    if (/^[A-Za-z\s\-\'\"]+$/.test(title)) return 'english';
    // 默认返回中文
    return 'chinese';
}

// 获取标签
function getTag(type) {
    switch (type) {
        case 'japanese': return 'J-POP';
        case 'english': return 'Pop';
        case 'chinese': return 'C-POP';
        default: return 'Other';
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeBackgroundMusic();
    initializeSongs();
    setupEventListeners();
    setupKeyboardShortcuts();
});

// 音乐播放器初始化
function initializeBackgroundMusic() {
    const audio = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const volumeSlider = document.getElementById('volumeSlider');
    
    // 恢复音量设置
    const savedVolume = localStorage.getItem(CONFIG.STORAGE_KEYS.VOLUME);
    const initialVolume = savedVolume ? parseFloat(savedVolume) : CONFIG.DEFAULT_VOLUME;
    audio.volume = initialVolume;
    volumeSlider.value = initialVolume * 100;
    
    // 恢复播放状态
    const lastPlayedState = localStorage.getItem(CONFIG.STORAGE_KEYS.LAST_PLAYED) === 'playing';
    if (lastPlayedState) {
        audio.play().catch(() => {
            console.log('等待用户交互以开始播放');
        });
    }
    
    // 音量控制
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        audio.volume = volume;
        localStorage.setItem(CONFIG.STORAGE_KEYS.VOLUME, volume.toString());
    });
    
    // 播放控制
    musicToggle.addEventListener('click', () => toggleBackgroundMusic());
    
    // 错误处理
    audio.addEventListener('error', (e) => {
        console.error('背景音乐加载失败:', e);
        musicToggle.style.display = 'none';
    });
}

// 切换背景音乐播放状态
function toggleBackgroundMusic() {
    const audio = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    if (audio.paused) {
        audio.play().then(() => {
            musicToggle.classList.add('is-playing');
            localStorage.setItem(CONFIG.STORAGE_KEYS.LAST_PLAYED, 'playing');
        }).catch(error => {
            console.error('播放失败:', error);
        });
    } else {
        audio.pause();
        musicToggle.classList.remove('is-playing');
        localStorage.setItem(CONFIG.STORAGE_KEYS.LAST_PLAYED, 'paused');
    }
}

// 初始化歌曲数据
function initializeSongs() {
    state.filteredSongs = songs.map(song => ({
        ...song,
        type: detectLanguage(song.title),
        tag: getTag(detectLanguage(song.title)),
        isHot: Math.random() < CONFIG.HOT_SONG_RATIO
    }));
    
    updateArtistFilter();
    updateStatistics();
    renderSongs();
}

// 设置事件监听器
function setupEventListeners() {
    // 排序按钮
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const field = e.target.closest('.sort-btn').dataset.sort;
            handleSort(field);
        });
    });
    
    // 歌手过滤
    document.getElementById('artistFilter').addEventListener('change', (e) => {
        filterByArtist(e.target.value);
    });
    
    // 搜索
    document.getElementById('searchInput').addEventListener('input', (e) => handleSearch(e));
    
    // 过滤按钮
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            handleFilter(e.target.closest('.filter-btn').dataset.type);
        });
    });
    
    // 页面可见性变化处理
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            const audio = document.getElementById('bgMusic');
            if (!audio.paused) {
                toggleBackgroundMusic();
            }
        }
    });
}

// 键盘快捷键设置
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') {
            if (e.key === 'Escape') {
                e.target.blur();
            }
            return;
        }

        switch (e.key) {
            case ' ':
                e.preventDefault();
                toggleBackgroundMusic();
                break;
            case 'ArrowRight':
                navigatePage(state.currentPage + 1);
                break;
            case 'ArrowLeft':
                navigatePage(state.currentPage - 1);
                break;
            case '/':
                e.preventDefault();
                document.getElementById('searchInput').focus();
                break;
        }
    });
}

// 页面导航
function navigatePage(pageNumber) {
    const totalPages = Math.ceil(state.filteredSongs.length / CONFIG.SONGS_PER_PAGE);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
        state.currentPage = pageNumber;
        renderSongs();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// 排序处理
function handleSort(field) {
    const sortButton = document.querySelector(`[data-sort="${field}"]`);
    
    if (state.currentSort.field === field) {
        state.currentSort.ascending = !state.currentSort.ascending;
    } else {
        state.currentSort.field = field;
        state.currentSort.ascending = true;
    }
    
    document.querySelectorAll('.sort-btn i').forEach(icon => {
        icon.className = 'fas fa-sort-alpha-down';
    });
    
    if (!state.currentSort.ascending) {
        sortButton.querySelector('i').className = 'fas fa-sort-alpha-up';
    }
    
    state.filteredSongs.sort((a, b) => {
        let compareResult = 0;
        if (field === 'title') {
            compareResult = a.title.localeCompare(b.title, 'zh-CN');
        } else if (field === 'artist') {
            compareResult = a.artist.localeCompare(b.artist, 'zh-CN');
        }
        return state.currentSort.ascending ? compareResult : -compareResult;
    });
    
    state.currentPage = 1;
    renderSongs();
}

// 歌手过滤处理
function filterByArtist(artist) {
    if (!artist) {
        state.filteredSongs = [...songs];
    } else {
        state.filteredSongs = songs.filter(song => song.artist === artist);
    }
    state.currentPage = 1;
    renderSongs();
}

// 搜索处理
function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (!query) {
        state.filteredSongs = [...songs];
    } else {
        state.filteredSongs = songs.filter(song => 
            song.title.toLowerCase().includes(query) || 
            song.artist.toLowerCase().includes(query)
        );
    }
    
    state.currentPage = 1;
    renderSongs();
}

// 过滤处理
function handleFilter(type) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === type);
    });
    
    switch (type) {
        case 'all':
            state.filteredSongs = [...songs];
            break;
        case 'hot':
            state.filteredSongs = songs.filter(song => song.isHot);
            break;
        case 'favorite':
            state.filteredSongs = songs.filter(song => state.favoriteSongs.has(song.title));
            break;
        default:
            state.filteredSongs = songs.filter(song => song.type === type);
    }
    
    state.currentPage = 1;
    renderSongs();
}

// 收藏功能
function toggleFavorite(title) {
    if (state.favoriteSongs.has(title)) {
        state.favoriteSongs.delete(title);
    } else {
        state.favoriteSongs.add(title);
    }
    
    localStorage.setItem(
        CONFIG.STORAGE_KEYS.FAVORITES, 
        JSON.stringify([...state.favoriteSongs])
    );
    
    if (document.querySelector('.filter-btn[data-type="favorite"]').classList.contains('active')) {
        handleFilter('favorite');
    } else {
        renderSongs();
    }
}

// 更新艺术家过滤器
function updateArtistFilter() {
    const artistFilter = document.getElementById('artistFilter');
    const artists = [...new Set(songs.map(song => song.artist))].sort();
    
    artistFilter.innerHTML = '<option value="">所有歌手</option>';
    
    artists.forEach(artist => {
        const option = document.createElement('option');
        option.value = artist;
        option.textContent = artist;
        artistFilter.appendChild(option);
    });
}

// 更新统计信息
function updateStatistics() {
    document.getElementById('totalSongs').textContent = songs.length;
    document.getElementById('chineseSongs').textContent = 
        songs.filter(song => detectLanguage(song.title) === 'chinese').length;
    document.getElementById('japaneseSongs').textContent = 
        songs.filter(song => detectLanguage(song.title) === 'japanese').length;
    document.getElementById('englishSongs').textContent = 
        songs.filter(song => detectLanguage(song.title) === 'english').length;
}

// 渲染分页
function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    
    const totalPages = Math.ceil(state.filteredSongs.length / CONFIG.SONGS_PER_PAGE);
    
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('page-btn');
        if (i === state.currentPage) pageButton.classList.add('active');
        pageButton.addEventListener('click', () => navigatePage(i));
        pagination.appendChild(pageButton);
    }
}

// 渲染歌曲列表
function renderSongs() {
    const songGrid = document.getElementById('songGrid');
    songGrid.innerHTML = '';
    
    const start = (state.currentPage - 1) * CONFIG.SONGS_PER_PAGE;
    const end = start + CONFIG.SONGS_PER_PAGE;
    const songsToDisplay = state.filteredSongs.slice(start, end);
    
    if (songsToDisplay.length === 0) {
        songGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-music"></i>
                <p>没有找到相关歌曲</p>
            </div>
        `;
        return;
    }
    
    songsToDisplay.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.classList.add('song-card');
        const isFavorite = state.favoriteSongs.has(song.title);
        
        songDiv.innerHTML = `
            <div class="song-info">
                <h3 class="song-title">${song.title}</h3>
                <div class="song-meta">
                    <span class="song-artist">${song.artist}</span>
                    <span class="tag">${song.tag}</span>
                </div>
                ${song.isHot ? '<span class="hot-tag">HOT</span>' : ''}
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                        onclick="toggleFavorite('${song.title.replace(/'/g, "\\'")}')">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        `;
        
        songGrid.appendChild(songDiv);
    });
    
    renderPagination();
}
