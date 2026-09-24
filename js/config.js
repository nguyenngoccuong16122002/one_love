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
    "Thích nghe chị kể chuyện",
    "Thích những lúc ở cạnh chị",
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

    "Rồi dần dần, em bắt đầu để ý đến những điều nhỏ nhỏ về chị",

    "Cách chị nói chuyện, cách chị cười, rồi cả những điều rất bình thường mà chị chẳng để ý",

    "Có những lúc em chẳng biết phải nói gì",

    "Nhưng chỉ cần có chị ở đó, em vẫn thấy vui",

    "Có những ngày, chỉ một tin nhắn của chị cũng đủ làm em vui hơn",

    "Rồi em nhận ra...",

    "Em bắt đầu mong chờ những điều nhỏ bé ấy",

    "Mong được gặp chị",

    "Mong được ở gần chị",

    "Mong những cuộc gặp của hai đứa sẽ lâu hơn một chút",

    "Đôi khi... chỉ đơn giản là muốn biết hôm nay chị thế nào",

    "Em cũng chẳng nhớ chính xác từ khi nào",

    "Nhưng chị đã trở thành một người đặc biệt với em",

    "Em thích cảm giác khi ở cạnh chị",

    "Tự nhiên, thoải mái... và vui",

    "Và càng ở cạnh chị, em càng nhận ra...",

    "Em không chỉ thích những khoảnh khắc có chị",

    "Em bắt đầu thích chính cảm giác được có chị trong cuộc sống của mình",

    "Em vốn không phải là người giỏi nói ra những điều mình nghĩ",

    "Nên có những điều em đã giữ trong lòng khá lâu",

    "Đã có lúc em nghĩ... hay cứ giữ như vậy cũng được",

    "Nhưng em sợ nếu không nói ra, sau này em sẽ tiếc",

    "Nên hôm nay, em muốn một lần nói thật với chị",

    "Em thích chị",

    "Không phải chỉ là một cảm xúc thoáng qua",

    "Mà là cảm xúc em thật sự muốn cho một cơ hội",

    "Muốn cùng chị bước thêm một bước",

    "Không biết sau bước này chúng ta sẽ đi đến đâu...",

    "Nhưng nếu chị cũng có một chút cảm giác giống em",

    "Nếu chị cũng muốn biết chúng ta có thể trở thành gì của nhau...",

    "Thì mình thử nhé?"

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
    "Em không biết tương lai sẽ thế nào, nhưng em muốn thử cùng chị."

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

