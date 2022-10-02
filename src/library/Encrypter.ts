import crypto from 'crypto';

export default class Encrypter {
    private static algorithm = 'aes256';
    private static key = crypto.scryptSync('<Your-Secret-Key>', 'salt', 32);

    public static encrypt(clearText: string) {
        const iv = crypto.randomBytes(16);
        try {
            const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
            const encrypted = cipher.update(clearText, 'utf8', 'hex');
            return [encrypted + cipher.final('hex'), Buffer.from(iv).toString('hex')].join('|');
        } catch (error) {
            return error;
        }
    }

    public static decrypt(encryptedText: string) {
        try {
            const [encrypted, iv] = encryptedText.split('|');
            if (!iv) throw new Error('IV not found');
            const decipher = crypto.createDecipheriv(this.algorithm, this.key, Buffer.from(iv, 'hex'));
            return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
        } catch (error) {
            return error;
        }
    }
}
