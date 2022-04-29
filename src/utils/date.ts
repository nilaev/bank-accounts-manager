export const toLocaleFormat = date => {
    const d = new Date(date);
    const chunks = [d.getDate(), d.getMonth() + 1, d.getFullYear()];

    return chunks.map(chunk => String(chunk).padStart(2, '0')).join('.');
};
