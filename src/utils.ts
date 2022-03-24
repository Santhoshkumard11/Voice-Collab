// logging with timestamp
const timestamp = () => `[${new Date().toUTCString()}]`;
export const log = (...args: string[]) => console.log(timestamp(), " | ", ...args);
