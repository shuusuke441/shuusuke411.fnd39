
'use strict';

const taskInput = document.getElementById("taskInput");
const tasklimit = document.getElementById("tasklimit")
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskfinList = document.getElementById("taskfinList");
const rulettoBtn = document.getElementById("rulettoBtn");
const selecttask = document.getElementById("selecttask");
const character = document.getElementById("character");
let expNum = 0;
let levelNum = 1;
let nextExpNum = 100;


let tasks = [];
addTaskBtn.addEventListener("click", function() {
  const taskText = taskInput.value.trim();
  const limitDay = tasklimit.value;
    if(taskText === ""){
      return alert("正しく入力できていません. タスクを入力してください！");
    }

    const li =document.createElement("li");
    li.textContent = taskText;

    //作成日時の追加
    const createtime = new Date();
    console.log(createtime);
    const addTime = document.createElement("small");
    addTime.textContent = `作成日時:
     ${createtime.toLocaleString()}`;
    li.appendChild(addTime);

    //削除日時の追加
    const limittime = document.createElement("small");
    limittime.textContent = limitDay ? ` 期限: ${new Date(limitDay).toLocaleString()}` : ' 期限: なし';
    li.appendChild(limittime);

     //完了ボタン
    const bttn = document.createElement("button");
    bttn.textContent = "完了";
    bttn.addEventListener("click", function(){
    li.classList.add("done");
    taskList.removeChild(li);
    taskfinList.appendChild(li);
    li.removeChild(bttn);
    levelUp(expNum);
    });
  
  
  
  //削除ボタン
  const debttn = document.createElement("button");
  debttn.textContent = "削除";
  debttn.addEventListener("click", function(){
    li.remove();
  });
  
  //liのリストにボタンを追加
  li.appendChild(bttn);
  li.appendChild(debttn);
  //未完了リストにボタンを追加
  taskList.appendChild(li);

  taskInput.value = "";
});

//ルーレット企画
const myAudio = document.getElementById("myAudio");
rulettoBtn.addEventListener("click", Sound1);

function Sound1() {
  myAudio.play();
  //https://soundeffect-lab.info/sound/anime/こちらがMP３の引用元です。確認済み
}
rulettoBtn.addEventListener("click", function(){
  const tasks = taskList.querySelectorAll("li");
  if(tasks.length === 0){
    selecttask.textContent = "タスクが何もないよ！";
    return;
  }
  const randomNum = Math.floor(Math.random() * tasks.length);
  selecttask.textContent = `選ばれたタスクは：${tasks[randomNum].firstChild.textContent}`
});

//レベルアップ企画
const level = document.getElementById("level");
const exp = document.getElementById("exp");
const nextExp = document.getElementById("nextExp");
const exp_fill = document.getElementById("exp_fill");
const exp_bar = document.getElementById("exp_bar");

//レベルアップ
function levelUp(num){
  expNum = expNum + 10;
    exp.textContent = expNum;
  if(num === nextExpNum){
    exp.textContent = 0;
    expNum = 0;
    levelNum = levelNum + 1;
    level.textContent = levelNum;
    nextExpUP(nextExpNum);
    Sound2()
    //下記画像リンクはどれも同じサイトからのものになります。フリー画像で確認済みです。
    if(levelNum >= 50){
      character.src= "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjtzOSh5RtTHz515R23Yc7ROVvVaf91S5y5elKZYjnSAa0bGnfAUjs8Tqg_hQCx25m6iMCTb1eQyKJa_zacaS5z2CYM3ZxBW4wgIo_ISufy24nru8gtfbJSLbPcuWZt9bDBPT1hsk3GNXrU/s180-c/fantasy_dragon_wyvern.png";
    }else if(levelNum >= 20){
      character.src= "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgo-AaAJdj7q1XzCREPSpedoeZt6_Wb1fvlc9pSJMzfgazTFqrY2wQTVH22m1y5-AsDFRQKpbka7xe44yuvsp1k6yHh9_8AmsRy9sn7QQ6zfaNwQHHHA-BPD1VQ-Hq11RzpAxreTuSIyNe4/s180-c/animal_hagewashi_hagetaka.png";
    }else if(levelNum >= 10){
      character.src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhugpMvQYTwORyEPiv79itvDimBE-OuHSjbrU5BtnSRijly6_H0PfGEWNbWgKSenjBq8Y2IGNFUPs1bJ-Lba7dW_R2Avw8YbfuO3Y1QIz8UcMFXoWr-XvzHl2PxnpNbQlXvsn6oc7x4a89x/s180-c/eto_remake_tori.png";
    }else if(levelNum >= 2){
      character.src = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj2C8RelIhXK1JMdJe3cgGAVdrShe-MXKcW3UV-8NyQmmpFQ4isibp212rK7ATvJq3KhAq28QmMnmOjxoyW1sKsXYe5BE_g6K7UP5vlRoEQvkzyW3vWIFDyj_LddBa90Qp_0y1cMk3h-kIn/s400/hiyoko_baby.png";
    }else {
      character.src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiVE8g58at6gfhiVSxRustgHDG4hwQVh6JFEcRkKBpcNFICAAdhh6qJZtzD1ULsmH-C8fozoUWJEzpck4AD8lAMuzxqahO-a8yLgOY-GbN9TfmqpUlysbTAiSYrkIKBAfaoHn1UA5GspD6b/s180-c/character_egg.png";
    }
  }
}
//次の経験値に
function nextExpUP(num){
  nextExpNum = nextExpNum + 100;
  nextExp.textContent = nextExpNum;
}

const myAudio2 = document.getElementById("myAudio2");
function Sound2() {
  myAudio2.play();
  //https://soundeffect-lab.info/sound/anime/こちらがMP３の引用元です。確認済み
}



