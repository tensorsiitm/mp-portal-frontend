export const formatAadhaar = (input) => {
    const cleaned = input.replace(/\D+/g, "").slice(0,12);
    const chunks = cleaned.match(new RegExp('.{1,4}', "g")) || [];
    return chunks.join(" ");
}

export const formatPhone = (input) => {
    const cleaned = input.replace(/\D+/g, "").slice(0, 10);
    return cleaned;
};