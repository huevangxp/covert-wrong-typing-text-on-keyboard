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
                <v-textarea v-model="text" label="Text" />
            </v-col>
        </v-row>
        <v-btn @click="convert">ປ່ຽນພາສາ</v-btn>
    </v-container>
    <v-container>
        <v-card class="mt-4">
            <v-card-title>ຜິດຜິດທີ່ປ່ຽນພາສາ:</v-card-title>
            <v-card-text>{{ result }}</v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
const text = ref('')
const result = ref('')

function convert() {
    const laoKeyboardMap = {
    // Top Row (Numbers and Symbols)
    '1': "ຢ", '2': "ຟ", '3': "ໂ", '4': "ຖ", '5': "ຸ", 
    '6': "ຕ", '7': "ຫ", '0': "ຂ", '-': "ຊ", '=': "ຍ",
    '-': "ໜ", '=': "ບ",
    
    // Top Row (Shifted Numbers/Symbols)
    '!': "໙", '@': "໘", '#': "໗", '$': "໖", '%': "໕", 
    '^': "໔", '&': "໓", '*': "໒", '(': "໑", ')': "໐",
    '_': "ດ", '+': "ັ",

    // Row 1 (QWERTY)
    'q': 'ົ', 'w': 'ໄ', 'e': 'ຳ', 'r': 'ພ', 't': 'ະ', 
    'y': 'ິ', 'u': 'ີ', 'i': 'ຣ', 'o': 'ນ', 'p': 'ມ', '[': '໇', ']': '໘', '\\': '໙',
    
    // Row 1 (Shifted QWERTY)
    'Q': 'ົ້', 'W': 'ຽ', 'E': 'ໍ', 'R': 'ຄ', 'T': '້', 
    'Y': 'ິ້', 'U': 'ີ້', 'I': 'ຮ', 'O': 'ໜ', 'P': '໐', '{': '(', '}': ')', '|': '໗',
    
    // Row 2 (ASDFG)
    'a': 'ັ', 's': 'ຫ', 'd': 'ກ', 'f': 'ດ', 'g': 'ເ', 
    'h': 'າ', 'j': 'ສ', 'k': 'ວ', 'l': 'ລ', ';': 'ໃ', "'": '່', 
    
    // Row 2 (Shifted ASDFG)
    'A': 'ັ້', 'S': '໗', 'D': '.', 'F': ',', 'G': 'ແ', 
    'H': 'າ້', 'J': 'ສ', 'K': '໔', 'L': '໖', ':': 'ໃ້', '"': '໋',
    
    // Row 3 (ZXCVB)
    'z': 'ຊ', 'x': 'ປ', 'c': 'ແ', 'v': 'ອ', 'b': 'ຶ', 'n': 'ື', 'm': 'ທ', ',': 'ຍ', '.': '໅', '/': '໌',
    
    // Row 3 (Shifted ZXCVB)
    'Z': 'ຆ', 'X': '໒', 'C': '໓', 'V': '໘', 'B': 'ຶ້', 'N': 'ື້', 'M': 'ໆ', '<': '໘', '>': '໖', '?': '໔'
};

  let output = ''
  for (let ch of text.value) {
    output += map[ch] ?? ch
  }

  result.value = output
}
</script>
