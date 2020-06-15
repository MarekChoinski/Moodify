export default class Vibrant {

    static from(src: string) {
        return new Vibrant();
    }

    async getPalette() {
        return Promise.resolve({
            data: 'data'
        });
    }
}