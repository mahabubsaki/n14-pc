export default function createSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .trim(); // Trim any leading or trailing spaces
}
