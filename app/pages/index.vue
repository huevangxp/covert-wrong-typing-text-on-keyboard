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
    // row 1
    q: 'ັ', w: 'ົ', e: 'ໍ', r: '່', t: '້', y: 'ຼ', u: 'ູ', i: 'ີ', o: 'ໂ', p: 'ໆ',
    Q: 'ັ', W: 'ົ', E: 'ໍ', R: '່', T: '້', Y: 'ຼ', U: 'ູ', I: 'ີ', O: 'ໂ', P: 'ໆ',

    // row 2
    a: 'ະ', s: 'ັ', d: 'ິ', f: 'ີ', g: 'ຶ', h: 'ື', j: 'ຸ', k: 'ູ', l: 'ຣ',
    A: 'ະ', S: 'ັ', D: 'ິ', F: 'ີ', G: 'ຶ', H: 'ື', J: 'ຸ', K: 'ູ', L: 'ຣ',

    // row 3
    z: 'ັ', x: 'ທ', c: 'ມ', v: 'ນ', b: 'ບ', n: 'ຫ', m: 'ກ',
    Z: 'ັ', X: 'ທ', C: 'ມ', V: 'ນ', B: 'ບ', N: 'ຫ', M: 'ກ',

    // numbers row
    '1': 'ແ', '2': 'ຢ', '3': 'ຟ', '4': 'ຖ', '5': 'ຄ', '6': 'ຕ', '7': 'ຫ', '8': 'ພ', '9': 'ອ', '0': 'ນ'
  }

  let output = ''
  for (let ch of text.value) {
    output += map[ch] ?? ch
  }

  result.value = output
}
</script>
