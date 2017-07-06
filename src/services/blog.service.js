import s3fs from 's3fs';

export async function updateBlogs(jsonData) {
    const data = JSON.stringify(jsonData);
    const allData = await getCurrentData();
    allData.push(data);
    const writer = makeWriter();

    await writer.writeFile('blogs.json', JSON.stringify(allData));
    return data;
}

export async function getBlogs() {
    const data = await getCurrentData();
}

function makeWriter() {
    const opts = {
        region: 'us-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    };
    return new s3fs(process.env.AWS_BUCKET_NAME, opts);
}

function getCurrentData() {
    return new Promise((resolve, reject) => {
        const writer = makeWriter();
        writer.readFile('blogs.json', 'utf-8', handleReadData);

        function handleReadData(err, data) {
            if (err) reject(err);
            const parsed = JSON.parse(data);
            resolve(parsed);
        }
    });
    
}
