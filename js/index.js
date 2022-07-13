const billInput = document.getElementById("bill"),
  peopleNumber = document.getElementById("people-count"),
  resetBtn = document.getElementById(`reset`),
  tips = document.querySelectorAll(".tip"),
  tipAmount = document.getElementById("tip-amount"),
  total = document.getElementById(`total`),
  customTipInput = document.getElementById("custom-tip");

// Reset
resetBtn.addEventListener("click", function () {
  billInput.value = "";
  peopleNumber.value = "";

  if (document.querySelector(".tip.active")) {
    document.querySelector(".tip.active").classList.remove("active");
  }

  tipAmount.textContent = "0.00";
  total.textContent = "0.00";
});

billInput.addEventListener("input", function () {
  let lastActive = document.querySelector(".tip.active");

  if (lastActive) {
    calcBill(lastActive.dataset.tip);
  }
});

peopleNumber.addEventListener("input", function () {
  let lastActive = document.querySelector(".tip.active");

  if (lastActive) {
    calcBill(lastActive.dataset.tip);
  }
});

tips.forEach((tip) => {
  tip.addEventListener("click", function () {
    if (tip.classList.contains("active") && tip.hasAttribute("data-tip")) {
      tip.classList.remove("active");
      return;
    }

    const lastActive = document.querySelector(".tip.active");

    if (lastActive) {
      lastActive.classList.remove("active");
    }

    tip.classList.add("active");

    calcBill(tip.getAttribute("data-tip") || 0);
  });
});

function calcBill(tip = 0) {
  const billVal = +billInput.value || 0;
  const peopleVal = +peopleNumber.value || 0;

  let tipAmountResult = (billVal * (+tip / 100)) / peopleVal;
  let totalVal = billVal / 5 + tipAmountResult;

  if (peopleVal === 0) {
    return;
  }

  tipAmount.textContent = tipAmountResult.toFixed(2);
  total.textContent = totalVal.toFixed(2);
}

customTipInput.addEventListener("input", function () {
  calcBill(customTipInput.value);
});
