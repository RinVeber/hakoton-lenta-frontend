export type FormType = {
  email: string;
  password: string;
  visual: boolean;
  token: string;
  status: 'init' | 'loading' | 'success' | 'error';
  error: string | undefined;
};

export type columnsTable = {
  key: string,
  dataIndex: string,
  title: string
}

export type dataSourceTableSales = {
  key: string,
  name: string,
  group: string,
  category: string,
  podcategory: string,
  sku: string,
}

export type userMe = {
  user: {
    first_name: "",
    last_name: "",
  },
  status: 'init' | 'loading' | 'success' | 'error';
  error: string | undefined;
}