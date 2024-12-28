export const highlightText = (text, keyword) => {
  if (!keyword) return text; // Nếu không có từ khóa, trả về văn bản gốc

  // Tạo biểu thức chính quy để tìm từ khóa (case-insensitive)
  const regex = new RegExp(`(${keyword})`, "gi");

  // Thay thế từ khóa bằng đoạn HTML được highlight
  return text.replace(
      regex,
      `<span class="bg-yellow-300 text-black font-bold">$1</span>`
  );
};
