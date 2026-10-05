const STORAGE_KEY = "ruang-alpro-cases-v1";
const SAVED_KEY = "ruang-alpro-saved-v1";

const starterCases = [
  {
    id: "prima-01", title: "Mencari tahu apakah angka itu prima", category: "Logika Dasar", level: "Pemula",
    summary: "Diberikan sebuah bilangan bulat, tentukan apakah bilangan tersebut hanya memiliki dua faktor: 1 dan dirinya sendiri.",
    solution: "Angka di bawah 2 bukan bilangan prima. Untuk angka lainnya, coba pembagi mulai dari 2 sampai akar kuadrat dari angka tersebut. Jika ada pembagi yang menghasilkan sisa 0, angka itu komposit. Batas akar kuadrat cukup karena faktor selalu berpasangan.",
    code: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n\n    bool prima = n >= 2;\n    for (int pembagi = 2; pembagi * pembagi <= n; pembagi++) {\n        if (n % pembagi == 0) {\n            prima = false;\n            break;\n        }\n    }\n\n    cout << (prima ? \"Prima\" : \"Bukan prima\");\n    return 0;\n}", date: "2026-09-18"
  },
  {
    id: "array-02", title: "Nilai terbesar tanpa sort", category: "Array", level: "Pemula",
    summary: "Dari sekumpulan nilai ujian, ambil nilai tertinggi dalam satu kali penelusuran tanpa mengurutkan seluruh data.",
    solution: "Simpan elemen pertama sebagai nilai maksimum sementara. Telusuri elemen berikutnya satu per satu; setiap kali menemukan nilai yang lebih besar, perbarui maksimum. Cara ini berjalan dalam O(n) waktu dan hanya memakai O(1) ruang tambahan.",
    code: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int nilai[] = {78, 92, 85, 67, 95};\n    int jumlah = sizeof(nilai) / sizeof(nilai[0]);\n    int terbesar = nilai[0];\n\n    for (int i = 1; i < jumlah; i++) {\n        if (nilai[i] > terbesar) terbesar = nilai[i];\n    }\n\n    cout << \"Nilai tertinggi: \" << terbesar;\n    return 0;\n}", date: "2026-09-12"
  },
  {
    id: "loop-03", title: "Membuat pola segitiga dari bintang", category: "Perulangan", level: "Pemula",
    summary: "Cetak pola segitiga dengan tinggi n. Setiap baris berikutnya memiliki satu bintang lebih banyak dari baris sebelumnya.",
    solution: "Gunakan perulangan luar untuk memilih baris, dari 1 sampai n. Di dalamnya, perulangan kedua mencetak bintang sebanyak nomor baris saat ini. Akhiri tiap baris dengan newline agar bentuk segitiga tersusun.",
    code: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int tinggi;\n    cin >> tinggi;\n\n    for (int baris = 1; baris <= tinggi; baris++) {\n        for (int kolom = 1; kolom <= baris; kolom++) {\n            cout << \"* \";\n        }\n        cout << endl;\n    }\n    return 0;\n}", date: "2026-09-08"
  },
  {
    id: "fungsi-04", title: "Meringkas angka dengan FPB", category: "Fungsi", level: "Menengah",
    summary: "Sederhanakan pecahan dengan mencari faktor persekutuan terbesar pembilang dan penyebut menggunakan algoritma Euclid.",
    solution: "Selama penyebut belum nol, ganti pasangan (a, b) dengan (b, a % b). Sisa pembagian terus mengecil, jadi proses berhenti. Nilai terakhir pada a adalah FPB dan bisa dipakai untuk menyederhanakan pecahan.",
    code: "#include <iostream>\nusing namespace std;\n\nint fpb(int a, int b) {\n    while (b != 0) {\n        int sisa = a % b;\n        a = b;\n        b = sisa;\n    }\n    return a;\n}\n\nint main() {\n    int pembilang = 24, penyebut = 36;\n    int pembagi = fpb(pembilang, penyebut);\n    cout << pembilang / pembagi << '/' << penyebut / pembagi;\n    return 0;\n}", date: "2026-09-03"
  },
  {
    id: "string-05", title: "Mengecek kata yang dibaca sama", category: "String", level: "Menengah",
    summary: "Periksa apakah sebuah kata tetap sama ketika dibaca dari depan maupun belakang, seperti 'katak' atau 'level'.",
    solution: "Bandingkan karakter dari kedua ujung string sambil bergerak ke tengah. Begitu ada pasangan yang berbeda, kata bukan palindrom. Pemeriksaan hanya berjalan sampai setengah panjang kata.",
    code: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string kata;\n    cin >> kata;\n\n    bool palindrom = true;\n    for (int kiri = 0, kanan = kata.size() - 1;\n         kiri < kanan; kiri++, kanan--) {\n        if (kata[kiri] != kata[kanan]) {\n            palindrom = false;\n            break;\n        }\n    }\n\n    cout << (palindrom ? \"Ya\" : \"Tidak\");\n    return 0;\n}", date: "2026-08-28"
  },
  {
    id: "loop-06", title: "Menghitung total digit sebuah bilangan", category: "Perulangan", level: "Pemula",
    summary: "Hitung jumlah semua digit dari bilangan bulat, misalnya 2026 menghasilkan 10.",
    solution: "Ambil digit paling kanan dengan operator modulo 10, tambahkan ke total, lalu buang digit itu menggunakan pembagian bulat 10. Ulangi sampai bilangan habis. Gunakan abs agar bilangan negatif juga dapat ditangani.",
    code: "#include <iostream>\n#include <cstdlib>\nusing namespace std;\n\nint main() {\n    int angka;\n    cin >> angka;\n    angka = abs(angka);\n\n    int total = 0;\n    while (angka > 0) {\n        total += angka % 10;\n        angka /= 10;\n    }\n\n    cout << total;\n    return 0;\n}", date: "2026-08-21"
  }
];

let cases = loadCases();
let savedIds = loadSaved();
let activeCategory = "Semua";
let savedOnly = false;
const addModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("addCaseModal"));
const detailModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("detailModal"));
const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById("appToast"), { delay: 2200 });

function loadCases() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(stored) ? stored : [...starterCases];
  } catch {
    return [...starterCases];
  }
}

function loadSaved() {
  try {
    const stored = JSON.parse(localStorage.getItem(SAVED_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
  localStorage.setItem(SAVED_KEY, JSON.stringify(savedIds));
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function renderCases() {
  const query = document.getElementById("caseSearch").value.trim().toLocaleLowerCase("id");
  const filtered = cases.filter((item) => {
    const categoryMatch = activeCategory === "Semua" || item.category === activeCategory;
    const savedMatch = !savedOnly || savedIds.includes(item.id);
    const text = `${item.title} ${item.summary} ${item.category} ${item.solution}`.toLocaleLowerCase("id");
    return categoryMatch && savedMatch && text.includes(query);
  });
  const grid = document.getElementById("caseGrid");
  grid.innerHTML = filtered.map((item, index) => {
    const isSaved = savedIds.includes(item.id);
    const levelClass = item.level === "Menengah" ? "medium" : item.level === "Lanjutan" ? "advanced" : "";
    const number = String(cases.indexOf(item) + 1).padStart(2, "0");
    return `<div class="col-md-6 col-xl-4"><article class="case-card" style="animation-delay:${Math.min(index * 55, 220)}ms">
      <div class="case-card-body">
        <div class="card-topline"><div><span class="case-category">${escapeHtml(item.category)}</span>${item.custom ? '<span class="card-custom-mark">BARU</span>' : ""}</div>
          <button class="save-button ${isSaved ? "saved" : ""}" type="button" data-save="${escapeHtml(item.id)}" aria-label="${isSaved ? "Hapus dari tersimpan" : "Simpan studi kasus"}" title="${isSaved ? "Hapus dari tersimpan" : "Simpan studi kasus"}"><i class="bi ${isSaved ? "bi-bookmark-fill" : "bi-bookmark"}"></i></button></div>
        <h3>${escapeHtml(item.title)}</h3><p class="case-summary">${escapeHtml(item.summary)}</p>
        <div class="case-bottom"><span class="case-level"><span class="level-dot ${levelClass}"></span>${escapeHtml(item.level)}</span><button class="read-link" type="button" data-open="${escapeHtml(item.id)}">Baca catatan <i class="bi bi-arrow-up-right"></i></button></div>
      </div></article></div>`;
  }).join("");
  document.getElementById("caseCount").textContent = cases.length;
  document.getElementById("allFilterCount").textContent = cases.length;
  document.getElementById("savedCount").textContent = savedIds.length;
  document.getElementById("emptyState").classList.toggle("d-none", filtered.length > 0);
  document.getElementById("caseGrid").classList.toggle("d-none", filtered.length === 0);
}

function showToast(message) {
  document.getElementById("toastMessage").textContent = message;
  toast.show();
}

function openDetails(id) {
  const item = cases.find((entry) => entry.id === id);
  if (!item) return;
  const saved = savedIds.includes(item.id);
  document.getElementById("detailContent").innerHTML = `<div class="modal-header"><span class="detail-meta"><span class="eyebrow-dot"></span>${escapeHtml(item.category)} · ${escapeHtml(item.level)}</span><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button></div>
    <div class="modal-body"><h2 id="detailTitle">${escapeHtml(item.title)}</h2><p class="detail-summary">${escapeHtml(item.summary)}</p><h3>Memecahkan masalah</h3><p class="solution-text">${escapeHtml(item.solution)}</p>${item.code ? `<h3>Implementasi C++</h3><pre class="detail-code"><code>${escapeHtml(item.code)}</code></pre>` : ""}<div class="detail-footer"><span class="detail-date">DICATAT ${escapeHtml(item.date || "")}</span><button class="btn btn-ink btn-sm rounded-pill px-3" type="button" data-save="${escapeHtml(item.id)}"><i class="bi ${saved ? "bi-bookmark-fill" : "bi-bookmark"} me-1"></i>${saved ? "Tersimpan" : "Simpan"}</button></div></div>`;
  detailModal.show();
}

function setCategory(category) {
  activeCategory = category;
  document.getElementById("categoryFilter").value = category;
  document.querySelectorAll(".filter-chip").forEach((button) => button.classList.toggle("active", button.dataset.filter === category));
  document.getElementById("listHeading").innerHTML = savedOnly ? 'Catatan <span>tersimpan.</span>' : 'Studi kasus <span>pilihan.</span>';
  renderCases();
}

document.getElementById("caseGrid").addEventListener("click", (event) => {
  const saveButton = event.target.closest("[data-save]");
  const openButton = event.target.closest("[data-open]");
  if (saveButton) toggleSaved(saveButton.dataset.save);
  if (openButton) openDetails(openButton.dataset.open);
});

document.getElementById("detailContent").addEventListener("click", (event) => {
  const button = event.target.closest("[data-save]");
  if (button) toggleSaved(button.dataset.save, true);
});

function toggleSaved(id, refreshDetails = false) {
  savedIds = savedIds.includes(id) ? savedIds.filter((savedId) => savedId !== id) : [...savedIds, id];
  persist();
  renderCases();
  if (refreshDetails) openDetails(id);
  showToast(savedIds.includes(id) ? "Catatan ditambahkan ke tersimpan." : "Catatan dihapus dari tersimpan.");
}

document.getElementById("filterRow").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  savedOnly = false;
  document.getElementById("savedViewButton").classList.remove("active");
  setCategory(button.dataset.filter);
});

document.getElementById("categoryFilter").addEventListener("change", (event) => {
  savedOnly = false;
  document.getElementById("savedViewButton").classList.remove("active");
  setCategory(event.target.value);
});

document.getElementById("caseSearch").addEventListener("input", renderCases);
document.getElementById("savedViewButton").addEventListener("click", (event) => {
  savedOnly = !savedOnly;
  event.currentTarget.classList.toggle("active", savedOnly);
  if (savedOnly) setCategory("Semua");
  else renderCases();
  document.getElementById("listHeading").innerHTML = savedOnly ? 'Catatan <span>tersimpan.</span>' : 'Studi kasus <span>pilihan.</span>';
  document.getElementById("studi-kasus").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("caseForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const title = String(formData.get("title")).trim();
  const summary = String(formData.get("summary")).trim();
  const solution = String(formData.get("solution")).trim();
  if (!title || !summary || !solution) return;
  const item = {
    id: `case-${Date.now()}`, title, category: formData.get("category"), level: formData.get("level"), summary, solution,
    code: String(formData.get("code")).trim(), date: new Date().toISOString().slice(0, 10), custom: true
  };
  cases = [item, ...cases];
  persist();
  event.currentTarget.reset();
  savedOnly = false;
  document.getElementById("savedViewButton").classList.remove("active");
  document.getElementById("caseSearch").value = "";
  document.getElementById("listHeading").innerHTML = 'Studi kasus <span>pilihan.</span>';
  setCategory("Semua");
  addModal.hide();
  showToast("Studi kasus baru berhasil disimpan.");
  document.getElementById("studi-kasus").scrollIntoView({ behavior: "smooth" });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    document.getElementById("caseSearch").focus();
  }
  if (event.key === "Escape" && document.activeElement === document.getElementById("caseSearch")) {
    document.getElementById("caseSearch").value = "";
    renderCases();
  }
});

renderCases();