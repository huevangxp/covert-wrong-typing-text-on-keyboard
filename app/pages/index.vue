<template>
    <div class="text-center">
        <v-img src="/logo.png" width="400" height="400" class="mx-auto" />
        <v-card-title class="">ແປປະໂຫຍກ ຫຼື ຂໍ້ຄວາມທີ່ພິມຜິດຈາກພາສາອັງກິດໃຫ້ເປັນພາສາລາວ
            ເມື່ອລືມກົດປ່ຽນພາສາ ຕົວເລືອກອັງກິດ-ລາວ ແລະ ຕົວເລືອກລາວ-ອັງກິດ </v-card-title>
    </div>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-textarea v-model="text" placeholder="ຂໍ້ຄວາມທີ່ຈະປ່ຽນພາສາ" />
            </v-col>
        </v-row>
        <div class="text-end">
            <v-btn @click="convert" style="background-color: #005D86; color: white;" class="mr-2 " size="large"
                variant="outlined">ອັງກິດ-ລາວ</v-btn>
            <v-btn @click="convertEng" style="background-color: #852994; color: white;" size="large"
                variant="outlined">ລາວ-ອັງກິດ</v-btn>

        </div>
    </v-container>
    <v-container>
        <v-card class="mt-4">
            <div class="d-flex justify-space-between align-center">
                <v-card-text class="text-underline">
                    ຜົນໄດ້ຮັບ:
                </v-card-text>

                <div class="text-underline pa-3">
                    <v-btn color="secondary" size="small" icon="mdi-content-copy" variant="text" @click="copy"></v-btn>
                </div>
            </div>
            <v-card-text>{{ result }}</v-card-text>
        </v-card>
    </v-container>
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
