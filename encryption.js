// Mendapatkan elemen dari DOM
const plaintextTextarea = document.getElementById('plaintext');
const ciphertextTextarea = document.getElementById('ciphertext');
const caesarKeyInput = document.getElementById('caesarKey');
const encryptCaesarBtn = document.getElementById('encryptCaesarBtn');
const decryptCaesarBtn = document.getElementById('decryptCaesarBtn');

// Fungsi untuk mengenkripsi teks menggunakan Caesar Cipher
function caesarEncrypt(text, key) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-z]/i)) {
            const code = text.charCodeAt(i);
            // Huruf besar
            if (code >= 65 && code <= 90) {
                char = String.fromCharCode(((code - 65 + key) % 26) + 65);
            }
            // Huruf kecil
            else if (code >= 97 && code <= 122) {
                char = String.fromCharCode(((code - 97 + key) % 26) + 97);
            }
        }
        result += char;
    }
    return result;
}

// Fungsi untuk mendekripsi teks menggunakan Caesar Cipher
function caesarDecrypt(text, key) {
    // Dekripsi adalah enkripsi dengan kunci negatif
    return caesarEncrypt(text, (26 - key) % 26);
}

// Event listener untuk tombol Enkripsi
encryptCaesarBtn.addEventListener('click', () => {
    const text = plaintextTextarea.value;
    const key = parseInt(caesarKeyInput.value);
    if (key >= 1 && key <= 25) {
        ciphertextTextarea.value = caesarEncrypt(text, key);
    } else {
        alert('Kunci harus antara 1 dan 25!');
    }
});

// Event listener untuk tombol Dekripsi
decryptCaesarBtn.addEventListener('click', () => {
    const text = ciphertextTextarea.value;
    const key = parseInt(caesarKeyInput.value);
    if (key >= 1 && key <= 25) {
        plaintextTextarea.value = caesarDecrypt(text, key);
    } else {
        alert('Kunci harus antara 1 dan 25!');
    }
});