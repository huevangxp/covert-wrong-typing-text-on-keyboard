<template>
  <div class="modern-bg">
    <!-- Decorative Background Elements -->
    <div class="bg-shape shape-1"></div>
    <div class="bg-shape shape-2"></div>

    <v-container class="fill-height py-10 position-relative">
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          <!-- Header -->
          <div class="text-center mb-10 header-animate">
            <div class="glass-icon mb-6 mx-auto">
              <v-icon size="40" color="white">mdi-keyboard-variant</v-icon>
            </div>
            <h1 class="text-h3 font-weight-bold text-white mb-3 text-shadow">
              Lao-English Converter
            </h1>
            <p
              class="text-white text-opacity-90 text-subtitle-1 font-weight-light"
              style="max-width: 600px; margin: 0 auto"
            >
              ແປປະໂຫຍກ ຫຼື ຂໍ້ຄວາມທີ່ພິມຜິດຈາກພາສາອັງກິດໃຫ້ເປັນພາສາລາວ ແລະ
              ອັງກິດ
              <br class="hidden-sm-and-down" />
              ເມື່ອລືມກົດປ່ຽນພາສາ
            </p>
          </div>

          <!-- Main Converter Card -->
          <v-card class="glass-card mb-8" elevation="0">
            <v-card-text class="pa-6 pa-md-8">
              <!-- Input Section -->
              <div class="mb-6">
                <div class="d-flex align-center justify-space-between mb-3">
                  <div class="d-flex align-center">
                    <v-icon color="primary" class="mr-2"
                      >mdi-text-box-edit-outline</v-icon
                    >
                    <span
                      class="text-subtitle-2 font-weight-bold text-grey-darken-3"
                      >INPUT TEXT</span
                    >
                  </div>
                  <div class="d-flex align-center text-caption text-warning">
                    <v-icon size="small" class="mr-1"
                      >mdi-information-outline</v-icon
                    >
                    <span>ພິມຂໍ້ຄວາມທີ່ຕ້ອງການແປ</span>
                  </div>
                </div>

                <v-textarea
                  v-model="text"
                  placeholder="ພິມຂໍ້ຄວາມຂອງທ່ານທີ່ນີ້..."
                  variant="outlined"
                  bg-color="grey-lighten-5"
                  color="primary"
                  rows="5"
                  auto-grow
                  shaped
                  hide-details
                  class="modern-input"
                ></v-textarea>

                <div
                  class="d-flex align-center mt-2 text-caption text-error"
                  v-if="text"
                >
                  <v-icon size="small" class="mr-1"
                    >mdi-alert-circle-outline</v-icon
                  >
                  <span
                    >ຖ້າເປັນການປ່ຽນພາສາລາວ ມາ ເປັນພາສາອັງກິດ
                    ແມ່ນແນະນຳໃຫ້ພິມເປັນຕົວໜ້ອຍ</span
                  >
                </div>
              </div>

              <!-- Action Buttons -->
              <div
                class="d-flex flex-column flex-sm-row justify-center gap-4 my-8"
              >
                <v-btn
                  size="x-large"
                  class="action-btn blue-gradient text-white px-8 rounded-pill elevation-6"
                  @click="convert"
                  height="56"
                >
                  <span class="mr-2 font-weight-bold">English</span>
                  <v-icon>mdi-arrow-right</v-icon>
                  <span class="ml-2 font-weight-bold">Lao</span>
                </v-btn>

                <v-btn
                  size="x-large"
                  class="action-btn purple-gradient text-white px-8 rounded-pill elevation-6"
                  @click="convertEng"
                  height="56"
                >
                  <span class="mr-2 font-weight-bold">Lao</span>
                  <v-icon>mdi-arrow-right</v-icon>
                  <span class="ml-2 font-weight-bold">English</span>
                </v-btn>
              </div>

              <!-- Result Section -->
              <div class="result-section rounded-xl pa-6">
                <div class="d-flex justify-space-between align-center mb-4">
                  <div class="d-flex align-center">
                    <div class="status-indicator mr-3"></div>
                    <span
                      class="text-subtitle-2 font-weight-bold text-grey-darken-3"
                      >RESULT</span
                    >
                  </div>
                  <v-btn
                    variant="tonal"
                    size="small"
                    color="primary"
                    class="rounded-pill px-4"
                    @click="copy"
                    :disabled="!result"
                  >
                    <v-icon start size="18">mdi-content-copy</v-icon>
                    {{ copied ? "Copied!" : "Copy" }}
                  </v-btn>
                </div>

                <div class="result-display rounded-lg pa-4">
                  <p
                    v-if="result"
                    class="text-h6 font-weight-regular text-grey-darken-4 mb-0"
                    style="line-height: 1.6"
                  >
                    {{ result }}
                  </p>
                  <p
                    v-else
                    class="text-body-1 text-grey-lighten-1 font-italic mb-0"
                  >
                    ຜົນການແປຈະປາກົດຢູ່ທີ່ນີ້...
                  </p>
                </div>
              </div>
            </v-card-text>
          </v-card>

          <!-- History & Info Grid -->
          <v-row>
            <!-- History -->
            <v-col cols="12" md="8">
              <v-card
                class="glass-card h-100"
                elevation="0"
                v-if="history.length > 0"
              >
                <div class="d-flex align-center py-4 px-6 border-bottom">
                  <v-icon color="primary" class="mr-2">mdi-history</v-icon>
                  <span
                    class="text-subtitle-1 font-weight-bold text-grey-darken-3"
                    >Recent History</span
                  >
                  <v-spacer></v-spacer>
                  <v-btn
                    size="small"
                    variant="text"
                    color="error"
                    @click="clearHistory"
                    class="px-0"
                  >
                    Clear All
                  </v-btn>
                </div>
                <v-list class="bg-transparent py-0 history-list">
                  <v-list-item
                    v-for="(item, i) in history"
                    :key="i"
                    class="py-3 border-bottom-light history-item"
                  >
                    <template v-slot:prepend>
                      <v-avatar
                        size="36"
                        :color="
                          item.type === 'en-la'
                            ? 'blue-lighten-5'
                            : 'purple-lighten-5'
                        "
                        class="mr-3 elevation-0"
                      >
                        <span
                          :class="
                            item.type === 'en-la'
                              ? 'text-blue-darken-2'
                              : 'text-purple-darken-2'
                          "
                          class="text-caption font-weight-black"
                        >
                          {{ item.type === "en-la" ? "EN" : "LA" }}
                        </span>
                      </v-avatar>
                    </template>
                    <v-list-item-title
                      class="font-weight-medium text-body-2 mb-1"
                      >{{ item.result }}</v-list-item-title
                    >
                    <v-list-item-subtitle class="text-caption text-grey">{{
                      item.original
                    }}</v-list-item-subtitle>
                    <template v-slot:append>
                      <v-btn
                        icon
                        size="small"
                        variant="text"
                        color="grey-darken-1"
                        @click="copyHistoryItem(item.result)"
                      >
                        <v-icon size="small">mdi-content-copy</v-icon>
                      </v-btn>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>

            <!-- Info -->
            <v-col cols="12" md="4">
              <div class="d-flex flex-column gap-3">
                <v-card class="glass-card info-card-hover" elevation="0">
                  <v-card-text class="pa-4">
                    <div class="d-flex align-center mb-2">
                      <div class="info-badge blue-badge mr-3">EN</div>
                      <div
                        class="font-weight-bold text-body-2 text-blue-darken-3"
                      >
                        English to Lao
                      </div>
                    </div>
                    <p
                      class="text-caption text-grey-darken-1 mb-0"
                      style="line-height: 1.4"
                    >
                      ພິມດ້ວຍແປ້ນພິມພາສາອັງກິດ ແລະ ຄລິກປຸ່ມອັງກິດ-ລາວ
                    </p>
                  </v-card-text>
                </v-card>
                <v-card class="glass-card info-card-hover" elevation="0">
                  <v-card-text class="pa-4">
                    <div class="d-flex align-center mb-2">
                      <div class="info-badge purple-badge mr-3">LA</div>
                      <div
                        class="font-weight-bold text-body-2 text-purple-darken-3"
                      >
                        Lao to English
                      </div>
                    </div>
                    <p
                      class="text-caption text-grey-darken-1 mb-0"
                      style="line-height: 1.4"
                    >
                      ພິມດ້ວຍແປ້ນພິມພາສາລາວ ແລະ ຄລິກປຸ່ມລາວ-ອັງກິດ
                    </p>
                  </v-card-text>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
const text = ref("");
const result = ref("");
const copied = ref(false);
const toast = useToast();
const history = ref([]);

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

  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        copied.value = true;
        setTimeout(() => (copied.value = false), 2000);
        toast.success(
          { title: "ສຳເລັດ!", message: "ຄັດລອກແລ້ວ" },
          { position: "top-center", timeout: 2000 },
        );
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
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
    toast.success(
      { title: "ສຳເລັດ!", message: "ການສໍາເນົາຂໍ້ຄວາມທີ່ຈະປ່ຽນພາສາສຳເລັດ" },
      { position: "top-center", timeout: 3000 },
    );
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
.modern-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  position: relative;
  overflow: hidden;
}

/* Abstract Background Shapes */
.bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.6;
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: #a18cd1;
  top: -100px;
  left: -100px;
  animation: float 10s infinite alternate;
}

.shape-2 {
  width: 500px;
  height: 500px;
  background: #fbc2eb;
  bottom: -150px;
  right: -150px;
  animation: float 15s infinite alternate-reverse;
}

@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(30px, 30px);
  }
}

.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 24px !important;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.info-card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.glass-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.text-shadow {
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modern-input :deep(.v-field) {
  border-radius: 16px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.modern-input :deep(.v-field--focused) {
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.action-btn {
  transition: all 0.3s ease;
  text-transform: none;
  letter-spacing: 0.5px;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2) !important;
}

.blue-gradient {
  background: linear-gradient(135deg, #0061ff 0%, #60efff 100%);
}

.purple-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.result-section {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
}

.result-display {
  background-color: white;
  border: 1px solid #f1f5f9;
  min-height: 60px;
  display: flex;
  align-items: center;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #10b981;
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
}

.info-badge {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.75rem;
}

.blue-badge {
  background-color: #eff6ff;
  color: #2563eb;
}

.purple-badge {
  background-color: #faf5ff;
  color: #9333ea;
}

.border-bottom {
  border-bottom: 1px solid #f1f5f9;
}

.border-bottom-light {
  border-bottom: 1px solid #f8fafc;
}

.gap-3 {
  gap: 0.75rem;
}

.gap-4 {
  gap: 1rem;
}

/* Custom Scrollbar for history */
.history-list {
  max-height: 300px;
  overflow-y: auto;
}

.history-list::-webkit-scrollbar {
  width: 6px;
}

.history-list::-webkit-scrollbar-track {
  background: transparent;
}

.history-list::-webkit-scrollbar-thumb {
  background-color: #e2e8f0;
  border-radius: 20px;
}

@media (max-width: 600px) {
  .header-section {
    padding: 2rem 1rem;
  }

  .main-title {
    font-size: 2rem;
  }
}
</style>
