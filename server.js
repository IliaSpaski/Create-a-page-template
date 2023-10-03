//Перед прочтением или изменением кода ознакомьтесь с лицензированием кода!!!!!!!!!!
//CC Attribution — Noncommercial — No Derivative Works (сокращённо CC BY-NC-ND) АКТ CC BY-NC-ND 4.0
//https://creativecommons.org/licenses/by-nc-nd/4.0/
//Creator - Spasky Ilya

// Подключаем необходимые модули Node.js
const http = require("http");
const fs = require("fs");
const path = require("path");

// MIME-типы файлов, используемые для отправки в HTTP-ответе
const contentTypes = {
    ".ico": "image/x-icon",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
};

// Массивы для имен, фамилий и отчеств
const names = ['Иван', 'Анна', 'Петр', 'Мария', 'Алексей'];
const surnames = ['Иванов', 'Петров', 'Сидоров', 'Смирнов', 'Козлов'];
const patronymics = ['Иванович', 'Петрович', 'Алексеевич', 'Дмитриевич', 'Сергеевич'];
const imagePaths = [
    'img/People2.jpg',
    'img/People3.jpg',
    'img/People1.jpg',
    'img/avatar.png'
];

// Функция для генерации случайного целого числа в заданном диапазоне
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для генерации случайных данных о студенте
function generateRandomData() {
    // Генерируем случайный путь к изображению
    const randomIndex = getRandomInt(0, imagePaths.length - 1);
    const randomImagePath = imagePaths[randomIndex];

    // Генерируем случайное ФИО
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
    const randomPatronymic = patronymics[Math.floor(Math.random() * patronymics.length)];

    // Генерируем случайные значения для переменных
    const randomAge = Math.floor(Math.random() * 100);
    const randomEmail = 'user' + Math.floor(Math.random() * 1000) + '@google.com';
    const randomPhone = '+375-29-' + Math.floor(Math.random() * 10000000);
    const randomId = 'ID' + Math.floor(Math.random() * 10000);
    const randomVisited = new Date(Math.floor(Math.random() * Date.now()));
    const group = 'П' + (Math.floor(Math.random() * 90000) + 10000);

    // Генерируем случайные значения для достижений
    const achievementText1 = Math.floor(Math.random() * 100);
    const achievementText2 = Math.floor(Math.random() * 100);
    const achievementText3 = Math.floor(Math.random() * 100);
    const achievementText4 = achievementText1 + achievementText2 + achievementText3;

    return {
        name: `${randomSurname} ${randomName} ${randomPatronymic}`,
        age: randomAge,
        email: randomEmail,
        phone: randomPhone,
        id: randomId,
        visited: randomVisited.toISOString(),
        achievement1: achievementText1,
        achievement2: achievementText2,
        achievement3: achievementText3,
        achievement4: achievementText4,
        group: group,
        rex: randomImagePath,
    };
}

function generateRandomStudents(count) {
    const students = [];

    for (let i = 0; i < count; i++) {
        const studentData = generateRandomData(); // Создаем новый объект данных на каждой итерации
        students.push(studentData);
    }

    return students;
}


// Создаем HTTP-сервер
const server = http.createServer(function (request, response) {
    console.log(`Url: ${request.url}`);

    switch (request.url) {
        case "/":
            // Если URL - "/", выполняется перенаправление на "/index.html"
            response.writeHead(301, {
                Location: "/index.html",
                "Content-Type": "text/html; charset=utf-8",
            });
            response.end();
            break;


        case "/rand_student":
            // Если URL - "/rand_student", генерируются случайные данные о студенте и отправляется HTML-страница с ними
            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

            // Генерируем случайное количество студентов (например, 7)
            const numberOfStudents = 7;
            const randomStudents = generateRandomStudents(numberOfStudents);

            let studentsTable = "";
            randomStudents.forEach((student, index) => {
                studentsTable += `
                    <div class="container">
                        <h1>Информация о пользователе MyStat</h1>
                        <img id="avatar1" class="img" src="${student.rex}" alt="Аватар пользователя">
                        <table>
                            <tr>
                                <th>Параметр</th>
                                <th>Значение</th>
                            </tr>
                            <tr>
                                <td>ФИО:</td>
                                <td id="userName">${student.name}</td>
                            </tr>
                            <tr>
                                <td>Группа:</td>
                                <td id="userGroup">${student.group}</td>
                            </tr>
                            <tr>
                                <td class="no">
                                    <div>
                                        <p>Достижения:</p>
                                    </div>
                                </td>
                                <td class="div">
                                    <div class="achievement">
                                        <img src="img/diamond.png" alt="Достижение 1">
                                        <p id="achievement1">${student.achievement1}</p>
                                    </div>
                                    <div class="achievement">
                                        <img src="img/fre.png" alt="Достижение 2">
                                        <p id="achievement2">${student.achievement2}</p>
                                    </div>
                                    <div class="achievement">
                                        <img src="img/Comment.png" alt="Достижение 3">
                                        <p id="achievement3">${student.achievement3}</p>
                                    </div>
                                    <div class="achievement">
                                        <img src="img/medal.png" alt="Достижение 4">
                                        <p id="achievement4">${student.achievement4}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Возраст:</td>
                                <td id="userAge">${student.age}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td id="userEmail">${student.email}</td>
                            </tr>
                            <tr>
                                <td>Телефон</td>
                                <td id="userPhone">${student.phone}</td>
                            </tr>
                            <tr>
                                <td>Идентификатор</td>
                                <td id="userId">${student.id}</td>
                            </tr>
                            <tr>
                                <td>Был последний раз:</td>
                                <td id="lastVisited">${student.visited}</td>
                            </tr>
                        </table>
                    </div>
   
            `;
            });

            // Отправляем HTML-страницу с данными
            response.write(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Страница студента</title>
                        <link rel="stylesheet" href="css/style.css">
                        <script src="js/script.js" defer></script>
                    </head>
                    <body>
                    <div class="container">
                        <h1>Информация о студентах</h1>
                    <table>
                        ${studentsTable}
                    </table>
                </div>
                    </body>
                    </html>
                `);
            response.end();
            break;

        default:
            // Если URL не соответствует вышеуказанным, пытаемся найти и отправить соответствующий файл
            const filePath = path.join("./public", request.url.substring(1));
            console.log(filePath);

            fs.access(filePath, fs.constants.R_OK, (err) => {
                if (err) {
                    // Если файл не найден, отправляем ошибку 404
                    response.writeHead(404, {
                        "Content-Type": "text/html; charset=utf-8",
                    });
                    response.end("<h1>Not found</h1><h2>/rand_student</h2>");
                } else {
                    // Если файл найден, определяем его MIME-тип и отправляем его содержимое
                    const extname = path.extname(filePath);
                    const contentType =
                        contentTypes[extname] || "application/octet-stream";

                    response.writeHead(200, {
                        "Content-Type": contentType,
                    });
                    fs.createReadStream(filePath).pipe(response);
                }
            });
    }
});

// Указываем порт, на котором будет работать сервер, и запускаем его
const port = 1313;
server.listen(port, function () {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});