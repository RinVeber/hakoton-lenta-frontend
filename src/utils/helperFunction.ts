export function getBy(category: any) {
  let result: any = [];
  for (const key in category[0]) {
    result[key] = category.map((item: any, index: any) => {
      return { id: index, title: item[key] };
    });
  }
  return result;
}

export function toQueryParam(obj: any) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

export function toQuery(data: any) {
  let paramString: string[] = [];


  for (const key in data) {
    if (data[key]) {
      if (Array.isArray(data[key])) {
        data[key].forEach((v: string) => {
          paramString.push(`${key}=${v}`);
        });
      } else {
        paramString.push(`${key}=${data[key]}`);
      }
    }
  }


  // if (data.city) {
  //   paramString.push(`city=${data.city}`);
  // }
  // if (data.store) {
  //   paramString.push(`store=${data.store}`);
  // }
  // if (data.group) {
  //   paramString.push(`group=${data.group}`);
  // }
  // if (data.category) {
  //   paramString.push(`category=${data.category}`);
  // }
  // if (data.subcategory) {
  //   paramString.push(`subcategory=${data.subcategory}`);
  // }

  // data.sku.forEach((v: string) => {
  //   paramString.push(`sku=${data.sku}`);
  // });

  return paramString.join("&");
}
