// Live update for name, empid, phone
const nameInput = document.getElementById('name');
const empidInput = document.getElementById('empid');
const phoneInput = document.getElementById('phone');
const cardName = document.getElementById('cardName');
const cardEmpId = document.getElementById('cardEmpId');
const cardPhone = document.getElementById('cardPhone');
const photoInput = document.getElementById('photo');
const cardPhoto = document.getElementById('cardPhoto');

nameInput.addEventListener('input', () => {
    cardName.textContent = nameInput.value || 'Asmita Avadhut Mhetre';
});
empidInput.addEventListener('input', () => {
    cardEmpId.textContent = empidInput.value || '7325';
});
phoneInput.addEventListener('input', () => {
    cardPhone.textContent = phoneInput.value || '7385618725';
});

photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
            cardPhoto.src = evt.target.result;
            cardPhoto.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        cardPhoto.src = '';
        cardPhoto.style.display = 'none';
    }
});

// PDF generation
const generateBtn = document.getElementById('generateBtn');
generateBtn.addEventListener('click', () => {
    // Validation
    let missing = [];
    if (!photoInput.files[0]) missing.push('Photo');
    if (!nameInput.value.trim()) missing.push('Name');
    if (!empidInput.value.trim()) missing.push('Emp ID');
    if (!phoneInput.value.trim()) missing.push('Phone Number');
    if (missing.length > 0) {
        alert('Please fill in the following fields: ' + missing.join(', '));
        // Optionally, highlight missing fields
        [photoInput, nameInput, empidInput, phoneInput].forEach((input, idx) => {
            if (missing.includes(['Photo','Name','Emp ID','Phone Number'][idx])) {
                input.style.borderColor = '#e53e3e';
            } else {
                input.style.borderColor = '#d1d5db';
            }
        });
        return;
    }
    // Reset border color if all valid
    [photoInput, nameInput, empidInput, phoneInput].forEach(input => input.style.borderColor = '#d1d5db');
    const card = document.getElementById('idCardPreview');
    html2pdf()
        .set({
            margin: 0,
            filename: 'id_card.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .from(card)
        .save();
}); 