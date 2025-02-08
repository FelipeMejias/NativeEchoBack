import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function saveJson(filename, data) {
    try {
        const dirPath = join(process.cwd(), 'jsons');
        await mkdir(dirPath, { recursive: true }); // Garante que a pasta exista

        const filePath = join(dirPath, filename);
        await writeFile(filePath, JSON.stringify(data, null, 2));

        console.log(`✅ JSON salvo em: ${filePath}`);
        return filePath;
    } catch (e) {
        console.error('❌ Erro ao salvar JSON:', e);
        throw { type: 'bad request', message: "This file .json can't be saved" };
    }
}


