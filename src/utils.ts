export function formatTime(iso: string) { // special time format ISO 8601 (YYYY-MM-DDTHH:mm:ss.SSSZ)
    new Date(iso).toLocaleString('sr-RS', {
        year: "numeric",
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })
}