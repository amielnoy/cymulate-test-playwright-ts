export class DateAndTimeUtility {
    // Private constructor to prevent instantiation
    public  constructor() {
        console.log("DateTimeUtility\n");
    }

    public getCurrentDate(): string {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    }

    /**
     * Returns the current time as a string in the format HH:MM:SS.
     */
    public  getCurrentTime(): string {
        const currentTime = new Date();
        const hours = String(currentTime.getHours()).padStart(2, '0');
        const minutes = String(currentTime.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }
}

