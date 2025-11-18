<template>
    <div class="text-center">
        <v-img src="https://lullar-de-3.appspot.com/images/lullar_de_logo.png" width="200" height="200"
            class="mx-auto" />
        <v-card-title class="mt-4">ແປປະໂຫຍກ ຫຼື ຂໍ້ຄວາມທີ່ພິມຜິດຈາກພາສາອັງກິດໃຫ້ເປັນພາສາລາວ
            ເມື່ອລືມກົດປ່ຽນພາສາ</v-card-title>
    </div>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-textarea v-model="text" placeholder="ຂໍ້ຄວາມທີ່ຈະປ່ຽນພາສາ" />
            </v-col>
        </v-row>
        
        <v-btn @click="convert" class="font-weight-bold">ປ່ຽນພາສາ</v-btn>
    </v-container>
    <v-container>
        <v-card class="mt-4">
            <v-card-text>ຜິດຜິດທີ່ປ່ຽນພາສາ:</v-card-text>
            <v-card-text >{{ result }}</v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
const text = ref('')
const result = ref('')

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
        'B': 'ຶ້', 'N': 'ື້', 'M': 'ໆ', '<': 'ໝ', '>': '$', '?': ')'
    };

    let output = ''
    for (let ch of text.value) {
        output += laoKeyboardMap[ch] ?? ch
    }

    result.value = output
}
</script>
