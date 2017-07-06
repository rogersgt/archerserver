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
            parsed.sort(sortArrayByDate);
            console.log(parsed.length);
            if (parsed.length > 10) {
                resolve(parsed.splice((parsed.length - 11), 10));
            } else resolve(parsed);
        }
    });
    
}

function sortArrayByDate(a, b) {
    return new Date(a) + new Date(b); 
}

export function parseAllBlogs(blogs) {
    return blogs.map((blog) => JSON.parse(blog));
}
