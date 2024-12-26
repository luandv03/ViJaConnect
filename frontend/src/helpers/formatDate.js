export const formatDate = (isoString) => {
    // Chuyển đổi chuỗi ISO sang đối tượng Date
    const date = new Date(isoString);

    // Thiết lập múi giờ Nhật Bản (GMT+9)
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Tokyo',
        timeZoneName: 'short',
        hour12: false,
    };

    // Lấy định dạng quốc tế và chuyển về kiểu Nhật Bản
    const formatter = new Intl.DateTimeFormat('ja-JP', options);
    const formatted = formatter.formatToParts(date);

    // Định dạng kết quả
    const year = formatted.find(part => part.type === 'year').value;
    const month = formatted.find(part => part.type === 'month').value;
    const day = formatted.find(part => part.type === 'day').value;
    const hour = formatted.find(part => part.type === 'hour').value;
    const minute = formatted.find(part => part.type === 'minute').value;

    return `${year}年${month}月${day}日 ${hour}時${minute}分`;
};
