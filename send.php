<?php
/*  ИСПРАВИТЬ ПОЧТУ!!!  */
$to = "leshahaker18032010@gmail.com"; 
/*  ИСПРАВИТЬ ПОЧТУ!!!  */

$subject = "🚖 Новая заявка с сайта TAXI";

if ($_SERVER["REQUEST_METHOD"] == "POST") {


    $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $type = isset($_POST['type']) ? htmlspecialchars(trim($_POST['type'])) : 'Не выбрано';

    if (!empty($phone) && !empty($name)) {


        $message = "
        <html>
        <head>
            <title>$subject</title>
        </head>
        <body style='font-family: Arial, sans-serif;'>
            <h2 style='color: #FCE000; background: #1C1C1E; padding: 10px;'>Новая заявка!</h2>
            <p><strong>Имя:</strong> $name</p>
            <p><strong>Телефон:</strong> <a href='tel:$phone'>$phone</a></p>
            <p><strong>Что интересует:</strong> $type</p>
            <hr>
            <small>Письмо отправлено с вашего сайта.</small>
        </body>
        </html>
        ";

        // Заголовки, чтобы письмо было красивым и русские буквы не ломались
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: Taxi Site <no-reply@kuda-budet-prihodit.ru>" . "\r\n"; // Можно оставить так

        // Самая главная функция - ОТПРАВКА
        if (mail($to, $subject, $message, $headers)) {
            echo "OK"; // Это слово ждет наш JavaScript, чтобы показать зеленую галочку
        } else {
            echo "ERROR"; // Ошибка отправки на стороне сервера
        }

    } else {
        echo "EMPTY"; // Если поля пустые
    }

} else {
    echo "NO POST"; // Если открыли файл напрямую в браузере
}
?>
