import agent from './db/agent';

export async function updateBlogs(jsonData) {
    const data = JSON.stringify(jsonData);
    const allData = await getCurrentData();
    allData.push(data);
    const writer = agent();

    await writer.writeFile(process.env.BLOGFILE, JSON.stringify(allData));
    return data;
}

export function getCurrentData() {
    return new Promise((resolve, reject) => {
        const writer = agent();
        return writer.readFile(process.env.BLOGFILE, 'utf-8', handleReadData);

        function handleReadData(err, data) {
            if (err) reject(err);
            const parsed = JSON.parse(data);
            resolve(parsed);
        }
    });
    
}

export function parseAllBlogs(blogs) {
    return blogs.map((blog) => JSON.parse(blog));
}
