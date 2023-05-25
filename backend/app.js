// импорт экспресса и монго
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
// const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate'); // библиотека для валидации данных
const {
  errorUnfound,
} = require('./utils/constants');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { DB_ADDRESS } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// const path = require('path');

// создаем приложение
const app = express();
const { PORT = 3000 } = process.env;

// подключаемся к серверу mongo
mongoose.connect(DB_ADDRESS, {
  autoIndex: true,
});

// запросы только с нашего сайта
// app.use(cors({ origin: 'http://localhost:3000' }));

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'https://swearwolfie.mesto.nomoredomains.monster',
  'https://swearwolfie.mesto.nomoredomains.monster'
];

app.use((req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req;  // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }
  return next();
});

// мидлвар переваривания информации
app.use(express.json());
// Use Helmet!
app.use(helmet());
app.use(requestLogger); // подключаем логгер запросов (в самом начале)

// если в будущем понадобятся файлы фронта из локальных папок
/* app.use(express.static(path.join(__dirname + '/public'))); */

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(https?:\/\/(www\.)?([a-zA-z0-9-]){1,}\.?([a-zA-z0-9]){2,8}(\/?([a-zA-z0-9-])*\/?)*\/?([-._~:/?#[]@!\$&'\(\)\*\+,;=])*)/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

// авторизация
app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((res) => {
  res.status(errorUnfound).render({
    message: 'Такого адреса не существует',
  });
});

app.use(errorLogger); // подключаем логгер ошибок (после всего, но перед ошибками)

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

// наш централизованный обработчик
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(err.statusCode)
    .send({
      message: statusCode === 500
        ? 'Произошла ошибка на сервере'
        : message,
    });
  next();
});

// запуск сервера
app.listen(PORT, () => {
  console.log(`HELLO ITS ME MARIO AT PORT ${PORT}`);
});

/*
// доп мидлвар, который задает айди для создания карточки
app.use((req, res, next) => {
  req.user = {
    _id: '642c97f752a0f2ec09557f35', //  _id созданного пользователя Kate Bishop
  };

  next();
});
*/
