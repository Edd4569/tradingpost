const slider = document.getElementById("slider");
const result = document.getElementById("result");
const imageContainer = document.getElementById("image-container");
const imageContainer2 = document.getElementById("image-container2");
const sliderValue = document.getElementById("slider-value");
const additionalValue = document.getElementById("additional-value");
const calculatorBody = document.getElementById("calculator-body");
const sliderBody = document.getElementById("slider-body");
const offerInput = document.getElementById("offer");
const offerResult = document.getElementById("offer-result");

const radioButtons = document.querySelectorAll('input[name="body"]');
radioButtons.forEach(button => {
    button.addEventListener('change', function() {
        if (this.value === 'calculator') {
            calculatorBody.classList.remove('hidden');
            sliderBody.classList.add('hidden');
        } else {
            calculatorBody.classList.add('hidden');
            sliderBody.classList.remove('hidden');
        }
    });
});

slider.addEventListener("input", updateResult);
additionalValue.addEventListener("input", updateResult);
offerInput.addEventListener("input", calculateOfferResult);

function toComma(num) {
    num = num.replace(/,/gi, "");
    return num.split(/(?=(?:\d{3})+$)/).join(",");
}

function updateResult() {
    additionalValue.value = toComma(additionalValue.value);
    const sliderAmount = parseInt(slider.value) * 600000;
    const additionalAmount = parseFormattedNumber(additionalValue.value) || 0;
    const totalAmount = sliderAmount + additionalAmount;
    result.textContent = totalAmount.toLocaleString();
    sliderValue.textContent = `Baby Paint Brush: ${slider.value}`;

    imageContainer.innerHTML = '';
    const totalImages = parseInt(slider.value) === 0 ? 1 : parseInt(slider.value);
    for (let i = 0; i < totalImages; i++) {
        const img = document.createElement("img");
        img.src = "https://images.neopets.com/items/babypaintbrush.gif";
        imageContainer.appendChild(img);
    }
    if (parseInt(slider.value) === 0) {
        imageContainer.innerHTML = '';
        const img = document.createElement("img");
        img.src = "https://images.neopets.com/items/invisiblepntbrsh.gif";
        imageContainer.appendChild(img);
    }
}

function calculateOfferResult() {
    offerInput.value = toComma(offerInput.value);
    const offer = parseFormattedNumber(offerInput.value);
    let x, y;
    if (isNaN(offer)) {
        x = 0;
        y = 0;
    } else if (offer <= 2000000) {
        x = offer;
        y = 0;
    } else if (offer <= 8000000) {
        y = Math.floor(offer / 600000);
        x = offer % 600000;
        while (x <= 1400000 && y > 1) {
            x += 600000;
            y--;
        }
    } else {
        offerResult.innerHTML = `TP limit is 2m + 10 items. Set up an <a href="https://www.neopets.com/auctions.phtml">Auction</a> instead or use a different set of items`;
        return;
    }
    offerResult.innerHTML = `You should offer ${x.toLocaleString()} Nps and ${y} Baby Paint Brushes.`;
    imageContainer2.innerHTML = '';
    for (let i = 0; i < y; i++) {
        const img = document.createElement("img");
        img.src = "https://images.neopets.com/items/babypaintbrush.gif";
        imageContainer2.appendChild(img);
    }
    if (parseInt(y) === 0) {
        imageContainer2.innerHTML = '';
        const img = document.createElement("img");
        img.src = "https://images.neopets.com/items/invisiblepntbrsh.gif";
        imageContainer2.appendChild(img);
    }
}

function parseFormattedNumber(value) {
    return parseInt(value.replace(/,/g, ''), 10);
}
