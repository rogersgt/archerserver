import s3fs from 's3fs';

export default function makeWriter() {
    const opts = {
        region: 'us-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    };
    return new s3fs(process.env.AWS_BUCKET_NAME, opts);
}