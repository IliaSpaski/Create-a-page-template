const http = require("http");
const fs = require("fs");
const path = require("path");

// MIME-типы
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

// Функция для генерации случайного целого числа в заданном диапазоне
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Массивы для имен, фамилий и отчеств
const names = ['Иван', 'Анна', 'Петр', 'Мария', 'Алексей'];
const surnames = ['Иванов', 'Петров', 'Сидоров', 'Смирнов', 'Козлов'];
const patronymics = ['Иванович', 'Петрович', 'Алексеевич', 'Дмитриевич', 'Сергеевич'];

// Функция для генерации случайных данных
function generateRandomData() {
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
    };
}
const server = http.createServer(function (request, response) {
    console.log(`Url: ${request.url}`);

    switch (request.url) {
        case "/":
            response.writeHead(301, {
                Location: "/index.html",
                "Content-Type": "text/html; charset=utf-8",
            });
            response.end();
            break;


        case "/rand_student":
            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

            // Генерируем случайные данные о студенте
            const randomData = generateRandomData();

            // Генерируем случайный путь к изображению
            const imagePaths = [
                'img/People2.jpg',
                'img/People3.jpg',
                'img/People1.jpg',
                'img/avatar.png'
            ];
            const randomIndex = getRandomInt(0, imagePaths.length - 1);
            const randomImagePath = imagePaths[randomIndex];

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
                            <h1>Информация о пользователе MyStat</h1>
                            <img id="avatar1" class="img" src="${randomImagePath}" alt="Аватар пользователя">
                            <table>
                                <tr>
                                    <th>Параметр</th>
                                    <th>Значение</th>
                                </tr>
                                <tr>
                                    <td>ФИО:</td>
                                    <td id="userName">${randomData.name}</td>
                                </tr>
                                <tr>
                                    <td>Группа:</td>
                                    <td id="userGroup">${randomData.group}</td>
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
                                            <p id="achievement1">${randomData.achievement1}</p>
                                        </div>
                                        <div class="achievement">
                                            <img src="img/fre.png" alt="Достижение 2">
                                            <p id="achievement2">${randomData.achievement2}</p>
                                        </div>
                                        <div class="achievement">
                                            <img src="img/Comment.png" alt="Достижение 3">
                                            <p id="achievement3">${randomData.achievement3}</p>
                                        </div>
                                        <div class="achievement">
                                            <img src="img/medal.png" alt="Достижение 4">
                                            <p id="achievement4">${randomData.achievement4}</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Возраст:</td>
                                    <td id="userAge">${randomData.age}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td id="userEmail">${randomData.email}</td>
                                </tr>
                                <tr>
                                    <td>Телефон</td>
                                    <td id="userPhone">${randomData.phone}</td>
                                </tr>
                                <tr>
                                    <td>Идентификатор</td>
                                    <td id="userId">${randomData.id}</td>
                                </tr>
                                <tr>
                                    <td>Был последний раз:</td>
                                    <td id="lastVisited">${randomData.visited}</td>
                                </tr>
                            </table>
                        </div>
                    </body>
                    </html>
                `);
            response.end();
            break;

        default:
            const filePath = path.join("./public", request.url.substring(1));
            console.log(filePath);

            fs.access(filePath, fs.constants.R_OK, (err) => {
                if (err) {
                    response.writeHead(404, {
                        "Content-Type": "text/html; charset=utf-8",
                    });

                    response.end("<h1>Not found</h1><h2>/rand_student</h2>");
                } else {
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

const port = 1313;
server.listen(port, function () {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});

