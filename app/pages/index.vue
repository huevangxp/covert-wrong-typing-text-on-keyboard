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
