export let regexp = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

export const URL = "http://127.0.0.1:8000/v1/auth/token/login/";
export const baseURL = 'http://95.163.233.5/v1/';
export const urlSales = baseURL + 'api/sales/';
export const urlForcast = baseURL + 'api/forecast/';
export const urlToken = baseURL + '/api/auth/token/login/';
export const urlSalesDiff = baseURL + 'api/salesdiff/';

export const navLinks = [
  {


    id: 1,
    name: "Обзор",
    link: "/review",
    isActive: true,
  },
  {
    id: 2,
    name: "Прогноз спроса",
    link: "/forcast",
    isActive: true,
  },
  {
    id: 3,
    name: "Статистика",
    link: "/",
    isActive: true,
  },
];

export const mokColumnsMain = [
  {
    title: "TK",
    dataIndex: "tk",
    key: "tk",
  },
  {
    title: "Группа",
    dataIndex: "group",
    key: "group",
  },
  {
    title: "Категория",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Подкатеогрия",
    dataIndex: "podcategory",
    key: "podcategory",
  },
  {
    title: "SKU",
    dataIndex: "sku",
    key: "sku",
  },
];

export const mokColumnsTable = [
  {
    title: "TK",
    dataIndex: "tk",
    key: "tk",
  },
  {
    title: "Группа",
    dataIndex: "group",
    key: "group",
  },
  {
    title: "Категория",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Подкатеогрия",
    dataIndex: "podcategory",
    key: "podcategory",
  },
  {
    title: "SKU",
    dataIndex: "sku",
    key: "sku",
  },
];


[...Array(14).keys()].forEach((item) => {
  const day = new Date();
  day.setDate(day.getDate() + item);

  mokColumnsTable.push({
    title: day.toLocaleDateString() + ' ' + 'шт',
    dataIndex: "date" + item,
    key: "date" + item,
  });

});


export const mokColumnsStatic = [
  {
    title: "TK",
    dataIndex: "tk",
    key: "tk",
  },
  {
    title: "Группа",
    dataIndex: "group",
    key: "group",
  },
  {
    title: "Категория",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Подкатеогрия",
    dataIndex: "podcategory",
    key: "podcategory",
  },
  {
    title: "SKU",
    dataIndex: "sku",
    key: "sku",
  },
  {
    title: "Неделя",
    dataIndex: "weekday",
    key: "weekday",
  },
  {
    title: "Продажи шт",
    dataIndex: "sales",
    key: "sales",
  },
  {
    title: "Прогноз шт",
    dataIndex: "forcast",
    key: "forcast",
  },
  {
    title: "Разница (факт/план)",
    dataIndex: "difference",
    key: "difference",
  },
  {
    title: "Качество прогноза по WAPE",
    dataIndex: "forecast quality",
    key: "forecast quality",
  },
  
];

export const mokDataSource = [
  {
    key: "1",
    name: "Лента1",
    group: "Напитки",
    category: "Напиток ",
    podcategory: "Холодный ",
    sku: "Напиток Холодный ",
  },
  {
    key: "2",
    name: "Лента3",
    group: "Хлеб",
    category: "Хлеб ",
    podcategory: "Пшеничный ",
    sku: "Хлеб пшеничный ",
  },
  {
    key: "3",
    name: "Лента2",
    group: "Шаколадки",
    category: "Шаколад",
    podcategory: "Горький",
    sku: "Шаколад горький ",
  },
  {
    key: "4",
    name: "Лента4",
    group: "Коктели",
    category: "Молочные",
    podcategory: "Вкусные",
    sku: "Молочный вкусный коктель ",
  },
  {
    key: "5",
    name: "TK",
    group: "Коктели",
    category: "Молочные",
    podcategory: "Вкусные",
    sku: "Молочный вкусный коктель ",
  },
  {
    key: "6",
    name: "Лента7",
    group: "Коктели",
    category: "Молочные",
    podcategory: "Вкусные",
    sku: "Молочный вкусный коктель ",
  },
  {
    key: "7",
    name: "Аркадий",
    group: "Коктели",
    category: "Молочные",
    podcategory: "Вкусные",
    sku: "Молочный вкусный коктель ",
  },
  {
    key: "8",
    name: "Лента122",
    group: "Коктели",
    category: "Выпечка",
    podcategory: "Вкусные",
    sku: "Молочный вкусный коктель ",
  },
  {
    key: "9",
    name: "Лента1ff22",
    group: "Коктели",
    category: "Выпечка",
    podcategory: "Вкусные",
    sku: "Молочный вкусный коктель ",
  },
  {
    key: "10",
    name: "Лента1sasa22",
    group: "Коктели",
    category: "Выпечка",
    podcategory: "Вкусные",
    sku: "Молочный вкусный коктель ",
  },

  {
    key: "11",
    name: "Лента1asas22",
    group: "Коктели",
    category: "Выпечка",
    podcategory: "Вкусные",
    sku: "Молочный вкусный коктель ",
  },
];
