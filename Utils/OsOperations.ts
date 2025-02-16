import * as os from 'os';
import * as path from 'path';

export function getDownloadFolderPath(): string {
    const homeDir = os.homedir();

    switch (os.platform()) {
        case 'win32':
            return path.join(homeDir, 'Downloads');
        case 'darwin':
            return path.join(homeDir, 'Downloads');
        case 'linux':
            return path.join(homeDir, 'Downloads');
        default:
            throw new Error('Unsupported OS');
    }
}

try {
    const downloadPath = getDownloadFolderPath();
    console.log(`Download folder path: ${downloadPath}`);
} catch (error) {
    console.error('Error determining download folder path:', error);
}
