const emptyFilter = {
  name: "",
  slug: "",
  type: "",
  description: "",
  options: [],
};

export const filtersReducer = (filters, action) => {
  switch (action.type) {
    case "filters/add": {
      return [...filters, { ...emptyFilter }];
    }

    case "filters/remove": {
      return filters.filter((_, i) => i !== action.payload.index);
    }

    case "filters/fieldChange": {
      return filters.map((filter, i) =>
        i === action.payload.index
          ? { ...filter, [action.payload.field]: action.payload.value }
          : filter,
      );
    }

    case "filters/optionsChange": {
      return filters.map((filter, i) =>
        i === action.payload.index
          ? { ...filter, options: action.payload.options }
          : filter,
      );
    }

    case "filters/reset": {
      return [];
    }

    case "filters/set": {
      return action.payload || [];
    }
    default: {
      return filters;
    }
  }
};
