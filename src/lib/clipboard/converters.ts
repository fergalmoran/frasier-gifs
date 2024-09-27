const clipboardImageToFile = (
  data: DataTransfer,
  callback: (result: File | null | undefined) => void,
) => {
  var items = data.items;

  if (items == undefined || items.length == 0) {
    if (typeof callback == "function") {
      callback(undefined);
    }
  }

  for (var i = 0; i < items.length; i++) {
    // Skip content if not image
    if (items[i]?.type.indexOf("image") == -1) continue;
    var blob = items[i]?.getAsFile();

    if (typeof callback == "function") {
      callback(blob);
    }
  }
};
export { clipboardImageToFile };
