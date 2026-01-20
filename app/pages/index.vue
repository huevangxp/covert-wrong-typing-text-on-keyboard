<template>
  <div class="translator-page">
    <!-- Header -->
    <div class="header-section">
      <div class="header-content">
        <div class="icon-wrapper">
          <v-icon size="40" color="white">mdi-keyboard</v-icon>
        </div>
        <h1 class="main-title">Lao-English Converter</h1>
        <p class="subtitle">
          ແປປະໂຫຍກ ຫຼື ຂໍ້ຄວາມທີ່ພິມຜິດຈາກພາສາອັງກິດໃຫ້ເປັນພາສາລາວ ແລະ ອັງກິດ
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
          <div class="input-label">
            <v-icon size="16" color="red">mdi-stop</v-icon>
            <span style="color: red"
              >ຖ້າເປັນການປ່ຽນພາສາລາວ ມາ ເປັນພາສາອັງກິດ
              ແມ່ນແນະນຳໃຫ້ພິມເປັນຕົວໜ້ອຍ</span
            >
          </div>
        </v-card-text>
      </v-card>

      <!-- Buttons -->
      <div class="button-group">
        <v-btn
          size="large"
          class="action-btn blue-btn"
          elevation="4"
          @click="convert"
          style="background-color: #005d86; color: white"
        >
          <span>ອັງກິດ-ລາວ</span>
          <v-icon end>mdi-arrow-right</v-icon>
        </v-btn>
        <v-btn
          size="large"
          class="action-btn purple-btn"
          elevation="4"
          @click="convertEng"
          style="background-color: #852994; color: white"
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
          <v-btn size="small" variant="text" class="copy-btn" @click="copy">
            <v-icon start size="18">mdi-content-copy</v-icon>
            {{ copied ? "ຄັດລອກແລ້ວ!" : "ຄັດລອກ" }}
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

      <!-- History Section -->
      <v-card
        class="result-card mt-6"
        elevation="8"
        rounded="xl"
        v-if="history.length > 0"
      >
        <div class="result-header">
          <div class="result-title">
            <v-icon color="primary">mdi-history</v-icon>
            <span>ປະຫວັດການແປ</span>
          </div>
          <v-btn
            size="small"
            variant="text"
            color="error"
            @click="clearHistory"
          >
            ລ້າງປະຫວັດ
          </v-btn>
        </div>
        <v-list lines="two" class="history-list bg-transparent">
          <v-list-item
            v-for="(item, index) in history"
            :key="index"
            class="history-item"
          >
            <template v-slot:prepend>
              <div
                class="history-icon"
                :class="item.type === 'en-la' ? 'blue-icon' : 'purple-icon'"
              >
                {{ item.type === "en-la" ? "EN" : "LA" }}
              </div>
            </template>

            <v-list-item-title class="font-weight-bold mb-1">{{
              item.result
            }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.original }}</v-list-item-subtitle>

            <template v-slot:append>
              <v-btn
                icon
                size="small"
                variant="text"
                color="grey"
                @click="copyHistoryItem(item.result)"
              >
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
      <!-- Payment Dialog -->
      <v-dialog v-model="showPaymentDialog" max-width="400" persistent>
        <v-card class="rounded-xl pa-4">
          <v-card-title class="text-center font-weight-bold text-h5">
            <span> ເກີນຈຳນວນທີ່ກຳນົດ</span>
          </v-card-title>
          <v-card-text class="text-center">
            <p class="mb-4 text-body-1">
              ທ່ານໄດ້ໃຊ້ງານເກີນ 10 ຄັ້ງແລ້ວ. ກະລຸນາຊຳລະເງິນເພື່ອໃຊ້ງານຕໍ່.
            </p>
            <div class="d-flex justify-center mb-4">
              <v-img
                src="./qrcode.png"
                max-width="200"
                height="200"
                class="rounded-lg"
              ></v-img>
            </div>
            <p class="text-caption text-grey">ສະແກນ QR Code ເພື່ອຊຳລະເງິນ</p>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              color="primary"
              variant="flat"
              rounded="lg"
              @click="showPaymentDialog = false"
            >
              ປິດ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script setup>
const text = ref("");
const result = ref("");
const toast = useToast();
const copied = ref(false);
const history = ref([]);
const showPaymentDialog = ref(false);
const submissionCount = ref(0);

onMounted(() => {
  const savedCount = localStorage.getItem("translation_count");
  if (savedCount) {
    submissionCount.value = parseInt(savedCount);
  }
});

function checkLimit() {
  if (submissionCount.value >= 10) {
    showPaymentDialog.value = true;
    return false;
  }
  submissionCount.value++;
  localStorage.setItem("translation_count", submissionCount.value.toString());
  return true;
}

function addToHistory(original, converted, type) {
  if (!original || !converted) return;
  if (
    history.value.length > 0 &&
    history.value[0].original === original &&
    history.value[0].result === converted
  )
    return;
  history.value.unshift({
    original,
    result: converted,
    type,
    timestamp: new Date(),
  });
  if (history.value.length > 10) history.value.pop();
}

function clearHistory() {
  history.value = [];
}

function copyHistoryItem(text) {
  if (!text) return;
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() =>
        toast.success(
          { title: "ສຳເລັດ!", message: "ຄັດລອກແລ້ວ" },
          { position: "top-center", timeout: 2000 },
        ),
      )
      .catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function convert() {
  if (!checkLimit()) return;

  const laoKeyboardMap = {
    // Top Row (Numbers and Symbols)
    "`": '"',
    1: "ຢ",
    2: "ຟ",
    3: "ໂ",
    4: "ຖ",
    5: "ຸ",
    6: "ູ",
    7: "ຄ",
    8: "ຕ",
    9: "ຈ",
    0: "ຂ",
    "-": "ຊ",
    "=": "ໍ",

    "~": "’",
    "!": "1",
    "@": "2",
    "#": "3",
    $: "4",
    "%": "໌",
    "^": "ຼ",
    "&": "5",
    "*": "6",
    "(": "7",
    ")": "8",
    _: "9",
    "+": "ໍ່",
    // Row 1 (QWERTY)
    q: "ົ",
    w: "ໄ",
    e: "ຳ",
    r: "ພ",
    t: "ະ",
    y: "ິ",
    u: "ີ",
    i: "ຮ",
    o: "ນ",
    p: "ຍ",
    "[": "ບ",
    "]": "ລ",

    // Row 1 (Shifted QWERTY)
    Q: "ົ້",
    W: "0",
    E: "*",
    R: "_",
    T: "+",
    Y: "ິ້",
    U: "ີ້",
    I: "ຣ",
    O: "ໜ",
    P: "ຽ",
    "{": "-",
    "}": "ຫຼ",

    // Row 2 (ASDFG)
    a: "ັ",
    s: "ຫ",
    d: "ກ",
    f: "ດ",
    g: "ເ",
    h: "້",
    j: "່",
    k: "າ",
    l: "ສ",
    ";": "ວ",
    "'": "ງ",

    // Row 2 (Shifted ASDFG)
    A: "ັ້",
    S: ";",
    D: ".",
    F: ",",
    G: ":",
    H: "໊",
    J: "໋",
    K: "!",
    L: "?",
    ":": "%",
    '"': "=",

    // Row 3 (ZXCVB)
    z: "ຜ",
    x: "ປ",
    c: "ແ",
    v: "ອ",
    b: "ຶ",
    n: "ື",
    m: "ທ",
    ",": "ມ",
    ".": "ໃ",
    "/": "ຝ",

    // Row 3 (Shifted ZXCVB)
    Z: "₭",
    X: "(",
    C: "ຯ",
    V: "x",
    B: "ຶ້",
    N: "ື້",
    M: "ໆ",
    "<": "ໝ",
    ">": "$",
    "?": ")",
    " ": " ",
  };

  let output = "";
  for (let ch of text.value) {
    output += laoKeyboardMap[ch] ?? ch;
  }

  result.value = output;
  addToHistory(text.value, output, "en-la");
}
function convertEng() {
  if (!checkLimit()) return;

  const laoKeyboardMapEng = {
    // Top Row (Numbers and Symbols)
    '"': "`",
    ຢ: "1",
    ຟ: "2",
    ໂ: "3",
    ຖ: "4",
    "ຸ": "5",
    "ູ": "6",
    ຄ: "7",
    ຕ: "8",
    ຈ: "9",
    ຂ: "0",
    ຊ: "-",
    "ໍ": "=",

    "’": "~",
    1: "!",
    2: "@",
    3: "#",
    4: "$",
    5: "%",
    6: "^",
    7: "&",
    8: "*",
    9: "(",
    0: ")",
    "-": "_",
    "+": "=",
    // Row 1 (QWERTY)
    "ົ": "q",
    ໄ: "w",
    ຳ: "e",
    ພ: "r",
    ະ: "t",
    "ິ": "y",
    "ີ": "u",
    ຮ: "i",
    ນ: "o",
    ຍ: "p",
    ບ: "[",
    ລ: "]",

    // Row 1 (Shifted QWERTY)
    "ົ້": "Q",
    0: "W",
    "*": "E",
    _: "R",
    "+": "T",
    "ິ້": "Y",
    "ີ້": "U",
    ຣ: "I",
    ໜ: "O",
    ຽ: "P",
    "-": "{",
    ຫຼ: "}",

    // Row 2 (ASDFG)
    "ັ": "a",
    ຫ: "s",
    ກ: "d",
    ດ: "f",
    ເ: "g",
    "້": "h",
    "່": "j",
    າ: "k",
    ສ: "l",
    ວ: ";",
    ງ: "'",

    // Row 2 (Shifted ASDFG)
    "ັ້": "A",
    S: "S",
    ".": "D",
    ",": "F",
    ":": "G",
    "໊": "H",
    "໋": "J",
    "!": "K",
    "?": "L",
    "%": ":",
    "=": '"',

    // Row 3 (ZXCVB)
    ຜ: "z",
    ປ: "x",
    ແ: "c",
    ອ: "v",
    "ຶ": "b",
    "ື": "n",
    ທ: "m",
    ມ: ",",
    ໃ: ".",
    ຝ: "/",

    // Row 3 (Shifted ZXCVB)
    "₭": "Z",
    "(": "X",
    ຯ: "C",
    x: "V",
    "ຶ້": "B",
    "ື້": "N",
    ໆ: "M",
    ໝ: "<",
    $: ">",
    ")": "?",
    " ": " ",
  };

  let output = "";
  for (let ch of text.value) {
    output += laoKeyboardMapEng[ch] ?? ch;
  }

  result.value = output;
  addToHistory(text.value, output, "la-en");
}

function copy() {
  if (!result?.value) return;

  const textToCopy = result.value;

  // Modern API available?
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("Copied:", textToCopy);
        copied.value = true;
        setTimeout(() => (copied.value = false), 2000);
      })
      .catch((err) => {
        console.error("Clipboard error:", err);
        fallbackCopy(textToCopy);
      });
  } else {
    fallbackCopy(textToCopy);
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
    toast.success(
      { title: "ສຳເລັດ!", message: "ການສໍາເນົາຂໍ້ຄວາມທີ່ຈະປ່ຽນພາສາສຳເລັດ" },
      { position: "top-center", timeout: 3000 },
    );
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch (err) {
    console.error("Fallback copy failed:", err);
    toast.error(
      { title: "ຜິດ!", message: "ການສໍາເນົາຂໍ້ຄວາມທີ່ຈະປ່ຽນພາສາຜິດ" },
      { position: "top-center", timeout: 3000 },
    );
  }

  document.body.removeChild(textarea);
}
</script>
<style scoped>
.translator-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #eef2ff 0%, #ffffff 50%, #faf5ff 100%);
}

.header-section {
  padding: 3rem 1rem 2rem;
}

.header-content {
  max-width: 896px;
  margin: 0 auto;
  text-align: center;
}

.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%);
  border-radius: 24px;
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
}

.icon-wrapper:hover {
  transform: scale(1.05);
}

.main-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #2563eb 0%, #9333ea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.subtitle {
  color: #6b7280;
  font-size: 1.125rem;
  line-height: 1.75;
  max-width: 672px;
  margin: 0 auto;
}

.main-container {
  max-width: 896px;
  padding-bottom: 3rem;
}

.input-card {
  margin-bottom: 1.5rem;
  border: 1px solid #f3f4f6;
}

.input-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
}

.custom-textarea :deep(.v-field) {
  border-radius: 16px;
  font-size: 1.125rem;
}

.custom-textarea :deep(.v-field--focused) {
  border-color: #9333ea;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.action-btn {
  border-radius: 16px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: normal;
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.blue-btn {
  background: linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
}

.purple-btn {
  background: linear-gradient(90deg, #9333ea 0%, #7e22ce 100%);
  color: white;
}

.result-card {
  border: 1px solid #f3f4f6;
  overflow: hidden;
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: linear-gradient(90deg, #f9fafb 0%, #f3f4f6 100%);
  border-bottom: 1px solid #e5e7eb;
}

.result-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #374151;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #10b981;
}

.copy-btn {
  color: #9333ea;
  text-transform: none;
}

.copy-btn:hover {
  background-color: #faf5ff;
}

.result-content {
  padding: 2rem;
}

.result-text {
  font-size: 1.125rem;
  color: #1f2937;
  line-height: 1.75;
  margin: 0;
}

.result-placeholder {
  color: #9ca3af;
  font-style: italic;
  margin: 0;
}

.info-cards {
  margin-top: 1.5rem;
}

.info-card {
  transition: transform 0.3s ease;
}

.info-card:hover {
  transform: translateY(-4px);
}

.blue-card {
  background-color: #eff6ff;
  border: 1px solid #dbeafe;
}

.purple-card {
  background-color: #faf5ff;
  border: 1px solid #f3e8ff;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.info-badge {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.875rem;
}

.blue-badge {
  background-color: #2563eb;
}

.purple-badge {
  background-color: #9333ea;
}

.info-title {
  font-weight: 600;
  font-size: 1rem;
  margin: 0;
}

.blue-card .info-title {
  color: #1e3a8a;
}

.purple-card .info-title {
  color: #581c87;
}

.info-text {
  font-size: 0.875rem;
  margin: 0;
}

.blue-card .info-text {
  color: #1e40af;
}

.purple-card .info-text {
  color: #6b21a8;
}

.history-list {
  padding: 0;
}

.history-item {
  padding: 1rem !important;
  border-bottom: 1px solid #f3f4f6;
}

.history-item:last-child {
  border-bottom: none;
}

.history-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.75rem;
  margin-right: 1rem;
}

.blue-icon {
  background-color: #eff6ff;
  color: #2563eb;
}

.purple-icon {
  background-color: #faf5ff;
  color: #9333ea;
}
</style>
