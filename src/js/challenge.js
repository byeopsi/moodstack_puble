const challengeCardBody = document.querySelector(".challenge-card-body")
let challengeId = 0;
const challengePercentMap = {};

// 횟수, 기한 두 가지로 구분해서 추가
// 챌린지 추가버튼 클릭 (횟수)
function showAddChallengeDiv() {
  if (document.querySelector(".add-challenge-div")) return;

  const addDiv = document.createElement("div");
  addDiv.classList.add("challenge");
  addDiv.classList.add("add-challenge-div");
  addDiv.innerHTML = `
    <input id="challenge-title" placeholder="챌린지 제목" />
    <input id="challenge-amount" type="number" placeholder="총 횟수" />
    <div class="challenge-check-btns">
      <span onclick="saveChallenge()" class="material-symbols-outlined">check</span>
      <span onclick="closeAddChallenge()" class="material-symbols-outlined">close</span>
    </div>
    `

  challengeCardBody.append(addDiv);
  const challengeTitle = document.querySelector("#challenge-title");
  challengeTitle.focus();
  challengeCardBody.scrollLeft = challengeCardBody.scrollWidth;

}

// 챌린지 저장
function saveChallenge() {
  const currentId = challengeId;
  const addChallengeDiv = document.querySelector(".add-challenge-div");
  const challengeTitle = addChallengeDiv.querySelector("#challenge-title");
  const challengeAmount = addChallengeDiv.querySelector("#challenge-amount");
  const title = challengeTitle.value.trim();
  const amount = challengeAmount.value.trim();
  challengePercentMap[currentId] = 0;

  if (!title) return;
  if (!amount) return;

  const challengeDiv = document.createElement("div");
  challengeDiv.classList.add("challenge");
  challengeDiv.id = 'challenge=' + String(challengeId);
  challengeDiv.innerHTML = `
    <div class="challenge-info">
      <span class="challenge-title">${title}</span>
      <span class="delete-challenge material-symbols-outlined">close</span>
    </div>
    <div class="challenge-contents">
      <div class="challenge-charts">
        <canvas id="challenge-chart-${challengeId}" class="chart" width="180" height="180" style="display: block; box-sizing: border-box; height: 144px; width: 144px;"></canvas>
      </div>
      <div class="challenge-btns">
        <button class="challenge-btn challenge-up bg-gray-300">
          <span class="material-symbols-outlined">
            check
          </span>
        </button>
        <button class="challenge-btn challenge-down bg-gray-400">
          <span class="material-symbols-outlined">
              close_small
          </span>
        </button>
      </div>
    </div>
  `
  challengeCardBody.append(challengeDiv);
  makeChart(currentId, amount);

  const upBtn = challengeDiv.querySelector(".challenge-up");
  const downBtn = challengeDiv.querySelector(".challenge-down");
  const deleteChallengeBtn = challengeDiv.querySelector(".delete-challenge");

  // 챌린지 성공,실패 이벤트 리스너 추가
  upBtn.addEventListener("click", () => {
    challengePercentMap[currentId] += 100 / amount;
    if (challengePercentMap[currentId] > 100)
      challengePercentMap[currentId] = amount;

    updateChart(currentId, challengePercentMap[currentId]);
  });

  downBtn.addEventListener("click", () => {
    challengePercentMap[currentId] -= 10;
    if (challengePercentMap[currentId] < 0)
      challengePercentMap[currentId] = 0;

    updateChart(currentId, challengePercentMap[currentId]);
  });

  // 챌린지 삭제
  deleteChallengeBtn.addEventListener("click", () => {
    if(confirm("챌린지를 삭제하시겠습니까?")){
      // chartMap[currentId].destroy();
      challengeDiv.remove();
    } else {
      return;
    }
  });

  challengeId++;
  document.querySelector(".add-challenge-div").remove();
}

// 챌린지 작성 취소
function closeAddChallenge() {
  const addChallengeDiv = document.querySelector('.add-challenge-div');
  addChallengeDiv.remove();
}
