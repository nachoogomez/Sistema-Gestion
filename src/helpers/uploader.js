import { v4 as uuidv4 } from 'uuid';
import  path  from 'path';
import { fileURLToPath } from 'url';

const extensions = ["pdf"];;

/** 
 *  @param {file to be uploaded} fileToUpload res.body ** file
 *  @param {extension accepted} extensions array: string
 *  @param {path where the file going to be save (in the server)} pathLocation string
 *  @returns string fileName
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadFile = (fileToUpload) => {
    return new Promise((resolve, reject) => {
        if (!fileToUpload) {
            return reject("No file provided");
        }

        const { name: fileName } = fileToUpload;
        const extensionAndName = fileName.split('.');
        const extension = extensionAndName[extensionAndName.length - 1];

        if (!extensions.includes(extension)) {
            return reject("Invalid extension");
        }

        const tempName = uuidv4() + "." + extension;
        const uploadPath = path.join(__dirname, "../uploads", tempName);

        fileToUpload.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
            resolve(tempName);
        });
    });
};





