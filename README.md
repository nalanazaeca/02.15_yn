# Web 02.15yn

## Cara nambah cerita / bab baru (gak perlu ngoding)

1. Buka file **`admin.html`** (klik dua kali, terbuka di browser).
2. Isi form: judul bab, tanggal, dan isi cerita (bisa langsung paste dari Word).
3. Klik **"+ Tambah bab ini"**.
4. Kalau sudah selesai nulis untuk hari itu, klik **"⬇ Unduh data.js"** — file baru akan terunduh ke folder Downloads.
5. Upload file itu ke GitHub untuk menggantikan `js/data.js` yang lama (lihat langkah upload di bawah).

Progres yang belum diunduh tetap tersimpan otomatis di browser itu (localStorage), jadi kalau kamu nutup tab lalu buka lagi `admin.html`, tulisan kamu masih ada.

## Cara edit langsung lewat kode (opsional, kalau suatu saat mau)

Semua data juga bisa diedit langsung di file **`js/data.js`** kalau kamu berubah pikiran dan mau pakai editor kode.

## Cara lihat hasilnya di komputer sendiri

Tinggal buka file `index.html` pakai browser (klik dua kali). Selesai.

## Cara upload gratis biar bisa diakses orang lain (GitHub Pages)

1. Buat akun di [github.com](https://github.com) kalau belum punya.
2. Buat repository baru, kasih nama bebas, misal `02-15yn`.
3. Upload semua file di folder ini (index.html, chapter.html, admin.html, folder css, folder js) ke repository itu — bisa lewat tombol "Add file → Upload files" di web GitHub, gak perlu command line.
4. Masuk ke **Settings → Pages** di repository itu.
5. Di bagian "Source", pilih branch `main` dan folder `/root`, lalu Save.
6. Tunggu 1-2 menit, link web kamu akan muncul di halaman itu — biasanya bentuknya `namamu.github.io/02-15yn`.

Setiap kali kamu upload ulang `data.js` yang baru (hasil unduhan dari `admin.html`) ke GitHub — cukup ganti file lama dengan yang baru lewat "Add file → Upload files" — web-nya otomatis ke-update.

Catatan: `admin.html` cuma buat kamu nulis, jangan dikasih tau ke pembaca. Ini bukan halaman yang aman dikunci password, tapi juga gak bakal ketemu orang lain kecuali mereka tahu link-nya persis.

## Kalau nanti mau ada kolom komentar

Situs ini murni gratis dan statis jadi belum ada kolom komentar. Kalau nanti mau nambahin, bisa pakai layanan gratis seperti **giscus** (pakai GitHub Discussions) — kasih tau aku aja nanti, aku bantu pasangin.
