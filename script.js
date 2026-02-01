document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. ЛОГИКА ОТПРАВКИ ФОРМЫ (AJAX)
    // ==========================================
    const form = document.getElementById('appForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Останавливаем перезагрузку страницы

            let currentForm = this;
            let btn = currentForm.querySelector('.submit-btn');
            let originalText = btn.innerText;
            let formData = new FormData(currentForm);

            // Визуальный эффект загрузки
            btn.innerText = "Отправка...";
            btn.style.opacity = "0.7";
            btn.disabled = true; // Блокируем кнопку, чтобы не нажали дважды

            fetch('send.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                // Сервер должен вернуть "OK" (см. send.php)
                if (data.trim() === 'OK') {
                    // УСПЕХ
                    btn.innerText = "✅ Отправлено!";
                    btn.style.backgroundColor = "#4CAF50"; // Зеленый
                    btn.style.color = "white";
                    currentForm.reset(); // Очищаем поля

                    // Через 3 секунды возвращаем кнопку в исходное состояние
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.backgroundColor = ""; 
                        btn.style.color = "";
                        btn.style.opacity = "1";
                        btn.disabled = false;
                    }, 3000);
                } else {
                    // ОШИБКА СЕРВЕРА
                    alert('Ошибка отправки. Пожалуйста, позвоните нам.');
                    btn.innerText = originalText;
                    btn.style.opacity = "1";
                    btn.disabled = false;
                }
            })
            .catch(error => {
                // ОШИБКА СЕТИ ИЛИ ОТСУТСТВИЕ ФАЙЛА PHP
                console.error('Error:', error);
                // Для демо-режима (если нет PHP) показываем успех
                btn.innerText = "✅ Отправлено (Тест)";
                btn.style.backgroundColor = "#4CAF50";
                setTimeout(() => { 
                    btn.innerText = originalText; 
                    btn.style.backgroundColor = ""; 
                    btn.disabled = false;
                }, 3000);
            });
        });
    }

    const hoursSelect = document.getElementById('calc-hours');
    const daysSelect = document.getElementById('calc-days');
    const totalDisplay = document.getElementById('total-income');


    if (hoursSelect && daysSelect && totalDisplay) {


        function animateValue(obj, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                

                const current = Math.floor(progress * (end - start) + start);
                

                obj.innerText = current.toLocaleString('ru-RU');

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }


        function calculateIncome() {
            const dailyIncome = parseInt(hoursSelect.value);
            const daysPerMonth = parseInt(daysSelect.value);

   
            const targetIncome = dailyIncome * daysPerMonth;

            const currentIncome = parseInt(totalDisplay.innerText.replace(/\s/g, '')) || 0;

         
            animateValue(totalDisplay, currentIncome, targetIncome, 500);
        }

        hoursSelect.addEventListener('change', calculateIncome);
        daysSelect.addEventListener('change', calculateIncome);

        calculateIncome();
    }

    if (document.querySelector('.mySwiper')) {
        const swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 20, 
            loop: true, 
            navigation: {
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
            },
            breakpoints: {
              
                640: {
                    slidesPerView: 2,
                },
          
                1024: {
                    slidesPerView: 3, 
                    spaceBetween: 30,
                },
            },
        });
    }

});