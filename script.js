// script.js

// Objek untuk mapping teks ke kode Morse
const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
    ' ': '/', '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--',
};

// Objek untuk mapping kode Morse kembali ke teks
const reverseMorseCode = Object.fromEntries(
    Object.entries(morseCode).map(([key, value]) => [value, key])
);

// Elemen DOM
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const encodeBtn = document.getElementById('encodeBtn');
const decodeBtn = document.getElementById('decodeBtn');
const playAudioBtn = document.getElementById('playAudioBtn');
const speedRange = document.getElementById('speed');

// Fungsi untuk konversi Teks ke Morse
function encodeToMorse() {
    let text = inputText.value.toUpperCase();
    let result = '';
    for (let char of text) {
        if (morseCode[char]) {
            result += morseCode[char] + ' ';
        } else {
            result += char + ' '; // Jika karakter tidak ada di mapping
        }
    }
    outputText.value = result.trim();
}

// Fungsi untuk konversi Morse ke Teks
function decodeToText() {
    let morse = inputText.value.trim().split(' ');
    let result = '';
    for (let code of morse) {
        if (reverseMorseCode[code]) {
            result += reverseMorseCode[code];
        } else {
            result += ' '; // Untuk spasi antar kata atau karakter yang tidak dikenal
        }
    }
    outputText.value = result;
}

// Fungsi untuk memutar audio kode Morse
function playMorseAudio() {
    let morse = outputText.value.trim();
    if (!morse) return;

    // Mengambil kecepatan dari input range
    const wpm = speedRange.value;
    // Durasi dasar per unit (dit)
    const ditDuration = 1200 / wpm; // Dalam milidetik

    // AudioContext untuk memanipulasi audio
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = null;
    let gainNode = null;
    let currentTime = audioCtx.currentTime;

    // Fungsi untuk membuat suara (dot/dash)
    function createSound(duration) {
        oscillator = audioCtx.createOscillator();
        gainNode = audioCtx.createGain();

        oscillator.type = 'sine'; // Tipe gelombang
        oscillator.frequency.value = 600; // Frekuensi suara
        gainNode.gain.setValueAtTime(0, currentTime);
        gainNode.gain.linearRampToValueAtTime(1, currentTime + 0.01);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start(currentTime);
        gainNode.gain.linearRampToValueAtTime(0, currentTime + duration);
        oscillator.stop(currentTime + duration);
    }

    // Mengurai kode morse dan memutar audio
    for (let i = 0; i < morse.length; i++) {
        const char = morse[i];
        if (char === '.') {
            createSound(ditDuration / 1000); // Durasi dot
            currentTime += ditDuration / 1000 + ditDuration / 1000; // Durasi dot + spasi antar karakter
        } else if (char === '-') {
            createSound(3 * ditDuration / 1000); // Durasi dash
            currentTime += 3 * ditDuration / 1000 + ditDuration / 1000; // Durasi dash + spasi antar karakter
        } else if (char === ' ') {
            currentTime += 3 * ditDuration / 1000; // Spasi antar kata
        }
    }
}

// Event Listeners untuk tombol
encodeBtn.addEventListener('click', encodeToMorse);
decodeBtn.addEventListener('click', decodeToText);
playAudioBtn.addEventListener('click', playMorseAudio);


