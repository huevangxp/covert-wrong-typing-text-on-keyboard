<template>
    <div class="translator-page">
      <!-- Header -->
      <div class="header-section">
        <div class="header-content">
          <div class="icon-wrapper">
            <v-icon size="40" color="white">mdi-translate</v-icon>
          </div>
          <h1 class="main-title">Lao-English Translator</h1>
          <p class="subtitle">
            ແປປະໂຫຍກ ຫຼື ຂໍ້ຄວາມທີ່ພິມຜິດຈາກພາສາອັງກິດໃຫ້ເປັນພາສາລາວ
            <br />
            ເມື່ອລືມກົດປ່ຽນພາສາ
          </p>
        </div>
      </div>
  
      <!-- Main Content -->
      <v-container class="main-container">
        <!-- Input Area -->
        <v-card class="input-card" elevation="8" rounded="xl">
          <v-card-text class="pa-8">
            <div class="input-label">
              <v-icon size="16" color="purple">mdi-shimmer</v-icon>
              <span>ຂໍ້ຄວາມທີ່ຈະປ່ຽນພາສາ</span>
            </div>
            <v-textarea
              v-model="text"
              placeholder="ພິມຂໍ້ຄວາມຂອງທ່ານທີ່ນີ້..."
              variant="outlined"
              rows="6"
              class="custom-textarea"
              no-resize
            ></v-textarea>
          </v-card-text>
        </v-card>
  
        <!-- Buttons -->
        <div class="button-group">
          <v-btn
            size="large"
            class="action-btn blue-btn"
            elevation="4"
            @click="convert"
          >
            <span>ອັງກິດ-ລາວ</span>
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
          <v-btn
            size="large"
            class="action-btn purple-btn"
            elevation="4"
            @click="convertEng"
          >
            <span>ລາວ-ອັງກິດ</span>
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
  
        <!-- Result Area -->
        <v-card class="result-card" elevation="8" rounded="xl">
          <div class="result-header">
            <div class="result-title">
              <div class="status-dot"></div>
              <span>ຜົນໄດ້ຮັບ</span>
            </div>
            <v-btn
              size="small"
              variant="text"
              class="copy-btn"
              @click="copy"
            >
              <v-icon start size="18">mdi-content-copy</v-icon>
              {{ copied ? 'ຄັດລອກແລ້ວ!' : 'ຄັດລອກ' }}
            </v-btn>
          </div>
          <v-card-text class="result-content">
            <p v-if="result" class="result-text">{{ result }}</p>
            <p v-else class="result-placeholder">ຜົນການແປຈະປາກົດຢູ່ທີ່ນີ້...</p>
          </v-card-text>
        </v-card>
  
        <!-- Info Cards -->
        <v-row class="info-cards">
          <v-col cols="12" md="6">
            <v-card class="info-card blue-card" elevation="2" rounded="xl">
              <v-card-text class="pa-6">
                <div class="info-header">
                  <div class="info-badge blue-badge">EN</div>
                  <h4 class="info-title">English to Lao</h4>
                </div>
                <p class="info-text">
                  ພິມດ້ວຍແປ້ນພິມພາສາອັງກິດ ແລະ ຄລິກປຸ່ມອັງກິດ-ລາວ
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="info-card purple-card" elevation="2" rounded="xl">
              <v-card-text class="pa-6">
                <div class="info-header">
                  <div class="info-badge purple-badge">LA</div>
                  <h4 class="info-title">Lao to English</h4>
                </div>
                <p class="info-text">
                  ພິມດ້ວຍແປ້ນພິມພາສາລາວ ແລະ ຄລິກປຸ່ມລາວ-ອັງກິດ
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>

<script setup>
const text = ref('')
const result = ref('')
const toast = useToast()
 
function convert() {
    const laoKeyboardMap = {
        // Top Row (Numbers and Symbols)
        '`': '"', '1': "ຢ", '2': "ຟ", '3': "ໂ", '4': "ຖ", '5': 'ຸ',
        '6': "ູ", '7': "ຄ", '8': "ຕ", '9': "ຈ", '0': "ຂ", '-': "ຊ", '=': 'ໍ',

        '~': "’", '!': "1", '@': "2", '#': "3", '$': "4", '%': "໌", '^':
            "ຼ", '&': "5", '*': "6", '(': "7", ')': "8", '_': "9", '+': "ໍ່",
        // Row 1 (QWERTY)
        'q': 'ົ', 'w': 'ໄ', 'e': 'ຳ', 'r': 'ພ', 't': 'ະ', 'y': 'ິ',
        'u': 'ີ', 'i': 'ຮ', 'o': 'ນ', 'p': 'ຍ', '[': 'ບ', ']': 'ລ',

        // Row 1 (Shifted QWERTY)
        'Q': 'ົ້', 'W': '0', 'E': '*', 'R': '_', 'T': '+', 'Y': 'ິ້',
        'U': 'ີ້', 'I': 'ຣ', 'O': 'ໜ', 'P': 'ຽ', '{': '-', '}': 'ຫຼ',

        // Row 2 (ASDFG)
        'a': 'ັ', 's': 'ຫ', 'd': 'ກ', 'f': 'ດ', 'g': 'ເ', 'h':
            '້', 'j': '່', 'k': 'າ', 'l': 'ສ', ';': 'ວ', "'": 'ງ',

        // Row 2 (Shifted ASDFG)
        'A': 'ັ້', 'S': ';', 'D': '.', 'F': ',', 'G': ':',
        'H': '໊', 'J': '໋', 'K': '!', 'L': '?', ':': '%', '"': '=',

        // Row 3 (ZXCVB)
        'z': 'ຜ', 'x': 'ປ', 'c': 'ແ', 'v': 'ອ', 'b': 'ຶ',
        'n': 'ື', 'm': 'ທ', ',': 'ມ', '.': 'ໃ', '/': 'ຝ',

        // Row 3 (Shifted ZXCVB)
        'Z': '₭', 'X': '(', 'C': 'ຯ', 'V': 'x',
        'B': 'ຶ້', 'N': 'ື້', 'M': 'ໆ', '<': 'ໝ', '>': '$', '?': ')', ' ': ' '
    };



    let output = ''
    for (let ch of text.value) {
        output += laoKeyboardMap[ch] ?? ch
    }

    result.value = output


}
function convertEng() {


    const laoKeyboardMapEng = {
        // Top Row (Numbers and Symbols)
        '"': '`', "ຢ": '1', "ຟ": '2', "ໂ": '3', "ຖ": '4', "ຸ": '5',
        "ູ": '6', "ຄ": '7', "ຕ": '8', "ຈ": '9', "ຂ": '0', "ຊ": '-', "ໍ": '=',

        "’": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", "8": "*", "9": "(", "0": ")", "-": "_", "+": "=",
        // Row 1 (QWERTY)
        "ົ": 'q', "ໄ": 'w', "ຳ": 'e', "ພ": 'r', "ະ": 't', "ິ": 'y',
        "ີ": 'u', "ຮ": 'i', "ນ": 'o', "ຍ": 'p', "ບ": '[', "ລ": ']',

        // Row 1 (Shifted QWERTY)
        "ົ້": 'Q', "0": 'W', "*": 'E', "_": 'R', "+": 'T', "ິ້": 'Y',
        "ີ້": 'U', "ຣ": 'I', "ໜ": 'O', "ຽ": 'P', "-": '{', "ຫຼ": '}',

        // Row 2 (ASDFG)
        "ັ": 'a', "ຫ": 's', "ກ": 'd', "ດ": 'f', "ເ": 'g', "້": 'h',
        "່": 'j', "າ": 'k', "ສ": 'l', "ວ": ';', "ງ": "'",

        // Row 2 (Shifted ASDFG)
        "ັ້": 'A', ";": 'S', ".": 'D', ",": 'F', ":": 'G',
        "໊": 'H', "໋": 'J', "!": 'K', "?": 'L', "%": ':', "=": '"',

        // Row 3 (ZXCVB)
        "ຜ": 'z', "ປ": 'x', "ແ": 'c', "ອ": 'v', "ຶ": 'b',
        "ື": 'n', "ທ": 'm', "ມ": ',', "ໃ": '.', "ຝ": '/',

        // Row 3 (Shifted ZXCVB)
        "₭": 'Z', "(": 'X', "ຯ": 'C', "x": 'V',
        "ຶ້": 'B', "ື້": 'N', "ໆ": 'M', "ໝ": '<', "$": '>', ")": '?', ' ': ' '
    };

    let output = ''
    for (let ch of text.value) {
        output += laoKeyboardMapEng[ch] ?? ch
    }

    result.value = output



}

function copy() {
  if (!result?.value) return;

  const text = result.value;

  // Modern API available?
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => console.log("Copied:", text))
      .catch(err => {
        console.error("Clipboard error:", err);
        fallbackCopy(text);
      });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
    // console.log("Copied (fallback):", text);
    // add toast
    toast.success({ title: 'ສຳເລັດ!', message: 'ການສໍາເນົາຂໍ້ຄວາມທີ່ຈະປ່ຽນພາສາສຳເລັດ' }, { position: 'top-center', timeout: 3000 });
  } catch (err) {
    console.error("Fallback copy failed:", err);
    toast.error({ title: 'ຜິດ!', message: 'ການສໍາເນົາຂໍ້ຄວາມທີ່ຈະປ່ຽນພາສາຜິດ' }, { position: 'top-center', timeout: 3000 });
  }

  document.body.removeChild(textarea);
}
</script>
