toText = document.querySelector(".to-text")
fromText = document.querySelector(".from-text")
button = document.querySelector(".btn-translate")

// 3 dòng trên lấy ra 3 thẻ html có class tương ứng bên file index.html, lục trong cái class ấy
class SpeechRecognitionApi {
    constructor(options) {
        // tạo ra 2 cái biến để lưu giá trị ngôn ngữ mà mình muốn dịch, ở đây
        // mình muốn dịch từ tiếng anh sang tiếng việt nên 
        // translateFrom = "en-GB" là tiếng anh
        // translateTo = "vi-VN" là tiếng việt
        let translateFrom = "en-GB"
        let translateTo = "vi-VN"
        const SpeechToText = window.speechRecognition || window.webkitSpeechRecognition;
        // speechRecognition là 1 cái api của google,
        // nó sẽ giúp mình lấy giá trị của giọng nói và chuyển thành text
        this.speechApi = new SpeechToText();
        // speechApi là 1 cái biến để 
        this.speechApi.continuous = true;
        // Thuộc tính này <continuous> cho phép chúng ta kiểm soát 
        // xem các kết quả trả về là liên tục hay là 
        // một kết quả duy nhất (single). Mặc định là single (false)
        this.speechApi.interimResults = false;
        // Thuộc tính này <interimResults> cho phép chúng ta kiểm soát xem kết quả tạm thời 
        // có được trả về (true) hay không (false)

        this.speechApi.onresult = (event) => {
            var resultIndex = event.resultIndex;
            var transcript = event.results[resultIndex][0].transcript;
            // 2 dòng code trên có nhiệm vụ lấy giá trị của giọng nói và chuyển thành text
            // và lưu giá trị đó vào biến transcript
            console.log('transcript>>', transcript);
            fromText.value = transcript;
            // gán giá trị transcript cho thẻ html có class là from-text, để hiện ra chữ tiếng anh
            let apiUrl = `https://api.mymemory.translated.net/get?q=${transcript}&langpair=${translateFrom}|${translateTo}`;
            // từ dòng 37 tới 46, trình tự là gửi một request lên server của api 
            // nhóm tìm được, gửi lên đó bản text đã được chuyển từ giọng nói <transcript>,
            // và 2 cái biến <translateFrom> và <translateTo> để xác định ngôn ngữ mà mình muốn dịch
            fetch(apiUrl).then(res => res.json()).then(data => {
                toText.value = data.responseData.translatedText;
                // lấy giá trị của server trả về để đem vào thẻ html có class là to-text,
                // nói cách khác là hiện ra kết quả dịch bên ô bên phải
            });
        }
    }
    init() {
        // bắt đầu tạo ra lớp SpeechRecognitionApi
        this.speechApi.start();
    }
    stop() {
        // dừng lớp SpeechRecognitionApi
        this.speechApi.stop();
    }
}

window.onload = function () {
    // mở web lên thì nó khởi tạo cái hàm này
    // khởi tạo 1 cái biến speech để lưu giá trị của lớp SpeechRecognitionApi
    var speech = new SpeechRecognitionApi({
    })
    document.querySelector('.btn-start').addEventListener('click', function () {
        // nếu người dùng click vào nút bắt đầu thì nó sẽ gọi hàm 
        // init() trong lớp SpeechRecognitionApi và bắt đầu lắng nghe
        button.innerHTML = "I am listening to you..."
        speech.init()
    })

    document.querySelector('.btn-stop').addEventListener('click', function () {
        // nếu người dùng click vào nút dừng thì nó sẽ gọi hàm
        // stop() trong lớp SpeechRecognitionApi và dừng lắng nghe
        button.innerHTML = "Let's say something"
        speech.stop()
    })

}