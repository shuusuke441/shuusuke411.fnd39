'use strict';

// DOMの置換
const dom = {
  taskInput: document.getElementById("taskInput"),
  taskLimit: document.getElementById("tasklimit"),
  addTaskBtn: document.getElementById("addTaskBtn"),
  taskList: document.getElementById("taskList"),
  taskFinList: document.getElementById("taskfinList"),
  rulettoBtn: document.getElementById("rulettoBtn"),
  selectTask: document.getElementById("selecttask"),
  character: document.getElementById("character"),
  //追加機能宣言
  myAudio: document.getElementById("myAudio"),
  myAudio2: document.getElementById("myAudio2"),
  level: document.getElementById("level"),
  exp: document.getElementById("exp"),
  nextExp: document.getElementById("nextExp"),
  expFill: document.getElementById("exp_fill"),
  expBar: document.getElementById("exp_bar")
};

// 育成ゲーム要素用データ
let expNum = 0;
let levelNum = 1;
let nextExpNum = 100;

function createTaskElement(taskText, limitDay) {
  const li = document.createElement("li");
  li.textContent = taskText;

  const createTime = new Date();
  const addTime = document.createElement("small");
  addTime.textContent = `作成日時: ${createTime.toLocaleString()}`;
  li.appendChild(addTime);

  const limitTime = document.createElement("small");
  if (limitDay) {
    const now = new Date();
    const deadline = new Date(limitDay);
    const diffHours = (deadline - now) / (1000 * 60 * 60); 

    if (diffHours <= 24 && diffHours > 0) {
      limitTime.classList.add("due-soon");
    }
  }



  limitTime.textContent = limitDay
    ? ` 期限: ${new Date(limitDay).toLocaleString()}`
    : ' 期限: なし';
  li.appendChild(limitTime);

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "完了";
  completeBtn.addEventListener("click", () => completeTask(li, completeBtn));

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "削除";
  deleteBtn.addEventListener("click", () =>{ 
    li.remove();
    saveToLocalStorage();
  });
 
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);

  return li;
}

function addTask(event) {
 
  const taskText = dom.taskInput.value.trim();
  const limitDay = dom.taskLimit.value;

  if (taskText === "") {
    alert("正しく入力できていません. タスクを入力してください！");
    return;
  }

  const li = createTaskElement(taskText, limitDay);
  dom.taskList.appendChild(li);
   saveToLocalStorage();

  dom.taskInput.value = "";
  }


function completeTask(li, completeBtn) {
  li.classList.add("done");
  dom.taskList.removeChild(li);
  dom.taskFinList.appendChild(li);
  li.removeChild(completeBtn);
  gainExp(10); // 経験値獲得
  saveToLocalStorage();
}

function gainExp(amount) {
  expNum += amount;
  dom.exp.textContent = expNum;
  updateExpBar();

  if (expNum >= nextExpNum) {
    levelUp();
  }
  saveToLocalStorage();
}

function levelUp() {
  expNum = expNum - nextExpNum;
  levelNum++;
  nextExpNum += 100;

  dom.level.textContent = levelNum;
  dom.exp.textContent = expNum;
  dom.nextExp.textContent = nextExpNum;

  updateExpBar();
  dom.myAudio2.play();
  updateCharacterImage();
}

function updateExpBar() {
  const percent = (expNum / nextExpNum) * 100;
  dom.expFill.style.width = `${percent}%`;
}

function updateCharacterImage() {
  let imageUrl = "";
  if(levelNum >= 50) {
    imageUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj2E5atK6bGp77ov-KRNgWDRURKS55fk2nf_SuUUSqcrbjDjVFY4DWzMQHswTOZmWrxW5XlGQGqcXePqwgN-kRlw58N4i_WxrIXZrPBkKFM4fFF2Vewx2ywqEf4ZVJqql2sfZ9o-YMeUE0/s180-c/character_cthulhu_azathoth.png";
  }else if(levelNum >= 40) {
    imageUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiREcvw5LX0HlzvqRSzOgdN8Awt7IqNyObkBkkLRhPCT7TyhPwZiesw3RqoocqGizKwH_nfT_LsyBKdNa4w4uoA7M4qhh82uB4-Fk1zBQhpNjrRITUJMrt_Cf-Pw_Mjzb4pOuH3q5sZ4XY/s180-c/character_cthulhu_hastur.png";
  }else if(levelNum >= 30) {
    imageUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi7oZJuQmcY_6Dob8m1HPGAq5u6VRMpDMhE7AHi1ipom3x1Rnm2AUzHVfnzoZ-7UDdpM83hIxNZBvSYBai1aHYTDjAkdL_m1eXBB9_5nG_XZdIXB-t4nuYfBWbdn26mLd6NtIWd_jp3lpM/s180-c/omen_syoujou.png";
  }else if(levelNum >= 20) {
    imageUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiXSyACLNaLNBocAQF_jxZ2KZhUE4-Y4aXMX6K9Ger02bjy4AZjb5UeRl2NeUfXlK-jFOC4PC21Ucj4QPwg0SB2C2Btp1i5C-Rgt5aj_-Jf2MvLkbome4YQ31g4T5VAm1qaAnDVD4Lzc4I/s180-c/fantasy_peryton.png";
  }else if(levelNum >= 15) {
    imageUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhazAzZjjJlfRp6CPsFUobmWrNFzNFFyBYU6TjZp6HEgdMmk2L47SfZbPpNk6R4ejY3JVG65EfrzvtvGTYVOZe4-PlvWgRMU2ImXXKV17vMdHFoQonmLQTDWQ03z90j9i_GR3KMLsGpvJOc/s180-c/golden_egg.png";
  }else if (levelNum >= 10) {
    imageUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjkC6ttflvux0pShojUbjbkme82R7a943avGBeJZf5ZVl9RMSSP5TH8siaiYPsYpyNCGzSmlR0TwHKFjELx1GI6W24Yi6fVCJs2z49zAYbG7vkFHp3xvX49L1nAxkgzkyup1v8gkiekct7w/s180-c/shinwa_zeus.png";
  }else if (levelNum >= 5) {
    imageUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjtzOSh5RtTHz515R23Yc7ROVvVaf91S5y5elKZYjnSAa0bGnfAUjs8Tqg_hQCx25m6iMCTb1eQyKJa_zacaS5z2CYM3ZxBW4wgIo_ISufy24nru8gtfbJSLbPcuWZt9bDBPT1hsk3GNXrU/s180-c/fantasy_dragon_wyvern.png";
  } else if (levelNum >= 4) {
    imageUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgo-AaAJdj7q1XzCREPSpedoeZt6_Wb1fvlc9pSJMzfgazTFqrY2wQTVH22m1y5-AsDFRQKpbka7xe44yuvsp1k6yHh9_8AmsRy9sn7QQ6zfaNwQHHHA-BPD1VQ-Hq11RzpAxreTuSIyNe4/s180-c/animal_hagewashi_hagetaka.png";
  } else if (levelNum >= 3) {
    imageUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhIo7XmVdDa6pFYOkrGQ4dF8eoJIx-PisC26ZLF1FBz-XnhXyU3cSHO48K4Li4b7_J7mmE72Y4ywSifjAgpKjdyAaZdPcTqE-mV1wlc7XRta5zJhBgow_QKZX4QkTkJnI-S_JvYd26beKQI/s180-c/character_karaage.png";
  } else if (levelNum >= 2) {
    imageUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhoo1K7MPUKW-dzDxsRKYw-9ZUgu6PCs7u-4v9Mj8gMau7N1ewfC16IusZT9U-qBnTR2u_rI_BCLEc9-sVV0M32e-ABz2dPN2tKBMu26ZbAr5dahgTmCvlz5LwpGrU4SSuID6Ns7k6kQytZ/s180-c/bird_maruitori.png";
  } else {
    imageUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjotLYgn4pahnuMnKU_CzFs90KeVd5MduGBGl-0rfcmdG5XexoSb3jEZsoOhCnF2qgI3V_LpDs90dJz655MIrXc9ZuiHmK8L_lsAZbprEAMOxLV6PO2UoZbvgmliJzYPYWyYJ4gmWtcWLA/s180-c/character_humpty_dumpty.png";
  }

  dom.character.src = imageUrl;
}

// タスクルーレット機能
function pickRandomTask() {
  const tasks = dom.taskList.querySelectorAll("li");
  if (tasks.length === 0) {
    dom.selectTask.textContent = "タスクが何もないよ！";
    return;
  }

  const randomIndex = Math.floor(Math.random() * tasks.length);
  dom.selectTask.textContent = `選ばれたタスクは：${tasks[randomIndex].firstChild.textContent}`;
  dom.myAudio.play();
}

function saveToLocalStorage() {
  const tasks = [];

  dom.taskList.querySelectorAll("li").forEach(li => {
    tasks.push(taskToObject(li, false));
  });

  dom.taskFinList.querySelectorAll("li").forEach(li => {
    tasks.push(taskToObject(li, true));
  });

  const saveData = {
    tasks,
    progress: {
      expNum,
      levelNum,
      nextExpNum
    }
  };

  localStorage.setItem("taskGameData", JSON.stringify(saveData));
}

function taskToObject(li, done) {
  const text = li.firstChild.textContent.trim();
  const timeText = li.querySelectorAll("small")[0].textContent.replace("作成日時: ", "");
  const limitText = li.querySelectorAll("small")[1].textContent.replace(" 期限: ", "");

  return {
    text,
    created: new Date(timeText).toISOString(),
    limit: limitText === 'なし' ? "" : new Date(limitText).toISOString(),
    done
  };
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem("taskGameData");
  if (!saved) return;

  const data = JSON.parse(saved);

  dom.taskList.innerHTML = "";
  dom.taskFinList.innerHTML = "";

  data.tasks.forEach(task => {
    const li = createTaskElement(task.text, task.limit);
    if (task.done) {
      li.classList.add("done");
      dom.taskFinList.appendChild(li);

      const completeBtn = li.querySelector("button");
      if (completeBtn) completeBtn.remove();
    } else {
      dom.taskList.appendChild(li);
    }

    const smalls = li.querySelectorAll("small");
    if (task.created) smalls[0].textContent = `作成日時: ${new Date(task.created).toLocaleString()}`;
    if (task.limit) smalls[1].textContent = ` 期限: ${new Date(task.limit).toLocaleString()}`;
    else smalls[1].textContent = ` 期限: なし`;
  });
    //||演算子（論理OR）は左側の値が**falsy**（偽値、false, 0, "", null, undefined, NaNなど）の場合に右側の値を返します。
    // 一方、??演算子（Nullish coalescing）は左側の値が**nullまたはundefined**の場合にのみ右側の値を返します。
  expNum = data.progress.expNum || 0;
  levelNum = data.progress.levelNum || 1;
  nextExpNum = data.progress.nextExpNum || 100;

  dom.exp.textContent = expNum;
  dom.level.textContent = levelNum;
  dom.nextExp.textContent = nextExpNum;
  updateExpBar();
  updateCharacterImage();
}

// イベントリスナー
dom.addTaskBtn.addEventListener("click", addTask);
dom.rulettoBtn.addEventListener("click", pickRandomTask);
window.addEventListener("load", () => {
  loadFromLocalStorage();
});


