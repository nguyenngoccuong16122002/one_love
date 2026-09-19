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
    "Muốn ở cạnh chị",
    "Chị thật đặc biệt",
    "Thích chị cười",
    "Thích những cuộc trò chuyện với chị",
    "Thích nghe chị kể chuyện",
    "Một chút nhớ",
    "Một chút thương",
    "Một chút thích",
    "❤️",
    "❤️",
    "❤️",
    "❤️",
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

    "Thật ra, em đã để ý chị một thời gian rồi",

    "Ban đầu chỉ đơn giản là vì em thấy chị dễ thương",

    "Rồi dần dần, em bắt đầu thích những cuộc trò chuyện giữa hai đứa",

    "Thích nghe chị kể những chuyện nhỏ nhỏ trong ngày",

    "Thích những lúc hai đứa nói chuyện với nhau mà chẳng cần một lý do đặc biệt",

    "Thích cả những khoảnh khắc rất bình thường khi có chị ở đó",

    "Có những ngày, chỉ một tin nhắn của chị cũng đủ làm em vui hơn",

    "Rồi em nhận ra... em bắt đầu mong chờ những điều nhỏ bé ấy",

    "Mong được gặp chị",

    "Mong được nói chuyện với chị",

    "Đôi khi... chỉ đơn giản là muốn biết hôm nay chị thế nào",

    "Em cũng chẳng nhớ chính xác từ khi nào",

    "Nhưng chị đã trở thành một người đặc biệt với em",

    "Em thích cảm giác khi ở cạnh chị",

    "Tự nhiên, thoải mái... và vui",

    "Càng hiểu chị hơn, em càng muốn được ở gần chị hơn",

    "Em không muốn cứ giữ cảm giác này trong lòng mãi",

    "Nên em muốn nói thẳng với chị",

    "Em thích chị",

    "Và em muốn nghiêm túc với cảm xúc này",

    "Em muốn cùng chị bước thêm một bước",

    "Nếu chị cũng muốn... mình thử nhé?"

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
    "Em thích chị, và em muốn cùng chị bắt đầu một điều thật đẹp."

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

