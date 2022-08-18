// eslint-disable-next-line import/no-anonymous-default-export
export default {
  translation: {
    login: {
      noAccount: 'Нет аккаунта?',
      signup: 'Регистрация',
      text: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
    },
    validation: {
      required: '{{name}} обязательное поле',
      sizeFromTo: 'От {{from}} до {{to}} символов',
      minSym: 'Не менее {{min}} символов',
      confirmPassword: 'Пароли должны совпадать',
      unique: 'Должно быть уникальным',
    },
    singup: {
      text: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
    },
    errors: {
      unknown: 'неизвестная ошибка',
      userAlredyExist: 'Такой пользователь уже существует',
      loginOrPassword: 'Неверные имя пользователя или пароль',
    },
    channels: {
      text: 'Каналы',
      toast: {
        add: 'Канал создан',
        rename: 'Канал переименован',
        remove: 'Канал удален',
      }
    },
    messages: {
      textInput: 'Введите сообщение...',
      message_one: '{{count}} сообщение',
      message_few: '{{count}} сообщения',
      message_many: '{{count}} сообщений',
    },
    modals: {
      add: {
        text: 'Добавить канал',
      },
      delete: {
        text: 'Удалить канал',
      },
      rename: {
        text: 'Переименовать канал',
      },
    },
    buttons: {
      submit: 'Отправить',
      cancel: 'Отменить', 
      delete: 'Удалить',
      input: 'Войти',
      output: 'Выйти',
      rename: 'Переименовать',
      signup: 'Зарегистрироваться',
    },
  },
};
