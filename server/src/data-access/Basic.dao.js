export const updateOrCreate = async (model, where, newItem) => {
  // don not use primary key for where condition
  isNullOrEmptyValue(where);
  if (Object.keys(where).length === 0 || isNullOrEmptyValue(where)) {
    const item = await model.create(newItem);
    return { item: item.dataValues }; // { item: item.dataValues, created: true };
  }
  const foundItem = await model.findOne({ where });
  if (!foundItem) {
    // Item not found, create a new one
    const item = await model.create(newItem);
    return { item: item.dataValues }; // { item: item.dataValues, created: true };
  }
  const item = await model.update(newItem, {
    where,
    returning: true,
    plain: true,
  });
  const data = item[1].dataValues;
  return { item: data };
  //   return { item: item, created: false };
};

const isNullOrEmptyValue = (obj) =>
  Object.values(obj).every((val) => {
    if (val === null || val === undefined || val === "undefined") {
      return true;
    }
    return false;
  });
// export default BasicDAO;
