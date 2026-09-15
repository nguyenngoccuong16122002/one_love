/* =====================================================
   CONTENT CONFIG

   The confession script itself — change the wording here,
   nothing else needs to change.
===================================================== */

export const CONFIG = {

  /*
   * Background falling text
   */
  fallingMessages: [

    "Em thích chị",
    "Thương chị",
    "Nhớ chị",
    "Nghĩ về chị",
    "Muốn gặp chị",
    "Chị thật đặc biệt",
    "❤️",
    "❤️",
    "❤️",
    "❤️",
    "❤️",
    "❤️"

  ],

  /*
   * Main messages
   */
  messages: [

    "Chị có biết không...",

    "Em có một điều muốn nói với chị",

    "Thật ra em đã để ý chị một thời gian rồi",

    "Ban đầu chỉ đơn giản là thấy chị dễ thương",

    "Rồi em bắt đầu thích những cuộc trò chuyện giữa hai đứa",

    "Thích những lúc được nghe chị kể chuyện",

    "Thích cả những khoảnh khắc rất bình thường khi có chị ở đó",

    "Có những ngày chỉ một tin nhắn của chị cũng làm em vui hơn",

    "Rồi em nhận ra mình bắt đầu mong chờ những điều nhỏ bé ấy",

    "Mong được gặp chị",

    "Mong được nói chuyện với chị",

    "Và đôi khi... chỉ đơn giản là muốn biết hôm nay chị thế nào",

    "Em cũng không nhớ chính xác từ khi nào",

    "Nhưng chị đã trở thành một người khá đặc biệt với em",

    "Em thích cảm giác khi ở cạnh chị",

    "Tự nhiên, thoải mái và vui",

    "Có lẽ vì vậy mà em muốn chúng ta gần nhau hơn một chút",

    "Em không muốn cứ đoán xem cảm giác này sẽ đi đến đâu",

    "Nên em quyết định nói thẳng với chị",

    "Em thích chị",

    "Và em muốn thử cùng chị bước thêm một bước",

    "Chị nghe em nhé..."

  ],

  /*
   * Final message
   */
  finalText:
    "Chị làm người yêu em nhé? ❤️",

  /*
   * Small text
   */
  finalSubtext:
    "Em thích chị, và em muốn chúng ta có một câu chuyện của riêng mình."

};


/* =====================================================
   AUDIO CONFIG

   Đổi src bên dưới nếu tên/đường dẫn file nhạc khác.
===================================================== */

export const AUDIO_CONFIG = {

  intro: {
    src: "assets/audio/intro.mp3",
    volume: 0.18
  },

  main: {
    src: "assets/audio/main.mp3",
    volume: 0.30,
    duckVolume: 0.22
  },

  fadeDuration: 1500

};
