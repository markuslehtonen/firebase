// Storage event callback for a successful file upload.
exports.handleStorageUpload = functions.storage.object().onFinalize(async (object) => {
    const bucket = admin.storage().bucket();
    const file = bucket.file(object.name);
    const contentType = object.contentType;

    // Remember to return null to avoid time out..
    if (!contentType.startsWith('image/')) {
        functions.logger.log('Uploaded file as not an image.')
        return null;
    }

    // Rememeber to return a promise.
    return file.getMetaData()
        .then(metaData => {
            functions.logger.log('Uploaded image metadata JSON:', JSON.stringify(metaData));
        })
        .catch(error => {
            functions.logger.log('Failed at retrieving image metadata, error:', error);
        });
});