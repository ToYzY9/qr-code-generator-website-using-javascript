window.addEventListener("DOMContentLoaded", main);

const generateQRCode = async (qrTxt) => {
    const imgBox = document.querySelector("#imgBox");
    const qrImage = document.querySelector("#qrImage");
    // const progress = document.querySelector("#progress");
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrTxt}`;
    const options = { method: "GET", mode: "cors" };
    await fetch(url, options)
        .then((res) => {
            // progress.innerHTML = "Loading...";
            return res.blob();
        })
        .then((blob) => {
            let qrCodeImg = URL.createObjectURL(blob);
            // progress.innerHTML = "";
            qrImage.setAttribute("src", qrCodeImg);
            imgBox.classList.add("show-img");
        })
        .catch((err) => console.error(err));
};

function main() {
    let form = document.querySelector("#form");
    let qrTextInput = document.querySelector("#qrText");
    form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        if (qrTextInput.value.length > 0) {
            generateQRCode(qrTextInput.value);
        } else {
            qrTextInput.classList.add("error");
            setTimeout(() => {
                qrTextInput.classList.remove("error");
            }, 500);
        }
        qrTextInput.value = "";
    });
}
