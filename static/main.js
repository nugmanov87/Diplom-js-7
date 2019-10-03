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

function getCourceCurrency() {
    let course = ApiConnector.getStocks();
    return course;
}

// Решение второй части задания

function main(){
    const Ivan = new Profile({
                    username: 'ivan',
                    name: { firstName: 'Ivan', lastName: 'Chernyshev' },
                    password: 'ivanspass',
                });

    const Roman = new Profile({
                    username: 'roman',
                    name: { firstName: 'Roman', lastName: 'Sidorov' },
                    password: 'rosido',
                });

                Ivan.createUser({ username: 'ivan', name: { firstName: 'Ivan', lastName: 'Chernyshev' }, password: 'ivanspass' }, (err, data) => {
                    if (err) {
                            console.error('Error adding new user');
                    } else {
                            console.log(`Added a new user ${Ivan.name}`);
                    });
                }


                Ivan.performLogin({ username: 'ivan', password: 'ivanspass' }, (err, data) => {
                    if (err) {
                            console.error('User authorization error');
                    } else {
                            console.log(`The ${Ivan.username} is logged in`);
                    });
                }
            

                Ivan.addMoney({ currency: 'RUB', amount: 100 }, (err, data) => {
                    if (err) {
                            console.error('Error during adding money to Ivan');
                    } else {
                            console.log(`Added 500000 euros to Ivan`);
                    });
                }

                Ivan.convertMoney({ fromCurrency: 'RUB', targetCurrency: 'Netcoins', targetAmount: 500 }, (err, data) => {
                    // не пойму как применить здесь getCourceCurrency() для получения курсов валют
                    let result = Ivan.addMoney * getCourceCurrency('Netcoins');
                    if (err) {
                            console.error('Currency conversion error');
                    } else {
                            console.log(`Converting RUB to ${result} Netcoins`);
                    });
                }

                Roman.createUser({username: 'roman', name: { firstName: 'Roman', lastName: 'Sidorov' }, password: 'rosido'}, (err, data) => {
                    if (err) {
                            console.error('Error adding new user');
                    } else {
                            console.log(`Added a new user ${Roman.name}`);
                    });
                }

                Ivan.transferMoney({ to: Roman.username, amount: Ivan.convertMoney }, (err, data) => {
                    if (err) {
                            console.error(`Error during transfering money to ${Roman.username}`);
                    } else {
                            console.log(`Transfering ${amount} of Netcoins ${to}`);
                    });
                }
              }
            
            main();
