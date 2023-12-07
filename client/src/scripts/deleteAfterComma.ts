function deleteAfterComma(word: string) {
  const result = word.split(",");
  if (result.length > 1) {
    return result[0].trim();
  }
  return result.join();
}

export { deleteAfterComma };
