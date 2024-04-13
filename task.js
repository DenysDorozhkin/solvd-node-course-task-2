const AdvancedDataTransform = {
  addValues: (a, b) => {
    if (
      (typeof a === "number" && typeof b === "number") ||
      (typeof a === "string" && typeof b === "string") ||
      (typeof a === "bigint" && typeof b === "bigint")
    ) {
      return a + b;
    } else if (Array.isArray(a) && Array.isArray(b)) {
      return [...a, ...b];
    } else if (typeof a === "object" && typeof b === "object") {
      return { ...a, ...b };
    } else {
      throw new Error("Addition not possible for the provided types.");
    }
  },

  stringifyValue: (value) => {
    if (typeof value === "object" || Array.isArray(value)) {
      return JSON.stringify(value);
    }
    return String(value);
  },

  invertBoolean: (boolean) => {
    if (typeof boolean !== "boolean") {
      throw new Error("Argument must be a boolean.");
    }
    return !boolean;
  },

  convertToNumber: (value) => {
    let number;
    if (typeof value === "string") {
      number = parseFloat(value);
    } else {
      number = Number(value);
    }
    if (isNaN(number)) {
      throw new Error("Conversion to number not possible.");
    }
    return number;
  },

  coerceToType: (value, type) => {
    switch (type.toLowerCase()) {
      case "string":
        return AdvancedDataTransform.stringifyValue(value);
      case "number":
        return AdvancedDataTransform.convertToNumber(value);
      case "boolean":
        return Boolean(value);
      case "bigint":
        return BigInt(value);
      default:
        throw new Error("Invalid type specified for coercion.");
    }
  },

  convertArrayToStringArray: (array) => {
    if (!Array.isArray(array)) {
      throw new Error("Input must be an array.");
    }
    return array.map((item) => {
      if (typeof item === "object" || Array.isArray(item)) {
        return JSON.stringify(item);
      } else {
        return String(item);
      }
    });
  },

  parseStringToBigInt: (string) => {
    const parsedBigInt = BigInt(string);
    if (isNaN(parsedBigInt)) {
      throw new Error("Parsing to BigInt failed.");
    }
    return parsedBigInt;
  },
};
