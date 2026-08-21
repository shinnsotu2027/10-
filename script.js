let companyPlayer;
let departmentPlayer;

// YouTube API の準備完了時に発火
function onYouTubeIframeAPIReady() {
  companyPlayer = new YT.Player('company-video-player', {
    videoId: '8fEBH-6tpIU', // ★会社説明のYouTube動画ID
    playerVars: {
      'origin': location.protocol + '//' + location.host // CORSセキュリティ対策
    },
    events: {
      'onStateChange': onCompanyVideoStateChange
    }
  });
}

// 会社説明動画が終わったとき
function onCompanyVideoStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    showSection('next-section');
  }
}

// 「事業部選択へ進む」ボタンをクリックした時
function showDepartments() {
  showSection('department-section');
}

// 各事業部のカードをクリックした時
function changeVideo(videoId) {
  showSection('department-video-section');

  if (!departmentPlayer) {
    // 初めて再生する場合はプレイヤーを生成
    departmentPlayer = new YT.Player('department-video-player', {
      videoId: videoId,
      playerVars: {
        'autoplay': 1,
        'origin': location.protocol + '//' + location.host
      },
      events: {
        'onStateChange': onDepartmentVideoStateChange
      }
    });
  } else {
    // すでに作成済みの場合は動画IDを差し替えて再生
    departmentPlayer.loadVideoById(videoId);
  }
}

// ★事業部動画が終わったとき：アンケートを表示する
function onDepartmentVideoStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    showSection('survey-section');
  }
}

// 要素を表示して自動でスクロールする共通関数
function showSection(elementId) {
  const target = document.getElementById(elementId);
  if (target) {
    target.style.display = 'block';
    target.scrollIntoView({ behavior: 'smooth' });
  }
}