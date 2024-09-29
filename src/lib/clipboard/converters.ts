const clipboardImageToFile = (
  data: DataTransfer,
  callback: (result: File | null | undefined) => void,
) => {
  const items = data.items;

  if (items == undefined || items.length == 0) {
    if (typeof callback == "function") {
      callback(undefined);
    }
  }

  for (const item of items) {
    if (!item.type.includes("image")) continue;
    const blob = item.getAsFile();

    if (typeof callback == "function") {
      callback(blob);
    }
  }
};
export { clipboardImageToFile };
