import { uploadFile } from '../helpers/uploader.js';



export const postFile = async (req, res) => {
    try {
        // Check if req.files exists and has the 'file' property
        if (!req.files || !req.files.file) {
            return res.status(400).json({
                ok: false,
                msg: 'No file was uploaded.'
            });
        }

        const file = req.files.file;

        // Check if the file is empty
        if (file.size === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'The uploaded file is empty.'
            });
        }

        const file_id = await uploadFile(file);

        const record = { file_id: file_id };

        res.status(201).json({
            ok: true,
            record,
            msg: 'File uploaded successfully',
        });


    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error uploading file',
            error: error.message
        });
    }
}

export const getFile = async (req, res) => {
    try {
        const { id } = req.params;

        const file = await getFileById(id);

        res.status(200).json({
            ok: true,
            file,
            msg: 'File retrieved successfully'
        });
    } catch (error) {
        console.error('Error retrieving file:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error retrieving file',
            error: error.message
        });

    }
}
