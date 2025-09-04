
'use strict';

const taskInput = document.getElementById("taskInput");
const tasklimit = document.getElementById("tasklimit")
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskfinList = document.getElementById("taskfinList");
const rulettoBtn = document.getElementById("rulettoBtn");
const selecttask = document.getElementById("selecttask");
let expNum = 0;


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
    expNum = expNum + 10;
    exp.textContent = expNum;
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


function levelUp(num){
  if(num >= nextExp){
    exp.textContent = 0;
    exp = exp - nextExp;
    level = level + 1;
  }
}

// function nextExpUP(num){
//   nextExp.textContent = num;
// }

