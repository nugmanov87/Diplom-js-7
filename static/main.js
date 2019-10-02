'use strict';

/*1. В файле main.js объявите класс Profile.
2. Реализуйте конструктор класса. Экземпляр класса принимает на вход объект со следующими ключами:
Имя пользователя — строка.
Реальное имя — объект с ключами "имя" и "фамилия".
Пароль — строка.*/

class Profile {
    constructor() {
        this.username = username;
        this.name = { firstName, lastName };
        this.password = password;
    }

    // 3. Реализуйте метод _Добавление нового пользователя_ — метод вызывается с данными, полученными из конструктора класса.
    createUser(
        {
            username,
            name: { firstName, lastName },
            password,
        },
        callback
    ) {
        return ApiConnector.createUser(
            { username, name: { firstName, lastName }, password },
            (err, data) => {
                console.log(`Adding ${this.name}`);
                callback(err, data);
            }
        );
    }

    // 4. Реализуйте метод _Авторизация_ — метод вызывается с данными, полученными из конструктора класса.
    performLogin({ username, password }, callback) {
        return ApiConnector.performLogin({ username, password }, (err, data) => {
            console.log(`Authorized ${this.username}`);
            callback(err, data);
        });
    }
    // 5. Реализуйте метод _Добавление денег в личный кошелек_ — метод принимает на вход объект с двумя ключами: валюта (_строка_) и количество денег (_число_).

    addMoney({ currency, amount }, callback) {
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
        });
    }

    /* 6. Реализуйте метод _Конвертация валют_ — метод принимает на вход объект с тремя ключами: из какой валюты конвертируем (_строка_), 
    в какую валюту конвертируем (_строка_), конвертированная (целевая) сумма (_число_).*/
    convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
        return ApiConnector.convertMoney(
            { fromCurrency, targetCurrency, targetAmount },
            (err, data) => {
                console.log(
                    `Сonvertible of ${fromCurrency} to ${targetCurrency} just ${targetAmount}`
                );
                callback(err, data);
            }
        );
    }

    /* 7. Реализуйте метод _Перевод токенов другому пользователю_ — метод принимает на вход объект с двумя ключами: 
   кому (_строка_, имя пользователя), количество денег (_число_).*/

    transferMoney({ to, amount }, callback) {
        return ApiConnector.transferMoney({ to, amount }, (err, data) => {
            console.log(`Translated ${to} of ${this.username} just ${amount}`);
            callback(err, data);
        });
    }
}

/*8. После реализации всех методов класса `Profile` за его пределами реализуйте функцию получения курса валют с сервера.  
   В данной функции нужно использовать метод `getStocks` класса `ApiConnector`. Сохраните данные, полученные в результате 
   вызова `getStocks`, в переменную*/

function getCourCecurrency() {
    let course = ApiConnector.getStocks();
    return course;
}
