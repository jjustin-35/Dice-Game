let bigBtn = document.getElementById('bigBtn')
let smallBtn = document.getElementById('smallBtn')
let showAnswer = document.getElementById('answer')
let deposit = document.getElementById('deposit')
let depositBtn = document.getElementById('depositBtn')
let allMoney = document.getElementById('allMoney')
// dice
let dice = document.getElementById('dice')
let showResult = document.getElementById('result')
// 籌碼
let Name1 = document.getElementById('name1')
let Name2 = document.getElementById('name2')
let chips1 = document.getElementById('money1')
let chips2 = document.getElementById('money2')

// 要記得prompt是input功能
let inputName = '陳子瑜'// prompt('請輸入姓名')
while (true) {
    if (inputName === "") {
        inputName = '輸入名子'//prompt('請輸入姓名')
    }else{break}
}
//傳入名字
Name1.innerText = inputName
Name2.innerText = inputName

//資金
let money = 10000

//比大小
function showBigSmall(string) {
    let bigSmall = '您選擇的是：'
    bigSmall += string
    showAnswer.innerText = bigSmall
    
    return bigSmall
}
let guessAnswer = null
bigBtn.addEventListener('click', function () {
    showBigSmall('大')
    guessAnswer = 1
    return guessAnswer
})
smallBtn.addEventListener('click', function () {
    showBigSmall('小')
    guessAnswer = 0
    return guessAnswer
})

//押金
let showDeposit = 0
depositBtn.addEventListener('click', function () {
    showDeposit += Number(deposit.value)
    if (showDeposit <= money) {
        allMoney.innerText = `累積押金：${showDeposit}元`
    } else {
        allMoney.innerText = '您的資金不足，請重新輸入'
        showDeposit = 0
    }
    return showDeposit
})

//骰骰子
function playDice() {
    // JS沒有直接取亂數的方法，Math.random是取0~1間小數，Math.floor是取整數，將random的值*7，則會回傳0~6間的整數。
    let diceNum = Math.floor(Math.random() * 19)
    let result
    if (diceNum >= 9) {
        result = 1
    } else {
        result = 0
    }
    return [diceNum, result]
}

// 猜測 v.s 結果
function whoWin(bolin) {
    if (bolin == true) {
        console.log('贏了!')
        money += showDeposit
        showDeposit = 0
    } else {
        console.log('輸了...')
        money -= showDeposit
        showDeposit = 0
    }
}

// 開始骰骰子
dice.addEventListener('click', function () {
    let diceResult = playDice()
    console.log(diceResult[0])
    let string
    let winorLose

    // 骰子結果
    if (diceResult[1] == 0) { string = '小' } else { string = '大' }
    
    function ShowResult() {
        showResult.innerHTML = `
        <div class="result">骰子的結果：${diceResult[0]}</div>
        <div class="result">大小為：${string}</div>
        <div class="result">您${winorLose}了！共${winorLose}了${showDeposit}元</div>
        `
    }
    
    // 判斷輸贏
    if (guessAnswer == null) {
        showResult.innerHTML = '<p class="result">請先猜大小</p>'
    } else if (showDeposit == 0) { 
        showResult.innerHTML = '<p class="result">請先輸入押金</p>'
    }
    else if (guessAnswer == diceResult[1] && guessAnswer != null) {
        winorLose = '贏'
        ShowResult()
        whoWin(true)
    } else {
        winorLose = '輸'
        ShowResult()
        whoWin(false)
    }
    
    chips1.innerText = `您的籌碼：${money}`
    chips2.innerText = `您的籌碼：${money}`
    allMoney.innerText = ''
    showBigSmall('')
})