/*
難易度を選択＝カードのペア数を決める👉pairNumber
スタートボタンを押す
imageフォルダ内の全カードを配列に入れる👉arrayAll
配列をシャッフルする
配列からペアの数だけ取り出す👉arrayChoice
取り出したものをコピーして２枚ずつにする👉arrayPair
２枚ずつになった配列をさらにシャッフルする
配列と連動したファイル名の画像を配置する
画像はスタイルでBGを当てる
やさしいは５列表示。他は１０列表示
スタートボタンを押したら押せなくなる
リセットボタンでスタートボタンが復活
ペアになったらフェードアウト
ペアになったら国名付きの画像をスライド表示
全部ペアになったらゲームクリアを表示
*/

//HTMLが読み込まれたら処理開始
window.onload = function () {
  //時間計測用
  let startTime = 0; //スタート時の時間
  let stopTime = 0; //クリア時の時間
  const level1 = document.getElementById("level1"); //やさしいのラジオボタン
  const level2 = document.getElementById("level2"); //ふつうのラジオボタン
  const level3 = document.getElementById("level3"); //むずかしいのラジオボタン
  const level4 = document.getElementById("level4"); //激ムズのラジオボタン


  //カード設定
  const cardNumber = 142; //総カード数
  let pairNumber = 0; //表示するカードのペア数
  let pairCount = 0; //完成したペア数
  const clear = document.getElementById("js-game-clear"); //クリア画面
  const modal = document.getElementById("js-modal"); //ペア完成時のモーダル
  let flag = document.getElementById("js-pair-complete"); //ペア完成時のスライド画像
  const pointDisplay = document.getElementById("js-point"); //得点表示欄
  let completeNumber = document.getElementById("js-point-level"); //完成した数
  let point = document.getElementById("js-point-count"); //完成させる数


  //スタートボタンの処理
  const start = document.getElementById('js-game-start');
  const cards = document.getElementById('js-cards');
  start.addEventListener('click', () => {

    //ロゴ削除
    document.getElementById("js-game-logo").style.display = "none";

    //得点表示
    pointDisplay.style.display = "inline-block";
    point.innerHTML = pairCount; //完成しているペア数を得点に表示

    //時間計測開始
    startTime = Date.now();
    console.log(startTime);

    //レベルの選択
    const radio = document.getElementsByName('difficulty');
    const gameMode = radio.length;
    let checkValue = '';

    //チェック判定とペア数の代入
    for (let i = 0; i < gameMode; i++) {
      if (radio.item(i).checked) {
        checkValue = radio.item(i).value;
        console.log("ゲームモード：" + checkValue);
        switch (checkValue) {
          case 'easy':
            let levelEasy = checkValue;
            levelEasy = 5; //表示するカードのペア数
            pairNumber = levelEasy;
            console.log("ペア数：" + pairNumber);
            cards.classList.add("grid-5"); //表示用のクラスを追加
            completeNumber.innerHTML = pairNumber; //完成するペア数を得点に表示
            level2.style.display = "none"; //他のラジオボタンを削除
            level3.style.display = "none";
            level4.style.display = "none";
            break;
          case 'normal':
            let levelNormal = checkValue;
            levelNormal = 10; //表示するカードのペア数
            pairNumber = levelNormal;
            console.log("ペア数：" + pairNumber);
            cards.classList.add("grid-10");
            completeNumber.innerHTML = pairNumber; //完成するペア数を得点に表示
            level1.style.display = "none"; //他のラジオボタンを削除
            level3.style.display = "none";
            level4.style.display = "none";
            break;
          case 'hard':
            let levelHard = checkValue;
            levelHard = 20; //表示するカードのペア数
            pairNumber = levelHard;
            console.log("ペア数：" + pairNumber);
            cards.classList.add("grid-10");
            completeNumber.innerHTML = pairNumber; //完成するペア数を得点に表示
            level1.style.display = "none"; //他のラジオボタンを削除
            level2.style.display = "none";
            level4.style.display = "none";
            break;
          case 'very-hard':
            let levelVeryHard = checkValue;
            levelVeryHard = 30; //表示するカードのペア数
            pairNumber = levelVeryHard;
            console.log("ペア数：" + pairNumber);
            cards.classList.add("grid-10");
            completeNumber.innerHTML = pairNumber; //完成するペア数を得点に表示
            level1.style.display = "none";
            level2.style.display = "none";
            level3.style.display = "none";
            break;
        }
      }
    }

    //変数に配列を格納
    let arrayAll = [];

    //総カード数までくりかえし
    for (let i = 0; i < cardNumber; i++) {
      arrayAll.push(i);
    }
    console.log("カード全部：" + arrayAll);
    console.log("総枚数：" + arrayAll.length);

    // シャッフルの処理
    function shuffle(arrayAll) {
      let n = arrayAll.length;
      let temp, i;

      while (n) {
        i = Math.floor(Math.random() * n--);
        temp = arrayAll[n];
        arrayAll[n] = arrayAll[i];
        arrayAll[i] = temp;
      }
      return arrayAll;
    }

    //配列の中身をシャッフル
    shuffle(arrayAll);
    console.log("シャッフル後：" + arrayAll);

    //シャッフルした配列の先頭からペアの数だけ取得
    let arrayChoice = arrayAll.slice(0, pairNumber);
    console.log("チョイス後：" + arrayChoice);

    //取得したものをコピーして２枚ずつにする
    let arrayPair = arrayChoice.concat(arrayChoice);
    console.log("コピー後：" + arrayPair);

    //２枚ずつにした配列をさらにシャッフルする
    shuffle(arrayPair);
    console.log("シャッフル後：" + arrayPair);

    // カードを配置
    for (i = 0; i < (pairNumber * 2); i++) {
      let card = document.createElement('div'); //
      card.className = 'front back'; //class付与
      // card.setAttribute("id", "card");
      card.num = arrayPair[i]; //cardのnumプロパティに配列の番号を紐づけ
      card.style.backgroundImage = 'url(./images/first/' + (card.num + 1) + '.svg)'; //配列+1のファイル名の画像をスタイルで指定。backgroundImageはキャメルケースにする
      card.onclick = cardClick; //要素をクリックした際の挙動を登録
      cards.appendChild(card); //カード配置
    }
    //スタートボタンは１度押すと押せなくなる
    document.getElementById("js-game-start").setAttribute("disabled", true);
  });

  //リセットボタンの処理
  const reset = document.getElementById('js-game-reset');
  reset.addEventListener('click', () => {
    //カードを削除
    cards.innerHTML = '';

    //cardsのクラスを削除
    cards.classList.remove("grid-5", "grid-10");

    //スタートボタンが復活
    document.getElementById("js-game-start").removeAttribute("disabled");

    //カウントをゼロに
    pairCount = 0;
    console.log("完成ペア数" + pairCount);

    //モードセレクトを全表示に
    level1.style.display = "block";
    level2.style.display = "block";
    level3.style.display = "block";
    level4.style.display = "block";

    //得点表示を削除
    pointDisplay.style.display = "none";

    //クリア画面を削除
    clear.style.display = "none";
  });

  //カードの当たり判定
  let firstCard = null; //１枚目のカードを取得(引いてない場合はnull)
  let secondCard = null; //２枚目のカードを取得(引いてない場合はnull)
  console.log(firstCard, secondCard);


  //クリックした際の処理
  const cardClick = (eve) => {
    let cardDiv = eve.target; //クリックされた要素を取得
    console.log(cardDiv.num);

    //表面のカードや3枚目のカードをクリックしても何も起こらない。
    //containsで文字列の判定
    if (!cardDiv.classList.contains('back') || secondCard !== null) {
      return;
    }

    cardDiv.classList.remove('back'); //backクラスを削除して表面にする

    //もしそれが1枚目だったらfirstCardに代入
    if (firstCard === null) {
      firstCard = cardDiv;
      console.log("１枚目：" + firstCard.num);
      firstCard.classList.add("lock");
    }
    else {
      //2枚目だったらsecondCardに代入
      secondCard = cardDiv;
      console.log("２枚目：" + secondCard.num);
      secondCard.classList.add("lock");

      //２枚のカードの数字が同じだったら
      if (firstCard.num === secondCard.num) {

        point.innerHTML = pairCount + 1; //得点を表示

        modal.style.display = "block"; //モーダル表示

        flag.innerHTML = '<img src="./images/later/' + (secondCard.num + 1) + '.svg" alt="" class="slide">'; //スライド画像を表示

        //fadeoutクラスを付与する
        firstCard.classList.add('fadeout');
        secondCard.classList.add('fadeout');

        //firstCard,secondカードを共にnullに戻す
        [firstCard, secondCard] = [null, null];
        console.log(firstCard, secondCard);

        //4秒後にスライド画像を削除
        window.setTimeout(function () {
          flag.innerHTML = "";
          modal.style.display = "none";
        }, 4000);

        //カウントを追加
        pairCount++;
        console.log("完成ペア数" + pairCount);
        console.log("表示ペア数" + pairNumber);

        //全部揃ったら5秒後にクリア画面を表示
        if (pairCount == pairNumber) {
          //時間計測停止
          stopTime = Date.now();
          console.log(stopTime);

          //経過時間の計測
          let elapsedTime = stopTime - startTime;

          //表示形式を00:00:000に
          let displayElapsedTime = new Date(elapsedTime).toISOString().slice(14, 23);

          window.setTimeout(function () {
            document.getElementById('js-clear-time').innerHTML = displayElapsedTime;
            clear.style.display = "block";
          }, 5000);
        }
      }
      else {
        //不正解だった場合は0.8秒後に裏面に戻す
        setTimeout(() => {
          firstCard.classList.add('back');
          secondCard.classList.add('back');
          firstCard.classList.remove("lock");
          secondCard.classList.remove("lock");
          [firstCard, secondCard] = [null, null];
          console.log(firstCard, secondCard);
        }, 800);
      }
    }
  };
};