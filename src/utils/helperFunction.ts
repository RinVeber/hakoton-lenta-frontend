export function getBy(category: any) {
    let result: any = [];
    for (const key in category[0]) {
      result[key] = category.map((item: any, index: any) => {
        return {id: index, title: item[key]};
      });
    }
    return result;
  }