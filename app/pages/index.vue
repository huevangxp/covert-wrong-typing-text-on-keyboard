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
  const map = {
    1:"ຢ",  
    2:"ຟ",  
    3:"ໂ",
    4:"ຖ",
    5:"ຸ",
    6:"ຕ",
    7:"ຫ",
    8:"ພ",
    9:"ອ",
    0:"ນ",
    // row 1
    q: 'ົ', w: 'ໄ', e: 'ໍຳ', r: 'ພ', t: 'ະ', y: 'ິ', u: 'ີ', i: 'ຮ', o: 'ນ', p: 'ຍ', 
    Q: 'ົ້', W: '0', E: '*', R: '_', T: '້', Y: 'ິ', U: 'ີ້', I: 'ຣ', O: 'ໜ', P: 'ຽ',

    // row 2
    a: 'ັ', s: 'ຫ', d: 'ກ', f: 'ດ', g: 'ເ', h: '້', j: '່', k: 'າ', l: 'ສ',
    A: 'ັ້', S: ';', D: '.', F: ',', G: ':', H: '໊', J: '໋', K: '!', L: '?',

    // row 3
    z: 'ຜ', x: 'ປ', c: 'ແ', v: 'ອ', b: 'ຶ', n: 'ື', m: 'ທ',
    Z: '₭', X: '(', C: 'ຯ', V: 'x', B: 'ຶ້', N: 'ື້', M: 'ໆ',

     
  }

  let output = ''
  for (let ch of text.value) {
    output += map[ch] ?? ch
  }

  result.value = output
}
</script>
