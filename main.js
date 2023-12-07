//Validasi
var errmsg = document.getElementById('error');

function validatePlafond(plafond){
    if(plafond <= 0 || plafond == ""){
        errmsg.innerHTML = 'Plafond harus lebih dari 0';
        return false;
    }
    return true;
}

function validateWaktu(durasi){
    if(durasi <= 0 || durasi == ""){
        errmsg.innerHTML = 'Lama pinjaman tidak boleh 0 bulan';
        return false;
    }
    return true;
}

function validateBunga(bunga){
    if(bunga <= 0 || bunga == "" || bunga > 100){
        errmsg.innerHTML = 'Bunga hanya boleh 1% - 100%';
        return false;
    }
    return true;
}

function validateMulai(mulai){
    if(mulai == ""){
        errmsg.innerHTML = 'Tanggal mulai perlu diisi';
        return false;
    }
    return true;
}

// Perhitungan
function dateFormat(date){
    var bulan = (date.getMonth() + 1).toString();
    if(bulan.length < 2) bulan = "0" + bulan;

    var tgl = date.getDate().toString();
    if(tgl.length < 2) tgl = "0" + tgl;

    return date.getFullYear() + "-" + bulan + "-" + tgl;

}

function moneyFormat(amount){
    var form = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return form;
}

function findAngsuranTotal(bunga, plafond){
    bungaBul = bunga/12;
    var bagi = Math.pow((1 + bungaBul), 12);

    return bungaBul * plafond * (bagi/(bagi-1));
}

function findBunga(bunga, plafond){
    return (bunga/360)*30*plafond;
}

function tableRow(mytable, cont1, cont2, cont3, cont4, cont5, cont6){
    var row = mytable.insertRow();

    var cel1 = row.insertCell(0);
    var cel2 = row.insertCell(1);
    var cel3 = row.insertCell(2);
    var cel4 = row.insertCell(3);
    var cel5 = row.insertCell(4);
    var cel6 = row.insertCell(5);

    cel1.innerHTML = cont1;
    cel2.innerHTML = cont2;
    cel3.innerHTML = cont3;
    cel4.innerHTML = cont4;
    cel5.innerHTML = cont5;
    cel6.innerHTML = cont6;
}

// Main
function calculate(){
    var plafond = document.getElementById('plafond').value;
    var durasi = document.getElementById('durasi').value;
    var bunga = document.getElementById('bunga').value;
    var mulai = document.getElementById('mulai').value;
    var mytable = document.getElementById('mytabel');

    // Validasi
    if(!validatePlafond(plafond) || !validateWaktu(durasi) || !validateBunga(bunga) || !validateMulai(mulai)){
        errmsg.removeAttribute('hidden');
        return false;
    }
    errmsg.innerHTML = '';
    errmsg.getAttribute('hidden');

    bunga = bunga/100; //Karena dalam %
    let date = new Date(mulai);

    // Delete semua elemen tabel
    while (mytable.rows.length > 1) {
        mytable.deleteRow(mytable.rows.length - 1);
    }

    // Buat header
    mytable.removeAttribute('hidden');

    // Nilai total angsuran tetap
    var aTotal = findAngsuranTotal(bunga, plafond);

    // Loop selama durasi
    for (let tahap = 0; tahap < durasi; tahap++) {

        var format = dateFormat(date);
        var aBunga = findBunga(bunga, plafond);
        var aPokok = aTotal - aBunga;
        var sisa = plafond - aPokok;

        var aSisa;
        if(sisa > 0) aSisa = moneyFormat(sisa.toFixed(2));
        else aSisa = "-";

        tableRow(mytable, tahap+1, format, moneyFormat(aTotal.toFixed(2)), 
                            moneyFormat(aPokok.toFixed(2)), moneyFormat(aBunga.toFixed(2)), aSisa);

        date.setMonth(date.getMonth() + 1);
        plafond = sisa;
        
    }

}