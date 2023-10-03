
    // Получаем ссылки на элементы <td> по их id
    const userNameTd = document.getElementById('userName');
    const userAgeTd = document.getElementById('userAge');
    const userEmailTd = document.getElementById('userEmail');
    const userPhoneTd = document.getElementById('userPhone');
    const userIdTd = document.getElementById('userId');
    const lastVisitedTd = document.getElementById('lastVisited');
    const achievement1 = document.getElementById('achievement1');
    const achievement2 = document.getElementById('achievement2');
    const achievement3 = document.getElementById('achievement3');
    const achievement4 = document.getElementById('achievement4');
    const userGroop = document.getElementById('userGroop');
    const imgElement = document.getElementById('avatar1');


 // Массивы для имен, фамилий и отчеств
 const names = ['Иван', 'Анна', 'Петр', 'Мария', 'Алексей'];
 const surnames = ['Иванов', 'Петров', 'Сидоров', 'Смирнов', 'Козлов'];
 const patronymics = ['Иванович', 'Петрович', 'Алексеевич', 'Дмитриевич', 'Сергеевич'];

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

    // Генерируем случайные значения для достижений
    const achievementText1 =  Math.floor(Math.random() * 100);
    const achievementText2 =  Math.floor(Math.random() * 100);
    const achievementText3 =  Math.floor(Math.random() * 100);
    const achievementText4 = achievementText1 + achievementText2 + achievementText3;

    const imagePaths = [
        'img/People2.jpg',
        'img/People3.jpg',
        'img/People1.jpg',
        'img/avatar.png'
    ];
    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    imgElement.src = imagePaths[randomIndex];
    


    // Устанавливаем значения переменных
    userNameTd.textContent = `${randomSurname} ${randomName} ${randomPatronymic}`;
    userAgeTd.textContent = randomAge;
    userEmailTd.textContent = randomEmail;
    userPhoneTd.textContent = randomPhone;
    userIdTd.textContent = randomId;
    lastVisitedTd.textContent = randomVisited.toISOString();
    achievement1.textContent = achievementText1;
    achievement2.textContent = achievementText2;
    achievement3.textContent = achievementText3;
    achievement4.textContent = achievementText4;
    userGroop.textContent = 'П' + (Math.floor(Math.random() * 90000) + 10000);


