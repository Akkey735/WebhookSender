document.getElementById("send").addEventListener("click", function() {
    // 要素を取得
    let webhookUrl = document.getElementById("webhook").value;
    let webhookName = document.getElementById("name").value;
    let webhookAvatar = document.getElementById("avatar").value;
    let webhookContent = document.getElementById("content").value;

    // 必ず必要な情報を確認
    if(webhookUrl === "") {
        toastr.error("You must specify the destination webhook");
        return;
    } else if(webhookContent === "") {
        toastr.error("You must specify what you want to send.")
    }

    // 任意の情報を確認
    if(webhookName === "") {
        webhookName = null;
    } else if(webhookAvatar === "") {
        webhookAvatar = null;
    }

    // Payload
    let payload = {
        username: webhookName,
        avatar_url: webhookAvatar,
        content: webhookContent
    }

    // リクエストを送信
    let xhr = new XMLHttpRequest();
    xhr.open("POST", webhookUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            if(xhr.status === 204) {
                toastr.success("Webhook successfully submitted.");
            } else {
                let strStatus = String(xhr.status);
                toastr.error(`(${strStatus}) Webhook submission failed.`)
            }
        }
    }
    xhr.send(JSON.stringify(payload));
});